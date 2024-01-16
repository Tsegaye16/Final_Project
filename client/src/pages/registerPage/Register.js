import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Register.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Validation from './registerValidation';

function Register() {
  const [values, setValues] = useState({
    name: "",
    email: "",
    username: "",
    password: "",
  });
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});

  useEffect(() => {
    // Validate the form when values change
    setErrors(Validation(values));
  }, [values]);

  const handleInput = (event) => {
    setValues((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Validation is now handled by the useEffect
    if (!errors.name && !errors.email && !errors.username && !errors.password) {
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
    }
  };

  const myStyle = {
    color: "red",
  };

  return (
    <div className="main">
      <div className="register-container">
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
          <ToastContainer/>
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input
            type="text"
            name="name"
            placeholder="your Name.."
            onChange={handleInput}
          />
          {errors.name && <p style={myStyle}>{errors.name}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
            type="email"
            name="email"
            placeholder="Your E-mail.."
            onChange={handleInput}
          />
          {errors.email && <p style={myStyle}>{errors.email}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input
            type="text"
            name="username"
            placeholder="User Name.."
            onChange={handleInput}
          />
          {errors.username && <p style={myStyle}>{errors.username}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
            type="password"
            name="password"
            placeholder="Your password"
            onChange={handleInput}
          />
          {errors.password && <p style={myStyle}>{errors.password}</p>}
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
