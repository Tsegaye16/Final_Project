import { promisify } from "util";
import crypto from 'crypto';
import transporter from "./node_mailer.js";

const ResetPassword = async (db, req, res) => {
  const { email } = req.body;

  // Check if user exists in the database
  const getUserQuery = 'SELECT * FROM users WHERE email = ?';
  const promisifiedQuery = promisify(db.query).bind(db);

  try {
    const result = await promisifiedQuery(getUserQuery, [email]);
    

    if (result.length === 0) {
        
      return res.status(404).json({ message: 'User not found' });
    }

    const token = crypto.randomBytes(20).toString('hex');
    console.log("Token:",token)
    const expires = Date.now() + 3600000; // Token expires in 1 hour
    console.log("Exprires",expires)

    const insertTokenQuery = 'INSERT INTO reset_tokens (email, token, expires) VALUES (?, ?, ?)';
   await promisifiedQuery(insertTokenQuery, [email, token, expires]);

    // Send reset email with the token link
    const resetLink = `http://localhost:3000/user/resetPassword?token=${token}`;
    const mailOptions = {
      from: 'abewatsegaye16@gmail.com',
      to: email,
      subject: 'Password Reset',
      text: `Click the following link to reset your password: ${resetLink}`,
    };

    transporter.sendMail(mailOptions, (mailError) => {
      if (mailError) {
        console.log(mailError)
        return res.status(500).json({ message: 'Failed to send reset email' });
      }

      return res.json({ message: 'Reset email sent successfully' });
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Database error' });
  }
};

export default ResetPassword;
