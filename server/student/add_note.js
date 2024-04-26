import { promisify } from "util";

const addNote = async (db, req, res) => {
  try {
    const { poster_id, poster_role, title, note_text } = req.body;
    const query = promisify(db.query).bind(db);

    const sql =
      "INSERT INTO note (poster_id, poster_role, title, note_text) VALUES (?, ?, ?, ?)";
    const result = await query(sql, [poster_id, poster_role, title, note_text]);
    console.log(result);
    res.status(201).json({ message: "Note added", note_id: result.insertId });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Adding note failed" });
  }
};

export default addNote;
