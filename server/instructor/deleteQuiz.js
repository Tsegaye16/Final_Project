import { promisify } from "util";

const deleteQuiz = async (db, req, res) => {
    try{
        const id  = req.params.id
        console.log(id)
        const query = promisify(db.query).bind(db)
        const sql = "DELETE FROM quiz WHERE id = ?"
        await query(sql, [id])
        res.json({ message: "Quiz deleted successfully" });

    }catch (err){
        console.log(err)
        res.status(500).json({message: "Failed"})
    }
   
}
export default deleteQuiz