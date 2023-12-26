import express from'express';
import cors from'cors';
import bcrypt from'bcrypt';
import jwt from'jsonwebtoken';
import mysql from'mysql';
import cookieParser from 'cookie-parser';


const app = express();
app.use(express.json());
//app.use(cors())
app.use(cors({ 
  origin:true,
  methods:["POST","GET","DELETE"],
  allowedHeaders: ['Content-Type', 'Origin', 'X-Requested-With', 'Accept', 'x-client-key', 'x-client-token', 'x-client-secret', 'Authorization'],
  credentials:true
 }))
app.use(cookieParser())
const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'Amare_Abewa12',
  database: 'project',
});

const jwtSecretKey = 'AmareAbewaDemekeClubGood';

// Registration
app.post('/register', async (req, res) => {
    try {
      const { name, email, username, password } = req.body;
  
      // Check if the table is empty
      const checkQuery = 'SELECT COUNT(*) AS count FROM user';
      db.query(checkQuery, async (checkErr, checkResult) => {
        if (checkErr) {
          return res.status(500).json({ message: 'Registration failed' });
        }
  
        if (checkResult[0].count === 0) {
          // If the table is empty, directly register the user
          const hashedPassword = await bcrypt.hash(password, 10);
          const registerQuery = 'INSERT INTO user (name, email, username, password) VALUES (?, ?, ?, ?)';
          db.query(registerQuery, [name, email, username, hashedPassword], (regErr, regResult) => {
            if (regErr) {
              return res.status(500).json({ message: 'Registration failed' });
            }
            res.status(201).json({ message: 'Registration successful' });
          });
        } else {
          // If the table is not empty, check if the email is already present
          const emailCheckQuery = 'SELECT * FROM user WHERE email = ?';
          db.query(emailCheckQuery, [email], async (emailCheckErr, emailCheckResult) => {
            if (emailCheckErr) {
              return res.status(500).json({ message: 'Registration failed' });
            }
  
            if (emailCheckResult.length > 0) {
              // User already exists with the given email
              return res.status(409).json({ message: 'User already exists with the provided email' });
            }
  
            // Register the user
            const hashedPassword = await bcrypt.hash(password, 10);
            const registerQuery = 'INSERT INTO user (name, email, username, password) VALUES (?, ?, ?, ?)';
            db.query(registerQuery, [name, email, username, hashedPassword], (regErr, regResult) => {
              if (regErr) {
                return res.status(500).json({ message: 'Registration failed' });
              }
              res.status(201).json({ message: 'Registration successful' });
            });
          });
        }
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Registration failed' });
    }
  });
// Login
app.post('/login', async (req, res) => {
    try {
      const { username, password } = req.body;
  
      // Check if the user exists with the provided username
      const userQuery = 'SELECT * FROM user WHERE username = ?';
      db.query(userQuery, [username], async (userErr, userResult) => {
        if (userErr) {
          return res.status(500).json({ message: 'Login failed' });
        }
  
        if (userResult.length === 0) {
          return res.status(401).json({ message: 'Invalid username or password' });
        }
  
        // Compare the provided password with the hashed password in the database
        const isValidPassword = await bcrypt.compare(password, userResult[0].password);
  
        if (!isValidPassword) {
          return res.status(401).json({ message: 'Invalid username or password' });
        }
  
        // Generate a JWT token for authentication
        const token = jwt.sign({ userId: userResult[0].id }, jwtSecretKey, { expiresIn: '1d' });
  
        // Set the token in cookies
        res.cookie( `accessToken_${userResult[0].id}`, token, {
          httpOnly: true,
          secure: true, // Set to true in production environments
        });
        
      
  
        // Send the response with the token
        res.status(200).json({ token, user: { id: userResult[0].id, username: userResult[0].username } });
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Login failed' });
    }
  });

// Logout
app.post('/logout', (req, res) => {
  try {
    // Clear the authentication token
    res.clearCookie('accessToken');
    res.status(200).json({ message: 'Logout successful' });
  } catch (error) {
    console.error("My Error",error);
    res.status(500).json({ message: 'Logout failed' });
  }
  });

const PORT = 8800;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
