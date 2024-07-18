import { Routes, Route } from "react-router-dom";
import Home from "../pages/homePage/Home";
import Quiz from "../student/quiz";
import StudentProfile from "../profile/studentProfile/studentProfileUpdate";
import QuizQuestions from "../student/question_board";
import AboutSection from "../pages/landingPage/dialog/AboutSection";
import { ContactUs } from "../pages/landingPage/dialog/contacts/contact";
import FeatureSection from "../pages/landingPage/dialog/feature";
import Team from "../pages/landingPage/dialog/team";

const StudentRoutes = ({ userRole, token }) => {
  return (
    <Routes>
      <Route path="/about" element={<AboutSection />} />
      <Route path="/contact" element={<ContactUs />} />
      <Route path="/feature" element={<FeatureSection />} />
      <Route path="/team" element={<Team />} />
      <Route path="/:id" element={<Home userRole={userRole} token={token} />} />
      <Route path="/quiz" element={<Quiz />} />
      <Route path="/profile" element={<StudentProfile />} />
      <Route path="/questions/:quizId" element={<QuizQuestions />} />
    </Routes>
  );
};

export default StudentRoutes;
