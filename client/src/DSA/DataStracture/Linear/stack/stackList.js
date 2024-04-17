import React from "react";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Stack from "./stack";
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

function StackList() {
  return (
    <Container maxWidth="lg">
      <Box sx={useStyles.section}>
        <Box sx={useStyles.root}>
          <Typography variant="h6" sx={useStyles.title}>
            Introduction
          </Typography>
          <Typography variant="body1" sx={useStyles.paragraph}>
            In computer science, a stack is a fundamental data structure that
            follows the Last In, First Out (LIFO) principle. Imagine a stack of
            plates in a cafeteria - you can only add or remove plates from the
            top of the stack. Similarly, in a stack data structure, elements are
            added or removed from the top, which is also referred to as the "top
            of the stack."
            <br />
            <br />
            The stack has two primary operations:
            <ol>
              <li>Push: Adding an element to the top of the stack.</li>
              <li>Pop: Removing the top element from the stack.</li>
            </ol>
            There's often a third operation:
            <ol start="3">
              <li>
                Peek (or Top): Viewing the top element of the stack without
                removing it.
              </li>
            </ol>
            These operations allow you to manage data in a sequential manner,
            making stacks useful in various scenarios such as implementing
            function calls in programming languages (the call stack), parsing
            expressions, undo mechanisms in text editors, and much more.
            <br />
            <br />
            In programming, stacks are often implemented using arrays or linked
            lists. Arrays provide constant-time access to elements, but their
            size might need to be fixed. Linked lists allow dynamic allocation
            of memory but may have slightly higher overhead due to pointers.
            <br />
            <br />
            Overall, stacks are simple yet powerful data structures that find
            applications in many areas of computer science and software
            engineering.
          </Typography>
        </Box>
        <Box sx={useStyles.root}>
          <Typography variant="h6" sx={useStyles.title}>
            Operations
          </Typography>
          <ol>
            <li>
              <Typography variant="h6">Push:</Typography>
              <ul>
                <li>
                  This operation adds a new element to the top of the stack.
                </li>
                <li>
                  Imagine placing a new plate on top of the existing pile.
                </li>
                <li>
                  <strong>Implementation:</strong> The implementation varies
                  depending on the programming language. It often involves
                  updating a pointer that keeps track of the top element and
                  adding the new element to the appropriate internal data
                  structure (like an array).
                </li>
              </ul>
            </li>
            <li>
              <Typography variant="h6">Pop:</Typography>
              <ul>
                <li>
                  This operation removes and returns the element from the top of
                  the stack.
                </li>
                <li>Think of taking the top plate off the pile.</li>
                <li>
                  <strong>Implementation:</strong> Similar to push, it involves
                  updating the top pointer and retrieving the element at that
                  position. However, the retrieved element is also removed from
                  the internal data structure.
                </li>
              </ul>
            </li>
            <li>
              <Typography variant="h6">Peek:</Typography>
              <ul>
                <li>
                  This operation allows you to view the element at the top of
                  the stack without removing it.
                </li>
                <li>
                  It's like peeking at the top plate without disturbing the
                  pile.
                </li>
                <li>
                  <strong>Implementation:</strong> This typically involves
                  accessing the element at the position pointed to by the top
                  pointer without modifying the data structure.
                </li>
              </ul>
            </li>
            <li>
              <Typography variant="h6">IsEmpty:</Typography>
              <ul>
                <li>
                  This operation checks if the stack is empty (contains no
                  elements).
                </li>
                <li>It's like checking if there are any plates in the pile.</li>
                <li>
                  <strong>Implementation:</strong> This often involves checking
                  if the top pointer points to a special value indicating an
                  empty stack.
                </li>
              </ul>
            </li>
            <li>
              <Typography variant="h6">Size:</Typography>
              <ul>
                <li>
                  This operation returns the number of elements currently in the
                  stack.
                </li>
                <li>It tells you how many plates are in the pile.</li>
                <li>
                  <strong>Implementation:</strong> This might involve keeping
                  track of the size separately or calculating it based on the
                  position of the top pointer.
                </li>
              </ul>
            </li>
          </ol>
          <Stack />
        </Box>
        <Box sx={useStyles.root}>
          <Typography variant="h6" sx={useStyles.title}>
            Implementation
          </Typography>
          <CodeTemplate />
        </Box>
      </Box>
    </Container>
  );
}

export default StackList;
