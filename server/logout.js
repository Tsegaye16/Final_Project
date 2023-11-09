import jwt  from "jsonwebtoken"
export default function verifyUser(req,res, next){
    // Read the cookie
    const token = req.cookies.token
    if(!token){
      return res.json({Error:"You are not authenticated"})
    }else{
      jwt.verify(token,"jwt-secret-key", (err, decoded)=>{
        if(err){
            return res.json({Error: "Token is not okay"})
        }else{
            req.name = decoded.name
            next()
        }
      })
    }
  }