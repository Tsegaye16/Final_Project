import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Box } from "@mui/material";

const NavigationBar = () => {
  return (
    <AppBar
      position="fixed"
      sx={{ backgroundColor: "#2c3e50", display: "flex" }}
    >
      <Toolbar disableGutters>
        <Typography variant="h6" noWrap component="div" sx={{ mr: 2 }}>
          DSA
        </Typography>
        <Box sx={{ flexGrow: 1 }} />{" "}
        {/* Empty box to push buttons to the right */}
        <Button color="inherit" href="/student">
          Start learning
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default NavigationBar;
