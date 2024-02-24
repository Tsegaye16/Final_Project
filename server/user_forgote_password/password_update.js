import { promisify } from 'util';
import bcrypt from 'bcrypt';

// Endpoint to validate token and update user password
const UpdatePassword = async (db, req, res) => {
  const { email, token, newPassword } = req.body;

  // Check if the token exists and is not expired
  const checkTokenQuery = 'SELECT * FROM reset_tokens WHERE email = ? AND token = ? AND expires > ?';

  const query = promisify(db.query).bind(db);

  try {
    const tokenResults = await query(checkTokenQuery, [email, token, Date.now()]);

    if (tokenResults.length === 0) {
      return res.status(400).json({ message: 'Invalid or expired token' });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update user password in the database with the hashed password
    const updatePasswordQuery = 'UPDATE users SET password = ? WHERE email = ?';
    await query(updatePasswordQuery, [hashedPassword, email]);

    // Delete used token from the database
    const deleteTokenQuery = 'DELETE FROM reset_tokens WHERE email = ? AND token = ?';
    await query(deleteTokenQuery, [email, token]);

    return res.json({ message: 'Password reset successful' });
  } catch (error) {
    return res.status(500).json({ message: 'Database error' });
  }
};

export default UpdatePassword;
