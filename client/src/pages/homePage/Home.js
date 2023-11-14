import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import "./Home.css";
import axios from 'axios';
import Login from '../loginPage/Login';
import Invite from '../InvitePage/Invite';
import NavBar from '../../components/navBar/NavBar';
import LeftBar from '../../components/leftBar/leftBar';
import Stack from '../../DSA/stack/stack';

function Home() {
  const [auth, setAuth] = useState(false);
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");
  axios.defaults.withCredentials = true;
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:8080").then(res => {
      if (res.data.Status === "Success") {
        setAuth(true);
        setName(res.data.name);
      } else {
        setAuth(false);
        setMessage(res.data.Error);
        navigate('/login'); // Redirect to the login page if not authenticated
      }
    }).then(err => console.log(err));
  }, [navigate]);

  return (
    <div className='main-home'>
      {auth ? (
        <div>
          <div className='NavBar'>
            <NavBar />
          </div>
          <div className='main-body'>
            <div className='left-bar'>
              <LeftBar />
            </div>
            <div className='main-body-part'>
              <Stack />
            </div>
          </div>
        </div>
      ) : (
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/invite" element={<Invite />} />
        </Routes>
      )}
    </div>
  );
}

export default Home;
