import React, { useEffect } from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { makeStyles } from '@mui/styles';
import { Navigate } from 'react-router-dom';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
  },
  message: {
    marginBottom: '16px',
  },
});

function Unauthorized() {
  const classes = useStyles();

  useEffect(() => {
    const timer = setTimeout(() => {
      // Redirect to login page after 3 seconds
      return <Navigate to="/login" />;
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={classes.container}>
      <Typography variant="h4" className={classes.message}>
        Unauthorized
      </Typography>
      <Button variant="contained" color="primary" href="/login">
        Go to Login
      </Button>
    </div>
  );
}

export default Unauthorized;
