import React from 'react'
import "./Login.css"
import NavBar from '../../components/navBar/NavBar'
import Google from "../../assets/google.png"
import Facebook from "../../assets/facebook.png"
import Github from "../../assets/github.png"

function Login() {
  return (
    <div>
        
        <div className='login' >
        <h1 className='loginTitle' >Choose a Login Method</h1> 
        <div className='wrapper' >
        
          <div className='left' >
            <div className='loginButton google' >
              <img src={Google} className='icon' />
              Google
            </div>

            <div className='loginButton facebook' >
            <img src={Facebook} className='icon' />
              Facebook
            </div>

            <div className='loginButton github' >
              <img src={Github} className='icon' />
              Github
            </div>

          </div>
          <div className='center' >
         
            <div className='line' />
            <div className='or' >OR</div>
          </div>
          <div className='right' >
            <input type='text' placeholder='Username' />
            <input type='password' placeholder='Password' />
            
            <button className='submit'>Login</button>
          </div>
        </div>
        </div>
    </div>
  )
}
export default Login
