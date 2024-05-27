import { promisify } from "util";

const userFeedback = async (db, req, res) => {
  try {
    const query = promisify(db.query).bind(db);
    const sql = "SELECT COUNT(*) AS total FROM user_message";
    const result = await query(sql);
    res.send(result);
  } catch (err) {
    res.status(500).json({ message: "query error" });
  }
};

export default userFeedback;
