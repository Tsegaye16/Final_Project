import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const ResetPassword = () => {
  const { token } = useParams();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage('Passwords do not match. Please try again.');
      return;
    }

    try {
      // Send a request to your server endpoint to update the user's password
      const response = await axios.post('http://localhost:8800/user/updatePassword', {
        token,
        newPassword: password,
      });

      if (response.status === 200) {
        // Password reset successful, handle success scenario
        setMessage('Password reset successful. You can now login with your new password.');
        setTimeout(() => {
          setMessage('');
          navigate('/login');
        }, 5000);
      } else {
        // Handle errors based on the status code or response data
        setMessage('Failed to reset password. Please try again.');
        setTimeout(() => {
          setMessage('');
        }, 5000);
      }
    } catch (error) {
      // Handle network errors or other exceptions
      setMessage('Failed to reset password. Please check your internet connection and try again.');
      setTimeout(() => {
        setMessage('');
      }, 5000);
    }
  };

  return (
    <div
      style={{
        maxWidth: '400px',
        margin: 'auto',
        marginTop: '200px',
        padding: '20px',
        border: '1px solid #ccc',
        borderRadius: '5px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
        textAlign: 'center',
      }}
    >
      <h2 style={{ marginBottom: '20px', color: '#333' }}>Reset Password</h2>
      {message && <p style={{ color: 'green', fontSize: '1.5rem' }}>{message}</p>}
      <TextField
        fullWidth
        label="New Password"
        variant="outlined"
        margin="normal"
        type="password"
        value={password}
        onChange={handlePasswordChange}
        required
        style={{ marginBottom: '20px' }}
      />
      <TextField
        fullWidth
        label="Confirm Password"
        variant="outlined"
        margin="normal"
        type="password"
        value={confirmPassword}
        onChange={handleConfirmPasswordChange}
        required
        style={{ marginBottom: '20px' }}
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        onClick={handleSubmit}
      >
        Reset Password
      </Button>
    </div>
  );
};

export default ResetPassword;
