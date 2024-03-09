// login.js
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const jwtSecretKey = 'AmareAbewaDemekeClubGood';

export default async function loginUser(db, req, res) {
  try {
    const { email, password } = req.body;

    // Check if the user exists with the provided username
    const userQuery = 'SELECT * FROM users WHERE email = ?';
    db.query(userQuery, [email], async (userErr, userResult) => {
      if (userErr) {
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

      // Generate a JWT token for authentication with a 1-minute expiration
      const tokenPayload = {
        userId: userResult[0].id,
        user_id: userResult[0].user_id,
        role_name: userResult[0].role_name,
      };

      const token = jwt.sign(tokenPayload, jwtSecretKey, { expiresIn: '1m' });

      // Send the token as a response to the client
      res.status(200).json({
        success: true,
        token,
        user: {
          id: userResult[0].user_id,
          email: userResult[0].email,
          role_name: userResult[0].role_name,
        },
      });
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Login failed' });
  }
}
