import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import Register from "./register.js"
import Login from "./login.js"
import verifyUser from "./logout.js"

const app = express()
app.use(express.json())
app.use(cors({
  origin:true,
  methods:["POST","GET","DELETE"],
  allowedHeaders: ['Content-Type', 'Origin', 'X-Requested-With', 'Accept', 'x-client-key', 'x-client-token', 'x-client-secret', 'Authorization'],
  credentials:true
}))
app.use(cookieParser())

//API for Authenticate user login
app.get("/", verifyUser, (req, res)=>{
  return res.json({Status:"Success",name:req.name})
})

//API for register page
app.post("/register", (req,res)=>{
  Register(req,res)
});

//API for Login page
app.post("/login", (req, res)=>{
  Login(req,res)
})
  
//API for user logout
app.get("/logout", (req, res)=>{
  res.clearCookie("token");
  return res.json({Status:"Success"})
})
app.listen(8080,()=>{
    console.log("server is running......")
})