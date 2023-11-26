import React from 'react'; 
import { Link as ScrollLink, animateScroll as scroll } from 'react-scroll';
import {Link, useNavigate } from 'react-router-dom';
import './NavBar.scss';
import tsegaye from '../../assets/Tsegaye.jpg';
const NavBar = ({isUser}) => {
  const navigate = useNavigate();

  const handleLogout = () => {
   
    navigate('/login');
  };
  

  return (
    <div className="invite-main">
    <div className='header'>
        <div className='logo' ><h1>Logo</h1></div>
        <div className='button-list'>
        <ScrollLink to="home" smooth={true} duration={900} className='button'>
            <button>Home</button>
          </ScrollLink>
          <ScrollLink to="feature" smooth={true} duration={900} className='button'>
            <button>Feature</button>
          </ScrollLink>
          <ScrollLink to="about" smooth={true} duration={900} className='button'>
            <button>About</button>
          </ScrollLink>
          <ScrollLink to="team" smooth={true} duration={900} className='button'>
            <button>Team</button>
          </ScrollLink>
          <ScrollLink to="contact" smooth={true} duration={900} className='button'>
            <button>Contact</button>
          </ScrollLink>
          {!isUser && 
          <>
          <Link to={"/register"} className='button'>
          <button>Signup</button>
          </Link>
          <Link to={"/login"} className='button'>
          <button>Login</button>
          </Link>
          </>
          }
          
          {isUser && <div className='user'>
            <img src={tsegaye} alt='Tsegaye' />
            <span>Tsegaye</span>
          </div>}
          
        </div>
      </div>
      </div>
  );
};

export default NavBar;


