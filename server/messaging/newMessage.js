import { promisify } from "util";

const newMessage = async (db, req, res) => {
  try {
    const query = promisify(db.query).bind(db);
    const sql = "SELECT * FROM user_message WHERE is_replayed IS NULL;";
    const result = await query(sql);
    res.send(result);
  } catch (err) {
    res.status(500).json({ message: "query error" });
  }
};

export default newMessage;
