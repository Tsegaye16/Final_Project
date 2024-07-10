import { promisify } from 'util';

const updateStudentProfile = async (db, req, res) => {
  try {
    console.log('Received update request:', req.body);

    const { user_id, name, email, username, role_name } = req.body;
    
    // Check if an image is provided in the request
    const image = req.file ? req.file.filename : null;
    

    // Use the MySQL connection pool to execute queries
    const query = promisify(db.query).bind(db);

    // Fetch the current image value from the database
    const currentImageResult = await query('SELECT image FROM users WHERE user_id = ?', [user_id]);
    const currentImage = currentImageResult[0] ? currentImageResult[0].image : null;

    // Update the user record
    await query(
      'UPDATE users SET name = ?, email = ?, username = ?, role_name = ?, image = IFNULL(?, image) WHERE user_id = ?',
      [name, email, username, role_name, image, user_id]
    );

    if (role_name === 'Instructor') {
      // If the role is changed to 'Instructor', delete from students table and insert into instructors table
      await query('DELETE FROM students WHERE user_id = ?', [user_id]);
      await query('INSERT INTO instructors (user_id) VALUES (?)', [user_id]);
    }

    res.status(200).json({ message: 'User data updated successfully' });
  } catch (error) {
   // console.error('Error updating user profile:', error);
    res.status(500).json({ error: 'An error occurred while updating user profile' });
  }
};

export default updateStudentProfile;
