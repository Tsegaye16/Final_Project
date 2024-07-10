import React, { useState } from "react";
import { Box, Button, Input } from "@mui/material";
import "./queues.scss"; // Import your CSS file for additional styling

function Queues() {
  const queueSize = 8; // Set the size of the queue
  const [queue, setQueue] = useState([]);
  const [enqueueValue, setEnqueueValue] = useState("");
  const [warning, setWarning] = useState(null);

  const handleEnqueue = () => {
    if (queue.length < queueSize) {
      setQueue([...queue, enqueueValue]);
      animateEnqueue();
    } else {
      showWarning("Queue Overflow");
    }
  };

  const handleDequeue = () => {
    if (queue.length > 0) {
      animateDequeue();
    } else {
      showWarning("Empty Queue");
    }
  };

  const showWarning = (message) => {
    setWarning(message);
    setTimeout(() => {
      setWarning(null);
    }, 1000);
  };

  const animateEnqueue = () => {
    const enqueuedBoxContainer = document.querySelector(
      ".enqueued-box-container"
    );

    const newBox = document.createElement("div");
    newBox.classList.add("enqueued-box");
    newBox.innerText = enqueueValue;

    enqueuedBoxContainer.appendChild(newBox);

    setTimeout(() => {
      newBox.style.transform = `translateX(0)`;
    }, 100);
  };

  const animateDequeue = () => {
    const enqueuedBoxContainer = document.querySelector(
      ".enqueued-box-container"
    );
    const firstBox = enqueuedBoxContainer.firstChild;

    if (firstBox) {
      firstBox.style.transform = `translateX(-${firstBox.clientWidth}px)`;

      setTimeout(() => {
        enqueuedBoxContainer.removeChild(firstBox);
        setQueue(queue.slice(1)); // Remove the first item from the queue
      }, 500);
    }
  };

  return (
    <Box className="queue-container">
      <Box
        sx={{
          marginBottom: "20px",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Input
          type="number"
          value={enqueueValue}
          onChange={(e) => setEnqueueValue(e.target.value)}
        />
        <Button
          variant="contained"
          color="primary"
          sx={{ marginLeft: "8px" }}
          onClick={handleEnqueue}
        >
          Enqueue
        </Button>
        <Button variant="contained" color="secondary" onClick={handleDequeue}>
          Dequeue
        </Button>
      </Box>
      <Box
        className="barrel"
        sx={{
          borderTop: "5px solid #333",
          borderBottom: "5px solid #333",
          height: "100px",
          display: "flex",
          position: "relative",
        }}
      >
        <Box
          className="enqueued-box-container"
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            height: "100%",
            overflow: "hidden",
            display: "flex",
          }}
        >
          {/* Enqueued boxes will be appended here */}
        </Box>
      </Box>
      <Box
        className="numbers-outside"
        sx={{
          display: "flex",
          justifyContent: "space-between",
          width: "58%",
          marginTop: "20px",
        }}
      >
        {Array.from({ length: queueSize }, (_, i) => (
          <div key={i}>{i}</div>
        ))}
      </Box>
      <Box>Front: {queue.length > 0 ? queue[0] : "Empty"}</Box>
      {warning && (
        <Box
          mt={1}
          p={1}
          bgcolor="#e74c3c"
          color="#fff"
          borderRadius={4}
          width="200px"
        >
          {warning}
        </Box>
      )}
    </Box>
  );
}

export default Queues;
