import { promisify } from "util";

const deleteUser = async (db, req, res) => {
  try {
    const user_id = req.params.user_id;

    // Check if the resource exists before attempting to delete
    const query = promisify(db.query).bind(db);
    const result = await query("SELECT * FROM users WHERE user_id = ?", [
      user_id,
    ]);

    if (result.length === 0) {
      return res.status(404).json({ error: "student not found" });
    }

    // If the resource exists, proceed with deletion
    //DELETE FROM users WHERE user_id = (SELECT user_id FROM instructors WHERE instructor_id = ?);
    await query("DELETE FROM users WHERE user_id = ?", [user_id]);

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    //  console.error('Error deleting instructor:', error);
    res
      .status(500)
      .json({ error: "An error occurred while deleting instructor" });
  }
};

export default deleteUser;
