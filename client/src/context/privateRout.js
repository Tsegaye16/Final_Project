// PrivateRoute.js
import React, { useEffect, useState } from 'react';
import { Route, Navigate } from 'react-router-dom';

const PrivateRoute = ({ element, allowedRoles }) => {
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      setAuthenticated(true);
    }
  }, []);

  const userRole = getUserRoleFromToken();

  const getUserRoleFromToken = () => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      const decodedToken = JSON.parse(atob(token.split('.')[1]));
      return decodedToken.role_name;
    }
    return null;
  };

  const isAuthorized = authenticated && allowedRoles.includes(userRole);

  return (
    <Route
      element={isAuthorized ? element : <Navigate to="/login" />}
    />
  );
};

export default PrivateRoute;
