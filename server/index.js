import express from 'express';
import cors from 'cors';
import mysql from 'mysql';
import cookieParser from 'cookie-parser';
import registerUser from './register.js';
import loginUser from './login.js';
import viewStudent from "./admin/viewStudent.js"
import viewInstructor from './admin/viewInstructor.js';
import viewAdmin from "./admin/viewHerself.js"
import logoutUser from './logout.js';
import multer from 'multer';
import path from 'path'
import fs from "fs"
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import updateAdminProfile from './admin/updateHerProfile.js';
import updateStudentProfile from './admin/updateStudentProfile.js';
import recentlyRegistered from './admin/viewRecentllyRegisteredUser.js';
import updateRecentUser from './admin/updateRecentlyRegisteredUser.js'
import updateInstructorProfile from './admin/updateInstructorProfile.js';
import deleteInstructor from './admin/deleteInstructor.js';
import deleteStudent from './admin/deleteStudent.js';
import deleteUser from './admin/deleteUser.js';



const app = express();
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3000',
  methods: ["POST", "GET", "DELETE"],
  allowedHeaders: ['Content-Type', 'Origin', 'X-Requested-With', 'Accept', 'x-client-key', 'x-client-token', 'x-client-secret', 'Authorization'],
  credentials: true
}));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'Amare_Abewa12',
  database: 'project',
  //debug: true,
});
app.use(express.static('uploads'));

// Registration
app.post('/register', async (req, res) => {
  await registerUser(db, req, res);
});

// Login
app.post('/login', async (req, res) => {
  await loginUser(db, req, res);
});

// Admin View Student
app.get('/admin/viewStudent', async (req, res) => {
  //console.log('Received request to /admin/viewStudent');
  await viewStudent(db, req, res);
});

// Admin view Instructor
app.get('/admin/viewInstructor', async (req, res) => {
  //console.log('Received request to /admin/viewInstructor');
  await viewInstructor(db, req, res);
});
// Admin view herself
app.get('/admin/viewHerself', async (req, res) => {
  //console.log('Received request to /admin/viewHerself');
  await viewAdmin(db, req, res);
});

//Logout
app.post('/logout', logoutUser);
//Update Admin profile
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);
    const uploadFolder = path.join(__dirname, 'uploads');
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

app.post('/admin/updateAdmin', upload.single('image'), async (req, res) => {
  await updateAdminProfile(db, req, res);
});

app.post('/admin/updateStudent',upload.single('image'), async (req, res) => {
  await updateStudentProfile(db, req, res)
})

app.get("/admin/viewRecent", async (req, res) => {
  await recentlyRegistered(db, req, res)
})

app.post('/admin/updateRecentUser', async (req, res) => {
  await updateRecentUser(db, req, res)
})

app.post('/admin/updateInstructor', async (req, res) => {
  await updateInstructorProfile(db, req, res)
})
app.delete('/admin/deleteInstructor/:instructor_id', async (req, res) => {
  await deleteInstructor(db, req, res);
});
app.delete('/admin/deleteStudent/:student_id', async (req, res) => {
  await deleteStudent(db, req, res)
})
app.delete('/admin/deleteUser/:user_id', async (req, res) => {
  await deleteUser(db, req, res)
})


const PORT = 8800;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
