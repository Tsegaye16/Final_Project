import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
//import "./NavBar.scss";
import Teampopup from "../../popup/team/TeamPopUp";
import Contactopup from "../../popup/contact/ContactPopup";
import FeaturePopup from "../../popup/feature/featurePopup";
import UserPopup from "../../popup/user/userPopup";
import {
  AppBar,
  Toolbar,
  IconButton,
  Button,
  Typography,
  Menu,
  MenuItem,
  Avatar,
} from "@mui/material";
import { Menu as MenuIcon, Close as CloseIcon } from "@mui/icons-material";
import defaults from "../../assets/default.png";

const NavBar = ({ isUser, icon, toggleSidebar, userData }) => {
  const navigate = useNavigate();
  const [showTeamPopup, setShowTeamPopup] = useState(false);
  const [showContactPopup, setShowContactPopup] = useState(false);
  const [showFeaturePopup, setShowFeaturePopup] = useState(false);
  const [showUserPopup, setShowUserPopup] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleHome = () => {
    navigate("/");
    handleCloseMenu();
  };

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (path) => {
    navigate(path);
    handleCloseMenu();
  };

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

  const renderUserMenu = () => {
    return (
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
      >
        <MenuItem
          onClick={() => handleMenuItemClick("/profile")}
          sx={{ display: "flex", alignItems: "center" }}
        >
          <Avatar
            alt="User Avatar"
            src={image}
            sx={{ width: 32, height: 32, marginRight: 1 }}
          />
          <Typography variant="body1" sx={{ fontWeight: 600 }}>
            {userName}
          </Typography>
        </MenuItem>
        <MenuItem onClick={toggleFeaturePopup}>Feature</MenuItem>
        <MenuItem>Home</MenuItem>
        <MenuItem>About</MenuItem>
        <MenuItem onClick={toggleTeamPopup}>Team</MenuItem>
        <MenuItem onClick={toggleContactPopup}>Contact</MenuItem>
        <MenuItem onClick={() => handleMenuItemClick("/settings")}>
          Settings
        </MenuItem>
        <MenuItem onClick={() => handleMenuItemClick("/logout")}>
          Logout
        </MenuItem>
      </Menu>
    );
  };

  const image =
    userData && userData.length > 0
      ? `http://localhost:8800/${userData[0].image}`
      : `${defaults}`;
  const userName = userData?.length > 0 ? userData[0].username : "";
  const role_name = userData?.length > 0 ? userData[0].role_name : "";

  return (
    <AppBar
      position="static"
      style={{ backgroundColor: "#2c3e50", height: "70px" }}
    >
      <Toolbar>
        <div className="logo">
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={toggleSidebar}
          >
            {icon === "bars" ? <MenuIcon /> : <CloseIcon />}
          </IconButton>
        </div>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          DSA Visualizer
        </Typography>
        <div className="button-list">
          <div
            className="user"
            onClick={handleMenuClick}
            style={{ display: "flex", alignItems: "center", cursor: "pointer" }}
          >
            <Avatar alt="User Avatar" src={image} />
            <Typography variant="body1" style={{ marginLeft: "8px" }}>
              {userName}
            </Typography>
          </div>

          {renderUserMenu()}
        </div>
      </Toolbar>
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
    </AppBar>
  );
};

export default NavBar;
