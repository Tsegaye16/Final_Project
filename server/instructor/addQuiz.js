import { promisify } from 'util';
const addQuiz = async (db, req, res) => {
    try{
        const {name, description} = req.body
        console.log("Name",name)
        const query = promisify(db.query).bind(db)
        await query(
            "INSERT INTO quiz (name, description) VALUES (?, ?)", [name, description]
        )

    } catch(err){
        res.status(500).json({ message: 'failed' })

    }
}

export default addQuiz