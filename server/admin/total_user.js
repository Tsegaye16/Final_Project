import { promisify } from "util";

const TotalUser = async (db, req, res) => {
  try {
    const query = promisify(db.query).bind(db);
    const sql =
      "SELECT COUNT(*) AS total FROM users WHERE user_id IN (SELECT user_id FROM email_confirmations WHERE is_confirmed = 1)";
    const result = await query(sql);
    res.send(result);
  } catch (err) {
    res.status(500).json({ message: "query error" });
  }
};

export default TotalUser;
