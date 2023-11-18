import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/homePage/Home';

import Login from './pages/loginPage/Login';
import Invite from './pages/InvitePage/Invite';
import Register from './pages/registerPage/Register';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Invite />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* Add more routes as needed */}
      </Routes>
    </Router>
  );
}

export default App;
