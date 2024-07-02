import express from 'express'
import { config } from 'dotenv'
import cors from 'cors'
import cookieParser from 'cookie-parser';
import connectDB from './dbconnection.js';
import route from './routes/route.js'

const app=express();
app.use(express.json());
config();
// app.use(cors())
// Enable CORS for all routes
app.use(cors({
    origin: 'http://localhost:3000',  // Allow only your frontend application
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// Middleware setup
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(route)

// Add root route
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

const PORT=process.env.PORT || 4500;
connectDB().then(()=>{
    const server=app.listen(PORT,()=>{
        console.log(`server is running on port ${PORT}`);
    });
});



/*import nodemailer from 'nodemailer';

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'sindhuganesh2002@gmail.com',
    pass: 'uuda bqea blty mkgr'
  }
});

var mailOptions = {
  from: 'sindhuganesh2002@gmail.com',
  to: 'priyasindhu2211@gmail.com',
  subject: 'anonymous',
  text: 'good afternoon!'
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});*/
