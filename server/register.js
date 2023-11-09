import { db } from "./db.js"
import bcrypt from "bcrypt"
const salt = 10
export default function Register(req, res){
    const sql = "INSERT INTO user (name, email, username, password) VALUES (?, ?, ?, ?)";
    bcrypt.hash(req.body.password.toString(), salt, (err, hash) => {
      if (err) {
        
        return res.json({ Error: "Error for hashing password" });
      }
      const values = [req.body.name, req.body.email, req.body.username, hash];
      db.query(sql, values, (error, result) => {
        if (error) {
          
          return res.json({ Error: "Inserting data Error in server" });
        }
        return res.json({ Status: "Success" });
      });
    });
  }
  