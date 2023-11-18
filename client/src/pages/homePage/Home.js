import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './Home.css';
import NavBar from '../../components/navBar/NavBar';
import LeftBar from '../../components/leftBar/leftBar';
import Stack from '../../DSA/stack/stack';

function Home() {
  return (
    <div className='main-home'>
      
        <div>
          <div className='NavBar'>
            <NavBar />
          </div>
          <div className='main-body'>
            <div className='left-bar'>
              <LeftBar />
            </div>
            <div className='main-body-part'>
              
                <Stack />
                {/* Add more routes as needed */}
              
            </div>
          </div>
        </div>
      
    </div>
  );
}

export default Home;
