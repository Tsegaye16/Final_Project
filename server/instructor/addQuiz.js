import { promisify } from "util";
// promisify is a utility function that converts callback-based functions into Promise-based ones.
const addQuiz = async (db, req, res) => {
  try {
    const { poster_id, name, description } = req.body;
    const query = promisify(db.query).bind(db);
    const retrieveSql =
      "SELECT instructor_id FROM instructors WHERE user_id = ?";
    const result = await query(retrieveSql, [poster_id]);
    const instructor_id = result[0].instructor_id;
    console.log("Instructor id: ", instructor_id);

    const insertingSql =
      "INSERT INTO quiz (poster_id, name, description) VALUES (?, ?, ?)";
    await query(insertingSql, [instructor_id, name, description]);
    
    res.status(200).json({ message: "success" });
  } catch (err) {
    res.status(500).json({ message: "failed" });
  }
};

export default addQuiz;
