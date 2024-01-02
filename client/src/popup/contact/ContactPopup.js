import React from 'react';
//import './Popup.scss';
import "../team/Popup.scss"
//import Team from '..team/team';
import { ContactUs } from './contact';

const Contactopup = ({ handleClose, show }) => {
  const showHideClassName = show ? 'popup display-block' : 'popup display-none';

  const handleBackgroundClick = (e) => {
    // Check if the click occurred on the background div, not its children
    if (e.target.classList.contains('popup')) {
      handleClose();
    }
  };

  return (
    <div className={showHideClassName} onClick={handleBackgroundClick}>
      <section className="popup-main">
        Ask any question
        
        <ContactUs />
      </section>
    </div>
  );
};

export default Contactopup;