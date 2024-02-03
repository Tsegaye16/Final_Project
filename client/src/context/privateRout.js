// PrivateRoute.js
import React from 'react';
import { Navigate, Route } from 'react-router-dom';
import { useUserContext } from './context/authContext';

const PrivateRoute = ({ element, roles }) => {
  const { isAuthenticated, role } = useUserContext();

  if (!isAuthenticated) {
    // Redirect to the login page if not authenticated
    return <Navigate to="/login" />;
  }

  if (roles && !roles.includes(role)) {
    // Redirect to an unauthorized page if the user's role is not allowed
    return <Navigate to="/" />;
  }

  // Render the specified element if authenticated and authorized
  return <Route element={element} />;
};

export default PrivateRoute;
