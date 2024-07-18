import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ReceiveEmail = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send a request to your server endpoint to initiate the password reset process
      const response = await axios.post(
        "http://localhost:8800/users/reset-password",
        { email }
      );

      if (response.status === 200) {
        // Request was successful, handle success scenario
        setMessage(
          "Reset code sent successfully. Please check your email within five minutes."
        );
        setTimeout(() => {
          setMessage("");
          navigate("/login");
        }, 5000);
      } else {
        // Handle errors based on the status code or response data
        setMessage("Failed to send reset code. Please try again.");
        setTimeout(() => {
          setMessage("");
        }, 5000);
      }
    } catch (error) {
      // Handle network errors or other exceptions
      setMessage(
        "Failed to send reset code. Please check your internet connection and try again."
      );
      setTimeout(() => {
        setMessage("");
      }, 5000);
    }
  };

  return (
    <div
      style={{
        maxWidth: "400px",
        margin: "auto",
        marginTop: "200px",
        padding: "20px",
        border: "1px solid #ccc",
        borderRadius: "5px",
        boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
        textAlign: "center",
      }}
    >
      <h2 style={{ marginBottom: "20px", color: "#333" }}>Forgot Password</h2>
      {message && (
        <p style={{ color: "green", fontSize: "1.5rem" }}>{message}</p>
      )}
      <TextField
        fullWidth
        label="Email Address"
        variant="outlined"
        margin="normal"
        type="email"
        value={email}
        onChange={handleEmailChange}
        required
        style={{ marginBottom: "20px" }}
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        onClick={handleSubmit}
      >
        Send Reset Code
      </Button>
    </div>
  );
};

export default ReceiveEmail;
