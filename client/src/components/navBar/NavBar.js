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

const NavBar = ({ icon, toggleSidebar }) => {
  const navigate = useNavigate();

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

  const renderUserMenu = () => {
    return (
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
      >
        <MenuItem sx={{ display: "flex", alignItems: "center" }}>
          <Avatar
            alt="User Avatar"
            src={"image"}
            sx={{ width: 32, height: 32, marginRight: 1 }}
          />
          <Typography variant="body1" sx={{ fontWeight: 600 }}>
            {"userName"}
          </Typography>
        </MenuItem>
        <MenuItem>Home</MenuItem>

        <MenuItem onClick={() => handleMenuItemClick("/feature")}>
          Feature
        </MenuItem>
        <MenuItem onClick={() => handleMenuItemClick("/about")}>About</MenuItem>
        <MenuItem onClick={() => handleMenuItemClick("/team")}>Team</MenuItem>
        <MenuItem onClick={() => handleMenuItemClick("/contact")}>
          Contact
        </MenuItem>
      </Menu>
    );
  };

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
            <Avatar alt="User Avatar" src={"mage"} />
            <Typography variant="body1" style={{ marginLeft: "8px" }}>
              {"userName"}
            </Typography>
          </div>
          {renderUserMenu()}
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
