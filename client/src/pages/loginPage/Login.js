import React from 'react'
import "./Login.css"
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useState } from 'react'

function Login() {
  const [values,setValues] = useState({
  
    email:"",
    password:""
  })

  const navigate = useNavigate()
  axios.defaults.withCredentials = true

  function handleSubmit(event){
    event.preventDefault()
    axios.post("http://localhost:8080/login", values)
    .then(res=>{
      if(res.data.Status ==="Success"){
        navigate("/home")
      }else{
        alert("Error")
        navigate("/login")
      }
    })
    .then(err=>console.log(err))
    navigate("/login")
    
  }

  return (
    <div className="login">
    <div className="login-container">
      <h1>Login</h1>
      <form onSubmit={handleSubmit} >
      <div className="form-group">
        <label>Email:</label>
        <input onChange={event=>setValues({...values, email:event.target.value})} type="email" name='email'/>
      </div>
      <div className="form-group">
        <label>Password:</label>
        <input onChange={event=>setValues({...values, password:event.target.value})}type="password" name='password'/>
      </div>
      <button>Login</button>
      <p>Don't have an account? <a href="/register">Sign up</a></p>
      </form>
    </div>
  </div>
  );
}

export default Login
