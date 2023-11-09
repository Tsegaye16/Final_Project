import React, { useState } from 'react'
import {useNavigate} from "react-router-dom"
import "./Register.css"
import axios from "axios"

function Register() {
  const [values,setValues] = useState({
    name:"",
    email:"",
    username:"",
    password:""
  })

  const navigate = useNavigate()

  function handleSubmit(event){
    event.preventDefault()
    axios.post("http://localhost:8080/register", values)
    .then(res=>{
      if(res.data.Status ==="Success"){
        navigate("/login")
      }else{
        alert("Error")
      }
    })
    .then(err=>console.log(err))
    
  }

  return (
    <div className='main' >
    <div className="register-container">
    <h2>Register</h2>
    <form onSubmit={handleSubmit} >
      <div className="form-group">
        <label htmlFor="name">Name:</label>
        <input onChange={event=>setValues({...values, name:event.target.value})} type="text" id="name" name="name" required/>
      </div>

      <div className="form-group">
        <label htmlFor="email">Email:</label>
        <input onChange={event=>setValues({...values, email:event.target.value})}  type="email" id="email" name="email" required/>
      </div>

      <div className="form-group">
        <label htmlFor="username">Username:</label>
        <input onChange={event=>setValues({...values, username:event.target.value})}  type="text" id="username" name="username" required/>
      </div>

      <div className="form-group">
        <label htmlFor="password">Password:</label>
        <input  onChange={event=>setValues({...values, password:event.target.value})}  type="password" id="password" name="password" required/>
      </div>

      <button type="submit">Submit</button>
    </form>

    <p>
      Already have an account? <a href="/login">Login</a>
    </p>
  </div>
  </div>
  )
}

export default Register