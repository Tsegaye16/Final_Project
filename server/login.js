// login.js
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const jwtSecretKey = 'AmareAbewaDemekeClubGood';

export default async function loginUser(db, req, res) {
  try {
    const { email, password } = req.body;

    // Check if the user exists with the provided email
    const userQuery = 'SELECT * FROM users WHERE email = ?';
    db.query(userQuery, [email], async (userErr, userResult) => {
      if (userErr) {
        console.log(userErr);
        return res.status(500).json({ success: false, message: 'Login failed' });
      }

      if (userResult.length === 0) {
        return res.status(401).json({ success: false, message: 'Invalid email or password' });
      }

      // Compare the provided password with the hashed password in the database
      const isValidPassword = await bcrypt.compare(password, userResult[0].password);

      if (!isValidPassword) {
        return res.status(401).json({ success: false, message: 'Invalid password' });
      }

      // Extract user information
      const { id, name, username, role_name } = userResult[0];

      // If role_name is null, assign it as 'student'
      const userRole = role_name || 'student';

      // Generate a JWT token for authentication with additional user information
      const token = jwt.sign(
        { userId: id, name, email, username, role_name: userRole },
        jwtSecretKey,
        { expiresIn: '30m' }
      );

      // Send the token as a response to the client along with user information
      res.status(200).json({
        success: true,
        token,
        user: { id, name, email, username, role_name: userRole },
      });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Login failed' });
  }
}
