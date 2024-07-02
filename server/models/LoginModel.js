import mongoose from "mongoose";

const LoginSchema=new mongoose.Schema({
    name:String,
    password:String,
    token:String
})

const LoginModel=mongoose.model("Login",LoginSchema);
export default LoginModel;