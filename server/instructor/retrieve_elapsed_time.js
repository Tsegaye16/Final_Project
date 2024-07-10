import { promisify } from "util";

const viewElapsed = async (db, req, res) => {
  try {
    const sql = "SELECT * FROM elapsed_time";
    const query = promisify(db.query).bind(db);
    const result = await query(sql);
    res.json({ time: result });
  } catch (err) {
    res.status(500).json({ message: "Error getting elapsed time" });
  }
};

export default viewElapsed;
