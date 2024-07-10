import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  List,
  ListItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
} from "@mui/material";
import "./quiz.css";
import { ArrowBack } from "@mui/icons-material";

function Quiz() {
  const [quizzes, setQuizzes] = useState([]);
  const [selectedQuizId, setSelectedQuizId] = useState(null);
  const [isConfirmationDialogOpen, setConfirmationDialogOpen] = useState(false);
  const [startQuizConfirmed, setStartQuizConfirmed] = useState(false); // New state
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:8800/student/viewQuize")
      .then((response) => {
        setQuizzes(response.data);
      })
      .catch((error) => {
        console.error("Error fetching quizzes:", error);
      });
  }, []);

  const handleAttemptClick = (quizId) => {
    setSelectedQuizId(quizId);
    setConfirmationDialogOpen(true);
  };

  const handleConfirmationDialogClose = () => {
    setConfirmationDialogOpen(false);
  };

  const handleConfirmationDialogConfirm = () => {
    // Send the selected quiz_id to the server-side
    axios
      .post("http://localhost:8800/student/startQuiz", {
        quiz_id: selectedQuizId,
      })
      .then((response) => {
        // Set the state to render QuizQuestions component
        setStartQuizConfirmed(true);
        navigate(`/student/questions/${selectedQuizId}`);
      })
      .catch((error) => {
        console.error("Error starting quiz:", error);
      });

    setConfirmationDialogOpen(false);
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <>
      <Box
        display="flex"
        justifyContent="flex-start"
        marginTop="20px"
        marginLeft="20px"
      >
        {" "}
        {/* Style back button */}
        <IconButton color="primary" onClick={handleBack}>
          <ArrowBack />
        </IconButton>
      </Box>
      <Container>
        <Typography variant="h3" gutterBottom>
          Quizzes
        </Typography>
        {quizzes.map((quiz) => (
          <Box key={quiz.quiz_id} mt={3}>
            <Card className="quiz-card">
              <CardContent>
                <Typography variant="h4" gutterBottom>
                  The quiz {quiz.quiz_name} has {quiz.total_number_of_questions}{" "}
                  questions
                </Typography>
                <List>
                  <ListItem>
                    <Typography variant="body1" paragraph>
                      {quiz.total_number_of_easy} easy questions, contains{" "}
                      {quiz.total_marks_of_easy} marks
                    </Typography>
                  </ListItem>
                  <ListItem>
                    <Typography variant="body1" paragraph>
                      {quiz.total_number_of_medium} medium questions, contains{" "}
                      {quiz.total_marks_of_medium} marks
                    </Typography>
                  </ListItem>
                  <ListItem>
                    <Typography variant="body1">
                      {quiz.total_number_of_hard} hard questions, contains{" "}
                      {quiz.total_marks_of_hard} marks
                    </Typography>
                  </ListItem>
                </List>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleAttemptClick(quiz.quiz_id)}
                >
                  Start
                </Button>
              </CardContent>
            </Card>
          </Box>
        ))}
        {/* Confirmation Dialog */}

        <Dialog
          open={isConfirmationDialogOpen}
          onClose={handleConfirmationDialogClose}
        >
          <DialogTitle>Confirmation</DialogTitle>
          <DialogContent>
            <Typography>Are you sure you want to start this quiz?</Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleConfirmationDialogClose} color="secondary">
              Cancel
            </Button>
            <Button onClick={handleConfirmationDialogConfirm} color="primary">
              Confirm
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </>
  );
}

export default Quiz;
