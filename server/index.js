import express from "express";
import cors from "cors";
import mysql from "mysql";
import cookieParser from "cookie-parser";
import registerUser from "./auth/register.js";
//import registerUser from "./register.js";
import loginUser from "./auth/login.js";
import logoutUser from "./auth/logout.js";
import viewStudent from "./admin/viewStudent.js";
import viewInstructor from "./admin/viewInstructor.js";
import viewAdmin from "./admin/viewHerself.js";
import multer from "multer";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import { dirname } from "path";
import updateAdminProfile from "./admin/updateHerProfile.js";
import updateStudentProfile from "./admin/updateStudentProfile.js";
import recentlyRegistered from "./admin/viewRecentllyRegisteredUser.js";
import updateRecentUser from "./admin/updateRecentlyRegisteredUser.js";
import updateInstructorProfile from "./admin/updateInstructorProfile.js";
import deleteInstructor from "./admin/deleteInstructor.js";
import deleteStudent from "./admin/deleteStudent.js";
import deleteUser from "./admin/deleteUser.js";
import addQuiz from "./instructor/addQuiz.js";
import viewQuiz from "./instructor/viewQuiz.js";
import deleteQuiz from "./instructor/deleteQuiz.js";
import addQuestion from "./instructor/addQuestion.js";
import ResetPassword from "./user_forgote_password/password_reset.js";
import UpdatePassword from "./user_forgote_password/password_update.js";
import RetrieveQuestion from "./student/view_question.js";
import studentViewQuiz from "./student/view_quiz.js";
import EmailConfirm from "./auth/email_confirm.js";
import studentProfile from "./student/view_profile.js";
import StudenUpdateProfile from "./student/update_profile.js";
import viewElapsed from "./instructor/retrieve_elapsed_time.js";
import updateElapsed from "./instructor/update_elapsed.js";
import postedNote from "./student/retrieve_note.js";
import updateNote from "./student/update_note.js";
import deleteNote from "./student/delete_note.js";
import addNote from "./student/add_note.js";
import TotalUser from "./admin/total_user.js";
import addUser from "./admin/addUser.js";
import userMessage from "./messaging/contact.js";
import userFeedback from "./messaging/notification.js";
import newMessage from "./messaging/newMessage.js";
import messageReplay from "./admin/messageReply.js";
import dotenv from "dotenv";
dotenv.config();
const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["POST", "GET", "DELETE", "PUT"],
    allowedHeaders: [
      "Content-Type",
      "Origin",
      "X-Requested-With",
      "Accept",
      "x-client-key",
      "x-client-token",
      "x-client-secret",
      "Authorization",
    ],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: process.env.DB_Password,
  database: "project",
  charset: "UTF8MB4_GENERAL_CI",
  //debug: true,
});
app.use(express.static("uploads"));

// Registration
app.post("/users/register", async (req, res) => {
  await registerUser(db, req, res);
});
// Login
app.post("/users/login", async (req, res) => {
  await loginUser(db, req, res);
});
//Logout
app.post("/users/logout", logoutUser);
// Endpoint to receive user email and initiate the password reset process
app.post("/users/reset-password", async (req, res) => {
  await ResetPassword(db, req, res);
});

// Endpoint to validate token and update user password
app.post("/users/update-password", async (req, res) => {
  await UpdatePassword(db, req, res);
});
app.post("/users/confirm-email/:token", async (req, res) => {
  await EmailConfirm(db, req, res);
});
app.post("/admin/adduser", async (req, res) => {
  await addUser(db, req, res);
});

// Admin View Student
app.get("/admin/viewStudent", async (req, res) => {
  //console.log('Received request to /admin/viewStudent');
  await viewStudent(db, req, res);
});

// Admin view Instructor
app.get("/admin/viewInstructor", async (req, res) => {
  //console.log('Received request to /admin/viewInstructor');
  await viewInstructor(db, req, res);
});
// Admin view herself
app.get("/admin/viewHerself", async (req, res) => {
  //console.log('Received request to /admin/viewHerself');
  await viewAdmin(db, req, res);
});

//Update Admin profile
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);
    const uploadFolder = path.join(__dirname, "uploads");
    // Create the 'uploads' folder if it doesn't exist
    if (!fs.existsSync(uploadFolder)) {
      fs.mkdirSync(uploadFolder);
    }
    cb(null, uploadFolder);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

app.put("/admin/updateAdmin", upload.single("image"), async (req, res) => {
  await updateAdminProfile(db, req, res);
});

app.put("/admin/updateStudent", upload.single("image"), async (req, res) => {
  await updateStudentProfile(db, req, res);
});

app.get("/admin/viewRecent", async (req, res) => {
  await recentlyRegistered(db, req, res);
});

app.put("/admin/updateRecentUser", upload.single("image"), async (req, res) => {
  await updateRecentUser(db, req, res);
});

app.put("/admin/updateInstructor", upload.single("image"), async (req, res) => {
  await updateInstructorProfile(db, req, res);
});
app.delete("/admin/deleteInstructor/:instructor_id", async (req, res) => {
  await deleteInstructor(db, req, res);
});
app.delete("/admin/deleteStudent/:student_id", async (req, res) => {
  await deleteStudent(db, req, res);
});
app.delete("/admin/deleteUser/:user_id", async (req, res) => {
  await deleteUser(db, req, res);
});

//Instructor add quiz
app.post("/instructors/addQuiz", async (req, res) => {
  await addQuiz(db, req, res);
});
//Retrieve quiz
app.get("/instructors/getQuizzes", async (req, res) => {
  await viewQuiz(db, req, res);
});
//Delete quiz
app.delete("/instructors/deleteQuiz/:id", async (req, res) => {
  await deleteQuiz(db, req, res);
});

//Add questio
app.post("/instructors/addQuestion", async (req, res) => {
  await addQuestion(db, req, res);
});

//retrieve quize with its information to student
app.get("/student/viewQuize", async (req, res) => {
  await studentViewQuiz(db, req, res);
});

// functions to retrieve question

app.post("/student/startQuiz", async (req, res) => {
  const questionsWithChoices = await RetrieveQuestion(db, req, res);

  console.log(questionsWithChoices);

  if (questionsWithChoices) {
    res.status(200).json({ questionsWithChoices });
  } else {
    res.status(500).json({ message: "Internal server error" });
  }
});

//Fetching user information based on id

app.post("/student/viewProfile", async (req, res) => {
  await studentProfile(db, req, res);
});

app.post("/student/updateProfile", upload.single("image"), async (req, res) => {
  await StudenUpdateProfile(db, req, res);
});

app.post("/instructor/elapsed", async (req, res) => {
  await viewElapsed(db, req, res);
});

app.post("/instructor/updateelapsed", async (req, res) => {
  await updateElapsed(db, req, res);
});

app.get("/studen/postednote", async (req, res) => {
  await postedNote(db, req, res);
});

app.post("/student/updatenote", async (req, res) => {
  await updateNote(db, req, res);
});

app.post("/user/deletenote", async (req, res) => {
  await deleteNote(db, req, res);
});

app.post("/user/addnote", async (req, res) => {
  await addNote(db, req, res);
});
app.post("/totaluser", async (req, res) => {
  await TotalUser(db, req, res);
});
app.post("/user/message", async (req, res) => {
  await userMessage(db, req, res);
});
app.post("/user/feedback", async (req, res) => {
  await userFeedback(db, req, res);
});
app.post("/new/message", async (req, res) => {
  await newMessage(db, req, res);
});
app.post("/admin/replay", async (req, res) => {
  await messageReplay(db, req, res);
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
