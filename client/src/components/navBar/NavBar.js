import React from 'react'
import "./NavBar.css"
import {Link} from "react-router-dom"
import Tsegaye from "../../assets/Tsegaye.jpg"
export default function NavBar() {
  return (
    <div className='main-container' >
        <div className='wraper'>
            <Link to={"/"} >Home</Link>
            <Link to={"/about"} >About</Link>
            <Link to={"/contact"} >Contact</Link>
            <Link to={"/signup"} >SignUp</Link>
            <Link to={"/login"} >Login</Link>   
            <Link to={"/profile"}>
            <div className='user' >
              <img src={Tsegaye} alt="user"/>  
              <span>Tsegaye</span>
            </div> 
            </Link>    
        </div>
    </div>
  )
}
