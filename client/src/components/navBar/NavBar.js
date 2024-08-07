import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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
import defaults from "../../assets/default.png";

const NavBar = ({ icon, toggleSidebar, userData, instructor }) => {
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState(null);
  const [user_id, setUser_id] = useState(0);
  const [role_name, setRole_name] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    //console.log(token);
    // Set isUser based on token availability

    const decodedToken = JSON.parse(atob(token.split(".")[1]));

    //console.log("Decode", decodedToken);
    setUser_id(decodedToken.user_id);
    setRole_name(
      decodedToken.role_name === null ? "student" : decodedToken.role_name
    );
  }, []);

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
  const handleLogout = () => {
    // Remove the token from local storage
    localStorage.removeItem("accessToken");
    window.location.href = "/login";
  };

  const handleMenuItemClick = (path) => {
    navigate(path);

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
          onClick={() => handleMenuItemClick(`/${role_name}/profile/`)}
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
        <MenuItem onClick={handleHome}>Home</MenuItem>

        {instructor && (
          <>
            <MenuItem onClick={() => handleMenuItemClick("/instructor")}>
              Dashboard
            </MenuItem>
            <MenuItem onClick={() => handleMenuItemClick("/instructor/quiz")}>
              Manage quiz
            </MenuItem>
            <MenuItem>Manage content</MenuItem>
          </>
        )}
        {!instructor && (
          <>
            <MenuItem onClick={() => handleMenuItemClick("/student/feature")}>
              Feature
            </MenuItem>
            <MenuItem onClick={() => handleMenuItemClick("/student/about")}>
              About
            </MenuItem>
            <MenuItem onClick={() => handleMenuItemClick("/student/team")}>
              Team
            </MenuItem>
            <MenuItem onClick={() => handleMenuItemClick("/student/contact")}>
              Contact
            </MenuItem>
          </>
        )}
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    );
  };

  const image =
    userData && userData.length > 0
      ? `http://localhost:8800/${userData[0].image}`
      : `${defaults}`;
  const userName = userData?.length > 0 ? userData[0].username : "";
  //const role_name = userData?.length > 0 ? userData[0].role_name : "";

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
            {icon === "bars" ? (
              <MenuIcon style={{ fontSize: "1.5em" }} />
            ) : (
              <CloseIcon style={{ fontSize: "1.5em" }} />
            )}
          </IconButton>
        </div>
        <Typography variant="h6" style={{ flexGrow: 1, fontSize: "1.5em" }}>
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
    </AppBar>
  );
};

export default NavBar;
