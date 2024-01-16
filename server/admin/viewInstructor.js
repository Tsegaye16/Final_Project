const viewInstructor = (db, req, res)=>{
    const instructorData = "SELECT instructor_id, users.* FROM instructors JOIN users ON instructors.user_id = users.user_id;";
    db.query(instructorData, (err, result)=>{
        //console.log(result)
        res.send(result)
    })
}
export default viewInstructor