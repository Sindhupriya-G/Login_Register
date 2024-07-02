import React, { useEffect } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate=useNavigate();
  axios.defaults.withCredentials=true;
  useEffect(()=>{
    axios.get('http://localhost:4000/home')
    .then(result => {console.log(result);
        if(result.data !== "success"){
             navigate('/login');
            }
    })
    .catch(err=>console.log(err))
  },[])
  return (
    <div>Home</div>
  )
}

export default Home