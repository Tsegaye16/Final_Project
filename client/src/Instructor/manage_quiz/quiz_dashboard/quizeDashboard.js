import React, { useState, useEffect } from "react";
import NavBar from "../../components/nav_bar/nav_bar";
import "./quizDashboard.scss";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AddQuestion from "./addQuestion";
import Footer from "../../../pages/landingPage/sample/dialog/footer";

function QuizDashboard() {
  const [sidebarWidth, setSidebarWidth] = useState(0);
  const [isHover, setIsHover] = useState(false);
  const [isQuiz, setIsQuiz] = useState(false);
  const [isQuestion, setIsQuestion] = useState(false);
  const [input, setInput] = useState({
    name: "",
    description: "",
  });
  const [quizzes, setQuizzes] = useState([]);
  const [selectedQuizName, setSelectedQuizName] = useState("");
  const [selectedQuizId, setSelectedQuizId] = useState("");
  const [id, setId] = useState(0);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    const decodedToken = JSON.parse(atob(token.split(".")[1]));
    setId(decodedToken.user_id);
  });

  useEffect(() => {
    axios
      .post("http://localhost:8800/student/viewProfile", { id: id })
      .then((response) => {
        setUserData(response.data);
        //console.log(response.data)
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  const handleAddQuiz = () => {
    setIsQuiz(true);
    setIsQuestion(false);
  };
  const handleAddQuestion = (quizName, quizId) => {
    setSelectedQuizName(quizName);
    setSelectedQuizId(quizId);
    setIsQuiz(false);
    setIsQuestion(true);
  };

  const handleInput = (e) => {
    setInput((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const handleQuizSave = async (e) => {
    // e.preventDefault();

    // Validation: Check if both name and description are filled
    if (!input.name || !input.description) {
      toast.error("Please fill in both name and description");
      return;
    }

    setIsQuiz(false);

    try {
      await axios.post("http://localhost:8800/addQuiz/", input);

      toast.success("Added successfully");

      setInput({
        name: "",
        description: "",
      });

      // Redirect to the same page
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error) {
      console.error("Failed:", error);
    }
  };

  const handleQuizCacell = () => {
    setIsQuiz(false);
  };
  const handleQuestionCancel = () => {
    setIsQuestion(false);
  };
  const dispayHover = () => {
    setIsHover(true);
  };
  const hideHover = () => {
    setIsHover(false);
  };

  const toggleSidebar = () => {
    setSidebarWidth((prevWidth) => (prevWidth === 0 ? 250 : 0));
  };

  // Retrieve the quiz pannel
  const fetchQuizzes = async () => {
    try {
      const response = await axios.get("http://localhost:8800/getQuizzes");
      setQuizzes(response.data.quizzes);
      console.log(quizzes);
    } catch (error) {
      console.error("Failed to fetch quizzes:", error);
    }
  };

  useEffect(() => {
    // Fetch quizzes when the component mounts
    fetchQuizzes();
  }, []);

  //Delete Quize
  const handleDeleteQuiz = async (id) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this quiz?"
    );
    if (isConfirmed) {
      console.log(id);
      try {
        await axios.delete(`http://localhost:8800/deleteQuiz/${id}`);

        toast.success("Quiz deleted successfully");

        setTimeout(() => {
          window.location.reload();
        }, 2000);
        fetchQuizzes(); // Fetch quizzes again after deletion
      } catch (error) {
        console.error("Failed to delete quiz:", error);
        toast.error("Failed to delete quiz");
      }
    }
  };

  return (
    <>
      <div className="quiz-dashboard-container">
        <ToastContainer />
        <NavBar
          toggleSidebar={toggleSidebar}
          sidebarWidth={sidebarWidth}
          userData={userData}
        />
        <div
          className="main-quiz-content"
          style={{ marginLeft: `${sidebarWidth}px` }}
        >
          <div className="add-quiz">
            <div
              className="add"
              onMouseEnter={dispayHover}
              onMouseLeave={hideHover}
              onClick={handleAddQuiz}
            >
              +
              <span className={`spam ${!isHover ? "display" : ""}`}>
                Add Quiz
              </span>
            </div>
          </div>

          <div className="question-board">
            <div className={`input-container ${isQuiz ? "quiz-display" : ""}`}>
              <form>
                <input
                  type="text"
                  placeholder="name"
                  onChange={handleInput}
                  name="name"
                />
                <input
                  type="text"
                  placeholder="Description"
                  onChange={handleInput}
                  name="description"
                />
                <div className="button-cont">
                  <button className="save" onClick={handleQuizSave}>
                    Save
                  </button>
                  <button
                    type="button"
                    className="cancel"
                    onClick={handleQuizCacell}
                  >
                    cancel
                  </button>
                </div>
              </form>
            </div>
            <div
              className={`question-container ${!isQuestion ? "question-display" : ""}`}
            >
              <AddQuestion
                cancel={handleQuestionCancel}
                quiz_name={selectedQuizName}
                quiz_id={selectedQuizId}
              />
            </div>
          </div>

          <div className="available-quiz">
            {quizzes.map((quiz) => (
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Description</th>
                  </tr>
                </thead>
                <tbody>
                  <>
                    <tr key={quiz.id}>
                      <td>{quiz.name}</td>
                      <td>{quiz.description}</td>
                    </tr>
                    <tr key={`${quiz.id}-actions`}>
                      <td className="actions">
                        <button
                          className="add-question-btn btnn"
                          onClick={() => handleAddQuestion(quiz.name, quiz.id)}
                        >
                          Add Question
                        </button>
                      </td>
                      <td className="actions">
                        <button
                          className="remove-btn btnn"
                          onClick={() => handleDeleteQuiz(quiz.id)}
                        >
                          Remove Quiz
                        </button>
                      </td>
                    </tr>
                  </>
                </tbody>
              </table>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default QuizDashboard;
