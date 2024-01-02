import React from 'react';
import "./app.css"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/homePage/Home';

import Login from './pages/loginPage/Login';
import Invite from './pages/landingPage/Invite';
import Register from './pages/registerPage/Register';
import Logic from './DSA/Algorithm/search/linear_search/logic';
import InstructorDashboard from './Instructor/pages/dash_board/dash_board';
import StudentProfile from './profile/studentProfile/studentProfile';
import Chat from './chatBot/chat';
//import Side_bar from './components/sidebar/side_bar';
//import StudentBoard from './components/Student/student_board';
//import SideBar from './components/sidebar/side_bar';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/chatBot' element = {<Chat/>}/>
        <Route path = "/student/profile" element = {<StudentProfile/>}/>
        <Route path="/" element={<Invite />} />
        <Route path='/instructor' element={<InstructorDashboard/>}/>
        <Route path="/student" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

      </Routes>
    </Router>
  );
}

export default App;
