import { promisify } from "util";

const postedNote = async (db, req, res) => {
  try {
    const query = promisify(db.query).bind(db);
    const sql = "SELECT * FROM note";
    const result = await query(sql);

    res.status(200).json(result);
  } catch (err) {
    console.error("Error fetching data:", err);
    res.status(500).json({ message: "failed to fatch data" });
  }
};

export default postedNote;
