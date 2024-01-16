import React from 'react';
import "./app.css"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/homePage/Home';

import Login from './pages/loginPage/Login';
import Invite from './pages/landingPage/Invite';
import Register from './pages/registerPage/Register';

import InstructorDashboard from './Instructor/pages/dash_board/dash_board';
import StudentProfile from './profile/studentProfile/studentProfile';
import Chat from './chatBot/chat';

import StudentList from './admin/manageStudent/student';
import InstructorList from "./admin/manageInstructor/instructor"
import AdminProfile from './admin/profile/profile';
import AdminDashdoard from './admin/dashboard/dashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/admin' element = {<AdminDashdoard/>}/>
        <Route path='/admin/profile' element = {<AdminProfile/>}/>
        <Route path = "/admin/instructor" element = {<InstructorList/>}/>
        <Route path='/admin/student' element = {<StudentList/>}/>
        <Route path='/chatBot' element = {<Chat/>}/>
        <Route path = "/student/:id/profile" element = {<StudentProfile/>}/>
        <Route path="/" element={<Invite />} />
        <Route path='/instructor' element={<InstructorDashboard/>}/>
        <Route path="/student/:id" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

      </Routes>
    </Router>
  );
}

export default App;
