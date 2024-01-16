// adminController.js
import { promisify } from 'util';

const updateAdminProfile = async (db, req, res) => {
  try {
    const { name, email, username, password, sex, phone_number, birth_date } = req.body;
    const image = req.file ? req.file.filename : null;

    // Use the MySQL connection pool to execute queries
    const query = promisify(db.query).bind(db);

    // Update the existing admin record
    await query(
      'UPDATE users SET name = ?, email = ?, username = ?, password = ?, sex = ?, phone_number = ?, birth_date = ?, image = ? WHERE role_name = ? ',
      [name, email, username, password, sex, phone_number, birth_date, image, 'Admin']
    );

    res.status(200).json({ message: 'Admin data updated successfully' });
  } catch (error) {
    console.error('Error updating admin profile:', error);
    res.status(500).json({ error: 'An error occurred while updating admin profile' });
  }
};

export default updateAdminProfile;
