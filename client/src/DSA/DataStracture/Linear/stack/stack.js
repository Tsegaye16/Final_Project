import React, { useState } from "react";
import "./stack.scss";
import { Box } from "@mui/material";

function Stack() {
  const queueSize = 8;
  const [top, setTop] = useState(-1);
  const [stackHeights, setStackHeights] = useState(
    Array.from({ length: queueSize }, () => 0)
  );

  const handlePush = () => {
    if (top === queueSize - 1) {
      console.log("Stack overflow");
      return;
    }

    const newValue = parseInt(document.querySelector(".input-element").value);
    if (isNaN(newValue)) {
      console.log("Invalid input");
      return;
    }

    setTop((prevTop) => prevTop + 1);
    setStackHeights((prevHeights) => {
      const newHeights = [...prevHeights];
      const fixedHeight = 76; // Adjust this for the desired constant height
      newHeights[top + 1] = { height: fixedHeight, value: newValue };
      return newHeights;
    });
  };

  const handlePop = () => {
    if (top === -1) {
      console.log("Stack underflow");
      return;
    }

    setStackHeights((prevHeights) => {
      const newHeights = [...prevHeights];
      newHeights.splice(top, 1); // Remove the last element
      return newHeights;
    });

    setTop((prevTop) => prevTop - 1);
  };

  return (
    <div className="main-stack">
      <div className="section-one">
        <div className="input-container">
          <input type="number" className="input-element"></input>
          <button className="stack-button" onClick={handlePush}>
            Push
          </button>
        </div>
        <div className="input-container">
          <button className="stack-button" onClick={handlePop}>
            Pop
          </button>
        </div>
        <div className="top">Top: {top}</div>
      </div>
      <div className="barrel-container">
        <div className="barrel">
          {stackHeights.map((stackElement, index) => (
            <div
              key={index}
              className="stack-element"
              style={{ height: `${stackElement.height}px` }}
            >
              {stackElement.value}
            </div>
          ))}
        </div>
        <Box
          className="numbers-outside"
          sx={{ display: "flex", flexDirection: "column" }}
        >
          {Array.from({ length: queueSize }, (_, i) => (
            <div
              key={i}
              style={{ borderBottom: "1px black solid", height: "50px" }}
            >
              {queueSize - i - 1}
            </div>
          ))}
        </Box>
      </div>
    </div>
  );
}

export default Stack;
