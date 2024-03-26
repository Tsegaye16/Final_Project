import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Team from "../../pages/landingPage/sample/dialog/team";

const useStyles = makeStyles((theme) => ({
  popup: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent black background
  },
  popupContent: {
    padding: theme.spacing(2), // Add padding using theme spacing
    maxWidth: 600, // Adjust the maximum width as needed
  },
}));

const Teampopup = ({ handleClose, show }) => {
  const classes = useStyles();

  const handleBackgroundClick = (e) => {
    // Check if the click occurred on the background div, not its children
    if (e.target.classList.contains(classes.popup)) {
      handleClose();
    }
  };

  return (
    <div
      className={show ? classes.popup : "display-none"}
      onClick={handleBackgroundClick}
    >
      <Paper className={classes.popupContent}>
        <Team />
      </Paper>
    </div>
  );
};

export default Teampopup;
