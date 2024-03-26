import React, { useState, useEffect } from "react";
import "./studentProfile.scss";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {
  Button,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Avatar,
  Container,
  Grid,
  IconButton,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function StudentProfile() {
  const navigate = useNavigate();
  const [user_id, setUser_id] = useState(null);
  const [userData, setUserData] = useState({
    id: 0,
    name: "",
    email: "",
    username: "",
    birth_date: "",
    phone_number: "",
    sex: "male",
    image: null,
  });
  const [temporaryImage, setTemporaryImage] = useState(null);
  const handleBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      const decodedToken = JSON.parse(atob(token.split(".")[1]));
      const id = decodedToken.user_id;
      setUser_id(id); // Set the id when fetched
      fetchUserData(id);
    }
  }, []);

  const fetchUserData = (id) => {
    axios
      .post("http://localhost:8800/student/viewProfile", { id })
      .then((response) => {
        setUserData(response.data[0]);
        console.log("USER DATA: ", userData);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setUserData({ ...userData, image: file });
    const temporaryImageUrl = URL.createObjectURL(file);
    setTemporaryImage(temporaryImageUrl);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user_id) return;
    const formData = new FormData();
    formData.append("id", user_id);
    formData.append("name", userData.name);
    formData.append("email", userData.email);
    formData.append("username", userData.username);
    formData.append("birth_date", userData.birth_date || "");
    formData.append("phone_number", userData.phone_number || "");
    formData.append("sex", userData.sex || "");
    if (userData.image) {
      console.log("User Image", userData.image);
      formData.append("image", userData.image);
    }

    console.log("Form Data:", userData);

    try {
      const response = await axios.post(
        "http://localhost:8800/student/updateProfile",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Profile updated successfully", response.data);
    } catch (error) {
      console.log("Error updating profile", error);
    }
  };

  return (
    <div className="profile-container">
      <Container maxWidth="md">
        <div
          style={{
            width: "500px",
            padding: "16px",
            boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
            borderRadius: "4px",
            backgroundColor: "#fff",
          }}
        >
          <h2>User profile</h2>

          {/* Profile Picture Section */}
          <IconButton
            onClick={handleBack}
            style={{ position: "absolute", top: 10, left: 10 }}
          >
            <ArrowBackIcon />
          </IconButton>
          <form onSubmit={handleSubmit}>
            <div
              className="profile-picture"
              style={{
                position: "relative",
                marginBottom: "16px",
                textAlign: "center",
              }}
            >
              <Avatar
                alt="Profile"
                src={
                  temporaryImage ||
                  (userData.image
                    ? `http://localhost:8800/${userData.image}`
                    : "")
                }
                sx={{ width: 150, left: 150, height: 150, marginBottom: "8px" }}
              />
              <label
                htmlFor="image"
                className="upload-icon"
                style={{
                  position: "absolute",
                  bottom: 20,
                  right: 190,
                  transform: "translate(50%, 50%)",
                  backgroundColor: "#1976D2",
                  borderRadius: "50%",
                  padding: "8px",
                  cursor: "pointer",
                }}
              >
                {<AddAPhotoIcon style={{ color: "#fff", fontSize: "20px" }} />}
              </label>
              <input
                type="file"
                id="image"
                name="image"
                accept="image/*"
                style={{ display: "none" }}
                onChange={handleFileChange}
              />
            </div>

            <Grid container spacing={2}>
              <Grid item xs={12} style={{ marginBottom: "16px" }}>
                <TextField
                  fullWidth
                  type="text"
                  label="Full Name"
                  name="name"
                  value={userData.name}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} style={{ marginBottom: "16px" }}>
                <TextField
                  fullWidth
                  type="email"
                  label="Email"
                  name="email"
                  value={userData.email}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} style={{ marginBottom: "16px" }}>
                <TextField
                  fullWidth
                  type="text"
                  label="Username"
                  name="username"
                  value={userData.username}
                  onChange={handleInputChange}
                />
              </Grid>

              <Grid item xs={12} sm={6} style={{ marginBottom: "16px" }}>
                <TextField
                  fullWidth
                  type="date"
                  label="Birth Date"
                  name="birth_date"
                  value={userData.birth_date}
                  onChange={handleInputChange}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12} style={{ marginBottom: "16px" }}>
                <TextField
                  fullWidth
                  type="tel"
                  label="Phone Number"
                  name="phone_number"
                  value={userData.phone_number}
                  onChange={handleInputChange}
                />
              </Grid>

              <Grid item xs={12} sm={6} style={{ marginBottom: "16px" }}>
                <FormControl fullWidth>
                  <InputLabel id="sex-label">Sex</InputLabel>
                  <Select
                    labelId="sex-label"
                    id="sex"
                    name="sex"
                    value={userData.sex}
                    onChange={handleInputChange}
                  >
                    <MenuItem value="male">Male</MenuItem>
                    <MenuItem value="female">Female</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                >
                  Update Profile
                </Button>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    </div>
  );
}

export default StudentProfile;
