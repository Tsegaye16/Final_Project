import { Routes, Route } from "react-router-dom";
import AdminDashdoard from "../admin/dashboard/dashboard";
import StudentList from "../admin/manageStudent/student";
import StudentProfile from "../pages/profile/userProfile";
import InstructorList from "../admin/manageInstructor/instructor";
import Team from "../pages/landingPage/dialog/team";

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<AdminDashdoard />} />
      <Route path="/profile" element={<StudentProfile />} />
      <Route path="/team" element={<Team />} />
      <Route path="/instructor" element={<InstructorList />} />
      <Route path="/student/" element={<StudentList />} />
    </Routes>
  );
};

export default AdminRoutes;
