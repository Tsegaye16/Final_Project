import React from 'react'
import "./NavBar.css"
import tsegaye from "../../assets/Tsegaye.jpg"
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useState, useEffect } from 'react'


export default function NavBar() {
  const navigate = useNavigate();

  const handleDelete = () => {
    axios.get("http://localhost:8080/logout")
      .then(res => {
        navigate("/"); // Redirect to the "/" page
      })
      .catch(err => console.log(err));
  };
  
  return (
    <div className='main-navbar' >
      <div className='navbar-container' >
        <div className='logo' >
          <h1>Logo</h1>
        </div>
        <div className='button-container'>
          <button>About</button>
          <button>Contact</button>
          <button onClick={handleDelete} >Logout</button>
          <div className='user' >
            <img src={tsegaye} alt={tsegaye}/>
            <span>Tsegaye</span>
            </div>
        </div>

      </div>

      
        
    </div>
  )
}
