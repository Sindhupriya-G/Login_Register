import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {toast,ToastContainer} from 'react-toastify'

function Login() {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    axios.defaults.withCredentials=true;
    const handleSubmit = (e) => {
        e.preventDefault();
        setError(''); // Clear previous errors
        axios.post(`${process.env.REACT_APP_BACKEND_URL}/login`, { name, password })
            .then(result => {
                console.log(result);
                if (result.data === "Login successful") {
                    navigate('/Home'); // Successful login
                    toast.success('login success')
                } else if (result.data === "Password is incorrect") {
                    setError(result.data.message); // Password is incorrect
                    toast.dark('password is incorrect')
                    navigate('/login');
                }
                else{
                      toast.dark('You did not register,register here!')
                      setError("Login failed")
                      navigate('/register')
                    }
                } 
            )
            .catch(err => {
                console.log(err);
                setError('Login failed. Please try again.');
            });
    };

    return (
        <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
            <div className="bg-white p-3 rounded w-25">
                <h2 className='text-center'>Login</h2>
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
                    <button type="submit" className="btn btn-success w-100 rounded-0">Login</button>
                    <p>Don't Have an Account?</p>
                    <br></br>
                    <Link to='/forgot-password'>Forgot password?</Link>
                    <Link to={'/register'}>
                        <button className="btn btn-default border w-100 bg-light rounded-0 text-decoration-none">Register</button>
                    </Link>
                </form>
            </div>
        </div>
    );
}

export default Login;
