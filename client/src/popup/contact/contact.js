import React, { useRef, useState } from 'react';
import emailjs from 'emailjs-com';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './ContactUs.scss';

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
      .sendForm('service_26tthlf', 'template_xp5by8d', form.current, 'CF4qOIwsvGf8WTr_E')
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
    <div className="contact-form-container">
      <ToastContainer />
      <form ref={form} onSubmit={sendEmail}>
        
        <input
          type="text"
          name="user_name"
          value={formData.user_name}
          onChange={handleChange}
          placeholder='User name'
        />
        
        <input
          type="email"
          name="user_email"
          value={formData.user_email}
          onChange={handleChange}
          placeholder='Your E-mail'
        />
        
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder='Type........'
        />
        <input type="submit" value="Send" />
      </form>
    </div>
  );
};
