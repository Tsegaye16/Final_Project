import React from 'react'
import Feature from './feature';
import "../team/Popup.scss"

export default function FeaturePopup({ handleClose, show }) {
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
        
        Features
        
        <Feature />
        
      </section>
    </div>
  )
}
