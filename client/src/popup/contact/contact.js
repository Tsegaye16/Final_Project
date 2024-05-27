import React, { useRef, useState } from "react";
import emailjs from "emailjs-com";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
//import './ContactUs.scss';
import { TextField, Button, Typography, Box, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Tooltip } from "@mui/material";
import axios from "axios";

export const ContactUs = ({ back }) => {
  const form = useRef();
  const [formData, setFormData] = useState({
    user_name: "",
    user_email: "",
    message: "",
  });
  const navigate = useNavigate();
  const handleBack = () => {
    navigate(-1);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const sendEmail = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8800/user/message", formData)
      .then((resp) => {
        toast.success("message sent successfully!!!");
        setFormData({
          user_name: "",
          user_email: "",
          message: "",
        });
      })
      .catch((err) => {
        toast.error("message sent error");
      });
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        //height: "100vh",
      }}
    >
      {!back && (
        <Tooltip title="Back" arrow>
          <IconButton
            onClick={handleBack}
            style={{ position: "absolute", top: 10, left: 10 }}
          >
            <ArrowBackIcon />
          </IconButton>
        </Tooltip>
      )}
      <Box sx={{ maxWidth: 600, mx: "auto", p: 2 }}>
        <ToastContainer />
        <Typography variant="h4" align="center" mb={2}>
          Contact Us
        </Typography>
        <form onSubmit={sendEmail}>
          <TextField
            fullWidth
            label="Name"
            value={formData.user_name}
            onChange={handleChange}
            name="user_name"
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Email"
            value={formData.user_email}
            onChange={handleChange}
            margin="normal"
            name="user_email"
            required
            type="email"
          />
          <TextField
            fullWidth
            label="Message"
            value={formData.message}
            onChange={handleChange}
            margin="normal"
            name="message"
            required
            multiline
            rows={4}
          />
          <Button variant="contained" type="submit" sx={{ mt: 2 }}>
            Submit
          </Button>
        </form>
      </Box>
    </Box>
  );
};
