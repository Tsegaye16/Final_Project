import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Register.css';

function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    username: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
const navigate = useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Make a request to your registration endpoint
      const response = await axios.post('http://localhost:8800/register', formData);

      // Handle the response, e.g., show a success message
      console.log('Registration successful:', response.data);
      navigate("/login")

      // Redirect or perform any other action after successful registration
    } catch (error) {
      // Handle registration failure, e.g., show an error message
      console.error('Registration failed:', error.message);
    }
  };

  return (
    <div className="main">
      <div className="register-container">
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              placeholder="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              placeholder="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              placeholder="Username"
              name="username"
              value={formData.username}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          <button type="submit">Register</button>
        </form>

        <span>Do you have an account?</span>
        <Link to="/login">Login</Link>
      </div>
    </div>
  );
}

export default Register;
