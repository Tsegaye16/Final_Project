import React, { useState } from "react";
import { TextField, Button, Grid } from "@mui/material";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AddUser({ setOpenRegisterDialog }) {
  const [values, setValues] = useState({
    name: "",
    email: "",
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    username: "",
    password: "",
  });

  const handleInput = (event) => {
    const { name, value } = event.target;
    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = { ...errors };

    // Validate each field
    if (!values.name.trim()) {
      newErrors.name = "Name is required";
      valid = false;
    } else {
      newErrors.name = "";
    }

    if (!values.email.trim()) {
      newErrors.email = "Email is required";
      valid = false;
    } else {
      newErrors.email = "";
    }

    if (!values.username.trim()) {
      newErrors.username = "Username is required";
      valid = false;
    } else {
      newErrors.username = "";
    }

    if (!values.password.trim()) {
      newErrors.password = "Password is required";
      valid = false;
    } else {
      newErrors.password = "";
    }

    setErrors(newErrors);
    return valid;
  };

  const handleAddUser = async (event) => {
    event.preventDefault();

    // Validate form before submitting
    if (!validateForm()) {
      return;
    }
    try {
      const response = await axios.post(
        "http://localhost:8800/admin/adduser",
        values
      );
      const { message } = response.data;
      toast.success(message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      setOpenRegisterDialog(false);
    } catch (error) {
      if (error.response) {
        const { message } = error.response.data;
        toast.error(`Registration failed: ${message}`, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      } else if (error.request) {
        toast.error("Network error. Please try again later.", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      } else {
        toast.error("Registration failed. Please try again later.", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
    }
  };

  return (
    <Grid container spacing={2} justifyContent="center">
      <ToastContainer />
      <Grid item xs={12} sm={6}>
        <TextField
          label="Full Name"
          variant="outlined"
          fullWidth
          name="name"
          value={values.name}
          onChange={handleInput}
          error={Boolean(errors.name)}
          helperText={errors.name}
          margin="normal"
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          label="E-mail"
          variant="outlined"
          fullWidth
          name="email"
          value={values.email}
          onChange={handleInput}
          error={Boolean(errors.email)}
          helperText={errors.email}
          margin="normal"
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          label="Username"
          variant="outlined"
          fullWidth
          name="username"
          value={values.username}
          onChange={handleInput}
          error={Boolean(errors.username)}
          helperText={errors.username}
          margin="normal"
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          label="Password"
          variant="outlined"
          fullWidth
          type="password"
          name="password"
          value={values.password}
          onChange={handleInput}
          error={Boolean(errors.password)}
          helperText={errors.password}
          margin="normal"
        />
      </Grid>
      <Grid item xs={12}>
        <Button variant="contained" color="primary" onClick={handleAddUser}>
          Add User
        </Button>
      </Grid>
    </Grid>
  );
}

export default AddUser;
