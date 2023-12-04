import React from 'react';
import './Popup.scss';
import Team from '../../popup/team/team';

const Popup = ({ handleClose, show }) => {
  const showHideClassName = show ? 'popup display-block' : 'popup display-none';

  return (
    <div className={showHideClassName}>
      <button onClick={handleClose} className="close-btn">
          &times;
        </button>
      <section className="popup-main">
        <Team/>
       
      </section>
    </div>
  );
};

export default Popup;