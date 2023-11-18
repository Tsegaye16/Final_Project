import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css';

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
      navigate("/home")

      // Redirect or perform any other action after successful login
    } catch (error) {
      // Handle login failure, e.g., show an error message
      console.error('Login failed:', error.message);
    }
  };

  return (
    <div className="login">
      <div className="login-container">
        <h1>Login</h1>
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
        <Link to="/register">Register</Link>
      </div>
    </div>
  );
}

export default Login;
