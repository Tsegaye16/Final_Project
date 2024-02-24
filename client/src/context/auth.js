export const getUserRoleFromToken = (token) => {
  // Decode the JWT token
  const decodedToken = JSON.parse(atob(token.split('.')[1]));
  
  // Extract user role from decoded token
  const userRole = decodedToken.role_name; // Assuming the user role is stored in the 'role' claim
  
  return userRole;
};
