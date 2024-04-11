import React, { useState, useEffect, useCallback } from "react";
import { Button, Input, Slider, Typography, Box } from "@mui/material";

// Implement Bubble Sort algorithm
const BubbleSort = () => {
  const [array, setArray] = useState([]);
  const [sorting, setSorting] = useState(false);
  const [arraySize, setArraySize] = useState(10);
  const [speed, setSpeed] = useState(3000);

  // Function to generate a random array
  const generateRandomArray = (size) => {
    const newArray = [];
    for (let i = 0; i < size; i++) {
      newArray.push({
        value: Math.floor(Math.random() * 100) * 3 + 2,
        color: "#3498db",
      });
    }
    setArray(newArray);
  };

  // Function to perform Bubble Sort
  const bubbleSort = useCallback(async () => {
    setSorting(true);
    const arrayCopy = [...array];
    let noSwap;
    for (let i = 0; i < arrayCopy.length - 1; i++) {
      noSwap = true;
      for (let j = 0; j < arrayCopy.length - 1 - i; j++) {
        arrayCopy[j].color = "#f39c12";
        arrayCopy[j + 1].color = "#f39c12";
        setArray([...arrayCopy]);
        await sleep(speed);

        if (arrayCopy[j].value > arrayCopy[j + 1].value) {
          const temp = arrayCopy[j];
          arrayCopy[j] = arrayCopy[j + 1];
          arrayCopy[j + 1] = temp;
          setArray([...arrayCopy]);
          noSwap = false;
        }
        arrayCopy[j].color = "#3498db";
        arrayCopy[j + 1].color = "#3498db";
        setArray([...arrayCopy]);
      }
      if (noSwap) {
        break;
      }
    }

    setSorting(false);
  }, [array, speed]);

  // Function to introduce delay
  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  // UseEffect to generate random array when arraySize changes
  useEffect(() => {
    generateRandomArray(arraySize);
  }, [arraySize]);

  return (
    <Box display="flex" flexDirection="column" alignItems="center" padding="0">
      {/* First part with background color */}
      <Box
        display="flex"
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
        marginBottom="20px"
        bgcolor="rgb(239, 235, 235)"
        padding="20px"
        borderRadius="5px"
        width="100%"
        borderBottom="2px solid black"
      >
        <Box
          display="flex"
          flexDirection="row"
          width="100%" // Setting width to 100% to ensure it takes full width on smaller screens
          flexWrap="wrap" // Allowing items to wrap when screen size is reduced
        >
          <Typography variant="body1">Array Size:</Typography>
          <Input
            type="number"
            inputProps={{ min: 1, max: 25 }}
            value={arraySize}
            onChange={(e) => setArraySize(parseInt(e.target.value))}
            disabled={sorting}
            style={{ marginLeft: "10px" }}
          />
          <Button
            onClick={() => generateRandomArray(arraySize)}
            disabled={sorting}
            style={{ marginLeft: "10px" }}
          >
            Generate Array
          </Button>
        </Box>

        <Box display="flex" flexDirection="row" width="100%">
          <Button
            onClick={bubbleSort}
            disabled={sorting}
            style={{ marginBottom: "20px" }}
          >
            {sorting ? "Sorting..." : "Start Bubble Sort"}
          </Button>
        </Box>
        <Box display="flex" flexDirection="row" width="100%">
          <Typography variant="body1" style={{ marginTop: "10px" }}>
            Speed: {speed}
          </Typography>
          <Slider
            min={1}
            max={500}
            value={speed}
            onChange={(e) => setSpeed(parseInt(e.target.value))}
            disabled={sorting}
            style={{ width: "40%" }}
          />
        </Box>
      </Box>

      {/* Visualization part */}
      <Box marginTop="20px">
        {array.map((item, index) => (
          <div
            key={index}
            style={{
              height: `${item.value}px`,
              width: "60px",
              backgroundColor: item.color,
              display: "inline-block",
              margin: "2px",
              verticalAlign: "bottom",
            }}
          >
            {item.value}
          </div>
        ))}
      </Box>
    </Box>
  );
};

export default BubbleSort;
