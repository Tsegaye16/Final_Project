import React, { useState, useEffect } from "react";

import {
  Box,
  Typography,
  IconButton,
  TextareaAutosize,
  Button,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import { Delete } from "@mui/icons-material";

import { Tooltip } from "@mui/material";
import axios from "axios";

const useStyles = {
  root: {
    backgroundColor: "#f0f0f0",
    borderRadius: "8px",
    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
    padding: "24px",
    marginBottom: "24px",
  },
  title: {
    fontWeight: "bold",
    marginBottom: "16px",
  },
  paragraph: {
    marginBottom: "24px",
  },
  posted: {
    marginBottom: "24px",
    backgroundColor: "#ffcdd2",
    padding: "20px",
  },
  subTitle: {
    fontWeight: "bold",
    marginBottom: "8px",
  },
  section: {
    marginBottom: "24px",
    border: "1px solid #e0e0e0",
    borderRadius: "8px",
    padding: "16px",
  },
};

function Content({ title, userData }) {
  const [noteData, setNoteData] = useState(null);
  const [instructorNotes, setInstructorNotes] = useState([]);
  const [studentNotes, setStudentNotes] = useState([]);
  const [editNoteId, setEditNoteId] = useState(null);
  const [editedInstructorNote, setEditedInstructorNote] = useState("");
  const [editedStudentNote, setEditedStudentNote] = useState("");
  const [newNote, setNewNote] = useState(""); // New state to hold the text of the new note
  const [isAddingNote, setIsAddingNote] = useState(false);

  // Fetch note data on component mount
  useEffect(() => {
    axios
      .get("http://localhost:8800/studen/postednote")
      .then((response) => {
        setNoteData(response.data);
      })
      .catch((err) => console.log(err));
  }, []);

  // Filter and set instructor and student notes based on user role and title
  useEffect(() => {
    if (noteData && userData && userData[0]) {
      if (userData[0].role_name === "Instructor") {
        const instructorNotes = noteData.filter(
          (note) => note.poster_role === "Instructor" && note.title === title
        );
        setInstructorNotes(instructorNotes);
      } else if (userData[0].role_name === "Student") {
        const instructorNotes = noteData.filter(
          (note) => note.poster_role === "Instructor" && note.title === title
        );
        const studentNotes = noteData.filter(
          (note) =>
            note.poster_role === "Student" &&
            note.poster_id === userData[0].user_id &&
            note.title === title
        );
        setInstructorNotes(instructorNotes);
        setStudentNotes(studentNotes);
      }
    }
  }, [userData, noteData, title]);

  // Handle edit button click
  const handleEdit = (id, initialNote, role) => {
    setEditNoteId(id);
    if (role === "Instructor") {
      setEditedInstructorNote(initialNote);
    } else if (role === "Student") {
      setEditedStudentNote(initialNote);
    }
  };

  // Handle save button click
  const handleSaveEdit = (id, role) => {
    // Select appropriate state and setter based on role
    const editedNote =
      role === "Instructor" ? editedInstructorNote : editedStudentNote;

    // Send edited note data to backend
    const editedData = {
      id: id,
      poster_id: userData[0].user_id,
      poster_role: userData[0].role_name,
      title: title,
      editedNote: editedNote,
    };

    axios
      .post(`http://localhost:8800/student/updatenote/`, editedData)
      .then((response) => {
        // Handle successful response
        console.log("Note updated successfully:", response.data);
        setEditNoteId(null);
        if (role === "Instructor") {
          setEditedInstructorNote("");
        } else if (role === "Student") {
          setEditedStudentNote("");
        }
        // Fetch updated note data
        axios
          .get("http://localhost:8800/studen/postednote")
          .then((response) => {
            setNoteData(response.data);
          })
          .catch((err) => console.log(err));
      })
      .catch((error) => {
        // Handle error
        console.error("Error updating note:", error);
      });
  };

  // Handle cancel button click
  const handleCancelEdit = () => {
    setEditNoteId(null);
    setEditedInstructorNote("");
    setEditedStudentNote("");
  };

  // handle delete functionality
  const handleDelete = (id) => {
    axios
      .post("http://localhost:8800/user/deletenote/", { id: id })
      .then((respone) => {
        console.log("Response: ", respone);

        axios
          .get("http://localhost:8800/studen/postednote")
          .then((response) => {
            setNoteData(response.data);
          })
          .catch((err) => console.log(err));
      })
      .catch((error) => {
        console.log("Error", error);
      });
  };

  // Handle adding new note
  const handleAddNote = () => {
    // Send new note data to backend
    setIsAddingNote(false);
    const newNoteData = {
      poster_id: userData[0].user_id,
      poster_role: userData[0].role_name,
      title: title,
      note_text: newNote,
    };

    axios
      .post(`http://localhost:8800/user/addnote/`, newNoteData)
      .then((response) => {
        // Handle successful response
        console.log("Note added successfully:", response.data);
        // Fetch updated note data
        axios
          .get("http://localhost:8800/studen/postednote")
          .then((response) => {
            setNoteData(response.data);
            setNewNote(""); // Clear the new note input
          })
          .catch((err) => console.log(err));
      })
      .catch((error) => {
        // Handle error
        console.error("Error adding note:", error);
      });
  };

  return (
    <Box sx={useStyles.root}>
      <Typography variant="h6" sx={useStyles.title}>
        Summary
      </Typography>
      {/* Display only the summary text and add icon when userData is not available */}
      {!userData ? (
        <Box>
          <Typography variant="h6">
            Share your perception 👉
            <IconButton disabled>
              <AddIcon />
            </IconButton>
          </Typography>
        </Box>
      ) : (
        <>
          {/* Render the rest of the component when userData is available */}
          {userData[0].role_name === "Instructor" && (
            <Box>
              {instructorNotes.map((note) => (
                <Box key={note.id} sx={useStyles.section}>
                  {editNoteId === note.id ? (
                    <>
                      <TextareaAutosize
                        value={editedInstructorNote}
                        onChange={(e) =>
                          setEditedInstructorNote(e.target.value)
                        }
                        minRows={6}
                        style={{ width: "100%", marginBottom: 16 }}
                      />
                      <Button
                        onClick={() => handleSaveEdit(note.id, "Instructor")}
                      >
                        Save
                      </Button>
                      <Button onClick={handleCancelEdit}>Cancel</Button>
                    </>
                  ) : (
                    <>
                      <Typography variant="body1" sx={useStyles.paragraph}>
                        {note.note_text}
                      </Typography>
                      <Tooltip title="Edit" arrow>
                        <IconButton
                          onClick={() =>
                            handleEdit(note.id, note.note_text, "Instructor")
                          }
                        >
                          <EditIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete" arrow>
                        <IconButton onClick={() => handleDelete(note.id)}>
                          <Delete />
                        </IconButton>
                      </Tooltip>
                    </>
                  )}
                </Box>
              ))}
              {!isAddingNote && (
                <Typography variant="h6">
                  Share your perception 👉
                  <IconButton onClick={() => setIsAddingNote(true)}>
                    <AddIcon />
                  </IconButton>
                </Typography>
              )}
              {isAddingNote && (
                <Box sx={useStyles.section}>
                  <TextareaAutosize
                    value={newNote}
                    onChange={(e) => setNewNote(e.target.value)}
                    minRows={6}
                    style={{ width: "100%", marginBottom: 16 }}
                    placeholder="Enter your note here..."
                  />
                  <Button onClick={handleAddNote}>Save</Button>
                  <Button onClick={() => setIsAddingNote(false)}>Cancel</Button>
                </Box>
              )}
            </Box>
          )}

          {userData[0].role_name === "Student" && (
            <Box>
              {instructorNotes.map((note) => (
                <Box key={note.id} sx={useStyles.section}>
                  <Typography variant="body1" sx={useStyles.paragraph}>
                    {note.note_text}
                  </Typography>
                </Box>
              ))}
              {studentNotes.map((note) => (
                <Box key={note.id} sx={useStyles.section}>
                  {editNoteId === note.id ? (
                    <>
                      <TextareaAutosize
                        value={editedStudentNote}
                        onChange={(e) => setEditedStudentNote(e.target.value)}
                        minRows={6}
                        style={{ width: "100%", marginBottom: 16 }}
                      />
                      <Button
                        onClick={() => handleSaveEdit(note.id, "Student")}
                      >
                        Save
                      </Button>
                      <Button onClick={handleCancelEdit}>Cancel</Button>
                    </>
                  ) : (
                    <>
                      <Typography variant="body1" sx={useStyles.paragraph}>
                        {note.note_text}
                      </Typography>
                      <Tooltip title="Edit" arrow></Tooltip>
                      <IconButton
                        onClick={() =>
                          handleEdit(note.id, note.note_text, "Student")
                        }
                      >
                        <EditIcon />
                      </IconButton>
                      <Tooltip title="Delete" arrow>
                        <IconButton onClick={() => handleDelete(note.id)}>
                          <Delete />
                        </IconButton>
                      </Tooltip>
                    </>
                  )}
                </Box>
              ))}
              {!isAddingNote && (
                <Typography variant="h6">
                  Jot down your perception by clicking 👉{" "}
                  <IconButton onClick={() => setIsAddingNote(true)}>
                    <AddIcon />
                  </IconButton>
                </Typography>
              )}
              {isAddingNote && (
                <Box sx={useStyles.section}>
                  <TextareaAutosize
                    value={newNote}
                    onChange={(e) => setNewNote(e.target.value)}
                    minRows={6}
                    style={{ width: "100%", marginBottom: 16 }}
                    placeholder="Enter your note here..."
                  />
                  <Button onClick={handleAddNote}>Save</Button>
                  <Button onClick={() => setIsAddingNote(false)}>Cancel</Button>
                </Box>
              )}
            </Box>
          )}
        </>
      )}
    </Box>
  );
}

export default Content;
