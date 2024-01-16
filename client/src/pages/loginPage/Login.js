import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Login() {
  const [formData, setFormData] = useState({
    username: '',
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
    <div className="login">
      <div className="login-container">
        <h1>Login</h1>
        <ToastContainer />
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>User name:</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Password:</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <button type="submit">Login</button>
        </form>
        <p>Don't have an account yet? <Link to="/register">Register</Link></p>
      </div>
    </div>
  );
}

export default Login;
