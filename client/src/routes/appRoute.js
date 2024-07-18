import { Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Login from "../pages/loginPage/Login";
import Landing from "../pages/landingPage/landing";
import Register from "../pages/registerPage/Register";
import ReceiveEmail from "../forgot_password/receive_user_email";
import ResetPassword from "../forgot_password/receive_new_password";
import ConfirmationPage from "../confirm_email/ConfirmationPage";
import NotFound from "../pages/error_handling/NotFound";
import Unauthorized from "../pages/error_handling/Unauthorized";
import useTokenTimeout from "../hooks/useTokenTimeout";
import LoadingSpinner from "./loadingSpinner";
import { getUserRoleFromToken } from "../utils/auth";
import StudentRoutes from "./studentRoute";
import InstructorRoutes from "./instructorRoute";
import AdminRoutes from "./adminRoute";

const AppRoutes = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState("");
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState("");

  useTokenTimeout();

  useEffect(() => {
    const storedToken = localStorage.getItem("accessToken");

    if (storedToken) {
      setToken(storedToken);
      setAuthenticated(true);
      const role = getUserRoleFromToken(storedToken) || "Student";
      setUserRole(role);
    }
    setLoading(false);
  }, []);

  const RedirectToDashboard = () => {
    if (!token) {
      return <Navigate to="/" />;
    }
    if (loading) {
      return <LoadingSpinner />;
    }
    if (!authenticated) {
      return <Navigate to="/login" />;
    } else {
      if (userRole === "Student") {
        return <Navigate to="/student" />;
      } else if (userRole === "Instructor") {
        return <Navigate to="/instructor" />;
      } else if (userRole === "Admin") {
        return <Navigate to="/admin" />;
      } else {
        return <Navigate to="/" />;
      }
    }
  };

  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/user/forgotPassword" element={<ReceiveEmail />} />
      <Route path="/user/resetPassword/:token" element={<ResetPassword />} />
      <Route path="/user/confirmEmail/:token" element={<ConfirmationPage />} />
      <Route
        path="/login"
        element={
          <Login
            setAuthenticated={setAuthenticated}
            setUserRole={setUserRole}
            setToken={setToken}
          />
        }
      />
      <Route path="/register" element={<Register />} />
      <Route path="/" element={<RedirectToDashboard />} />
      {authenticated && (
        <>
          {userRole === "Student" && (
            <Route
              path="/student/*"
              element={<StudentRoutes userRole={userRole} token={token} />}
            />
          )}
          {userRole === "Instructor" && (
            <Route
              path="/instructor/*"
              element={<InstructorRoutes userRole={userRole} token={token} />}
            />
          )}
          {userRole === "Admin" && (
            <Route path="/admin/*" element={<AdminRoutes />} />
          )}
        </>
      )}
      <Route path="*" element={<Unauthorized />} />
      <Route path="/unauthorized" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
