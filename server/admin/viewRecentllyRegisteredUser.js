import { query } from "express";
import { promisify } from "util";
const recentlyRegistered = async (db, req, res) => {
  try {
    const query = promisify(db.query).bind(db);
    const sql =
      "SELECT * FROM users WHERE role_name IS NULL AND user_id IN (SELECT user_id FROM email_confirmations WHERE is_confirmed = TRUE)";
    const result = await query(sql);
    
    res.send(result);
  } catch (err) {
    res.status(500).json({ message: "Error occured" });
  }
};

export default recentlyRegistered;
// const recentlyRegistered = (db, req, res) => {
//   const adminData =
//     "SELECT * FROM users WHERE role_name IS NULL AND user_id IN (SELECT user_id FROM email_confirmations WHERE is_confirmed = TRUE)";
//   db.query(adminData, (err, result) => {
//     if (err) {
//       //console.error('Error querying database:', err);
//       console.log("Error: ", err);
//       return res
//         .status(500)
//         .json({ error: "An error occurred while processing the request" });
//     }

//     if (result.length === 0) {
//       // No user found, send a message to the client side
//       return res.status(404).json({ message: "No user found" });
//     }

//     // User(s) found, send the result to the client side
//     res.send(result);
//   });
// };

// export default recentlyRegistered;
