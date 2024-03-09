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
// import ReceiveEmail from './forgot_password/receive_user_email';
// import ResetPassword from './forgot_password/receive_new_password';
// import ConfirmationPage from './confirm_email/ConfirmationPage';
// import QuizQuestions from './student/question_board';
// import Content from './Instructor/manage_content/Content';
// import useTokenTimeout from './token_control/token_timeout';

// function App() {
//   const [authenticated, setAuthenticated] = useState(false);
//   const [userRole, setUserRole] = useState('');
//   const [loading, setLoading] = useState(true);
//   const [token, setToken] = useState("")

//   useTokenTimeout()

//   useEffect(() => {
//     const storedToken = localStorage.getItem('accessToken');
//     console.log(storedToken)
//     if (storedToken) {
//       setToken(storedToken); // Set the token from local storage
//       setAuthenticated(true); // User is authenticated
//       const role = getUserRoleFromToken(storedToken) || 'Student';
//       setUserRole(role);
//     }
//     setLoading(false);
//   }, []);

//   const getUserRoleFromToken = (token) => {
//     const decodedToken = JSON.parse(atob(token.split('.')[1]));

//     return decodedToken.role_name;
//   };

//   const RedirectToDashboard = () => {
//     if(!token) {
//       // If token is not present, always redirect to login
//       return <Navigate to="/" />;
//     }
//     if (loading) {
//       // Show loading spinner or placeholder while authentication is being checked
//       return <div>Loading...</div>;
//     }
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

//         return <Navigate to="/" />;
//       }
//     }
//   };

//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<Invite />} />

//         <Route path='/user/forgotPassword' element = {<ReceiveEmail/>}/>
//         <Route path='/user/resetPassword/:token' element = {<ResetPassword/>}/>
//         <Route path='/user/confirmEmail/:token' element = {<ConfirmationPage/>}/>
//         <Route path="/login" element={<Login setAuthenticated={setAuthenticated} setUserRole={setUserRole} setToken = {setToken}/>} />
//         <Route path="/register" element={<Register />} />
//         <Route path="/" element={<RedirectToDashboard />} />
//         {authenticated && (
//           <>
//             {userRole === 'Student' && <Route path="/student/*" element={<StudentRoutes userRole={userRole}/>} token = {token} />}
//             {userRole === 'Instructor' && <Route path="/instructor/*" element={<InstructorRoutes userRole={userRole}/>} token = {token}/>}
//             {userRole === 'Admin' && <Route path="/admin/*" element={<AdminRoutes />} />}
//           </>
//         )}
//         <Route path="*" element={<Unauthorized />} />
//         <Route path="/unauthorized" element={<NotFound />} />
//       </Routes>
//     </Router>
//   );
// }

// const StudentRoutes = ({userRole, token}) => {
//   return (
//     <Routes>
//       <Route path="/:id" element={<Home userRole = {userRole} token = {token} />} />
//       <Route path="/quiz" element={<Quiz />} />
//       <Route path="/profile" element={<StudentProfile />} />
//       <Route path='/questions/:quizId' element = {<QuizQuestions/>}/>
//     </Routes>
//   );
// };

// const InstructorRoutes = ({userRole, token}) => {
//   return (
//     <Routes>
//       <Route path="/profile" element={<StudentProfile />} />
//       <Route path="/:id" element={<InstructorDashboard />} />
//       <Route path="/quiz" element={<QuizeDashboard />} />
//       <Route path="/question" element={<AddQuestion />} />
//       <Route path='/content' element = {<Content userRole={userRole} token={token} />}/>
//     </Routes>
//   );
// };

// const AdminRoutes = () => {
//   return (
//     <Routes>
//       <Route path="/:id" element={<AdminDashboard />} />
//       <Route path="/profile" element={<AdminProfile />} />
//       <Route path="/instructor" element={<InstructorList />} />
//       <Route path="/student/" element={<StudentList />} />
//     </Routes>
//   );
// }

// export default App;

// import React from 'react';
// import "./app.css"
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Home from './pages/homePage/Home';
// import Login from './pages/loginPage/Login';
// import Invite from './pages/landingPage/Invite';
// import Register from './pages/registerPage/Register';
// import InstructorDashboard from './Instructor/pages/dash_board/dash_board';
// import StudentProfile from './profile/studentProfile/studentProfile';
// import Quiz from './student/quiz';
// import QuizeDashboard from './Instructor/manage_quiz/quiz_dashboard/quizeDashboard';
// import StudentList from './admin/manageStudent/student';
// import InstructorList from "./admin/manageInstructor/instructor"
// import AdminProfile from './admin/profile/profile';
// import AdminDashdoard from './admin/dashboard/dashboard';
// import AddQuestion from "./Instructor/manage_quiz/quiz_dashboard/addQuestion"
// import Content from './Instructor/manage_content/Content';
// import ReceiveEmail from './forgot_password/receive_user_email';
// import ResetPassword from './forgot_password/receive_new_password';
// import ConfirmationPage from './confirm_email/ConfirmationPage';
// import QuizQuestions from './student/question_board';
// import CodeTemplate from './DSA/Algorithm/search/linear_search/extra/CodeTemplate';

// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path='/admin' element = {<AdminDashdoard/>}/>
//         <Route path='/admin/profile' element = {<AdminProfile/>}/>
//         <Route path = "/admin/instructor" element = {<InstructorList/>}/>
//         <Route path='/admin/student' element = {<StudentList/>}/>
//         <Route path='/student/quiz' element = {<Quiz/>}/>
//         <Route path = "/student/profile" element = {<StudentProfile/>}/>
//         <Route path="/" element={<Invite />} />
//         <Route path='/instructor' element={<InstructorDashboard/>}/>
//         <Route path='/instructor/quiz' element = {< QuizeDashboard/>} />
//         <Route path='/instructor/content' element = {<Content/>}/>
//         <Route path="/student/:id" element={<Home />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/register" element={<Register />} />
//         <Route path = "/instructor/question" element = {< AddQuestion />}/>
//         <Route path='/user/forgotPassword' element = {<ReceiveEmail/>}/>
//         <Route path='/user/resetPassword/:token' element = {<ResetPassword/>}/>
//         <Route path='/user/confirmEmail/:token' element = {<ConfirmationPage/>}/>
//         <Route path='/student/questions/:quizId' element = {<QuizQuestions/>}/>
//
//       </Routes>
//     </Router>
//   );
// }

// export default App;
