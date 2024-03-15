import React, { useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import "./NavBar.scss";

import Teampopup from "../../popup/team/TeamPopUp";
import Contactopup from "../../popup/contact/ContactPopup";
import FeaturePopup from "../../popup/feature/featurePopup";
import UserPopup from "../../popup/user/userPopup";
import { FaBars, FaTimes } from "react-icons/fa";
import defaults from "../../assets/default.png";

const NavBar = ({ isUser, icon, toggleSidebar, userData }) => {
  const navigate = useNavigate();
  const [showTeamPopup, setShowTeamPopup] = useState(false);
  const [showContactPopup, setShowContactPopup] = useState(false);
  const [showFeaturePopup, setShowFeaturePopup] = useState(false);
  const [showUserPopup, setShowUserPopup] = useState(false);
  const image =
    userData && userData.length > 0
      ? `http://localhost:8800/${userData[0].image}`
      : `${defaults}`;
  const userName = userData?.length > 0 ? userData[0].username : "";
  const role_name = userData?.length > 0 ? userData[0].role_name : "";

  const handleHome = () => {
    navigate("/");
  };
  //console.log(userData)

  const toggleTeamPopup = () => {
    setShowTeamPopup(!showTeamPopup);
  };
  const toggleUserPopup = () => {
    setShowUserPopup(!showUserPopup);
  };

  const toggleContactPopup = () => {
    setShowContactPopup(!showContactPopup);
  };
  const toggleFeaturePopup = () => {
    setShowFeaturePopup(!showFeaturePopup);
  };

  return (
    <div className="invite-main">
      <div className="header">
        <div className="logo">
          {isUser &&
            (icon === "bars" ? (
              <FaBars className="icon" onClick={toggleSidebar} />
            ) : (
              <FaTimes className="icon" onClick={toggleSidebar} />
            ))}{" "}
        </div>
        <div className="button-list">
          {isUser && (
            <>
              <div className="button" onClick={handleHome}>
                <button className="nav-button">Home</button>
              </div>

              <div className="button">
                <button onClick={toggleFeaturePopup} className="nav-button">
                  Feature
                </button>
              </div>

              <div className="button">
                <button className="nav-button">About</button>
              </div>
              <div className="button">
                <button onClick={toggleTeamPopup} className="nav-button">
                  Team
                </button>
              </div>
              <div className="button">
                <button onClick={toggleContactPopup} className="nav-button">
                  Contact
                </button>
              </div>
            </>
          )}

          {!isUser && (
            <>
              <Link to={"/register"} className="button">
                <button className="nav-button">Signup</button>
              </Link>
              <Link to={"/login"} className="button">
                <button className="nav-button">Login</button>
              </Link>
            </>
          )}

          {isUser && (
            <div className="user" onClick={toggleUserPopup}>
              <img src={image} alt="Tsegaye" />
              <span>{userName}</span>
            </div>
          )}
        </div>
        <Teampopup show={showTeamPopup} handleClose={toggleTeamPopup}>
          {/* Content you want to display in the Team popup */}
        </Teampopup>
        <Contactopup show={showContactPopup} handleClose={toggleContactPopup}>
          {/* Content you want to display in the Contact popup */}
        </Contactopup>
        <FeaturePopup
          show={showFeaturePopup}
          handleClose={toggleFeaturePopup}
        ></FeaturePopup>

        <UserPopup
          show={showUserPopup}
          handleClose={toggleUserPopup}
          role_name={role_name}
        ></UserPopup>
      </div>
    </div>
  );
};

export default NavBar;
