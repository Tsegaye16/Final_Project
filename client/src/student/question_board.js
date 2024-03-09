import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Container,
  Typography,
  Radio,
  FormControl,
  FormControlLabel,
  RadioGroup,
  Paper,
  Button,
  Box,
  IconButton,
} from '@mui/material';
import { ArrowBack } from '@mui/icons-material';

function QuizQuestions() {
  const { quizId } = useParams();
  const navigate = useNavigate();
  const [questionsWithChoices, setQuestionsWithChoices] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [resultMessages, setResultMessages] = useState({});
  const [disabledOptions, setDisabledOptions] = useState({});
  const [correctAnswer, setCorrectAnswer] = useState({});

  useEffect(() => {
    axios.post('http://localhost:8800/student/startQuiz', { quiz_id: quizId })
      .then(response => {
        const { questionsWithChoices } = response.data;
        const questionsArray = Object.values(questionsWithChoices);
        const initialResultMessages = questionsArray.reduce((acc, question) => {
          acc[question.question_id] = '';
          return acc;
        }, {});
        setResultMessages(initialResultMessages);
        setQuestionsWithChoices(questionsArray);
      })
      .catch(error => {
        console.error('Error fetching questions and choices:', error);
      });
  }, [quizId]);

  const getChoiceLabel = (index) => String.fromCharCode(65 + index);

  const handleOptionChange = (questionId, choiceId) => {
    setSelectedOptions(prevOptions => ({
      ...prevOptions,
      [questionId]: choiceId,
    }));
  };

  const handleSave = (questionId) => {
    const selectedQuestion = questionsWithChoices.find(question => question.question_id === questionId);
    const selectedChoice = selectedQuestion.choices.find(choice => choice.choice_id === selectedOptions[questionId]);
    
    let message = '';
    if (selectedChoice.is_correct) {
      message = 'Great job! Go ahead';
    } else {
      message = 'You missed it';
    }
    
    const correctAnswer = selectedQuestion.choices.find(choice => choice.is_correct);
    const correctAnswerMessage = `The correct answer is ${correctAnswer.choice_text}`;
    
    setResultMessages(prevMessages => ({
      ...prevMessages,
      [questionId]: message,
    }));
    
    setDisabledOptions(prevOptions => ({
      ...prevOptions,
      [questionId]: true,
    }));
    
    setCorrectAnswer(prevCorrectAnswers => ({
      ...prevCorrectAnswers,
      [questionId]: correctAnswerMessage,
    }));
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <div style={{ flex: '3', overflowY: 'auto' }}>
        <Container maxWidth="md">
          <Typography variant="h4" gutterBottom>
            Good Luck 🍀🍀
          </Typography>
          {questionsWithChoices.length > 0 ? (
            questionsWithChoices.map((question, questionIndex) => (
              <Paper key={question.question_id} elevation={3} style={{ padding: '15px', marginBottom: '20px' }}>
                <Typography variant="h5" gutterBottom>
                  {questionIndex + 1}. {question.question_text} <span style={{ color: 'blue', fontSize: '0.8em' }}>({question.difficulty})</span>
                </Typography>
                <FormControl component="fieldset">
                  <RadioGroup>
                    {question.choices.map((choice, choiceIndex) => (
                      <FormControlLabel
                        key={choice.choice_id}
                        value={choice.choice_text}
                        control={<Radio color="primary" />}
                        label={`${getChoiceLabel(choiceIndex)}. ${choice.choice_text}`}
                        onChange={() => handleOptionChange(question.question_id, choice.choice_id)}
                        disabled={disabledOptions[question.question_id]} // Disable choices only for the current question
                      />
                    ))}
                  </RadioGroup>
                </FormControl>
                <Typography variant="body1" style={{ marginLeft: '10px', color: resultMessages[question.question_id] ? (resultMessages[question.question_id].includes('Great') ? 'green' : 'red') : 'inherit' }}>
                  {resultMessages[question.question_id]}
                  {correctAnswer[question.question_id] && (
                    <span style={{ color: 'green', marginLeft: '10px' }}>
                      {correctAnswer[question.question_id]}
                    </span>
                  )}
                </Typography>
                {selectedOptions[question.question_id] && (
                  <Box display="flex" justifyContent="flex-end" alignItems="center" marginTop="10px">
                    <Button variant="contained" color="primary" onClick={() => handleSave(question.question_id)} disabled={disabledOptions[question.question_id]}>
                      Save
                    </Button>
                  </Box>
                )}
              </Paper>
            ))
          ) : (
            <Typography variant="body1">
              Questions are not available for this quiz.
            </Typography>
          )}
        </Container>
      </div>
      <div style={{ position: 'fixed', right: '20px', top: '20px', zIndex: 1000 }}>
        <Container maxWidth="md" style={{ border: '1px solid #ccc', padding: '20px' }}>
          <Typography variant="h5" gutterBottom>
            Quiz Progress
          </Typography>
          {Object.keys(selectedOptions).length > 0 && (
            <>
              <Typography variant="body1" gutterBottom>
                Progress: {((Object.keys(selectedOptions).length / questionsWithChoices.length) * 100).toFixed(2)}%
              </Typography>
              <Typography variant="body1" gutterBottom>
                You lose: {((Object.values(resultMessages).filter(message => message.includes('You missed it')).length / Object.keys(selectedOptions).length) * 100).toFixed(2)}%
              </Typography>
              <Typography variant="body1" gutterBottom>
                You gain: {((Object.values(resultMessages).filter(message => message.includes('Great job! Go ahead')).length / Object.keys(selectedOptions).length) * 100).toFixed(2)}%
              </Typography>
            </>
          )}
        </Container>
      </div>
      <div style={{ position: 'fixed', left: '20px', top: '20px', zIndex: 1000 }}>
        <IconButton color="primary" onClick={handleBack}>
          <ArrowBack />
        </IconButton>
      </div>
    </div>
  );
}

export default QuizQuestions;
