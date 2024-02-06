// login.js
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
const jwtSecretKey = 'AmareAbewaDemekeClubGood';

export default async function loginUser(db, req, res) {
  try {
    const { username, password } = req.body;

    // Check if the user exists with the provided username
    const userQuery = 'SELECT * FROM user WHERE username = ?';
    db.query(userQuery, [username], async (userErr, userResult) => {
      if (userErr) {
        //console.log(userErr);
        return res.status(500).json({ success: false, message: 'Login failed' });
      }

      if (userResult.length === 0) {
        return res.status(401).json({ success: false, message: 'Invalid username or password' });
      }

      // Compare the provided password with the hashed password in the database
      const isValidPassword = await bcrypt.compare(password, userResult[0].password);

      if (!isValidPassword) {
        return res.status(401).json({ success: false, message: 'Invalid password' });
      }

      // Generate a JWT token for authentication with a 1-minute expiration
      const token = jwt.sign({ userId: userResult[0].id }, jwtSecretKey, { expiresIn: '1m' });

      // Send the token as a response to the client
      res.status(200).json({ success: true, token, user: { id: userResult[0].id, username: userResult[0].username } });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Login failed' });
  }
}
