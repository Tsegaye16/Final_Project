import React from 'react';
import './Popup.css';

const Popup = ({ handleClose, show, children }) => {
  const showHideClassName = show ? 'popup display-block' : 'popup display-none';

  return (
    <div className={showHideClassName}>
      <section className="popup-main">
        <button onClick={handleClose} className="close-btn">
          &times;
        </button>
        {children}
      </section>
    </div>
  );
};

export default Popup;