import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Container,
  Typography,
  Radio,
  FormControl,
  FormControlLabel,
  RadioGroup,
  Paper,
  Box,
} from '@mui/material';

function QuizQuestions({ quizId }) {
  const [questionsWithChoices, setQuestionsWithChoices] = useState([]);

  useEffect(() => {
    // Fetch questions and choices based on quiz ID
    axios.post('http://localhost:8800/student/startQuiz', { quiz_id: quizId })
      .then(response => {
        // Extract questionsWithChoices from the response object
        const { questionsWithChoices } = response.data;
        // Convert object to an array of values
        const questionsArray = Object.values(questionsWithChoices);
        setQuestionsWithChoices(questionsArray);
      })
      .catch(error => {
        console.error('Error fetching questions and choices:', error);
      });
  }, [quizId]);

  const getChoiceLabel = (index) => String.fromCharCode(65 + index); // A, B, C, D, ...

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Quiz Questions
      </Typography>
      {questionsWithChoices.map((question, questionIndex) => (
        <Paper key={question.question_id} elevation={3} style={{ padding: '15px', marginBottom: '20px' }}>
          <Typography variant="h5" gutterBottom>
            {questionIndex + 1}. {question.question_text}
          </Typography>
          <FormControl component="fieldset">
            <RadioGroup>
              {question.choices.map((choice, choiceIndex) => (
                <FormControlLabel
                  key={choice.choice_id}
                  value={choice.choice_text}
                  control={<Radio color="primary" />}
                  label={`${getChoiceLabel(choiceIndex)}. ${choice.choice_text}`}
                />
              ))}
            </RadioGroup>
          </FormControl>
        </Paper>
      ))}
    </Container>
  );
}

export default QuizQuestions;
