import React from "react";
import { Box, Container, Typography } from "@mui/material";
import Queues from "./queues";
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
function QueueList() {
  return (
    <Container maxWidth="lg">
      <Box sx={useStyles.section}>
        <Box sx={useStyles.root}>
          <Typography variant="h6" sx={useStyles.title}>
            Introduction
          </Typography>
          <Typography variant="body1" sx={useStyles.paragraph}>
            In computer science, a queue is a fundamental data structure that
            operates on the principle of First In, First Out (FIFO). Picture a
            line at a ticket counter, where the first person to enter is the
            first to be served. Similarly, in a queue data structure, elements
            are added at the rear end and removed from the front. This behavior
            makes queues an essential tool for managing data in various
            scenarios, from task scheduling in operating systems to print job
            management and network packet processing. Understanding queues is
            crucial for efficient algorithm design and system development.
          </Typography>
        </Box>
        <Box sx={useStyles.root}>
          <Typography variant="h6" sx={useStyles.title}>
            Operation
          </Typography>

          <Typography variant="body1" sx={useStyles.paragraph}>
            Great! There are several important operations for queues, but let's
            discuss two fundamental ones: enqueue and dequeue.
            <ol>
              <li>
                <Typography variant="h6"> Enqueue (Insert):</Typography>
                <ul>
                  <li>
                    This operation adds a new element to the back (rear) of the
                    queue.
                  </li>
                  <li>
                    Imagine someone joining the back of the line at a coffee
                    shop.
                  </li>
                  <li>
                    We typically need to check if the queue is full before
                    performing an enqueue.
                  </li>
                </ul>
              </li>
              <li>
                <Typography variant="h6">Dequeue (Remove):</Typography>
                <ul>
                  <li>
                    This operation removes the element from the front (head) of
                    the queue and returns it.
                  </li>
                  <li>
                    It's like the person at the front of the coffee shop line
                    finally getting served.
                  </li>
                  <li>
                    Similar to enqueue, it's often important to check if the
                    queue is empty before attempting a dequeue to avoid errors.
                  </li>
                </ul>
              </li>
            </ol>
            <Typography variant="body1">
              These two operations establish the FIFO order in a queue. Elements
              are added at the back and removed from the front, ensuring the
              first in line gets processed first.
            </Typography>
          </Typography>
          <Queues />
        </Box>
        <Box sx={useStyles.root}>
          <Typography variant="h6">Implementation</Typography>
          <CodeTemplate />
        </Box>
       
      </Box>
    </Container>
  );
}

export default QueueList;
