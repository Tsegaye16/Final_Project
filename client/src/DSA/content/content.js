import React, { useState, useEffect } from "react";

import { Box, Typography, IconButton, Button, Grid } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import { Delete } from "@mui/icons-material";

import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { Tooltip } from "@mui/material";
import axios from "axios";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

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
  const [nullNotes, setNullNotes] = useState([]);
  const [editNoteId, setEditNoteId] = useState(null);
  const [editedInstructorNote, setEditedInstructorNote] = useState("");
  const [editedStudentNote, setEditedStudentNote] = useState("");
  const [editedNullNote, setEditedNullNote] = useState("");
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
    console.log("sample reacct query");
    if (noteData) {
      if (userData[0].role_name === "Instructor") {
        const instructorNotes = noteData.filter(
          (note) =>
            note.poster_role === "Instructor" &&
            note.poster_id === userData[0].user_id &&
            note.title === title
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
      } else if (userData[0].role_name === null) {
        const instructorNotes = noteData.filter(
          (note) => note.poster_role === "Instructor" && note.title === title
        );
        const nullNotes = noteData.filter(
          (note) =>
            note.poster_role === null &&
            note.poster_id === userData[0].user_id &&
            note.title === title
        );
        setInstructorNotes(instructorNotes);
        setNullNotes(nullNotes);
        //setStudentNotes(studentNotes);
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
    } else if (role === "null") {
      setEditedNullNote(initialNote);
    }
  };

  // Handle save button click
  const handleSaveEdit = (id, role) => {
    // Select appropriate state and setter based on role
    let editedNote = "";

    if (role === "Instructor") {
      editedNote = editedInstructorNote;
    } else if (role === "Student") {
      editedNote = editedStudentNote;
    } else if (role === "null") {
      editedNote = editedNullNote;
    }
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
        } else if (role === null) {
          setEditedNullNote("");
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
      {/* Render notes based on user role */}
      {userData[0].role_name === "Instructor" && (
        <Box>
          {/* Render instructor notes */}

          {instructorNotes.map((note) => (
            <Box key={note.id} sx={useStyles.section}>
              {/* Render edit textarea if editNoteId matches current note id */}
              {editNoteId === note.id ? (
                <>
                  {/* <TextareaAutosize
                    value={editedInstructorNote}
                    onChange={(e) => setEditedInstructorNote(e.target.value)}
                    minRows={6}
                    style={{ width: "100%", marginBottom: 16 }}
                  />
                  <Button onClick={() => handleSaveEdit(note.id, "Instructor")}>
                    Save
                  </Button>
                  <Button onClick={handleCancelEdit}>Cancel</Button> */}
                  <Grid container spacing={2} alignItems="center">
                    <Grid item xs={12} style={{ backgroundColor: "white" }}>
                      <ReactQuill
                        value={editedInstructorNote}
                        onChange={(value) => setEditedInstructorNote(value)}
                        modules={modules}
                        formats={formats}
                      />
                    </Grid>
                    <Grid item>
                      <Button
                        variant="contained"
                        onClick={() => handleSaveEdit(note.id, "Instructor")}
                      >
                        Save
                      </Button>
                    </Grid>
                    <Grid item>
                      <Button variant="outlined" onClick={handleCancelEdit}>
                        Cancel
                      </Button>
                    </Grid>
                  </Grid>
                </>
              ) : (
                <>
                  <div dangerouslySetInnerHTML={{ __html: note.note_text }} />
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
              {/* <TextareaAutosize
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                minRows={6}
                style={{ width: "100%", marginBottom: 16 }}
                placeholder="Enter your note here..."
              />
              <Button onClick={handleAddNote}>Save</Button>
              <Button onClick={() => setIsAddingNote(false)}>Cancel</Button> */}
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={12} style={{ backgroundColor: "white" }}>
                  <ReactQuill
                    value={newNote}
                    onChange={(value) => setNewNote(value)}
                    modules={modules}
                    formats={formats}
                  />
                </Grid>
                <Grid item>
                  <Button variant="contained" onClick={handleAddNote}>
                    Save
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    variant="outlined"
                    onClick={() => setIsAddingNote(false)}
                  >
                    Cancel
                  </Button>
                </Grid>
              </Grid>
            </Box>
          )}
          {/* Add textarea for adding new note */}
        </Box>
      )}

      {userData[0].role_name === "Student" && (
        <Box>
          {instructorNotes.map((note) => (
            <Box key={note.id} sx={useStyles.section}>
              <div dangerouslySetInnerHTML={{ __html: note.note_text }} />
            </Box>
          ))}
          {studentNotes.map((note) => (
            <Box key={note.id} sx={useStyles.section}>
              {/* Render edit textarea if editNoteId matches current note id */}
              {editNoteId === note.id ? (
                <>
                  <Grid container spacing={2} alignItems="center">
                    <Grid item xs={12} style={{ backgroundColor: "white" }}>
                      <ReactQuill
                        value={editedStudentNote}
                        onChange={(value) => setEditedStudentNote(value)}
                        modules={modules}
                        formats={formats}
                      />
                    </Grid>
                    <Grid item>
                      <Button
                        variant="contained"
                        onClick={() => handleSaveEdit(note.id, "Student")}
                      >
                        Save
                      </Button>
                    </Grid>
                    <Grid item>
                      <Button variant="outlined" onClick={handleCancelEdit}>
                        Cancel
                      </Button>
                    </Grid>
                  </Grid>
                </>
              ) : (
                <>
                  <div dangerouslySetInnerHTML={{ __html: note.note_text }} />
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
          {/* Add textarea for adding new note */}
          {isAddingNote && (
            <Box sx={useStyles.section}>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={12} style={{ backgroundColor: "white" }}>
                  <ReactQuill
                    value={newNote}
                    onChange={setNewNote}
                    modules={modules}
                    formats={formats}
                  />
                </Grid>
                <Grid item>
                  <Button variant="contained" onClick={handleAddNote}>
                    Save
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    variant="outlined"
                    onClick={() => setIsAddingNote(false)}
                  >
                    Cancel
                  </Button>
                </Grid>
              </Grid>
            </Box>
          )}
        </Box>
      )}

      {/* //////////////////////////////////////////////////////////// */}
      {userData[0].role_name === null && (
        <Box>
          {instructorNotes.map((note) => (
            <Box key={note.id} sx={useStyles.section}>
              <div dangerouslySetInnerHTML={{ __html: note.note_text }} />
            </Box>
          ))}
          {nullNotes.map((note) => (
            <Box key={note.id} sx={useStyles.section}>
              {/* Render edit textarea if editNoteId matches current note id */}
              {editNoteId === note.id ? (
                <>
                  <Grid container spacing={2} alignItems="center">
                    <Grid item xs={12} style={{ backgroundColor: "white" }}>
                      <ReactQuill
                        value={editedNullNote}
                        onChange={(value) => setEditedNullNote(value)}
                        modules={modules}
                        formats={formats}
                      />
                    </Grid>
                    <Grid item>
                      <Button
                        variant="contained"
                        onClick={() => handleSaveEdit(note.id, "null")}
                      >
                        Save
                      </Button>
                    </Grid>
                    <Grid item>
                      <Button variant="outlined" onClick={handleCancelEdit}>
                        Cancel
                      </Button>
                    </Grid>
                  </Grid>
                </>
              ) : (
                <>
                  <div dangerouslySetInnerHTML={{ __html: note.note_text }} />
                  <Tooltip title="Edit" arrow></Tooltip>
                  <IconButton
                    onClick={() => handleEdit(note.id, note.note_text, "null")}
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
          {/* Add textarea for adding new note */}
          {isAddingNote && (
            <Box sx={useStyles.section}>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={12} style={{ backgroundColor: "white" }}>
                  <ReactQuill
                    value={newNote}
                    onChange={setNewNote}
                    modules={modules}
                    formats={formats}
                  />
                </Grid>
                <Grid item>
                  <Button variant="contained" onClick={handleAddNote}>
                    Save
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    variant="outlined"
                    onClick={() => setIsAddingNote(false)}
                  >
                    Cancel
                  </Button>
                </Grid>
              </Grid>
            </Box>
          )}
        </Box>
      )}
    </Box>
  );
}

export default Content;

const modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { header: [3, 4, 5, 6] }, { font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    ["code-block"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],

    ["clean"],
  ],
  clipboard: {
    matchVisual: false,
  },
};

const formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "code-block",
  "list",
  "bullet",
  "indent",
];
