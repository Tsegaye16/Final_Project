import { promisify } from "util";

const userMessage = async (db, req, res) => {
  try {
    const { user_name, user_email, message } = req.body;
    const query = promisify(db.query).bind(db);
    const sql =
      "INSERT INTO user_message (name, email, message) VALUES (?, ?, ?)";
    const result = await query(sql, [user_name, user_email, message]);
    //console.log("Result: ", result);
    res.status(200).json({ message: "Message sent" });
  } catch (error) {
    // console.log("Error: ", error);
    res.status(500).json({ message: "Queryerror" });
  }
};

export default userMessage;
