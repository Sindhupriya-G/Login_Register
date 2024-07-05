/*import express from 'express'
import { config } from 'dotenv'
import cors from 'cors'
import cookieParser from 'cookie-parser';
import connectDB from './dbconnection.js';
import route from './routes/route.js'
import path from 'path'

const app=express();
app.use(express.json());
config();
// app.use(cors())
// Enable CORS for all routes
app.use(cors({
    // origin: 'http://localhost:3000',  // Allow only your frontend application
    origin: 'https://login-register-app-lhw5.onrender.com/',  // Allow only your frontend application

    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// Middleware setup
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(route)

// // Add root route
// app.get('/', (req, res) => {
//   res.send('Hello, World!');
// });

// Serve static files from the build directory
app.use(express.static(path.join(path.resolve(),'client', 'build')));

// Handle unknown routes and serve index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(path.resolve(),'client', 'build', 'index.html'));
});

const PORT=process.env.PORT || 4500;
connectDB().then(()=>{
    const server=app.listen(PORT,()=>{
        console.log(`server is running on port ${PORT}`);
    });
});*/

import express from 'express';
import { config } from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import connectDB from './dbconnection.js';
import route from './routes/route.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();
app.use(express.json());
config();

// Enable CORS for requests coming from your frontend during development
app.use(cors({
  origin: function (origin, callback) {
      console.log('Request origin:', origin); // Log the origin
      // Allow requests from localhost:3000 and your deployment URL
      // const allowedOrigins = ['http://localhost:3000', 'https://login-register-app-lhw5.onrender.com'];
      const allowedOrigins = 'http://localhost:3000';

      if (!origin || allowedOrigins.includes(origin)) {
          callback(null, true);
      } else {
          callback(new Error('Not allowed by CORS'));
      }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,  // Required if you're using cookies or sessions
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Middleware setup
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(route);

// Serve static files from the build directory
app.use(express.static(path.join(__dirname, 'client', 'build')));

// Handle unknown routes and serve index.html
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
});

const PORT = process.env.PORT || 4500;

connectDB().then(() => {
    const server = app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
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
