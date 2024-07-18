import { promisify } from "util";

const RetrieveQuestion = async (db, req, resquiz_id) => {
  try {
    const { quiz_id } = req.body;
    const sql = `
      SELECT q.id as question_id, q.question_text, c.id as choice_id, c.choice_text, c.is_correct, q.difficulty, q.mark
      FROM question q
      JOIN choice c ON q.id = c.question_id
      WHERE q.quiz_id = ?
    `;

    const query = promisify(db.query).bind(db);
    const result = await query(sql, [quiz_id]);

    if (!result || !Array.isArray(result)) {
      console.error("Invalid result format:", result);
      return null;
    }

    const questionsWithChoices = result.reduce((acc, row) => {
      if (!acc[row.question_id]) {
        acc[row.question_id] = {
          question_id: row.question_id,
          question_text: row.question_text,
          choices: [],
          difficulty: row.difficulty,
          mark: row.mark,
        };
      }

      acc[row.question_id].choices.push({
        choice_id: row.choice_id,
        choice_text: row.choice_text,
        is_correct: row.is_correct,
      });

      return acc;
    }, {});

    return questionsWithChoices;
  } catch (error) {
    console.error("Error retrieving questions and choices:", error);
    return null;
  }
};

export default RetrieveQuestion;
