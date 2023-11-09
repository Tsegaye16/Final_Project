import { db } from "./db.js"
import cookieParser from "cookie-parser"


import bcrypt from "bcrypt"
import jwt  from "jsonwebtoken"
export default function Login(req,res){
  const sql = "SELECT * FROM user WHERE email = ?"
    db.query(sql, [req.body.email], (err,data)=>{
      if(err){
        return res.json({Error:"Login error in server"})
      }
      if(data.length>0){
        bcrypt.compare(req.body.password.toString(), data[0].password, (err, response)=>{
          if(err){
            return res.json({Error:"password compared error"})
          }
          if(response){
            const name = data[0].name
            const token = jwt.sign({name},"jwt-secret-key", {expiresIn:"1d"})
            res.cookie("token", token)
            return res.json({Status:"Success"})
          }else{
            return res.json({Error:"Password not matched"})
          }
        })
  
      }else{
        return res.json({Error:"No email exist"})
      }
    })
}