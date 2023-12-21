import React,{useState} from 'react'; 
import { Link as ScrollLink, animateScroll as scroll } from 'react-scroll';
import {Link, useNavigate } from 'react-router-dom';
import './NavBar.scss';
import tsegaye from '../../assets/Tsegaye.jpg';
import Popup from './popUp';
import  {ContactUs}  from '../../pages/landingPage/contact';
import Team from '../../popup/team/team';

const NavBar = ({isUser,popup}) => {
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);
  const [popupContent, setPopupContent] = useState(null);
 
  const handleLogout = () => {
   
    navigate('/login');
  };


  const togglePopup = (content) => {
    console.log('Content to be displayed:', content);
    setPopupContent(content);
    setShowPopup(!showPopup);
  };
 

  return (
    <div className="invite-main">
    <div className='header'>
        <div className='logo' >Data Structure And Algorithm(DSA)</div>
        <div className='button-list'>
        {isUser && 
        <>
        <button>Home</button>
          
          
        <button>Feature</button>
      
      
        <button>About</button>
      
      
      
        <button onClick={() => togglePopup(<Team />)}>Team</button>
      
        <button onClick={() => togglePopup(<ContactUs />)}>Contact</button>
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


