import SignupModel from "../models/SignupModel.js";
import LoginModel from "../models/LoginModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";

export const signUp = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if the user already exists
    const existingUser = await SignupModel.findOne({ email: email });
    if (existingUser) {
      return res.json("User already exists");
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = await SignupModel.create({
      name,
      email,
      password: hashedPassword,
    });

    // Send a success response
    return res.json("User created successfully");
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const login = async (req, res) => {
  const { name, password } = req.body;

  try {
    // Find the user by name
    const user = await SignupModel.findOne({ name: name });

    if (user) {
      // Compare the plain-text password with the hashed password
      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) {
        //Generate JWT tokem
        const token = jwt.sign({ email: user.email }, "jwt-secret-key", {
          expiresIn: "1d",
        });
        //set the token in a cookie
        res.cookie("token", token);
        //log the login attempt
        const loginuser = await LoginModel({
          name: name,
          password: password,
          token: token,
        });

        //save login to database
        await loginuser.save();
        return res.json("Login successful");
      } else {
        return res.json("Password is incorrect");
      }
    } else {
      return res.json("No record existed");
    }
  } catch (err) {
    console.error(err);
    return res.json("Internal server error");
  }
};
//verify user middleware
export const verifyUSer = async (req, res, next) => {
  const token = req.cookies.token;
  // console.log(token);
  if (!token) {
    return res.json("the token was not available");
  } else {
    jwt.verify(token, "jwt-secret-key", (err, decoded) => {
      if (err) return res.json("token is wrong");
      next();
    });
  }
};

export const home = async (req, res) => {
  return res.json("success");
};

export const forgetPw = async (req, res) => {
    const { email } = req.body;
    
    try {
      const user = await SignupModel.findOne({ email: email });
      
      if (!user) {
        return res.send({ Status: "user not existed" });
      }
      
      const token = jwt.sign({ id: user._id }, "jwt_secret_key", { expiresIn: "1d" });
      
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "sindhuganesh2002@gmail.com",
          pass: "uuda bqea blty mkgr",
        },
      });
  
      const mailOptions = {
        from: "sindhuganesh2002@gmail.com",
        to: email,
        subject: "Reset your password",
        text: `http://localhost:3000/reset-password/${user._id}/${token}`,
      };
  
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log(error);
          return res.status(500).send({ Status: "error", Message: "Failed to send email" });
        } else {
          return res.send({ Status: "success" });
        }
      });
      
    } catch (err) {
      console.error(err);
      return res.status(500).send({ Status: "error", Message: "Server error" });
    }
  };

  export const resetPw=async(req,res)=>{
    const {id,token}=req.params
    const {password}=req.body

    jwt.verify(token,"jwt_secret_key",(err,decoded)=>{
        if(err){
            return res.json({Status:"Error with token"})
        }else{
            bcrypt.hash(password,10)
            .then(hash=>{
                SignupModel.findByIdAndUpdate({_id: id},{password: hash})
                .then(u=>res.send({Status:"success"}))
                .catch(err=>res.send({Status: err}))
            })
            .catch(err=>res.send({Status: err}))
        }
    })
  }