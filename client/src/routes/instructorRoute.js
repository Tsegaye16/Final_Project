import { Routes, Route } from "react-router-dom";
import InstructorDashboard from "../Instructor/pages/dash_board";
import QuizDashboard from "../Instructor/manage_quiz/quizeDashboard";
import AddQuestion from "../Instructor/manage_quiz/addQuestion";
import InstructorsideHome from "../Instructor/manage_content/Content";
import StudentProfile from "../pages/profile/userProfile";
import AboutSection from "../pages/landingPage/dialog/AboutSection";
import { ContactUs } from "../pages/landingPage/dialog/contacts/contact";
import FeatureSection from "../pages/landingPage/dialog/feature";
import Team from "../pages/landingPage/dialog/team";

const InstructorRoutes = ({ userRole, token }) => {
  return (
    <Routes>
      <Route path="/contact" element={<ContactUs />} />
      <Route path="/profile" element={<StudentProfile />} />
      <Route path="/about" element={<AboutSection />} />
      <Route path="/feature" element={<FeatureSection />} />
      <Route path="/team" element={<Team />} />
      <Route path="/" element={<InstructorDashboard />} />
      <Route path="/quiz" element={<QuizDashboard />} />
      <Route path="/question" element={<AddQuestion />} />
      <Route
        path="/content"
        element={<InstructorsideHome userRole={userRole} token={token} />}
      />
    </Routes>
  );
};

export default InstructorRoutes;
