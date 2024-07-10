import { promisify } from "util";
import crypto from "crypto";
import transporter from "./node_mailer.js";

const ResetPassword = async (db, req, res) => {
  const { email } = req.body;

  // Check if user exists in the database
  const getUserQuery = "SELECT * FROM users WHERE email = ?";
  const promisifiedQuery = promisify(db.query).bind(db);

  try {
    const result = await promisifiedQuery(getUserQuery, [email]);

    if (result.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    let token;
    let expires;

    // Ensure the generated token is unique
    do {
      token = crypto.randomBytes(20).toString("hex");
      const checkTokenQuery = "SELECT * FROM reset_tokens WHERE token = ?";
      const tokenCheckResult = await promisifiedQuery(checkTokenQuery, [token]);
      if (tokenCheckResult.length === 0) {
        // If token is unique, break from the loop
        break;
      }
    } while (true);

    expires = Date.now() + 3600000; // Token expires in 1 hour

    const insertTokenQuery =
      "INSERT INTO reset_tokens (email, token, expires) VALUES (?, ?, ?)";
    await promisifiedQuery(insertTokenQuery, [email, token, expires]);

    // Send reset email with the token link
    const resetLink = `http://localhost:3000/user/resetPassword/${token}`;
    const mailOptions = {
      from: "abewatsegaye16@gmail.com",
      to: email,
      subject: "Password Reset",
      html: `
      <p>Thank you for registering! Click the button below to confirm your email:</p>
      <a href="${resetLink}">
        <button style="background-color: #4CAF50; border: none; color: white; padding: 15px 32px; text-align: center; text-decoration: none; display: inline-block; font-size: 16px; cursor:pointer">
          Confirm Email
        </button>
      </a>
    `,
    };

    transporter.sendMail(mailOptions, async (mailError) => {
      if (mailError) {
        return res.status(500).json({ message: "Failed to send reset email" });
      }

      // Set a timeout to remove the token after one hour
      setTimeout(async () => {
        const deleteTokenQuery = "DELETE FROM reset_tokens WHERE token = ?";
        await promisifiedQuery(deleteTokenQuery, [token]);
      }, 3600000);

      return res.json({ message: "Reset email sent successfully" });
    });
  } catch (error) {
    return res.status(500).json({ message: "Database error" });
  }
};

export default ResetPassword;
