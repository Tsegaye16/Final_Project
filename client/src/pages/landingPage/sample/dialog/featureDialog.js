import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@material-ui/core";

const FeatureDialog = ({ open, handleClose, feature }) => {
  if (!feature) return null;
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle style={{ fontWeight: "bolder" }}>
        {feature.feature}
      </DialogTitle>
      <DialogContent>
        <Typography>{feature.description}</Typography>
        <img
          src={feature.image}
          alt={feature.feature}
          style={{ maxWidth: "100%", height: "auto" }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default FeatureDialog;
