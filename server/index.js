import express from "express";
import cors from "cors";
import mysql from "mysql";
import cookieParser from "cookie-parser";
import registerUser from "./register.js";
import loginUser from "./login.js";
import viewStudent from "./admin/viewStudent.js";
import viewInstructor from "./admin/viewInstructor.js";
import viewAdmin from "./admin/viewHerself.js";
import logoutUser from "./logout.js";
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
import studentViewQuiz from "./student/view_quiz.js";
import EmailConfirm from "./email_confirm.js";
//import RetrieveQuestion from './student/view_question.js';
import { promisify } from "util";
import studentProfile from "./student/view_profile.js";
import StudenUpdateProfile from "./student/update_profile.js";

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["POST", "GET", "DELETE"],
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
  password: "Amare_Abewa12",
  database: "project",
  //debug: true,
});
app.use(express.static("uploads"));

// Registration
app.post("/register", async (req, res) => {
  await registerUser(db, req, res);
});

// Login
app.post("/login", async (req, res) => {
  await loginUser(db, req, res);
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

//Logout
app.post("/logout", logoutUser);
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

app.post("/admin/updateAdmin", upload.single("image"), async (req, res) => {
  await updateAdminProfile(db, req, res);
});

app.post("/admin/updateStudent", upload.single("image"), async (req, res) => {
  await updateStudentProfile(db, req, res);
});

app.get("/admin/viewRecent", async (req, res) => {
  await recentlyRegistered(db, req, res);
});

app.post(
  "/admin/updateRecentUser",
  upload.single("image"),
  async (req, res) => {
    await updateRecentUser(db, req, res);
  }
);

app.post(
  "/admin/updateInstructor",
  upload.single("image"),
  async (req, res) => {
    await updateInstructorProfile(db, req, res);
  }
);
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
app.post("/addQuiz", async (req, res) => {
  await addQuiz(db, req, res);
});
//Retrieve quiz
app.get("/getQuizzes", async (req, res) => {
  await viewQuiz(db, req, res);
});
//Delete quiz
app.delete("/deleteQuiz/:id", async (req, res) => {
  await deleteQuiz(db, req, res);
});

//Add questio
app.post("/addQuestion", async (req, res) => {
  await addQuestion(db, req, res);
});

//retrieve quize with its information to student
app.get("/student/viewQuize", async (req, res) => {
  await studentViewQuiz(db, req, res);
});

// Endpoint to receive user email and initiate the password reset process
app.post("/user/resetPassword", async (req, res) => {
  await ResetPassword(db, req, res);
});

// Endpoint to validate token and update user password
app.post("/user/updatePassword", async (req, res) => {
  await UpdatePassword(db, req, res);
});
app.post("/user/confirmEmail/:token", async (req, res) => {
  await EmailConfirm(db, req, res);
});

//Retrieving the quiz with entire question and its corresponding choice based on quiz_id

// functions to retrieve question
const RetrieveQuestion = async (quiz_id) => {
  try {
    const sql = `
      SELECT q.id as question_id, q.question_text, c.id as choice_id, c.choice_text, c.is_correct, q.difficulty, q.mark
      FROM question q
      JOIN choice c ON q.id = c.question_id
      WHERE q.quiz_id = ?
    `;

    const query = promisify(db.query).bind(db);
    const result = await query(sql, [quiz_id]);

    if (!result || !Array.isArray(result)) {
      console.error("Invalid result format:", result);
      return null;
    }

    const questionsWithChoices = result.reduce((acc, row) => {
      if (!acc[row.question_id]) {
        acc[row.question_id] = {
          question_id: row.question_id,
          question_text: row.question_text,
          choices: [],
          difficulty: row.difficulty,
          mark: row.mark,
        };
      }

      acc[row.question_id].choices.push({
        choice_id: row.choice_id,
        choice_text: row.choice_text,
        is_correct: row.is_correct,
      });

      return acc;
    }, {});

    return questionsWithChoices;
  } catch (error) {
    console.error("Error retrieving questions and choices:", error);
    return null;
  }
};
app.post("/student/startQuiz", async (req, res) => {
  const { quiz_id } = req.body;
  //console.log("Quiz ID: ",req.body)

  // Retrieve questions and choices based on quiz_id
  const questionsWithChoices = await RetrieveQuestion(quiz_id);

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

const PORT = 8800;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
