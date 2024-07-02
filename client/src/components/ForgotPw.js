import React, { useState } from 'react';
import {  useNavigate } from 'react-router-dom';
import axios from 'axios';


function ForgotPw() {
    const [email, setEmail] = useState('');
    const navigate = useNavigate();
    
    const handleSubmit=(e)=>{
        e.preventDefault()
        console.log('sending email:',email);
        axios.post(`${process.env.REACT_APP_BACKEND_URL}/forgot-password`,{email})
        .then(res=>{
            console.log('response:',res.data);
            if(res.data.Status === "success"){
                navigate('/login')
            }
        }).catch(err=>console.log(err))
    }
    

    return (
        <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
            <div className="bg-white p-3 rounded w-25">
                <h2 className='text-center'>Forgot password</h2>
    
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="email"><strong>Enter your Mail</strong></label>
                        <input
                            type="email"
                            placeholder="Enter email"
                            autoComplete='off'
                            name='email'
                            className="form-control rounded-0"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                        />
                    </div>
                   
                    <button type="submit" className="btn btn-success w-100 rounded-0">Send</button>
    
                    
                </form>
            </div>
        </div>
    );
}

export default ForgotPw;
