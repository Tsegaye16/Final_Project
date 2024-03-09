import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { SidebarData } from './sidebar_data';
import './nav_bar.css';
import { IconContext } from 'react-icons';
//import tsegaye from '../../../assets/Tsegaye.jpg';
import defaults from "../../../assets/default.png"

export default function Nav_bar({ toggleSidebar, sidebarWidth,userData }) {
  const handleLogout = () => {
    // Remove the token from local storage
    localStorage.removeItem('accessToken');
    // Redirect to the login page (or any other appropriate action)
   // window.location.reload()
    window.location.href = '/login';
  };
  const image = userData && userData.length > 0 ? `http://localhost:8800/${userData[0].image}` : `${defaults}`;
  const userName = userData?.length > 0 ? userData[0].username : '';



  return (
    <>
      <IconContext.Provider value={{ color: '#fff' }}>
        <div className='navbar' >
          {sidebarWidth === 0 ? (
            <Link to='#' className='menu-bars' onClick={toggleSidebar}>
              <FaIcons.FaBars />
            </Link>
          ) : (
            <Link to='#' className='menu-bars' onClick={toggleSidebar}>
              <FaIcons.FaTimes />
            </Link>
          )}
          
          <div className='user' >
            
            <button onClick={handleLogout} className='logout'>Logout</button>
            <img src={image} alt='Tsegaye' />
            <span>{userName}</span>
            
          </div>
        </div>
        <nav className={sidebarWidth !== 0 ? 'nav-menu active' : 'nav-menu'} >
          <ul className='nav-menu-items'>
            
            {SidebarData.map((item, index) => (
              <li key={index} className={item.cName}>
                <Link to={item.path}>
                  {item.icon}
                  <span>{item.title}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </IconContext.Provider>
    </>
  );
}