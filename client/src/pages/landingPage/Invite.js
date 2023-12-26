import React, { useEffect, useState } from 'react';
import { animateScroll, Link as ScrollLink } from 'react-scroll';
import { Link } from 'react-router-dom';
import './invite.scss';

//import { faTwitter } from '@fortawesome/free-brands-svg-icons';
//import { faGithub, faLinkedin, faTwitter } from '@fortawesome/free-solid-svg-icons';

import NavBar from '../../components/navBar/NavBar';
import welcome from "../../assets/welcome.avif"

import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

import { ContactUs } from '../../popup/contact/contact';
//import {  toast } from 'react-toastify';
import Team from '../../popup/team/team';
import { data } from './data';



const Invite = () => {
 
 
  
  const handleStartClick = () => {
    window.location.href = '/login';
  };

  const scrollToFeature = () => {
    animateScroll.scrollTo(document.getElementById('feature').offsetTop, {
      duration: 500,
      smooth: 'easeInOutQuad',
    });
  };

  const isUser = false;
  const popup = false;

  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 2000,
    cssEase: "linear"
  };
  return (
    <div className="invite-main">
      <div className='header'>
       
        <NavBar isUser={isUser} popup = {popup}/>
      </div>
     <div className='body-container'>     
      <div className='body'>
        <div id='home' className="home">
          <div className='left'>
            <div className='moto'>
              Unlock the Power of Algorithms with Real-time Visualization!
          </div>
          <div className='expression'>
            <span>
            Immerse yourself in the fascinating world of data structures and algorithms through our cutting-edge visualizer. Whether you're a student, developer, or tech enthusiast, our platform provides an engaging and hands-on experience to understand the intricacies of algorithms.
            </span>
            <button onClick={handleStartClick}>Start</button>
          </div>          
          </div>
          <div className='right'>
            <img src={welcome}/>
          </div>
        </div>
        <div id="feature" className='feature'>
        <Slider {...settings}>
          {data.map((datas)=>(
            <div className='feature-list' key={datas.feature}>
            <span>{datas.feature}</span>
            <p>{datas.description}</p>
            <img src={datas.image} alt='coverage'/>
          </div>
          ))}                 
             </Slider>              
        </div>
        <div className='about' id='about'>About</div>
        <div className='team' id='team'>
          <div className='team-list'>
            <Team/>
          </div>
        </div>
        <div className='contact' id='contact'>
          <span>Contact me at</span>
          <ContactUs/>
        </div>
       </div>
      </div>
      <div className='footer'>
        footer
      </div>
      
    </div>
  );
};

export default Invite;
