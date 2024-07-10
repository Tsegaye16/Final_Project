import { promisify } from "util";

const deleteNote = async (db, req, res) => {
  try {
    
    const { id } = req.body;
    
    const query = promisify(db.query).bind(db);
    const sql = "DELETE FROM note WHERE id = ?";
    const result = await query(sql, [id]);
    res.status(200).json({ message: "Note deleted succefully!!!" });
  } catch (err) {
    res.status(500).json({ message: "Deleting error" });
  }
};

export default deleteNote;
