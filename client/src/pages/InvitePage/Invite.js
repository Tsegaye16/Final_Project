import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './invite.scss';
import unlock from '../../assets/unlock.png';
import add_1 from '../../assets/queues/add_1.jpg';
import add_2 from '../../assets/queues/add_2.jpg';
import add_3 from '../../assets/queues/add_3.jpg';
import add_4 from '../../assets/queues/add_4.jpg';
import add_5 from '../../assets/queues/add_5.jpg';
import add_6 from '../../assets/queues/add_6.jpg';
import remove_1 from '../../assets/queues/remove_1.jpg';
import remove_2 from '../../assets/queues/remove_2.jpg';
import remove_3 from '../../assets/queues/remove_3.jpg';
import remove_4 from '../../assets/queues/remove_4.jpg';

const images = [
  add_1, add_2, add_3, add_4, add_5, add_6,
  remove_1, remove_2, remove_3, remove_4
];

const Invite = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const [popup, setPopup] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((currentImage + 1) % images.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [currentImage]);

  const handleQueueClick = () => {
    window.location.href = '/login';
  };

  const signupClick = () => {
    window.location.href = '/register';
  };

  

  return (
    <div className='invite-main'>
      <div className='header'>
        <div className='logo' ><h1>Logo</h1></div>
        <div className='button-list'>
          <Link className='button'>
          <button>About</button>
          </Link>
          <Link className='button'>
          <button>Contact</button>
          </Link>
          <Link to={"/register"} className='button'>
          <button>Signup</button>
          </Link>
          <Link to={"/login"} className='button'>
          <button>Login</button>
          </Link>
        </div>
      </div>
     <div className='body-container'>

     
      <div className='body'>      
       
        <div>huy</div>
        <div>body</div>
        <div>body</div>
        <div>body</div>
        <div>body</div>
        <div>body</div>
        <div>body</div>
        <div>body</div>
        <div>body</div>
        <div>body</div>
        <div>body</div>
        <div>body</div>
        <div>body</div>
        <div>body</div>
        <div>body</div>
        <div>body</div>
        <div>body</div>
        <div>body</div>
        <div>body</div>
        <div>body</div>
        <div>body</div>
        <div>body</div>
        <div>body</div>
        <div>body</div>
        <div>body</div>
        <div>body</div>
        <div>body</div>
        <div>body</div>
        <div>body</div>
        <div>body</div>
        <div>body</div>
        <div>hey</div>
        
      </div>
      </div>
      <div className='footer'>
        footer
      </div>
      
    </div>
  );
};

export default Invite;
