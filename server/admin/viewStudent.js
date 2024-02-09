const viewAdmin = (db, req, res) => {
    const adminData = "SELECT student_id, users.* FROM students JOIN users ON students.user_id = users.user_id;";
    db.query(adminData, (err, result) => {
      if (err) {
        //console.error("Error fetching admin data:", err);
        res.status(500).send("Internal Server Error");
      } else {
        res.send(result);
      }
    });
  };
  
  export default viewAdmin;
  