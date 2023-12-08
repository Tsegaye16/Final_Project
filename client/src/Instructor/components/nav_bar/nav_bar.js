import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { SidebarData } from './sidebar_data';
import './nav_bar.css';
import { IconContext } from 'react-icons';

export default function Nav_bar({ toggleSidebar, sidebarWidth }) {
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
        </div>
        <nav className={sidebarWidth !== 0 ? 'nav-menu active' : 'nav-menu'} >
          <ul className='nav-menu-items'>
            <li className='navbar-toggle'>
              <Link to='#' className='menu-bars' onClick={toggleSidebar}>
                <AiIcons.AiOutlineClose />
              </Link>
            </li>
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
