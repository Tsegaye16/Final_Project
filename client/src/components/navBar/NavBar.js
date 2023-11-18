import React from 'react';

import { useNavigate } from 'react-router-dom';

import './NavBar.css';
import tsegaye from '../../assets/Tsegaye.jpg';

const NavBar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear user authentication details from state or context

    // Redirect to the login page or perform any other action
    navigate('/login');
  };

  return (
    <div className='main-navbar'>
      <div className='navbar-container'>
        <div className='logo'>
          <h1>Logo</h1>
        </div>
        <div className='button-container'>
          <button>About</button>
          <button>Contact</button>
          <button onClick={handleLogout}>Logout</button>
          <div className='user'>
            <img src={tsegaye} alt='Tsegaye' />
            <span>Tsegaye</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;


