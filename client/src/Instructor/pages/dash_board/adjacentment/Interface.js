import React from "react";
import { Grid, Paper, Typography, Box } from "@mui/material";
import Clock from "../clock/clock";
import person from "../../../../assets/developer.png";

function Interface() {
  return (
    <Box width="100%">
      <Paper
        elevation={3}
        style={{
          padding: 20,
        }}
      >
        <Grid container spacing={2}>
          <Grid
            item
            xs={12}
            md={8}
            style={{
              backgroundImage: `url(${person})`,

              backgroundSize: "100% 100%", // Adjust background size to cover the entire Paper
              backgroundRepeat: "no-repeat",
            }}
          >
            <Typography variant="h4" style={{ color: "white" }}>
              {/* write coding slogan */}
              Refresh yourself by coding challenges!!!
            </Typography>
          </Grid>
          <Grid item xs={12} md={4} style={{ textAlign: "center" }}>
            <Box display="flex" justifyContent="center">
              <Clock />
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
}

export default Interface;
