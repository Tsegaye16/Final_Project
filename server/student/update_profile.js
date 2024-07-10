import { promisify } from "util";

const StudenUpdateProfile = async (db, req, res) => {
  try {
    console.log("reqest body", req.body);
    const { id, name, email, username, birth_date, phone_number, sex } =
      req.body;
    console.log(birth_date);
    const image = req.file ? req.file.filename : null;

    const query = promisify(db.query).bind(db);
    const dob = birth_date ? new Date(birth_date) : null;

    // Fetch the current image value from the database
    const currentImageResult = await query(
      "SELECT image FROM users WHERE user_id = ?",
      [id]
    );
    console.log("Fetched users", currentImageResult);
    const currentImage = currentImageResult[0]
      ? currentImageResult[0].image
      : null;

    // Update the user record
    // name, email, username, birthDate, phoneNumber, sex
    const dod = await query(
      "UPDATE users SET name = ?, email = ?, username = ?, birth_date = ?, phone_number = ?, sex = ?, image = ? WHERE user_id = ?",
      [name, email, username, dob, phone_number, sex, image, id]
    );

    res.status(200).json({ message: `User updated successfully.` });
  } catch (err) {
    res.status(500).json({ message: "Fetching data error" });
  }
};
export default StudenUpdateProfile;
