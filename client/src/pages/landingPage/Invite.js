import React, { useEffect, useState } from 'react';
import { animateScroll, Link as ScrollLink } from 'react-scroll';
import { Link } from 'react-router-dom';
import './invite.scss';
//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
//import { faGithub, faLinkedin, faTwitter,faEnvelope } from '@fortawesome/free-brands-svg-icons';
//import { faGithub, faLinkedin, faTwitter } from '@fortawesome/free-solid-svg-icons';
import tsegaye from '../../assets/Tsegaye.jpg';
import NavBar from '../../components/navBar/NavBar';
import welcome from "../../assets/welcome.avif"
import visualization from "../../assets/visualization.png"
import coverage from "../../assets/coverage.jpg"
import module from "../../assets/module.jfif"
import enjoy from "../../assets/enjoy.avif"
import senario from "../../assets/senario.gif"
import friendly from "../../assets/user-friendly-interface.png"




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

  return (
    <div className="invite-main">
      <div className='header'>
       
        <NavBar isUser={isUser}/>
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
          
          <div className='feature-list'>
              <span>Real-time Visualization</span>
              <p>Experience the power of Real-time Visualization, where complex algorithms come to life before your eyes. Our interactive platform provides a dynamic and immersive journey, allowing you to witness the inner workings of algorithms as they unfold in real-time. Gain a deeper understanding of data structures and algorithms through visually engaging simulations, making learning a captivating and hands-on experience.</p>
              <img src={visualization} alt='Visually'/>
          </div>          
          <div className='feature-list'>
            <span>Comprehensive Algorithm Coverage</span>
            <p>Dive into a comprehensive exploration of algorithms that power the digital world. Our platform offers an extensive range of algorithmic concepts, ensuring a thorough understanding from the fundamentals to advanced topics. Whether you're a beginner or an experienced developer, our curated content caters to all skill levels, making learning algorithms accessible and engaging.</p>
            <img src={coverage} alt='coverage'/>
          </div>          
          <div className='feature-list'>
            <span>Interactive Learning Modules</span>  
            <p>Engage with our Interactive Learning Modules, designed to make learning data structures and algorithms both informative and enjoyable. Dive into hands-on exercises, visually explore complex concepts, and enhance your problem-solving skills in a dynamic and user-friendly environment. Whether you're a beginner or an experienced developer, our modules offer a personalized and interactive learning experience to suit your pace and level of expertise.</p>
            <img src={module} alt='module'/>
          </div>          
          <div className='feature-list'>
            <span>Customizable Scenarios</span>  
            <p>Explore the versatility of our platform with the Customizable Scenarios feature. Tailor your learning experience by adjusting parameters, inputs, and conditions. Dive deep into algorithmic concepts, testing and observing their behavior under various scenarios. Whether you're a beginner or an experienced developer, this interactive feature empowers you to personalize your journey and gain a nuanced understanding of algorithms in action.</p>
            <img src={senario} alt='Senario'/>

          </div>          
          <div className='feature-list'>
            <span>User-Friendly Interface</span>  
            <p>
            Experience seamless navigation and a streamlined journey through our platform's intuitive user-friendly interface. Our design focuses on simplicity, ensuring that users of all levels can effortlessly explore and engage with the power of data structures and algorithms. Enjoy a visually appealing and responsive interface that enhances your learning experience, making it accessible and enjoyable from the very first click.
            </p>
            <img src={friendly} alt='User Friend'/>
          </div>        
               
                  
                 
        </div>
        <div className='about' id='about'>About</div>
        <div className='team' id='team'>
          <div className='team-list'>
          <div className='introductory'>
            <span>The team behind the project</span>
          </div>
          <div className='photo'>
            <img src={tsegaye}/>
            <span>Tsegaye Abewa</span>
            <p>Backe-end Engineer</p>
          </div>
          <div className='story'>
            <span>👋, I'm Tsegaye</span> 
            <p>
            fourth-year Information Systems student with a deep passion for problem-solving and software development. Currently on the exciting journey of a 12-month software engineering program at ALX and delving into the world of Applied Data Science with a three-month stint at WorldQuant University. My obsession with technology fuels my desire to contribute to innovative solutions and embrace the ever-evolving landscape of software development. Let's connect and explore the endless possibilities in the realm of tech!
            </p>
            </div>
          <div className='social-media'>
          {/* <a href="https://github.com/your-github" target="_blank" rel="noopener noreferrer">
        <FontAwesomeIcon icon={faGithub} size="2x" />
      </a>
      <a href="https://linkedin.com/in/your-linkedin" target="_blank" rel="noopener noreferrer">
        <FontAwesomeIcon icon={faLinkedin} size="2x" />
      </a>
      <a href="https://twitter.com/your-twitter" target="_blank" rel="noopener noreferrer">
        <FontAwesomeIcon icon={faTwitter} size="2x" />
      </a> */}
      {/* <a href="mailto:your.email@example.com">
        <FontAwesomeIcon icon={faEnvelope} size="2x" />
      </a> */}
          </div>
        </div>
        </div>
        <div className='contact' id='contact'>Contact</div>
       </div>
      </div>
      <div className='footer'>
        footer
      </div>
      
    </div>
  );
};

export default Invite;
