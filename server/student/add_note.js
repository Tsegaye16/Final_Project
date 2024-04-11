import { promisify } from "util";

const addNote = async (db, req, res) => {
  try {
    const { poster_id, poster_role, title, note_text } = req.body;
    const query = promisify(db.query).bind(db);
    console.log("Poster Id", poster_id);
    const sql =
      "INSERT INTO note (poster_id, poster_role, title, note_text) VALUES (?, ?, ?, ?)";
    const result = await query(sql, [poster_id, poster_role, title, note_text]);
    console.log(result);
    res.status(201).json({ message: "Note added", note_id: result.insertId });
  } catch (err) {
    res.status(500).json({ message: "Adding note failed" });
  }
};

export default addNote;
