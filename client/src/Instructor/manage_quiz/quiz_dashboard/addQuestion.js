import React, { useState } from 'react';
import axios from 'axios';
import './addQuestion.scss';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Container, Typography, TextField, Select, MenuItem, Button, Grid } from '@mui/material';

const AddQuestion = ({ cancel, quiz_name, quiz_id }) => {
  const [numQuestions, setNumQuestions] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [difficultyLevels, setDifficultyLevels] = useState([]);
  const [marks, setMarks] = useState(Array(numQuestions).fill(0));

  const handleNumQuestionsChange = (e) => {
    const count = parseInt(e.target.value);
    setNumQuestions(count);
    setQuestions(Array.from({ length: count }, (_, index) => ({ id: index + 1, text: '', choices: ['', '', '', ''], correctAnswer: '', difficulty: '' })));
    setDifficultyLevels(Array.from({ length: count }, () => ''));
    setMarks(Array(count).fill(0));
  };

  const handleTextChange = (index, e) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].text = e.target.value;
    setQuestions(updatedQuestions);
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

  const handleDifficultyChange = (questionIndex, e) => {
    const updatedDifficultyLevels = [...difficultyLevels];
    updatedDifficultyLevels[questionIndex] = e.target.value;
    setDifficultyLevels(updatedDifficultyLevels);
  };

  const handleMarkChange = (questionIndex, e) => {
    const updatedMarks = [...marks];
    updatedMarks[questionIndex] = parseInt(e.target.value);
    setMarks(updatedMarks);
  };

  const handleCancel = () => {
    // Reset the number of questions to 0
    setNumQuestions(0);
    // Clear the questions array
    setQuestions([]);
    // Clear the difficulty levels array
    setDifficultyLevels([]);
    // Call the cancel function from props
    cancel();
  };

  const handleSubmit = async () => {
    // Check if any question is empty
    if (questions.some(question => !question.text || question.choices.some(choice => !choice))) {
        toast.error('Please fill in all questions and choices');
        return;
    }

    // Check if any difficulty level or mark is not selected
    if (difficultyLevels.some(level => !level) || marks.some(mark => mark === 0)) {
        toast.error('Please select difficulty level and provide marks for all questions');
        return;
    }

    const payload = {
        quiz_id: quiz_id,
        questions: questions.map((question, index) => ({
            question_number: index + 1,
            question_text: question.text,
            difficulty: difficultyLevels[index],
            mark: marks[index],
            choices: question.choices.map((choice, choiceIndex) => ({
                choice_text: choice,
                is_correct: choiceIndex === parseInt(question.correctAnswer)
            }))
        }))
    };

    try {
        await axios.post('http://localhost:8800/addQuestion', payload);
        toast.success('Questions added successfully!')
        handleCancel(); // Reset form after successful submission
    } catch (error) {
        toast.error('Error adding questions')
    }
};


  const isSaveDisabled = numQuestions <= 0;

  return (
    <div className="add-question-container">
      <ToastContainer/>
      <h1>{`Adding question on quiz ${quiz_name}`}</h1>
      <label htmlFor="num-questions">Number of Questions:</label>
      <input type="number" id="num-questions" value={numQuestions} onChange={handleNumQuestionsChange} min={0}/>
      
      {questions.map((question, index) => (
        <div className="question-container" key={question.id}>
          <p>Question {index + 1}:</p>
          <input type="text" name='text' placeholder={`Enter question ${index + 1}`} value={question.text} onChange={(e) => handleTextChange(index, e)}/>

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
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} sm={4}>
              <Select
                value={questions[index].correctAnswer}
                onChange={(e) => handleCorrectAnswerChange(index, e)}
                fullWidth
                displayEmpty
                margin="normal"
              >
                <MenuItem value="">Select Correct answer</MenuItem>
                {questions[index].choices.map((choice, choiceIndex) => (
                  <MenuItem key={choiceIndex} value={choiceIndex}>{`Choice ${choiceIndex + 1}`}</MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Select
                value={difficultyLevels[index]}
                onChange={(e) => handleDifficultyChange(index, e)}
                fullWidth
                displayEmpty
                margin="normal"
              >
                <MenuItem value="">Select Difficulty</MenuItem>
                <MenuItem value="easy">Easy</MenuItem>
                <MenuItem value="medium">Medium</MenuItem>
                <MenuItem value="hard">Hard</MenuItem>
              </Select>
            </Grid>
            <Grid item xs={12} sm={4}>
              <input type="number"  placeholder="Mark" value={marks[index]} onChange={(e) => handleMarkChange(index, e)} min={0}/>
              </Grid>
            
            </Grid>
            
        </div>
      ))}
      <div className='button-cont'>        
        <Button variant="contained" className={`save ${isSaveDisabled ? 'disable': ''}`} disabled={isSaveDisabled} onClick={handleSubmit}>Save</Button>
        <Button variant="contained" className='cancel' onClick={handleCancel}>Cancel</Button>
      </div>
    </div>
  );
};

export default AddQuestion;