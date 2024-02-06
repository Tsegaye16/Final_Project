// import React, { useEffect, useState } from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import jwt from 'jsonwebtoken';

// import Home from './pages/homePage/Home';
// import Login from './pages/loginPage/Login';
// import Invite from './pages/landingPage/Invite';
// import Register from './pages/registerPage/Register';
// import InstructorDashboard from './Instructor/pages/dash_board/dash_board';
// import StudentProfile from './profile/studentProfile/studentProfile';
// import Chat from './chatBot/chat';
// import StudentList from './admin/manageStudent/student';
// import InstructorList from "./admin/manageInstructor/instructor"
// import AdminProfile from './admin/profile/profile';
// import AdminDashboard from './admin/dashboard/dashboard';
// import QuizeDashboard from './Instructor/manage_quiz/quiz_dashboard/quizeDashboard';

// function App() {
//   const [userType, setUserType] = useState(null);

//   useEffect(() => {
//     const accessToken = localStorage.getItem('accessToken');

//     if (!accessToken) {
//       // If there's no token, the user is not logged in. Redirect to the login page.
//       setUserType(null);
//     } else {
//       // Decode the token to get user information
//       //const decodedToken = jwt.decode(accessToken);

//       // Assuming the decodedToken has a userType field
//       const { userType } = decodedToken;

//       // Set the user type based on the decoded token
//       setUserType(userType);
//     }
//   }, []);

//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<Invite />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/register" element={<Register />} />

//         {/* Private routes for Admin */}
//         <Route
//           path="/admin"
//           element={userType === 'admin' ? <AdminDashboard /> : <Navigate to="/" />}
//         />
//         <Route
//           path="/admin/profile"
//           element={userType === 'admin' ? <AdminProfile /> : <Navigate to="/" />}
//         />
//         <Route
//           path="/admin/instructor"
//           element={userType === 'admin' ? <InstructorList /> : <Navigate to="/" />}
//         />
//         <Route
//           path="/admin/student"
//           element={userType === 'admin' ? <StudentList /> : <Navigate to="/" />}
//         />

//         {/* Private routes for Instructor */}
//         <Route
//           path="/instructor"
//           element={userType === 'instructor' ? <InstructorDashboard /> : <Navigate to="/" />}
//         />
//         <Route
//           path="/instructor/quiz"
//           element={userType === 'instructor' ? <QuizeDashboard /> : <Navigate to="/" />}
//         />

//         {/* Private routes for Student */}
//         <Route
//           path="/student/:student_id"
//           element={userType === 'student' ? <Home /> : <Navigate to="/" />}
//         />
//         <Route
//           path="/student/:student_id/profile"
//           element={userType === 'student' ? <StudentProfile /> : <Navigate to="/" />}
//         />

//         <Route path="/chatBot" element={<Chat />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;
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
import QuizeDashboard from './Instructor/manage_quiz/quiz_dashboard/quizeDashboard';
import StudentList from './admin/manageStudent/student';
import InstructorList from "./admin/manageInstructor/instructor"
import AdminProfile from './admin/profile/profile';
import AdminDashdoard from './admin/dashboard/dashboard';
import AddQuestion from "./Instructor/manage_quiz/quiz_dashboard/addQuestion"


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
        <Route path='/instructor/quiz' element = {< QuizeDashboard/>} />
        <Route path="/student/:id" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path = "/instructor/question" element = {< AddQuestion />}/>

      </Routes>
    </Router>
  );
}

export default App;