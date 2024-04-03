import { promisify } from "util";

const addQuestion = async (db, req, res) => {
  try {
    const data = req.body;
    const questions = data.questions;
    console.log(questions);

    const queryAsync = promisify(db.query).bind(db);

    for (const question of questions) {
      const { question_number, question_text, difficulty, mark, choices } =
        question;

      // Insert data into the question table
      const questionInsertQuery =
        "INSERT INTO question (quiz_id, question_number, question_text, difficulty, mark) VALUES (?, ?, ?, ?, ?)";
      const questionInsertValues = [
        data.quiz_id,
        question_number,
        question_text,
        difficulty,
        mark,
      ];
      const questionResult = await queryAsync(
        questionInsertQuery,
        questionInsertValues
      );

      // Get the ID of the last inserted question
      const questionId = questionResult.insertId;

      // Insert choices into the choice table
      for (const choice of choices) {
        const { choice_text, is_correct } = choice;
        const choiceInsertQuery =
          "INSERT INTO choice (question_id, choice_text, is_correct) VALUES (?, ?, ?)";
        const choiceInsertValues = [questionId, choice_text, is_correct];
        await queryAsync(choiceInsertQuery, choiceInsertValues);
      }
    }

    res.status(200).json({ message: "Questions added successfully" });
  } catch (error) {
    console.error("Error adding questions:", error);
    res.status(500).json({ message: "Failed to add questions" });
  }
};

export default addQuestion;
