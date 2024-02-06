import React, { useState } from 'react';
import './addQuestion.scss';

const AddQuestion = () => {
  const [numQuestions, setNumQuestions] = useState(0);
  const [questions, setQuestions] = useState([]);

  const handleNumQuestionsChange = (e) => {
    setNumQuestions(parseInt(e.target.value));
    setQuestions(Array.from({ length: parseInt(e.target.value) }, (_, index) => ({ id: index + 1, choices: ['', '', '', ''], correctAnswer: '' })));
  };

  const handleChoiceChange = (questionIndex, choiceIndex, e) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].choices[choiceIndex] = e.target.value;
    setQuestions(updatedQuestions);
  };

  const handleCorrectAnswerChange = (questionIndex, e) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].correctAnswer = e.target.value;
    setQuestions(updatedQuestions);
  };

  return (
    <div className="add-question-container">
      <label htmlFor="num-questions">Number of Questions:</label>
      <input type="number" id="num-questions" value={numQuestions} onChange={handleNumQuestionsChange} />

      {questions.map((question, index) => (
        <div className="question-container" key={question.id}>
          <p>Question {index + 1}:</p>
          <input type="text" placeholder={`Question ${index + 1}`} />

          <div className="choice-container">
            {[...Array(4)].map((_, choiceIndex) => (
              <input
                key={choiceIndex}
                type="text"
                placeholder={`Choice ${choiceIndex + 1}`}
                value={questions[index].choices[choiceIndex]}
                onChange={(e) => handleChoiceChange(index, choiceIndex, e)}
              />
            ))}
          </div>

          <label htmlFor={`correct-answer-${index}`}>Correct Answer:</label>
          <select id={`correct-answer-${index}`} value={questions[index].correctAnswer} onChange={(e) => handleCorrectAnswerChange(index, e)}>
            <option value="">Select...</option>
            {questions[index].choices.map((choice, choiceIndex) => (
              <option key={choiceIndex} value={choice}>{`Choice ${choiceIndex + 1}`}</option>
            ))}
          </select>
        </div>
      ))}
    </div>
  );
};

export default AddQuestion;
