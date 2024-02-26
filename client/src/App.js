// import React, { useEffect, useState } from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import './app.css';
// import Home from './pages/homePage/Home';
// import Login from './pages/loginPage/Login';
// import Invite from './pages/landingPage/Invite';
// import Register from './pages/registerPage/Register';
// import InstructorDashboard from './Instructor/pages/dash_board/dash_board';
// import StudentProfile from './profile/studentProfile/studentProfile';
// import Quiz from './student/quiz';
// import QuizeDashboard from './Instructor/manage_quiz/quiz_dashboard/quizeDashboard';
// import StudentList from './admin/manageStudent/student';
// import InstructorList from './admin/manageInstructor/instructor';
// import AdminProfile from './admin/profile/profile';
// import AdminDashboard from './admin/dashboard/dashboard';
// import AddQuestion from './Instructor/manage_quiz/quiz_dashboard/addQuestion';
// import NotFound from './pages/error_handling/NotFound';
// import Unauthorized from './pages/error_handling/Unauthorized';


// function App() {
//   const [authenticated, setAuthenticated] = useState(false);
//   const [userRole, setUserRole] = useState('');

//   useEffect(() => {
//     const token = localStorage.getItem('accessToken');
//     if (token) {
//       setAuthenticated(true);
//       const role = getUserRoleFromToken(token);
//       setUserRole(role);
//     }
//   }, []);

//   const getUserRoleFromToken = (token) => {
//     const decodedToken = JSON.parse(atob(token.split('.')[1]));
//     return decodedToken.role_name;
//   };

//   const RedirectToDashboard = () => {
//     if (!authenticated) {
//       return <Navigate to="/login" />;
//     } else {
//       if (userRole === 'Student') {
//         return <Navigate to="/student" />;
//       } else if (userRole === 'Instructor') {
//         return <Navigate to="/instructor" />;
//       } else if (userRole === 'Admin') {
//         return <Navigate to="/admin" />;
//       } else {
//         // Redirect to home if the user's role is not recognized
//         return <Navigate to="/" />;
//       }
//     }
//   };

//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<Invite />} />
//         <Route path="/login" element={<Login setAuthenticated={setAuthenticated} setUserRole={setUserRole} />} />
//         <Route path="/register" element={<Register />} />
//         <Route path="/" element={<RedirectToDashboard />} />
//         {authenticated && (
//           <>
//             {userRole === 'Student' && <Route path="/student/*" element={<StudentRoutes />} />}
//             {userRole === 'Instructor' && <Route path="/instructor/*" element={<InstructorRoutes />} />}
//             {userRole === 'Admin' && <Route path="/admin/*" element={<AdminRoutes />} />}
//           </>
//         )}
//         <Route path="*" element={<NotFound />} />
//         <Route path="/unauthorized" element={<Unauthorized />} />
//       </Routes>
//     </Router>
//   );
// }

// const StudentRoutes = () => {
//   return (
//     <Routes>
//       <Route path="/" element={<Home />} />
//       <Route path="/chatBot" element={<Quiz />} />
//       <Route path="/student/profile" element={<StudentProfile />} />
//     </Routes>
//   );
// };

// const InstructorRoutes = () => {
//   return (
//     <Routes>
//       <Route path="/" element={<InstructorDashboard />} />
//       <Route path="/quiz" element={<QuizeDashboard />} />
//       <Route path="/question" element={<AddQuestion />} />
//     </Routes>
//   );
// };

// const AdminRoutes = () => {
//   return (
//     <Routes>
//       <Route path="/" element={<AdminDashboard />} />
//       <Route path="/profile" element={<AdminProfile />} />
//       <Route path="/instructor" element={<InstructorList />} />
//       <Route path="/student" element={<StudentList />} />
//     </Routes>
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
import Quiz from './student/quiz';
import QuizeDashboard from './Instructor/manage_quiz/quiz_dashboard/quizeDashboard';
import StudentList from './admin/manageStudent/student';
import InstructorList from "./admin/manageInstructor/instructor"
import AdminProfile from './admin/profile/profile';
import AdminDashdoard from './admin/dashboard/dashboard';
import AddQuestion from "./Instructor/manage_quiz/quiz_dashboard/addQuestion"
import Content from './Instructor/manage_content/Content';
import ReceiveEmail from './forgot_password/receive_user_email';
import ResetPassword from './forgot_password/receive_new_password';
import ConfirmationPage from './confirm_email/ConfirmationPage';
import QuizQuestions from './student/question_board';


function App() {
  return (
    <Router>
      <Routes>
        <Route path='/admin' element = {<AdminDashdoard/>}/>
        <Route path='/admin/profile' element = {<AdminProfile/>}/>
        <Route path = "/admin/instructor" element = {<InstructorList/>}/>
        <Route path='/admin/student' element = {<StudentList/>}/>
        <Route path='/student/quiz' element = {<Quiz/>}/>
        <Route path = "/student/profile" element = {<StudentProfile/>}/>
        <Route path="/" element={<Invite />} />
        <Route path='/instructor' element={<InstructorDashboard/>}/>
        <Route path='/instructor/quiz' element = {< QuizeDashboard/>} />
        <Route path='/instructor/content' element = {<Content/>}/>
        <Route path="/student/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path = "/instructor/question" element = {< AddQuestion />}/>
        <Route path='/user/forgotPassword' element = {<ReceiveEmail/>}/>
        <Route path='/user/resetPassword/:token' element = {<ResetPassword/>}/>
        <Route path='/user/confirmEmail/:token' element = {<ConfirmationPage/>}/>
        <Route path='/student/questions/:quizId' element = {<QuizQuestions/>}/>
      </Routes>
    </Router>
  );
}

export default App;