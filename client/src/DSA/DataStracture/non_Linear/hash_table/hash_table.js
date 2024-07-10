import React from "react";
import HashLogic from "./logic/hash_logic";
import { Box, Container, Typography } from "@mui/material";
import Content from "../../../content/content";
import CodeTemplate from "./code/CodeTemplate";

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
function Hash_table({ title, userData }) {
  return (
    <>
      <HashLogic />
      <Container maxWidth="lg">
        <Box sx={useStyles.section}>
          <Box sx={useStyles.root}>
            <Typography variant="h6" sx={useStyles.title}>
              Implementation of hash
            </Typography>

            <CodeTemplate />
          </Box>
          <Content title={title} userData={userData} />
        </Box>
      </Container>
    </>
  );
}

export default Hash_table;
