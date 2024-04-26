import React from "react";
import BSTLogic from "./logic/bst_logic.js";
import { Box, Container, Typography } from "@mui/material";
import Content from "../../../content/content";
import CodeTemplate from "./code/CodeTemplate.js";

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

function BST({ title, userData }) {
  // Initial tree structure
  return (
    <>
      <BSTLogic />
      <Container maxWidth="lg">
        <Box sx={useStyles.section}>
          <Box sx={useStyles.root}>
            <Typography variant="h6" sx={useStyles.title}>
              Introduction
            </Typography>
          </Box>
          <Box sx={useStyles.root}>
            <Typography variant="h6" sx={useStyles.title}>
              Operation on Binary Search Tree
            </Typography>
            <Typography variant="body1" sx={useStyles.paragraph}>
              paragraph about Binary Search Tree operations....
            </Typography>
          </Box>
          <Box sx={useStyles.root}>
            <Typography variant="h6" sx={useStyles.title}>
              Implementation of Binary Search Tree
            </Typography>
            <Typography variant="body1" sx={useStyles.paragraph}>
              <CodeTemplate />
            </Typography>
          </Box>
          <Content title={title} userData={userData} />
        </Box>
      </Container>
    </>
  );
}

export default BST;
