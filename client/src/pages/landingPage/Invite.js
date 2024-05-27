import React from "react";

import "./invite.scss";



import NavBar from "../../components/navBar/NavBar";
import welcome from "../../assets/welcome.avif";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ContactUs } from "../../popup/contact/contact";
import Feature from "../../popup/feature/feature";
import Team from "../../popup/team/team";

const Invite = () => {
  const handleStartClick = () => {
    window.location.href = "/login";
  };

  const isUser = false;
  const popup = false;

  return (
    <div className="invite-main">
      <div className="header">
        <NavBar isUser={isUser} popup={popup} />
      </div>
      <div className="body-container">
        <div className="body">
          <div id="home" className="home">
            <div className="left">
              <div className="moto">
                Unlock the Power of Algorithms with Real-time Visualization!
              </div>
              <div className="expression">
                <span>
                  Immerse yourself in the fascinating world of data structures
                  and algorithms through our cutting-edge visualizer. Whether
                  you're a student, developer, or tech enthusiast, our platform
                  provides an engaging and hands-on experience to understand the
                  intricacies of algorithms.
                </span>
                <button onClick={handleStartClick} className="start">
                  Start
                </button>
              </div>
            </div>
            <div className="right">
              <img src={welcome} alt="" />
            </div>
          </div>
          <div id="feature" className="feature">
            <div className="feature-title">Features</div>

            <div className="imported-feature">
              <Feature />
            </div>
          </div>
          <div className="about" id="about">
            About
          </div>
          <div className="team" id="team">
            <div className="team-list">
              <Team />
            </div>
          </div>
          <div className="contact" id="contact">
            <ContactUs />
          </div>
        </div>
      </div>
      <div className="footer">footer</div>
    </div>
  );
};

export default Invite;
