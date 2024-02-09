import { promisify } from "util";

const viewQuiz = async (db, req, res) => {
    try {
        // Define the SQL query string
        const sql = "SELECT * FROM quiz";
        
        // Bind the database query function and promisify it
        const query = promisify(db.query).bind(db);
        
        // Execute the query and await the result
        const result = await query(sql);
        
        // Send the result as JSON response
        res.json({ quizzes: result });
    } catch (err) {
        // Handle any errors and send a 500 status code with an error message
        res.status(500).json({ message: "Failed" });
    }
}

export default viewQuiz;
