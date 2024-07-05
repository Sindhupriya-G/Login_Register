import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify'

function Signup() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post(`${process.env.REACT_APP_BACKEND_URL}/register`, { name, email, password })
            .then(result => {
                console.log(result);
                if(result.data === "User already exists"){
                    toast.success('you already registered,Login here!')
                     navigate('/login');

                }
                else{
                     navigate('/register')
                     toast.success("Registered successfully")
                }
            })
            .catch(err => {
                console.log(err);
                setError('Registration failed. Please try again.');
            });
    };

    return (
        <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
            <div className="bg-white p-3 rounded w-25">
                <h2 className='text-center'>Register</h2>
                {error && <div className="alert alert-danger">{error}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="name"><strong>Enter your Name</strong></label>
                        <input
                            type="text"
                            placeholder="Enter name"
                            autoComplete='off'
                            name='name'
                            className="form-control rounded-0"
                            onChange={(e) => setName(e.target.value)}
                            value={name}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email"><strong>Enter Email address</strong></label>
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
                    <div className="mb-3">
                        <label htmlFor="password"><strong>Enter your password</strong></label>
                        <input
                            type="password"
                            placeholder="Enter Password"
                            autoComplete='off'
                            name='password'
                            className="form-control rounded-0"
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                        />
                    </div>
                    <button type="submit" className="btn btn-success w-100 rounded-0">Register</button>
                    <p>Already Have an Account?</p>
                    <Link to={'/login'}>
                        <button className="btn btn-default border w-100 bg-light rounded-0 text-decoration-none">Login</button>
                    </Link>
                </form>
            </div>
        </div>
    );
}

export default Signup;