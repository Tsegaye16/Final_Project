import React, { useState, useEffect, useRef } from "react";
import "./dashboard.scss"; // Make sure to import the CSS file
import AdminNavbar from "./bar/nav_bar";
import axios from "axios";
import { FaEdit, FaTrash } from "react-icons/fa";
import UpdateUserPopup from "../manageStudent/studentPopup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminUserManagement from "./user_management";
import AddUser from "../add_user/add_user";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@material-ui/core";
import { Add as AddIcon } from "@material-ui/icons";

function AdminDashdoard() {
  const [sidebarWidth, setSidebarWidth] = useState(250);

  const toggleSidebar = () => {
    setSidebarWidth((prevWidth) => (prevWidth === 0 ? 250 : 0));
  };
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
  // To retrieve recently registered user on admin dashboard
  const [users, setUsers] = useState([]);
  //const {id} = useParams()
  useEffect(() => {
    axios
      .get("http://localhost:8800/admin/viewRecent")
      .then((resp) => setUsers(resp.data))
      .catch((error) => {
        console.error("Error fetching user attributes:", error);
      });
  }, []);

  // To handle edit button and popup edit section
  const [isUpdatePopupOpen, setUpdatePopupOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const handleUpdateClick = (user) => {
    setSelectedUser(user);
    setUpdatePopupOpen(true);
  };
  // Send the updated information to server-side
  const handleUpdateSave = (updatedUser) => {
    const formData = new FormData();
    formData.append("user_id", updatedUser.user_id);
    formData.append("name", updatedUser.name);
    formData.append("email", updatedUser.email);
    formData.append("username", updatedUser.username);
    formData.append("role_name", updatedUser.role_name);
    formData.append("image", updatedUser.image);
    axios
      .post("http://localhost:8800/admin/updateRecentUser/", formData, {
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
        `http://localhost:8800/admin/deleteUser/${deleteCandidate.user_id}`
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

  const [openRegisterDialog, setOpenRegisterDialog] = useState(false);

  const handleOpenRegisterDialog = () => {
    setOpenRegisterDialog(true);
  };

  const handleCloseRegisterDialog = () => {
    setOpenRegisterDialog(false);
  };
  const handleAddUserAndCloseDialog = () => {
    setOpenRegisterDialog(false);
  };

  return (
    <div className="dashboard-container">
      <AdminNavbar
        toggleSidebar={toggleSidebar}
        sidebarWidth={sidebarWidth}
        userData={userData}
      />
      <div className="main-content" style={{ marginLeft: `${sidebarWidth}px` }}>
        <AdminUserManagement />

        <div className="table-container">
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            style={{ marginLeft: "10%", marginBottom: "20px" }}
            onClick={handleOpenRegisterDialog}
          >
            Register User
          </Button>
          <Dialog open={openRegisterDialog} onClose={handleCloseRegisterDialog}>
            <DialogTitle>Register New User</DialogTitle>
            <DialogContent>
              {/* Render your Register component here */}
              <AddUser setOpenRegisterDialog={handleAddUserAndCloseDialog} />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseRegisterDialog} color="primary">
                Cancel
              </Button>
              {/* Add any additional action buttons if needed */}
            </DialogActions>
          </Dialog>
          <h2>Recently Registered user</h2>

          <table>
            <ToastContainer />
            <thead>
              <tr>
                <th>User ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Username</th>

                <th>Role</th>
                <th>Birth date</th>
                <th>Phone number</th>
                <th>sex</th>
                <th>image</th>
                <th>Operations</th>
              </tr>
            </thead>
            <tbody>
              {users && users.length > 0 ? (
                users.map((user) => (
                  <tr key={user.id}>
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
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="11" style={{ textAlign: "center" }}>
                    No Recently registered userr
                  </td>
                </tr>
              )}
            </tbody>
          </table>
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
}
export default AdminDashdoard;
