import React,{useState} from 'react'; 
import { Link as ScrollLink, animateScroll as scroll } from 'react-scroll';
import {Link, useNavigate } from 'react-router-dom';
import './NavBar.scss';
import tsegaye from '../../assets/Tsegaye.jpg';
import Popup from '../../popup/team/TeamPopUp';

const NavBar = ({isUser,popup}) => {
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);
 
  const handleLogout = () => {
   
    navigate('/login');
  };


  const togglePopup = () => {
    setShowPopup(!showPopup);
  };
  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    window.scrollTo({
      top: section.offsetTop,
      behavior: 'smooth',
    });
  };

  return (
    <div className="invite-main">
    <div className='header'>
        <div className='logo' ><h1>DSA</h1></div>
        <div className='button-list'>
          {isUser && 
            <>
              <div className='button'>
            <button>Home</button>
          </div>
        {/* <ScrollLink to="home" smooth={true} duration={900} className='button'>
            <button>Home</button>
          </ScrollLink> */}
         
          <div className='button'>
            <button>Feature</button>
          </div>
          
          <div className='button'>
            <button >About</button>
          </div>
          <div className='button' >
            <button onClick={() => { if (popup) togglePopup(); }}>Team</button>
          </div>
          <div className='button'>
            <button>Contact</button>
          </div>
            </>
          }
          
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


