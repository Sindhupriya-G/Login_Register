import express from 'express'
import { signUp,login,verifyUSer,home, forgetPw, resetPw } from "../controllers/controller.js";


const route=express.Router()

route.post('/register',signUp)
route.post('/login',login)
route.get('/home',verifyUSer,home)
route.post('/forgot-password',forgetPw)
route.post('/reset-password/:id/:token',resetPw)
export default route;
