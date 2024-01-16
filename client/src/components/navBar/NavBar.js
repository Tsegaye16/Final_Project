import React,{useState} from 'react'; 
import { Link as ScrollLink, animateScroll as scroll } from 'react-scroll';
import {Link, useNavigate } from 'react-router-dom';
import './NavBar.scss';
import tsegaye from '../../assets/Tsegaye.jpg';
import Teampopup from '../../popup/team/TeamPopUp';
import Contactopup from "../../popup/contact/ContactPopup"
import FeaturePopup from '../../popup/feature/featurePopup';
import UserPopup from '../../popup/user/userPopup';

const NavBar = ({isUser}) => {
  const navigate = useNavigate();
  const [showTeamPopup, setShowTeamPopup] = useState(false);
  const [showContactPopup, setShowContactPopup] = useState(false);
  const [showFeaturePopup, setShowFeaturePopup] = useState(false)
  const [showUserPopup, setShowUserPopup] = useState(false)
 
  const handleHome = () => {
   
    navigate('/');
  };


  const toggleTeamPopup = () => {
    setShowTeamPopup(!showTeamPopup);
  };
  const toggleUserPopup = () => {
    setShowUserPopup(!showUserPopup);
  };

  const toggleContactPopup = () => {
    setShowContactPopup(!showContactPopup);
  };
  const toggleFeaturePopup = () => {
    setShowFeaturePopup(!showFeaturePopup)
  }
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
              <div className='button' onClick={handleHome}>
            <button>Home</button>
          </div>
        {/* <ScrollLink to="home" smooth={true} duration={900} className='button'>
            <button>Home</button>
          </ScrollLink> */}
         
          <div className='button'>
            <button onClick={toggleFeaturePopup}>Feature</button>
          </div>
          
          <div className='button'>
            <button >About</button>
          </div>
          <div className='button' >
            <button onClick={toggleTeamPopup}>Team</button>
          </div>
          <div className='button'>
            <button onClick={toggleContactPopup}>Contact</button>
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
         
          <div className='user' onClick={toggleUserPopup}>
            <img src={tsegaye} alt='Tsegaye' />
            <span>Tsegaye</span>
            
          </div>
          
          }
           
        </div>
        <Teampopup show={showTeamPopup} handleClose={toggleTeamPopup}>
          {/* Content you want to display in the Team popup */}
        </Teampopup>
        <Contactopup show={showContactPopup} handleClose={toggleContactPopup}>
          {/* Content you want to display in the Contact popup */}
        </Contactopup>
        <FeaturePopup show={showFeaturePopup} handleClose={toggleFeaturePopup}>

        </FeaturePopup>

        <UserPopup show={showUserPopup} handleClose={toggleUserPopup}>

        </UserPopup>
      </div>
      </div>
  );
};

export default NavBar;