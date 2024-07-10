import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';

const ConfirmationPage = () => {
  const { token } = useParams();
  const [message, setMessage] = useState('Verifying email...');
  const [verificationSuccess, setVerificationSuccess] = useState(false);

  useEffect(() => {
    const confirmEmail = async () => {
      try {
        // Send the token to the server-side for confirmation
        const response = await axios.post(`http://localhost:8800/user/confirmEmail/${token}`, { token });

        if (response.status === 200) {
          setMessage(response.data.message);
          setVerificationSuccess(true);
        } else {
          setMessage('Email verification failed. Please try again.');
        }
      } catch (error) {
        console.error('Email verification failed:', error);
        setMessage('Email verification failed. Please try again.');
      }
    };

    confirmEmail();
  }, [token]);

  return (
    <Container>
      <Typography variant="h2">Email Verification</Typography>
      <Typography variant="body1">{message}</Typography>
      {verificationSuccess && (
        <Button component={Link} to="/login" variant="contained" color="primary">
          Go to Login
        </Button>
      )}
    </Container>
  );
};

export default ConfirmationPage;
