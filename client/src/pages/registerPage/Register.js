// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import './Register.css';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import Validation from './registerValidation';

// function Register() {
//   const [values, setValues] = useState({
//     name: "",
//     email: "",
//     username: "",
//     password: "",
//   });
//   const navigate = useNavigate();
//   const [errors, setErrors] = useState({});

//   useEffect(() => {
//     // Validate the form when values change
//     setErrors(Validation(values));
//   }, [values]);

//   const handleInput = (event) => {
//     setValues((prev) => ({
//       ...prev,
//       [event.target.name]: event.target.value,
//     }));
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     // Validation is now handled by the useEffect
//     if (!errors.name && !errors.email && !errors.username && !errors.password) {
//       axios
//         .post("http://localhost:8800/register", values)
//         .then((res) => {
//           toast.success(`${values.username} successfully registered`, {
//             position: "top-right",
//             autoClose: 3000,
//             hideProgressBar: false,
//             closeOnClick: true,
//             pauseOnHover: true,
//             draggable: true,
//           })
//           setTimeout(() => {
//             navigate("/login")
//           }, 4000);
//         })
//         .catch((err) => {
//           if (err.response) {
//             // The request was made and the server responded with a status code
//             // that falls out of the range of 2xx
//             toast.error(`Registration failed: ${err.response.data.message}`, {
//               position: "top-right",
//               autoClose: 3000,
//               hideProgressBar: false,
//               closeOnClick: true,
//               pauseOnHover: true,
//               draggable: true,
//             });
//           } else if (err.request) {
//             // The request was made but no response was received
//             toast.error('Network error. Please try again later.', {
//               position: "top-right",
//               autoClose: 3000,
//               hideProgressBar: false,
//               closeOnClick: true,
//               pauseOnHover: true,
//               draggable: true,
//             });
//           } else {
//             // Something happened in setting up the request that triggered an Error
//             toast.error('Registration failed. Please try again later.', {
//               position: "top-right",
//               autoClose: 3000,
//               hideProgressBar: false,
//               closeOnClick: true,
//               pauseOnHover: true,
//               draggable: true,
//             });
//           }
//         });
//     }
//   };

//   const myStyle = {
//     color: "red",
//   };

//   return (
//     <div className="main">
//       <div className="register-container">
//         <h2>Register</h2>
//         <form onSubmit={handleSubmit}>
//           <ToastContainer/>
//           <div className="form-group">
//             <label htmlFor="name">Name:</label>
//             <input
//             type="text"
//             name="name"
//             placeholder="your Name.."
//             onChange={handleInput}
//           />
//           {errors.name && <p style={myStyle}>{errors.name}</p>}
//           </div>

//           <div className="form-group">
//             <label htmlFor="email">Email:</label>
//             <input
//             type="email"
//             name="email"
//             placeholder="Your E-mail.."
//             onChange={handleInput}
//           />
//           {errors.email && <p style={myStyle}>{errors.email}</p>}
//           </div>

//           <div className="form-group">
//             <label htmlFor="username">Username:</label>
//             <input
//             type="text"
//             name="username"
//             placeholder="User Name.."
//             onChange={handleInput}
//           />
//           {errors.username && <p style={myStyle}>{errors.username}</p>}
//           </div>

//           <div className="form-group">
//             <label htmlFor="password">Password:</label>
//             <input
//             type="password"
//             name="password"
//             placeholder="Your password"
//             onChange={handleInput}
//           />
//           {errors.password && <p style={myStyle}>{errors.password}</p>}
//           </div>

//           <button type="submit">Register</button>
//         </form>

//         <span>Do you have an account?</span>
//         <Link to="/login">Login</Link>
//       </div>
//     </div>
//   );
// }

// export default Register;

import {useEffect, useState} from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Register.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';





export default function Register() {
    const [values, setValues] = useState({
    name: "",
    email: "",
    username: "",
    password: "",
  });
  const navigate = useNavigate();
  

  

  const handleInput = (event) => {
    setValues((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Validation is now handled by the useEffect
    
      axios
        .post("http://localhost:8800/register", values)
        .then((res) => {
          toast.success(`${values.username} successfully registered`, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          })
          setTimeout(() => {
            navigate("/login")
          }, 4000);
        })
        .catch((err) => {
          if (err.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            toast.error(`Registration failed: ${err.response.data.message}`, {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
            });
          } else if (err.request) {
            // The request was made but no response was received
            toast.error('Network error. Please try again later.', {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
            });
          } else {
            // Something happened in setting up the request that triggered an Error
            toast.error('Registration failed. Please try again later.', {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
            });
          }
        });
    
  };

  return (
    
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <ToastContainer/>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="name"
                  required
                  fullWidth
                 // id="firstName"
                  label="Full Name"
                  autoFocus
                  onChange={handleInput}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                 // id="lastName"
                  label="E-mail"
                  name="email"
                  autoComplete="family-name"
                  onChange={handleInput}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                //  id="email"
                  label="User name"
                  name="username"
                  autoComplete="family-name"
                  onChange={handleInput}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  onChange={handleInput}
                />
              </Grid>
              
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
       
      </Container>
  
  );
}
