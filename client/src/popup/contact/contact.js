import React, { useRef, useState } from 'react';
import emailjs from 'emailjs-com';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
//import './ContactUs.scss';
import { TextField, Button, Typography, Box } from '@mui/material'

export const ContactUs = () => {
  const form = useRef();
  const [formData, setFormData] = useState({
    user_name: '',
    user_email: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  

  const sendEmail = (e) => {
    e.preventDefault();
  
    emailjs
      .sendForm('service_26tthlf', 'template_xp5by8d', e.target, 'CF4qOIwsvGf8WTr_E')
      .then(
        (result) => {
          console.log(result.text);
          toast.success('Message sent successfully!');
          setFormData({
            user_name: '',
            user_email: '',
            message: '',
          });
        },
        (error) => {
          console.log(error.text);
          toast.error('Failed to send message, please try again');
        }
      );
  };
  

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        //height: "100vh",
      }}
    >
      <Box sx={{ maxWidth: 600, mx: "auto", p: 2 }}>
        <ToastContainer/>
        <Typography variant="h4" align="center" mb={2}>
          Contact Us
        </Typography>
        <form onSubmit={sendEmail}>
          <TextField
            fullWidth
            label="Name"
            value={formData.user_name}
            onChange={handleChange}
            name="user_name"
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Email"
            value={formData.user_email}
            onChange={handleChange}
            margin="normal"
            name="user_email"
            required
            type="email"
          />
          <TextField
            fullWidth
            label="Message"
            value={formData.message}
            onChange={handleChange}
            margin="normal"
            name="message"
            required
            multiline
            rows={4}
          />
          <Button variant="contained" type="submit" sx={{ mt: 2 }}>
            Submit
          </Button>
        </form>
      </Box>
    </Box>
  //   <div className="contact-form-container">
  //     <ToastContainer />
     
  //     <form ref={form} onSubmit={sendEmail}>
        
  //       <input
  //       className='user_name'
  //         type="text"
  //         name="user_name"
  //         value={formData.user_name}
  //         onChange={handleChange}
  //         placeholder='User name'
  //       />
        
  //       <input
  //       className='user_name'
  //         type="email"
  //         name="user_email"
  //         value={formData.user_email}
  //         onChange={handleChange}
  //         placeholder='Your E-mail'
  //       />
        
  //       <textarea
  //         name="message"
  //         value={formData.message}
  //         onChange={handleChange}
  //         placeholder='Type........'
  //       />
  //       <input type="submit" value="Send" />
  //     </form>
  //   </div>
  );
};