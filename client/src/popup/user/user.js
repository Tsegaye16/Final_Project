import React from 'react'
import { useNavigate } from 'react-router-dom';
import "./user.scss"
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
function User({role_name}) {
  const navigate = useNavigate()
  const handlePrifle = () => {
   
    navigate(`/${role_name}/profile`);
  };
  //Logout functionality
 
  const handleLogout = () => {
    // Remove the token from local storage
    localStorage.removeItem('accessToken');
    // Redirect to the login page (or any other appropriate action)
   // window.location.reload()
    window.location.href = '/login';
  };
  return (
    <div className='user-section'>
      <div className='logout'  onClick={handleLogout}>logout</div>
      <div className='profile' onClick={handlePrifle}>Profile</div>

    </div>
  )
}

export default User