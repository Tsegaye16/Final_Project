import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@material-ui/core";

function ReadMoreDialog({ open, handleClose }) {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Read More</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Immerse yourself in the fascinating world of data structures and
          algorithms through our cutting-edge visualizer. Whether you're a
          student, developer, or tech enthusiast, our platform provides an
          engaging and hands-on experience to understand the intricacies of
          algorithms.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary" autoFocus>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ReadMoreDialog;
