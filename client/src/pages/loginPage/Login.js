import React from "react";
import { useState } from "react";
import axios from "axios"; // Import axios for making HTTP requests
import { useNavigate } from "react-router-dom"; // Import navigate for routing
import { toast, ToastContainer } from "react-toastify"; // Import toast for displaying messages
import "react-toastify/dist/ReactToastify.css"; // Import CSS for toast notifications
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";

// Create a default theme
const defaultTheme = createTheme();

const Login = ({ setAuthenticated, setUserRole, setToken }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    email: "",

    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const validateForm = () => {
    let valid = true;
    const newErrors = { ...errors };

    // Validate each field

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
      valid = false;
    } else {
      newErrors.email = "";
    }

    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
      valid = false;
    } else {
      newErrors.password = "";
    }

    setErrors(newErrors);
    return valid;
  };
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }

    try {
      // Make a request to your login endpoint
      const response = await axios.post(
        "http://localhost:8800/login",
        formData
      );

      // Handle the response, e.g., store user information in state or context
      toast.success("Login successful", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });

      localStorage.setItem("accessToken", response.data.token);

      // Set a timer to clear the token after one minute
      setTimeout(() => {
        localStorage.removeItem("accessToken");
        toast.error("Session expired, Please login again", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        window.location.reload();
      }, 3600000);

      const getUserRoleFromToken = (token) => {
        const decodedToken = JSON.parse(atob(token.split(".")[1]));
        return decodedToken.role_name;
      };

      const getUserIdFromToken = (token) => {
        const decodedToken = JSON.parse(atob(token.split(".")[1]));
        return decodedToken.user_id;
      };

      const token = localStorage.getItem("accessToken");
      const role_name = getUserRoleFromToken(token);
      const user_id = getUserIdFromToken(token);
      const role = role_name ? role_name.toLowerCase() : "student";

      setAuthenticated(true);
      setUserRole(role);
      setToken(token);

      setTimeout(() => {
        if (role === "instructor" || role === "admin") {
          navigate(`/${role}`);
        } else {
          navigate(`/${role}/${user_id}`);
        }
        window.location.reload();
      }, 1000);
    } catch (error) {
      // Handle login failure, e.g., show an error message
      if (error.response) {
        toast.error(`Login failed: ${error.response.data.message}`);
      } else {
        toast.error(`Login failed: ${error.message}`);
      }
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <ToastContainer />
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
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
              error={Boolean(errors.email)}
              helperText={errors.email}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type={showPassword ? "text" : "password"}
              id="password"
              autoComplete="current-password"
              onChange={handleChange}
              value={formData.password}
              error={Boolean(errors.password)}
              helperText={errors.password}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              className="login"
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="/user/forgotPassword" variant="body2">
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
