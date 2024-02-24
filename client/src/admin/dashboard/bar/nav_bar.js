import React from 'react';
import { useNavigate } from 'react-router-dom';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { SidebarData } from './data';
import './nav_bar.css';
import { IconContext } from 'react-icons';
import tsegaye from '../../../assets/Tsegaye.jpg';
import UserPopup from '../../../popup/user/userPopup';

export default function AdminNavbar({ toggleSidebar, sidebarWidth, image, username }) {
    let navigate = useNavigate()
    const handleProfile = ()=>{
        navigate("/admin/profile")
    }
    
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
          <div className='instructor-title'>Admin Page</div>
          <div className='botom-list'>
          <button className='lg-btnn'>Logout</button>
          <div className='user' onClick={handleProfile} >
            
            <img src={image} alt='Tsegaye' />
            <span>{username}</span>
            
          </div>
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