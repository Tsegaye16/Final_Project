import React from "react";
import HashLogic from "./logic/hash_logic";
import { Box, Container, Typography } from "@mui/material";

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
function Hash_table() {
  return (
    <Container maxWidth="lg">
      <Box sx={useStyles.section}>
        <Box sx={useStyles.root}>
          <Typography variant="h6" sx={useStyles.title}>
            Introduction
          </Typography>
          <Typography variant="body1" sx={useStyles.paragraph}>
            paragraph about hash introduction....
          </Typography>
        </Box>
        <Box sx={useStyles.root}>
          <Typography variant="h6" sx={useStyles.title}>
            Operation on hash
          </Typography>
          <Typography variant="body1" sx={useStyles.paragraph}>
            paragraph about hash operations....
          </Typography>
        </Box>
        <Box sx={useStyles.root}>
          <Typography variant="h6" sx={useStyles.title}>
            Implementation of hash
          </Typography>
          <Typography variant="body1" sx={useStyles.paragraph}>
            drop a code here....
          </Typography>
        </Box>
      </Box>
    </Container>
  );
}

export default Hash_table;
