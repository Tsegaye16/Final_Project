import { promisify } from "util";

const updateNote = async (db, req, res) => {
  try {
    const { id, poster_id, poster_role, title, editedNote } = req.body;
    const sql = "UPDATE note SET title = ?, note_text = ? WHERE id = ?";
    const query = promisify(db.query).bind(db);
    const result = await query(sql, [title, editedNote, id]);
    console.log("result: ", result);
    res.status(200).json({ message: "Note updated successfully" });
  } catch (err) {
    res.status(500).json({ message: "Updation failed" });
  }
};

export default updateNote;
