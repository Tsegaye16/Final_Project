import React, { useState, forwardRef } from "react";
import "./studentPopup.scss";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import PersonIcon from "@mui/icons-material/Person";

const UpdateUserPopup = forwardRef(({ user, onClose, onSave }, ref) => {
  const [updatedUser, setUpdatedUser] = useState({
    user_id: user.user_id,
    name: user.name,
    email: user.email,
    username: user.username,
    role_name: user.role_name,
    image: user.image,
    // Add other fields as needed
  });

  const handleInputChange = (e) => {
    const { name, value, type } = e.target;

    setUpdatedUser((prevUser) => ({
      ...prevUser,
      [name]: type === "file" ? e.target.files[0] : value,
    }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    // Call the onSave function from the parent component
    console.log(`Saving user data:, ${updatedUser.image}`);
    onSave(updatedUser);
    onClose(); // Close the popup
  };
  //console.log(updatedUser.role_name)

  return (
    <div className="update-popup" ref={ref}>
      <div className="scrollable">
        <h2>Update User {updatedUser.name}</h2>
        <form>
          <div className="photo">
            {/* <PersonIcon style={{fontSize:"7rem"}}/> */}
            {updatedUser.image ? (
              <img
                src={`http://localhost:8800/${user.image}`}
                alt="admin"
                style={{
                  width: "100px",
                  height: "100px",
                  borderRadius: "50%",
                  objectFit: "cover",
                }}
              />
            ) : (
              <PersonIcon style={{ fontSize: "7rem" }} />
            )}

            <label htmlFor="image">{<AddAPhotoIcon />}</label>
            <input
              type="file"
              id="image"
              name="image"
              accept="image/*"
              onChange={handleInputChange}
            />
          </div>
          <label htmlFor="name">user_id:</label>
          <input
            type="text"
            name="user_id"
            value={updatedUser.user_id}
            onChange={handleInputChange}
            disabled
          />
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            name="name"
            value={updatedUser.name}
            onChange={handleInputChange}
          />

          <label htmlFor="email">Email:</label>
          <input
            type="email"
            name="email"
            value={updatedUser.email}
            onChange={handleInputChange}
          />
          <label htmlFor="username">User name:</label>
          <input
            type="text"
            name="username"
            value={updatedUser.username}
            onChange={handleInputChange}
          />
          <label htmlFor="email">Role:</label>
          <select
            id="role_name"
            name="role_name"
            value={updatedUser.role_name}
            onChange={handleInputChange}
          >
            <option value="Admin" disabled>
              Admin
            </option>
            <option value="Instructor">Instructor</option>
            <option value="Student">Student</option>
          </select>

          <button type="button" onClick={handleSave}>
            Save
          </button>
        </form>
      </div>
    </div>
  );
});

export default UpdateUserPopup;
