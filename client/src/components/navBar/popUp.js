import React from 'react';
import './Popup.scss';


const Popup = ({ handleClose, show, content }) => {
  console.log('Content received:', content);
  const showHideClassName = show ? 'popup display-block' : 'popup display-none';

  return (
    <div className={showHideClassName}>
      
      <section className="popup-main">
      <button onClick={handleClose} className="close-btn">
          &times;
        </button>
        {content}
       
      </section>
    </div>
  );
};

export default Popup;