import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { Link } from "react-router-dom";
import { SidebarData } from "./data";
import "./nav_bar.css";
import { IconContext } from "react-icons";
import tsegaye from "../../../assets/Tsegaye.jpg";
import UserPopup from "../../../popup/user/userPopup";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  MenuItem,
  Avatar,
} from "@mui/material";

import { Menu as MenuIcon, Close as CloseIcon } from "@mui/icons-material";

export default function AdminNavbar({
  toggleSidebar,
  sidebarWidth,
  image,
  username,
}) {
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();

  const handleHome = () => {
    navigate("/");
    handleCloseMenu();
  };

  const handleLogout = () => {
    // Remove the token from local storage
    localStorage.removeItem("accessToken");
    window.location.href = "/login";
  };
  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (path) => {
    navigate(path);
    //console.log(userData);

    handleCloseMenu();
  };

  const renderUserMenu = () => {
    return (
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
      >
        <MenuItem
          onClick={() => handleMenuItemClick(`/admin/profile`)}
          sx={{ display: "flex", alignItems: "center" }}
        >
          <Avatar
            alt="User Avatar"
            src={image}
            sx={{ width: 32, height: 32, marginRight: 1 }}
          />
          <Typography variant="body1" sx={{ fontWeight: 600 }}>
            {username}
          </Typography>
        </MenuItem>
        <MenuItem onClick={handleHome}>Home</MenuItem>
        <MenuItem onClick={handleLogout}>Log Out</MenuItem>
      </Menu>
    );
  };
  // let navigate = useNavigate()
  // const handleProfile = ()=>{
  //     navigate("/admin/profile")
  // }

  return (
    <>
      <IconContext.Provider value={{ color: "#fff" }}>
        <div className="navbar">
          {sidebarWidth === 0 ? (
            <Link to="#" className="menu-bars" onClick={toggleSidebar}>
              <FaIcons.FaBars />
            </Link>
          ) : (
            <Link to="#" className="menu-bars" onClick={toggleSidebar}>
              <FaIcons.FaTimes />
            </Link>
          )}
          <div className="user">
            <div
              className="user"
              onClick={handleMenuClick}
              style={{
                display: "flex",
                alignItems: "center",
                cursor: "pointer",
              }}
            >
              <Avatar alt="User Avatar" src={image} />
              <Typography
                variant="body1"
                style={{ marginLeft: "8px", color: "white" }}
              >
                {username}
              </Typography>
            </div>
            {renderUserMenu()}
          </div>
        </div>
        <nav className={sidebarWidth !== 0 ? "nav-menu active" : "nav-menu"}>
          <ul className="nav-menu-items">
            {SidebarData.map((item, index) => (
              <li key={index} className={item.cName}>
                <Link to={item.path}>
                  {item.icon}
                  <span>{item.title}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </IconContext.Provider>
    </>
  );
}
