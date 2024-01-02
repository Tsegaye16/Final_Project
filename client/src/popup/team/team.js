import React from 'react'
import "./team.scss"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedin, faTwitter } from '@fortawesome/free-brands-svg-icons';
import tsegaye from '../../assets/Tsegaye.jpg';

function Team() {
  return (
    <div className='container'>
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
            fourth-year Information Systems student 
            with a deep passion for problem-solving 
            and software development. Currently on the
             exciting journey of a 12-month software engineering
              program at ALX and delving into the world of Applied 
              Data Science with a three-month stint at WorldQuant 
              University. My obsession with technology fuels my desire 
              to contribute to innovative solutions and embrace the 
              ever-evolving landscape of software development. Let's 
              connect and explore the endless possibilities in the 
              realm of tech!
            </p>
            </div>
          <div className='social-media'>
            <div className='link'>
          <a href="https://github.com/your-github" target="_blank" rel="noopener noreferrer">
        <FontAwesomeIcon icon={faGithub} size="2x" />
      </a>
      <a href="https://linkedin.com/in/your-linkedin" target="_blank" rel="noopener noreferrer">
        <FontAwesomeIcon icon={faLinkedin} size="2x" />
      </a>
      <a href="https://twitter.com/your-twitter" target="_blank" rel="noopener noreferrer">
        <FontAwesomeIcon icon={faTwitter} size="2x" />
      </a> 
      </div>
          </div>
        </div>
        </div>
        </div>
  )
}

export default Team