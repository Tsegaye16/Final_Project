import React from 'react';
import "./app.css"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/homePage/Home';

import Login from './pages/loginPage/Login';
import Invite from './pages/landingPage/Invite';
import Register from './pages/registerPage/Register';
import Logic from './DSA/Algorithm/search/linear_search/logic';
import Dash_board from './Instructor/pages/dash_board/dash_board';
//import Side_bar from './components/sidebar/side_bar';
import StudentBoard from './components/Student/student_board';
import SideBar from './components/sidebar/side_bar';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/student' element={<SideBar/>}/>
        <Route path="/" element={<Invite />} />
        <Route path='/instructor' element={<Dash_board/>}/>
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

      </Routes>
    </Router>
  );
}

export default App;
