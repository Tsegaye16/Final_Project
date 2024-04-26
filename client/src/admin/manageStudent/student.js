// UserList.js
import React, { useState, useEffect, useRef } from "react";
import "./admin.scss";
import axios from "axios";

import UpdateUserPopup from "./studentPopup";
import { FaEdit, FaTrash } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminNavbar from "../dashboard/bar/nav_bar";
import SearchIcon from "@mui/icons-material/Search";
import SortIcon from "@mui/icons-material/Sort";
import {
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Tooltip } from "@mui/material";

const StudentList = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isUpdatePopupOpen, setUpdatePopupOpen] = useState(false);
  const [sortedUsers, setSortedUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  useEffect(() => {
    setSortedUsers(users); // Initially set sortedUsers to users
  }, [users]);

  useEffect(() => {
    handleSearch();
  }, [users, searchQuery]);

  // sorting functionality
  const handleSort = (field) => {
    const sortedList = [...sortedUsers];
    sortedList.sort((a, b) => (a[field] > b[field] ? 1 : -1));
    setSortedUsers(sortedList);
  };

  // Search functionality
  const handleSearch = () => {
    const filteredList = users.filter(
      (user) =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.student_id.toString().includes(searchQuery.toLowerCase())
    );
    setSortedUsers(filteredList);
  };

  useEffect(() => {
    axios
      .get("http://localhost:8800/admin/viewStudent/")
      .then((resp) => setUsers(resp.data))
      .catch((error) => {
        console.error("Error fetching user attributes:", error);
      });
  }, []);

  const handleUpdateSave = (updatedUser) => {
    const formData = new FormData();
    formData.append("user_id", updatedUser.user_id);
    formData.append("name", updatedUser.name);
    formData.append("email", updatedUser.email);
    formData.append("username", updatedUser.username);
    formData.append("role_name", updatedUser.role_name);
    formData.append("image", updatedUser.image); // Make sure updatedUser.image is the File object

    axios
      .post("http://localhost:8800/admin/updateStudent/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((resp) => {
        toast.success("Updated successfully");
        // Close the update popup
        setUpdatePopupOpen(false);
        setTimeout(() => {
          window.location.reload();
        }, 4000);
      })
      .catch((error) => {
        console.error("Error updating user:", error);
      });
  };

  const handleUpdateClick = (user) => {
    setSelectedUser(user);
    setUpdatePopupOpen(true);
  };

  // Managing toggling the sidebar component
  const [sidebarWidth, setSidebarWidth] = useState(250);

  const toggleSidebar = () => {
    setSidebarWidth((prevWidth) => (prevWidth === 0 ? 250 : 0));
  };

  // To handle delete button
  const [isDeletePopupOpen, setDeletePopupOpen] = useState(false);
  const [deleteCandidate, setDeleteCandidate] = useState(null);

  const handleDeleteClick = (user) => {
    setDeleteCandidate(user);
    setDeletePopupOpen(true);
  };
  //console.log(deleteCandidate.instructor_id)
  const handleDeleteConfirm = () => {
    axios
      .delete(
        `http://localhost:8800/admin/deleteStudent/${deleteCandidate.student_id}`
      )
      .then((resp) => {
        // Handle success
        console.log("Deleted successfully:", resp.data);
        toast.success("Deleted successfully");

        // Close the delete popup
        setDeletePopupOpen(false);

        // Refresh the user list
        setTimeout(() => {
          window.location.reload();
        }, 4000);
      })
      .catch((error) => {
        // Handle error
        toast.error("Error deleting user:", error);
      });
  };

  const handleDeleteCancel = () => {
    // Close the delete popup
    setDeletePopupOpen(false);
  };

  // Handle popup outside it's window
  const deletePopupRef = useRef(null);
  const updatePopupRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      // If the click is outside the delete popup, close the popup
      if (
        deletePopupRef.current &&
        !deletePopupRef.current.contains(event.target)
      ) {
        setDeletePopupOpen(false);
      }
      if (
        updatePopupRef.current &&
        !updatePopupRef.current.contains(event.target)
      ) {
        setUpdatePopupOpen(false);
      }
    };

    // Add event listener to detect clicks outside the delete popup
    document.addEventListener("mousedown", handleOutsideClick);

    // Remove the event listener when the component is unmounted
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  // To retrieve Admin user name and name on user icons purpose only
  const [id, setId] = useState(0);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    const decodedToken = JSON.parse(atob(token.split(".")[1]));
    setId(decodedToken.user_id);
  }, []);

  useEffect(() => {
    axios
      .post("http://localhost:8800/student/viewProfile", { id: id })
      .then((response) => {
        setUserData(response.data);
        //console.log(response.data)
      })
      .catch((err) => {});
  }, [id]);

  return (
    <div className="student-container">
      <AdminNavbar
        toggleSidebar={toggleSidebar}
        sidebarWidth={sidebarWidth}
        userData={userData}
      />
      <div className="main-content" style={{ marginLeft: `${sidebarWidth}px` }}>
        <div className="intro">
          wellcome{" "}
          {userData && userData.length > 0 ? userData[0].name : "Admin"}{" "}
        </div>
        <div className="student-list">
          <h2>Student List</h2>
          <TextField
            label="Search by Name or ID"
            variant="outlined"
            size="small"
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleSearch}>
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            style={{ marginBottom: "15px" }}
          />
          <TableContainer component={Paper}>
            <table>
              <ToastContainer />
              <TableHead>
                <TableRow>
                  <TableCell onClick={() => handleSort("student_id")}>
                    Student ID
                    <Tooltip title="sort" arrow>
                      <SortIcon style={{ cursor: "pointer" }} />
                    </Tooltip>
                  </TableCell>

                  <TableCell onClick={() => handleSort("user_id")}>
                    User ID
                    <Tooltip title="sort" arrow>
                      <SortIcon style={{ cursor: "pointer" }} />
                    </Tooltip>
                  </TableCell>
                  <TableCell onClick={() => handleSort("name")}>
                    Name
                    <Tooltip title="sort" arrow>
                      <SortIcon style={{ cursor: "pointer" }} />
                    </Tooltip>
                  </TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Username</TableCell>

                  <TableCell>Role</TableCell>
                  <TableCell>Birth date</TableCell>
                  <TableCell>Phone number</TableCell>
                  <TableCell>sex</TableCell>
                  <TableCell>image</TableCell>
                  <TableCell>Operatinos</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users &&
                  sortedUsers.map((user) => (
                    <TableRow key={user.student_id}>
                      {/* Render user details */}
                      <td>{user.student_id}</td>
                      <td>{user.user_id}</td>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>{user.username}</td>

                      <td>{user.role_name ? user.role_name : "No"}</td>

                      <td>
                        {user.birth_date
                          ? user.birth_date.substring(0, 10)
                          : "No"}
                      </td>
                      <td>{user.phone_number ? user.phone_number : "No"}</td>
                      <td>{user.sex ? user.sex : "No"}</td>
                      <td>
                        {user.image ? (
                          <img
                            src={`http://localhost:8800/${user.image}`}
                            alt="admin"
                            style={{
                              width: "70px",
                              height: "70px",
                              borderRadius: "50%",
                              objectFit: "cover",
                            }}
                          />
                        ) : (
                          "No"
                        )}
                      </td>

                      <td>
                        <button
                          onClick={() => handleUpdateClick(user)}
                          style={{
                            color: "black",
                            background: "#3498db",
                            border: "none",
                            padding: "5px",
                            width: "40px",
                          }}
                        >
                          {<FaEdit />}
                        </button>
                        <button
                          onClick={() => handleDeleteClick(user)}
                          style={{
                            color: "black",
                            background: "red",
                            border: "none",
                            padding: "5px",
                            width: "40px",
                          }}
                        >
                          {<FaTrash />}
                        </button>
                      </td>
                    </TableRow>
                  ))}
              </TableBody>
            </table>
          </TableContainer>
          {isUpdatePopupOpen && (
            <UpdateUserPopup
              className="pop-update"
              ref={updatePopupRef}
              user={selectedUser}
              onClose={() => setUpdatePopupOpen(false)}
              onSave={handleUpdateSave}
            />
          )}
          {isDeletePopupOpen && (
            <div className="delete-popup" ref={deletePopupRef}>
              <p
                dangerouslySetInnerHTML={{
                  __html: `Are you sure you want to delete user <b>${deleteCandidate.name}</b>?`,
                }}
              />
              <button onClick={handleDeleteConfirm} className="confirm">
                OK
              </button>
              <button onClick={handleDeleteCancel} className="cancel">
                Cancel
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentList;