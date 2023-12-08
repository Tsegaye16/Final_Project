import React,{useState} from 'react'; 
import { Link as ScrollLink, animateScroll as scroll } from 'react-scroll';
import {Link, useNavigate } from 'react-router-dom';
import './NavBar.scss';
import tsegaye from '../../assets/Tsegaye.jpg';
import Popup from './popUp';

const NavBar = ({isUser,popup}) => {
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);
 
  const handleLogout = () => {
   
    navigate('/login');
  };


  const togglePopup = () => {
    setShowPopup(!showPopup);
  };
 

  return (
    <div className="invite-main">
    <div className='header'>
        <div className='logo' ><h1>DSA</h1></div>
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
            <button onClick={() => { if (popup) togglePopup(); }}>Team</button>
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
          
          {isUser && 
         
          <div className='user' >
            <img src={tsegaye} alt='Tsegaye' />
            <span>Tsegaye</span>
            
          </div>
          
          }
           
        </div>
        <Popup show={showPopup} handleClose={togglePopup}>
        {/* Content you want to display in the popup */}
        
      </Popup>
      </div>
      </div>
  );
};

export default NavBar;


