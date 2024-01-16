// logout.js
export default function logoutUser(req, res) {
  try {
    // Assuming you include the user ID in the request or token
    const userId = req.user ? req.user.userId : null; // Check if req.user is defined

    // Clear the token in cookies by setting an empty token and expiring it immediately
    if (userId) {
      res.cookie(`accessToken_${userId}`, '', {
        httpOnly: true,
        secure: true, // Set to true in production environments
        expires: new Date(0), // Expire immediately by setting a past date
      });

      res.status(200).json({ message: 'Logout successful' });
    } else {
      // Handle the case where userId is not available (e.g., user not authenticated)
      res.status(401).json({ message: 'Not authenticated' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Logout failed' });
  }
}
