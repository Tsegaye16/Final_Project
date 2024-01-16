// register.js
import bcrypt from 'bcrypt';

export default async function registerUser(db, req, res) {
    try {
        const { name, email, username, password } = req.body;
    
        // Check if the table is empty
        const checkQuery = 'SELECT COUNT(*) AS count FROM users';
        db.query(checkQuery, async (checkErr, checkResult) => {
          if (checkErr) {
            console.log(checkErr)
            return res.status(500).json({ message: 'Registration failed' });
          }
          //let orginal = bcrypt.orginal()
    
          if (checkResult[0].count === 0) {
            // If the table is empty, directly register the user
            const hashedPassword = await bcrypt.hash(password, 10);
            
            const registerQuery = 'INSERT INTO users (name, email, username, password) VALUES (?, ?, ?, ?)';
            db.query(registerQuery, [name, email, username, hashedPassword], (regErr, regResult) => {
              if (regErr) {
                console.log(regErr)
                return res.status(500).json({ message: 'Registration failed' });
              }
              res.status(201).json({ message: 'Registration successful' });
            });
          } else {
            // If the table is not empty, check if the email is already present
            const emailCheckQuery = 'SELECT * FROM users WHERE email = ? AND username = ?';
            db.query(emailCheckQuery, [email, username], async (emailCheckErr, emailCheckResult) => {
              if (emailCheckErr) {
                console.log(emailCheckErr)
                return res.status(500).json({ message: 'Registration failed' });
              }
    
              if (emailCheckResult.length > 0) {
                // User already exists with the given email
                return res.status(409).json({ message: 'User already exists with the provided email' });
              }
    
              // Register the user
              const hashedPassword = await bcrypt.hash(password, 10);
              const registerQuery = 'INSERT INTO users (name, email, username, password) VALUES (?, ?, ?, ?)';
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
}
