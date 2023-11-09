import React from 'react';
import Register from './pages/registerPage/Register';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/loginPage/Login';
import Home from './pages/homePage/Home';
function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/register' element={<Register/>} />
      <Route path='/login' element={<Login/>} />

    </Routes>
    </BrowserRouter>
    
  );
}

export default App;
