// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import './Login.css';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// function Login() {
//   const [formData, setFormData] = useState({
//     email: '',
//     password: '',
//   });
//   const navigate = useNavigate();
//   axios.defaults.withCredentials = true;

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       // Make a request to your login endpoint
//       const response = await axios.post('http://localhost:8800/login', formData);

//       // Handle the response, e.g., store user information in state or context
//       toast.success('Login successful',{
//         position: "top-right",
//         autoClose: 3000,
//         hideProgressBar: false,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,
//       });

//       // Extract user ID from the response
//       const userId = response.data.user.id;

//       // Store the token in local storage
//       localStorage.setItem('accessToken', response.data.token);

//       // Set a timer to clear the token after one minute
//       setTimeout(() => {
//         localStorage.removeItem('accessToken');
//         toast.error('Token expired, cleared from local storage', {
//           position: "top-right",
//           autoClose: 3000,
//           hideProgressBar: false,
//           closeOnClick: true,
//           pauseOnHover: true,
//           draggable: true,
//         });
//       }, 60000); // 60000 milliseconds = 1 minute

//       // Redirect to the user-specific route
//       setTimeout(() =>{
//         navigate(`/student/${userId}`);
//       }, 6000)
//     } catch (error) {
//       // Handle login failure, e.g., show an error message
//       if (error.response) {
//         toast.error(`Login failed: ${error.response.data.message}`);
//       } else {
//         toast.error(`Login failed: ${error.message}`);
//       }
//     }
//   };

//   return (
//     <div className="login">
//       <div className="login-container">
//         <h1>Login</h1>
//         <ToastContainer />
//         <form onSubmit={handleSubmit}>
//           <div className="form-group">
//             <label>E-mail:</label>
//             <input
//               type="text"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//             />
//           </div>
//           <div className="form-group">
//             <label>Password:</label>
//             <input
//               type="password"
//               name="password"
//               value={formData.password}
//               onChange={handleChange}
//             />
//           </div>
//           <button type="submit">Login</button>
//         </form>
//         <p>Don't have an account yet? <Link to="/register">Register</Link></p>
//       </div>
//     </div>
//   );
// }

// export default Login;
import React from 'react';
import { useState } from 'react';
import axios from 'axios'; // Import axios for making HTTP requests
import { useNavigate, Usenavigate } from 'react-router-dom'; // Import navigate for routing
import { toast, ToastContainer } from 'react-toastify'; // Import toast for displaying messages
import 'react-toastify/dist/ReactToastify.css'; // Import CSS for toast notifications
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
import { createTheme, ThemeProvider } from '@mui/material/styles';


// Create a default theme
const defaultTheme = createTheme();

const Login = () => {
    const [formData, setFormData] = useState({
      email: '',
      password: '',
    });
    const navigate = useNavigate();
    axios.defaults.withCredentials = true;
  
    const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      try {
        // Make a request to your login endpoint
        const response = await axios.post('http://localhost:8800/login', formData);
  
        // Handle the response, e.g., store user information in state or context
        toast.success('Login successful',{
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
  
        // Extract user ID from the response
        const userId = response.data.user.id;
  
        // Store the token in local storage
        localStorage.setItem('accessToken', response.data.token);
  
        // Set a timer to clear the token after one minute
        setTimeout(() => {
          localStorage.removeItem('accessToken');
          toast.error('Token expired, cleared from local storage', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
        }, 60000); // 60000 milliseconds = 1 minute
  
        // Redirect to the user-specific route
        setTimeout(() =>{
          navigate(`/student/${userId}`);
        }, 6000)
      } catch (error) {
        // Handle login failure, e.g., show an error message
        if (error.response) {
          toast.error(`Login failed: ${error.response.data.message}`);
        } else {
          toast.error(`Login failed: ${error.message}`);
        }
      }
    };
  

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <ToastContainer/>
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
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={handleChange}
              value={formData.email}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={handleChange}
              value={formData.password}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} className='login'>
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/register" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default Login;
