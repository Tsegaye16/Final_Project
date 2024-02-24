
import { useState, useEffect } from 'react'
import axios from 'axios';
import "./quiz.scss"

function Quiz() {
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8800/student/viewQuize')
      .then(response => {
        setQuizzes(response.data);
      })
      .catch(error => {
        console.error('Error fetching quizzes:', error);
      });
  }, []);

  return (
    <div>
      <h1>Quizzes</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>            
            <th>Description</th>            
            <th>Total Easy</th>
            <th>Total Medium</th>
            <th>Total Hard</th>
            <th>Total Questions</th>
            <th>Total_mark_of_easy</th>
            <th>Total_mark_of_medium</th>
            <th>Total_mark_of_hard</th>
            <th>Total Marks</th>
          </tr>
        </thead>
        <tbody>
          {quizzes.map(quiz => (
            <tr key={quiz.quiz_id}>
              <td>{quiz.quiz_id}</td>
              <td>{quiz.quiz_name}</td>
              <td>{quiz.description}</td>
              <td>{quiz.total_number_of_easy}</td>
              <td>{quiz.total_number_of_medium}</td>
              <td>{quiz.total_number_of_hard}</td>
              <td>{quiz.total_number_of_questions}</td>
              <td>{quiz.total_marks_of_easy}</td>
              <td>{quiz.total_marks_of_medium}</td>
              <td>{quiz.total_marks_of_hard}</td>
              
              <td>{quiz.total_marks}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Quiz