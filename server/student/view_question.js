import { promisify } from "util";

const RetrieveQuestion = async (db, req, res) => {
  try {
    const { quiz_id } = req.params; // Assuming quiz_id is part of the request parameters

    const sql = `
      SELECT q.id as question_id, q.question_text, c.id as choice_id, c.choice_text, c.is_correct
      FROM question q
      JOIN choice c ON q.id = c.question_id
      WHERE q.quiz_id = $1
    `;

    const query = promisify(db.query).bind(db);
    const result = await query(sql, [quiz_id]);
    // result has a propety like rows, field and so on

    if (!result.rows || !Array.isArray(result.rows)) {
      //console.error('Invalid result format:', result);
      return res.status(500).json({ message: "Internal server error" });
    }

    const questionsWithChoices = result.rows.reduce((acc, row) => {
      if (!acc[row.question_id]) {
        acc[row.question_id] = {
          question_id: row.question_id,
          question_text: row.question_text,
          choices: [],
        };
      }

      acc[row.question_id].choices.push({
        choice_id: row.choice_id,
        choice_text: row.choice_text,
        is_correct: row.is_correct,
      });

      return acc;
    }, {});

    res.status(200).json({ questionsWithChoices });
  } catch (error) {
    //console.error('Error retrieving questions and choices:', error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export default RetrieveQuestion;
