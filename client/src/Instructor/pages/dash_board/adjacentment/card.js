// Card.js
import React, { useState } from "react";
import axios from "axios";
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const useStyles = makeStyles({
  card: {
    maxWidth: 600,
    margin: "auto",
    marginTop: 20,
    padding: 40,
    transition: "transform 0.3s ease-in-out",
    "&:hover": {
      transform: "scale(1.05)",
      cursor: "pointer",
    },
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  textField: {
    marginBottom: 20,
  },
  button: {
    marginTop: 10,
  },
});

function CustomCard({ userData }) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(null);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleChange = (event) => {
    const value = event.target.value;
    if (!isNaN(value) || value === "") {
      setElapsedTime(value); // Set the elapsed time
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:8800/instructor/updateelapsed", {
        poster_id: userData[0].user_id,
        duration: parseInt(elapsedTime),
      });
      toast.success("Added successfully");
    } catch (err) {
      toast.error("updating failed!");
    }
    console.log("Elapsed time:", elapsedTime);
    console.log("User data: ", userData[0].user_id);
    setOpen(false);
  };

  return (
    <>
      <Card className={classes.card} onClick={handleOpen}>
        <CardContent>
          <Typography variant="h6" className={classes.title} gutterBottom>
            Elapsed time to complete this tutorial
          </Typography>
        </CardContent>
        <ToastContainer />
      </Card>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Enter Elapsed Time</DialogTitle>
        <DialogContent>
          <TextField
            label="Elapsed Time"
            value={elapsedTime}
            onChange={handleChange}
            fullWidth
            InputProps={{
              endAdornment: <Typography> hours</Typography>,
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default CustomCard;
