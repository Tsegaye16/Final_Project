import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as FaIcons from "react-icons/fa";

import { Link } from "react-router-dom";
import { SidebarData } from "./data";
import "./nav_bar.css";
import { IconContext } from "react-icons";

import {
  Typography,
  Menu,
  MenuItem,
  Avatar,
  Badge,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";

import defaults from "../../../assets/default.png";
import axios from "axios";

export default function AdminNavbar({ toggleSidebar, sidebarWidth, userData }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [notificationCount, setNotificationCount] = useState(0);
  const [messages, setMessages] = useState([]);
  const [openMessageDialog, setOpenMessageDialog] = useState(false);
  const [replyDialogOpen, setReplyDialogOpen] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [selectedMessage, setSelectedMessage] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchMessages();
    const interval = setInterval(fetchMessages, 1000); // Call fetchMessages every 5 minutes

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  const fetchMessages = () => {
    axios
      .post("http://localhost:8800/new/message")
      .then((resp) => {
        setNotificationCount(resp.data.length);
        setMessages(resp.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleHome = () => {
    navigate("/");
    handleCloseMenu();
  };

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    window.location.href = "/login";
  };

  const handleMenuClick = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (path) => {
    navigate(path);
    handleCloseMenu();
  };

  const handleOpenMessageDialog = () => {
    setOpenMessageDialog(true);
  };

  const handleCloseMessageDialog = () => {
    setOpenMessageDialog(false);
  };

  const handleReply = (message) => {
    setSelectedMessage(message);
    setReplyDialogOpen(true);
  };

  const handleCloseReplyDialog = () => {
    setReplyDialogOpen(false);
    setReplyText("");
    setSelectedMessage(null);
  };

  const handleSendReply = () => {
    // Send reply to backend
    const { id, name, message, email } = selectedMessage;
    axios
      .post("http://localhost:8800/admin/replay", {
        messageId: id,
        name: name,
        reply: replyText,
        message,
        email,
      })
      .then((response) => {
        console.log("Reply sent successfully:", response.data);
        handleCloseReplyDialog();
        fetchMessages();
      })
      .catch((error) => {
        console.error("Error sending reply:", error);
      });
  };

  const image =
    userData && userData.length > 0
      ? `http://localhost:8800/${userData[0].image}`
      : `${defaults}`;
  const userName = userData?.length > 0 ? userData[0].username : "";

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
            {userName}
          </Typography>
        </MenuItem>
        <MenuItem onClick={handleHome}>Home</MenuItem>
        <MenuItem onClick={handleLogout}>Log Out</MenuItem>
      </Menu>
    );
  };

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
            <Badge
              badgeContent={notificationCount}
              color="error"
              onClick={handleOpenMessageDialog}
            >
              <div className="notification-icon">
                <FaIcons.FaBell />
              </div>
            </Badge>
            <div
              className="user"
              onClick={handleMenuClick}
              style={{
                display: "flex",
                alignItems: "center",
                cursor: "pointer",
                marginLeft: "20px",
              }}
            >
              <Avatar alt="User Avatar" src={image} />
              <Typography
                variant="body1"
                style={{ marginLeft: "8px", color: "white" }}
              >
                {userName}
              </Typography>
            </div>
            {renderUserMenu()}
          </div>
        </div>
        <Dialog
          open={openMessageDialog}
          onClose={handleCloseMessageDialog}
          maxWidth="md"
        >
          <DialogTitle>Messages</DialogTitle>
          <DialogContent>
            {messages.map((message) => (
              <div
                key={message.id}
                style={{
                  margin: "8px",
                  padding: "16px",
                  backgroundColor: "#f5f5f5",
                  borderRadius: "4px",
                  wordWrap: "break-word",
                  wordBreak: "break-all",
                }}
              >
                <Typography>{message.message}</Typography>
                <Button onClick={() => handleReply(message)}>Reply</Button>
              </div>
            ))}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseMessageDialog}>Close</Button>
          </DialogActions>
        </Dialog>
        <Dialog open={replyDialogOpen} onClose={handleCloseReplyDialog}>
          <DialogTitle>Reply</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              label="Reply"
              fullWidth
              multiline
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseReplyDialog}>Cancel</Button>
            <Button
              onClick={handleSendReply}
              variant="contained"
              color="primary"
            >
              Send
            </Button>
          </DialogActions>
        </Dialog>
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
