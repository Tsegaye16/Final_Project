import React from 'react'
import { useNavigate } from 'react-router-dom';
import "./user.scss"
function User() {
  const navigate = useNavigate()
  const handlePrifle = () => {
   
    navigate('/student/profile');
  };
  return (
    <div className='user-section'>
      <div className='logout' >logout</div>
      <div className='profile' onClick={handlePrifle}>Profile</div>

    </div>
  )
}

export default User