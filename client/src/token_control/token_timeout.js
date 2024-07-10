import { useEffect } from 'react';

const useTokenTimeout = () => {
  useEffect(() => {
    let logoutTimer; // Variable to store the timeout ID

    // Function to reset the logout timer
    const resetLogoutTimer = () => {
      // Clear the existing timeout, if any
      clearTimeout(logoutTimer);

      // Set a new timeout for 10 minutes
      logoutTimer = setTimeout(() => {
        // Remove token from local storage
        localStorage.removeItem('accessToken');
        // Redirect user to logout or login page, if needed
        window.location.href = '/login';
      }, 60 * 60 * 1000); // 10 minutes in milliseconds
    };

    // Event listeners to track user activity
    const handleActivity = () => {
      resetLogoutTimer();
    };

    document.addEventListener('mousemove', handleActivity);
    document.addEventListener('keydown', handleActivity);
    // Add other event listeners as needed

    // Call resetLogoutTimer when component mounts
    resetLogoutTimer();

    // Clean up event listeners when component unmounts
    return () => {
      clearTimeout(logoutTimer);
      document.removeEventListener('mousemove', handleActivity);
      document.removeEventListener('keydown', handleActivity);
      // Remove other event listeners as needed
    };
  }, []);
};

export default useTokenTimeout;
