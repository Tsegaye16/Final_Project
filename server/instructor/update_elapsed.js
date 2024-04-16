import { promisify } from "util";

const updateElapsed = async (db, req, res) => {
  try {
    const query = promisify(db.query).bind(db);
    const { poster_id, duration } = req.body;

    // Query to fetch instructor_id based on user_id
    const instructorIdQuery =
      "SELECT instructor_id FROM instructors WHERE user_id = ?";

    // Execute the query
    const idResult = await query(instructorIdQuery, [poster_id]);

    // Extract instructor_id from the first row of the result
    const instructorId = idResult[0].instructor_id;

    // Update query for elapsed_time table
    const updateQuery =
      "UPDATE elapsed_time SET poster_id = ?, duration = ? WHERE id = ?";

    // Execute the update query
    const result = await query(updateQuery, [instructorId, duration, 2]);

    res.status(200).json({ message: "Elapsed time updated successfully" });
  } catch (err) {
    res.status(500).send({ message: "Failed to update elapsed time" });
  }
};

export default updateElapsed;
