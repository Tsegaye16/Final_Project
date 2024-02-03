// UserList.js
import React, { useState, useEffect, useRef } from 'react';
import './admin.scss';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import UpdateUserPopup from './studentPopup';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AdminNavbar from '../dashboard/bar/nav_bar';

const StudentList = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isUpdatePopupOpen, setUpdatePopupOpen] = useState(false);

  useEffect(() => {
    axios.get("http://localhost:8800/admin/viewStudent/")
      .then((resp) => setUsers(resp.data))
      .catch((error) => {
        console.error("Error fetching user attributes:", error);
      });
  }, []);

  const handleUpdateSave = (updatedUser) => {
    const formData = new FormData();
  formData.append('user_id', updatedUser.user_id);
  formData.append('name', updatedUser.name);
  formData.append('email', updatedUser.email);
  formData.append('username', updatedUser.username);
  formData.append('role_name', updatedUser.role_name);
  formData.append('image', updatedUser.image); // Make sure updatedUser.image is the File object

  axios.post("http://localhost:8800/admin/updateStudent/", formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
    .then((resp) => {
      toast.success("Updated successfully");
      // Close the update popup
      setUpdatePopupOpen(false);
      setTimeout(() => {
        window.location.reload()
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
  // To retrieve Admin user name and name on user icons purpose only
  const [user,setUser] = useState({})
  useEffect(() => {
    axios.get("http://localhost:8800/admin/viewHerself")
      .then((resp) => {
        const userData = resp.data[0];
        setUser({ ...userData });
      })
      .catch((error) => {
        console.error('Error fetching user data:', error);
      });
  }, []);
  const image = `http://localhost:8800/${user.image}`
  const username = user.username
  // To handle delete button
  const [isDeletePopupOpen, setDeletePopupOpen] = useState(false);
  const [deleteCandidate, setDeleteCandidate] = useState(null);

  

  const handleDeleteClick = (user) => {
    setDeleteCandidate(user);
    setDeletePopupOpen(true);
    
  };
  //console.log(deleteCandidate.instructor_id)
  const handleDeleteConfirm = () => {
    axios.delete(`http://localhost:8800/admin/deleteStudent/${deleteCandidate.student_id}`)
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
  const updatePopupRef = useRef(null)

  useEffect(() => {
    const handleOutsideClick = (event) => {
      // If the click is outside the delete popup, close the popup
      if (deletePopupRef.current && !deletePopupRef.current.contains(event.target)) {
        setDeletePopupOpen(false);
      }
      if(updatePopupRef.current && !updatePopupRef.current.contains(event.target)){
        setUpdatePopupOpen(false)
      }

    };

    // Add event listener to detect clicks outside the delete popup
    document.addEventListener("mousedown", handleOutsideClick);

    // Remove the event listener when the component is unmounted
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []); 
  

  return (
    <div className='student-container'>
      <AdminNavbar toggleSidebar={toggleSidebar} sidebarWidth={sidebarWidth} image = {image} username = {username} />
      <div className="main-content" style={{ marginLeft: `${sidebarWidth}px`}}>
      <div className='intro'>      
          wellcome {user.name}
       </div>
    <div className="student-list">
      <h2>Student List</h2>
      
      <table>
        <ToastContainer/>
        <thead>
          <tr>
            <th>student ID</th>
            <th>User ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Username</th>
            <th>Password</th>
            <th>Role</th>
            <th>Birth date</th>
            <th>Phone number</th>
            <th>sex</th>            
            <th>image</th>            
            <th>Operatinos</th>
          </tr>
        </thead>
        <tbody>
          {users &&
            users.map((user) => (
              <tr key={user.id}>
                {/* Render user details */}
                <td>{user.student_id}</td>
                <td>{user.user_id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.username}</td>
                <td>{ user.password ? `${user.password.substring(0, 3)}***${user.password.slice(-3)}` : 'No password available'}</td>
                <td>{user.role_name ? user.role_name:'No'}</td>
                
                <td>{user.birth_date ? user.birth_date : 'No'}</td>
                <td>{user.phone_number ? user.phone_number : 'No'}</td>
                <td>{user.sex ? user.sex : 'No'}</td>
                <td>
                {user.image ? <img src={`http://localhost:8800/${user.image}`} alt='admin' style={{ width: '70px', height: '70px', borderRadius: '50%', objectFit: 'cover' }} />: 'No'}
                </td>
               
                <td>
                  <button onClick={() => handleUpdateClick(user)} style={{ color: 'black', background: '#3498db', border: 'none', padding: '5px', width:'40px' }}>{<FaEdit />}</button>
                  <button onClick={() => handleDeleteClick(user)} style={{ color: 'black', background: 'red', border: 'none', padding: '5px', width:'40px' }}>{<FaTrash />}</button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      {isUpdatePopupOpen && (
        <UpdateUserPopup className='pop-update' ref={updatePopupRef}
          user={selectedUser}
          onClose={() => setUpdatePopupOpen(false)}
          onSave={handleUpdateSave}
        />
      )}
       {isDeletePopupOpen && (
            <div className="delete-popup" ref={deletePopupRef}>
              <p dangerouslySetInnerHTML={{ __html: `Are you sure you want to delete user <b>${deleteCandidate.name}</b>?` }} />
              <button onClick={handleDeleteConfirm} className='confirm' >OK</button>
              <button onClick={handleDeleteCancel} className='cancel'>Cancel</button>
            </div>
          )}
    </div>
    </div>
    </div>
  );
};

export default StudentList;
