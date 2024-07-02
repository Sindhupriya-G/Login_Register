import React, { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';


function ResetPw() {
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const {id,token}=useParams();
    const handleSubmit=(e)=>{
        e.preventDefault()
        axios.post(`${process.env.REACT_APP_BACKEND_URL}/reset-password/${id}/${token}`,{password})
        .then(res=>{
            if(res.data.Status === "success"){
                navigate('/login')
            }
        }).catch(err=>console.log(err))
    }
    

    return (
        <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
            <div className="bg-white p-3 rounded w-25">
                <h2 className='text-center'>Reset password</h2>
    
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="email"><strong>Enter New password</strong></label>
                        <input
                            type="password"
                            placeholder="Enter password"
                            autoComplete='off'
                            name='password'
                            className="form-control rounded-0"
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                        />
                    </div>
                   
                    <button type="submit" className="btn btn-success w-100 rounded-0">Update</button>
    
                    
                </form>
            </div>
        </div>
    );
}

export default ResetPw;
