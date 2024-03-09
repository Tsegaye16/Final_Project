import { promisify } from 'util';

const studentProfile = async (db, req, res) => {
  try {
    const { id } = req.body;
    console.log(id)
    const user_info = 'SELECT * FROM users WHERE user_id = ?';
    const query = promisify(db.query).bind(db);
    const result = await query(user_info, [id]);
    console.log(result);
    res.status(200).json(result); // Send the result to the client

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Fetching data error" });
  }
};

export default studentProfile;
