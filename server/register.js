// // register.js
// import bcrypt from 'bcrypt';

// export default async function registerUser(db, req, res) {
//     try {
//         const { name, email, username, password } = req.body;
    
//         // Check if the table is empty
//         const checkQuery = 'SELECT COUNT(*) AS count FROM users';
//         db.query(checkQuery, async (checkErr, checkResult) => {
//           if (checkErr) {
//             console.log(checkErr)
//             return res.status(500).json({ message: 'Registration failed' });
//           }
//           //let orginal = bcrypt.orginal()
    
//           if (checkResult[0].count === 0) {
//             // If the table is empty, directly register the user
//             const hashedPassword = await bcrypt.hash(password, 10);
            
//             const registerQuery = 'INSERT INTO users (name, email, username, password) VALUES (?, ?, ?, ?)';
//             db.query(registerQuery, [name, email, username, hashedPassword], (regErr, regResult) => {
//               if (regErr) {
//                 console.log(regErr)
//                 return res.status(500).json({ message: 'Registration failed' });
//               }
//               res.status(201).json({ message: 'Registration successful' });
//             });
//           } else {
//             // If the table is not empty, check if the email is already present
//             const emailCheckQuery = 'SELECT * FROM users WHERE email = ? AND username = ?';
//             db.query(emailCheckQuery, [email, username], async (emailCheckErr, emailCheckResult) => {
//               if (emailCheckErr) {
//                 console.log(emailCheckErr)
//                 return res.status(500).json({ message: 'Registration failed' });
//               }
    
//               if (emailCheckResult.length > 0) {
//                 // User already exists with the given email
//                 return res.status(409).json({ message: 'User already exists with the provided email' });
//               }
    
//               // Register the user
//               const hashedPassword = await bcrypt.hash(password, 10);
//               const registerQuery = 'INSERT INTO users (name, email, username, password) VALUES (?, ?, ?, ?)';
//               db.query(registerQuery, [name, email, username, hashedPassword], (regErr, regResult) => {
//                 if (regErr) {
//                   return res.status(500).json({ message: 'Registration failed' });
//                 }
//                 res.status(201).json({ message: 'Registration successful' });
//               });
//             });
//           }
//         });
//       } catch (error) {
//    // console.error(error);
//     res.status(500).json({ message: 'Registration failed' });
//   }
// }

// register.js
// register.js
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import { promisify } from 'util';
import transporter from './user_forgote_password/node_mailer.js';

export default async function registerUser(db, req, res) {
  try {
    const { name, email, username, password } = req.body;

    // Check if the email already exists
    const emailCheckQuery = 'SELECT COUNT(*) AS count FROM users WHERE email = ?';
    const promisifiedQuery = promisify(db.query).bind(db);
    const emailCheckResult = await promisifiedQuery(emailCheckQuery, [email]);

    if (emailCheckResult[0].count > 0) {
      // User already exists with the given email
      return res.status(409).json({ message: 'User already exists with the provided email' });
    }

    // If the email is unique, proceed with registration
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert the new user into the users table
    const registerQuery = 'INSERT INTO users (name, email, username, password) VALUES (?, ?, ?, ?)';
    const registerResult = await promisifiedQuery(registerQuery, [name, email, username, hashedPassword]);

    const userId = registerResult.insertId;

    // Generate a unique token
    let token;
    do {
      token = crypto.randomBytes(20).toString('hex');
      const checkTokenQuery = 'SELECT COUNT(*) AS count FROM email_confirmations WHERE token = ?';
      const tokenCount = await promisifiedQuery(checkTokenQuery, [token]);
      if (tokenCount[0].count === 0) {
        break;
      }
    } while (true);

    // Calculate expiration time (1 hour from now)
    const expirationTime = Date.now() + 3600000;

    // Insert a record into email_confirmations table
    const insertConfirmationQuery = 'INSERT INTO email_confirmations (user_id, token, expires) VALUES (?, ?, ?)';
    await promisifiedQuery(insertConfirmationQuery, [userId, token, expirationTime]);

    // Send confirmation email with the token link
    const confirmationLink = `http://localhost:3000/user/confirmEmail/${token}`;
    const mailOptions = {
      from: 'abewatsegaye16@gmail.com',
      to: email,
      subject: 'Email Confirmation',
      html: `
        <p>Thank you for registering! Click the button below to confirm your email:</p>
        <a href="${confirmationLink}">
          <button style="background-color: #4CAF50; border: none; color: white; padding: 15px 32px; text-align: center; text-decoration: none; display: inline-block; font-size: 16px;">
            Confirm Email
          </button>
        </a>
      `,
    };

    transporter.sendMail(mailOptions, (mailError) => {
      if (mailError) {
        console.error("Sending Email error: ", mailError);
        return res.status(500).json({ message: 'Failed to send confirmation email' });
      }

      res.status(201).json({ message: 'Registration successful. Confirmation email sent.' });
    });
  } catch (error) {
    console.error("Last Error: ", error);
    res.status(500).json({ message: 'Registration failed' });
  }
}
