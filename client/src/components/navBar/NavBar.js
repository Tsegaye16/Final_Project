import React,{useState} from 'react'; 
import { Link as ScrollLink, animateScroll as scroll } from 'react-scroll';
import {Link, useNavigate } from 'react-router-dom';
import './NavBar.scss';
import tsegaye from '../../assets/Tsegaye.jpg';
import Teampopup from '../../popup/team/TeamPopUp';
import Contactopup from "../../popup/contact/ContactPopup"
import FeaturePopup from '../../popup/feature/featurePopup';
import UserPopup from '../../popup/user/userPopup';
import { FaBars, FaTimes } from 'react-icons/fa';

const NavBar = ({isUser, icon, toggleSidebar}) => {
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
    <div className='logo'  >
  {isUser && (icon === 'bars' ? <FaBars className='icon' onClick={toggleSidebar}/> : <FaTimes  className='icon' onClick={toggleSidebar}/>)}
</div>
        <div className='button-list'>
          {isUser && 
            <>
          <div className='button' onClick={handleHome}>
            <button className='nav-button'>Home</button>
          </div>
        {/* <ScrollLink to="home" smooth={true} duration={900} className='button'>
            <button>Home</button>
          </ScrollLink> */}
         
          <div className='button'>
            <button onClick={toggleFeaturePopup} className='nav-button'>Feature</button>
          </div>
          
          <div className='button'>
            <button className='nav-button'>About</button>
          </div>
          <div className='button' >
            <button onClick={toggleTeamPopup} className='nav-button'>Team</button>
          </div>
          <div className='button'>
            <button onClick={toggleContactPopup} className='nav-button'>Contact</button>
          </div>
            </>
          }
          
          {!isUser && 
          <>
          <Link to={"/register"} className='button'>
          <button className='nav-button'>Signup</button>
          </Link>
          <Link to={"/login"} className='button'>
          <button className='nav-button'>Login</button>
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