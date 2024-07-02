import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import Signup from './components/Signup';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Login from './components/Login';
import Home from './components/Home';
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import ForgotPw from './components/ForgotPw';
import ResetPw from './components/ResetPw';

function App() {
  return (
    
      <BrowserRouter>
      <ToastContainer  theme='light' position='top-center'/>
      <Routes>
        <Route path='/register' element={<Signup />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/Home' element={<Home />}></Route>
        <Route path='/forgot-password' element={<ForgotPw />}></Route>
        <Route path='/reset-password/:id/:token' element={<ResetPw />} ></Route>
      </Routes>
      </BrowserRouter>
  )
}

export default App