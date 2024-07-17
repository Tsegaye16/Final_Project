export const getUserRoleFromToken = (token) => {
  const decodedToken = JSON.parse(atob(token.split(".")[1]));
  return decodedToken.role_name;
};
