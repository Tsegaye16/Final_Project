import React from 'react'
import "./userPopup.scss"
import User from './user'
function UserPopup({ handleClose, show , role_name}) {
  const showHideClassName = show ? 'sample display-block' : 'popup display-none';

  const handleBackgroundClick = (e) => {
    // Check if the click occurred on the background div, not its children
    if (!e.currentTarget.contains(e.target)) {
      handleClose();
    }
  };
  return (
    <div className={showHideClassName} onClick={handleBackgroundClick}>
      <User role_name = {role_name}/>
  </div>
  )
}

export default UserPopup