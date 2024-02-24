import { promisify } from "util";

const studentViewQuiz = async (db, req, res) => {
    try{
        const sql = `SELECT
        q.id AS quiz_id,
        q.name AS quiz_name,
        q.description AS description,
        COUNT(que.id) AS total_number_of_questions,
        SUM(CASE WHEN que.difficulty = 'easy' THEN 1 ELSE 0 END) AS total_number_of_easy,
        SUM(CASE WHEN que.difficulty = 'medium' THEN 1 ELSE 0 END) AS total_number_of_medium,
        SUM(CASE WHEN que.difficulty = 'hard' THEN 1 ELSE 0 END) AS total_number_of_hard,
        SUM(que.mark) AS total_marks,
        SUM(CASE WHEN que.difficulty = 'easy' THEN que.mark ELSE 0 END) AS total_marks_of_easy,
        SUM(CASE WHEN que.difficulty = 'medium' THEN que.mark ELSE 0 END) AS total_marks_of_medium,
        SUM(CASE WHEN que.difficulty = 'hard' THEN que.mark ELSE 0 END) AS total_marks_of_hard
      FROM
        quiz q
      LEFT JOIN
        question que ON q.id = que.quiz_id
      GROUP BY
        q.id, q.name;
      `
      const query = promisify(db.query).bind(db)

      const result = await query(sql)
      res.json(result)
    } catch(err){
        res.status(500).json("Erro ocured")
    }
}

export default studentViewQuiz