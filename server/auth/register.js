import bcrypt from "bcrypt";
import crypto from "crypto";
import { promisify } from "util";
import transporter from "../user_forgote_password/node_mailer.js";

export default async function registerUser(db, req, res) {
  try {
    const { name, email, username, password } = req.body;

    // Check if the email already exists
    const emailCheckQuery =
      "SELECT is_confirmed FROM email_confirmations WHERE user_id = (SELECT user_id FROM users WHERE email = ?)";
    const promisifiedQuery = promisify(db.query).bind(db);

    const emailCheckResult = await promisifiedQuery(emailCheckQuery, [email]);

    if (emailCheckResult.length > 0) {
      const { is_confirmed } = emailCheckResult[0];

      if (is_confirmed === 1) {
        // User already exists with the provided email and it's confirmed
        return res.status(409).json({
          message:
            "User already exists with the provided email and it's confirmed. Please proceed to login.",
        });
      } else {
        // User already exists with the provided email but not confirmed
        // Update the existing unconfirmed email confirmation record
        const token = crypto.randomBytes(20).toString("hex");
        const expirationTime = Date.now() + 3600000;
        const updateConfirmationQuery =
          "UPDATE email_confirmations SET token = ?, expires = ? WHERE user_id = (SELECT user_id FROM users WHERE email = ?)";
        await promisifiedQuery(updateConfirmationQuery, [
          token,
          expirationTime,
          email,
        ]);

        // Send confirmation email with the updated token
        const confirmationLink = `http://localhost:3000/user/confirmEmail/${token}`;
        const mailOptions = {
          from: "abewatsegaye16@gmail.com",
          to: email,
          subject: "Email Confirmation",
          html: `
            <pre>Thank you for registering! Click the button below to confirm your email 
            with temporary password: ${password}</pre>
            <a href="${confirmationLink}">
              <button style="background-color: #4CAF50; border: none; color: white; padding: 15px 32px; text-align: center; text-decoration: none; display: inline-block; font-size: 16px; cursor:pointer">
                Confirm Email
              </button>
            </a>
          `,
        };

        transporter.sendMail(mailOptions, (mailError) => {
          if (mailError) {
            return res
              .status(500)
              .json({ message: "Failed to send confirmation email" });
          }
          return res.status(200).json({
            message: "User already exist, Confirmation email resent.",
          });
        });
      }
    } else {
      // If the email is unique and confirmed, proceed with registration
      const hashedPassword = await bcrypt.hash(password, 10);

      // Insert the new user into the users table
      const registerQuery =
        "INSERT INTO users (name, email, username, password) VALUES (?, ?, ?, ?)";
      const registerResult = await promisifiedQuery(registerQuery, [
        name,
        email,
        username,
        hashedPassword,
      ]);

      const userId = registerResult.insertId;

      // Generate a unique token
      let token;
      do {
        token = crypto.randomBytes(20).toString("hex");
        const checkTokenQuery =
          "SELECT COUNT(*) AS count FROM email_confirmations WHERE token = ?";
        const tokenCount = await promisifiedQuery(checkTokenQuery, [token]);
        if (tokenCount[0].count === 0) {
          break;
        }
      } while (true);

      // Calculate expiration time (1 hour from now)
      const expirationTime = Date.now() + 3600000;

      // Insert a record into email_confirmations table
      const insertConfirmationQuery =
        "INSERT INTO email_confirmations (user_id, token, expires) VALUES (?, ?, ?)";
      await promisifiedQuery(insertConfirmationQuery, [
        userId,
        token,
        expirationTime,
      ]);

      // Send confirmation email with the token link
      await sendConfirmationEmail(db, email, password);

      res
        .status(201)
        .json({ message: "Registration successful. Confirmation email sent." });
    }
  } catch (error) {
    res.status(500).json({ message: "Registration failed" });
  }
}

async function sendConfirmationEmail(db, email, password) {
  try {
    // Generate a unique token
    const token = crypto.randomBytes(20).toString("hex");

    // Calculate expiration time (1 hour from now)
    const expirationTime = Date.now() + 3600000;

    // Insert a record into email_confirmations table
    const insertConfirmationQuery =
      "INSERT INTO email_confirmations (user_id, token, expires) VALUES ((SELECT user_id FROM users WHERE email = ?), ?, ?)";
    const promisifiedQuery = promisify(db.query).bind(db);
    await promisifiedQuery(insertConfirmationQuery, [
      email,
      token,
      expirationTime,
    ]);

    // Send confirmation email with the token link
    const confirmationLink = `http://localhost:3000/user/confirmEmail/${token}`;
    const mailOptions = {
      from: "abewatsegaye16@gmail.com",
      to: email,
      subject: "Email Confirmation",
      html: `
        <pre>Thank you for registering! Click the button below to confirm your email
        with temporary password ${passwordd}</pre>
        <a href="${confirmationLink}">
          <button style="background-color: #4CAF50; border: none; color: white; padding: 15px 32px; text-align: center; text-decoration: none; display: inline-block; font-size: 16px; cursor:pointer">
            Confirm Email
          </button>
        </a>
      `,
    };

    transporter.sendMail(mailOptions, (mailError) => {
      if (mailError) {
        console.log("Error:", mailError);
        return Promise.reject(new Error("Failed to send confirmation email"));
      }
      return Promise.resolve();
    });
  } catch (error) {
    return Promise.reject(new Error("Failed to send confirmation email"));
  }
}
