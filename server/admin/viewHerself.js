const viewAdmin = (db, req, res)=>{
    const adminData = "SELECT admin_id, users.* FROM admins JOIN users ON admins.user_id = users.user_id;";
    db.query(adminData, (err, result)=>{
       // console.log(result[0].password)
        res.send(result)
    })
}
export default viewAdmin