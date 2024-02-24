import React from 'react'
import { useNavigate } from 'react-router-dom';
import "./user.scss"
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
function User() {
  const navigate = useNavigate()
  const handlePrifle = () => {
   
    navigate('/student/profile');
  };
  //Logout functionality
 
  const handleLogout = async () => {
   

      // Clear client-side authentication data
      // For example, remove tokens from local storage
      localStorage.removeItem('accessToken');

      // Redirect to the login page or another page
      toast.success('Logout successful');
      navigate('/login');
    
  };
  return (
    <div className='user-section'>
      <div className='logout'  onClick={handleLogout}>logout</div>
      <div className='profile' onClick={handlePrifle}>Profile</div>

    </div>
  )
}

export default User