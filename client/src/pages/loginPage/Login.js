import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import { ToastContainer, toast } from 'react-toastify';

function Login() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const navigate = useNavigate()
   axios.defaults.withCredentials = true

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Make a request to your login endpoint
      const response = await axios.post('http://localhost:8800/login', formData);

      // Handle the response, e.g., store user information in state or context
      console.log('Login successful:', response.data);
      toast.success("Login successful")
      setTimeout(() => {
        navigate("/home");
      }, 4000);
  

      // Redirect or perform any other action after successful login
    } catch (error) {
      // Handle login failure, e.g., show an error message
      console.error('Login failed:', error.message);
      toast.error("Login failed")
    }
  };

  return (
    <div className="login">
      <div className="login-container">
        <h1>Login</h1>
        <ToastContainer/>
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
        </form> did you haven't an account yet?
        <Link to="/register">Register</Link>
      </div>
    </div>
  );
}

export default Login;
