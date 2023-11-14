import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/homePage/Home.js';
import Login from './pages/loginPage/Login';
import Invite from './pages/InvitePage/Invite.js';



function App() {
  const isLoggedIn =checkTokenInCookies() 

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Invite />} />
        <Route
          path="/home"
          element={isLoggedIn ? <Home /> : <Navigate to="/login" />}
        />
        <Route
          path="/login"
          element={isLoggedIn ? <Navigate to="/home" /> : <Login />}
        />
        <Route
          path="/"
          element={isLoggedIn ? <Navigate to="/home" /> : <Invite />}
        />
      </Routes>
    </BrowserRouter>
  );
}

function checkTokenInCookies() {
  const token = document.cookie.replace(
    /(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/,
    '$1'
  );
  return token !== '';
}
export default App;
