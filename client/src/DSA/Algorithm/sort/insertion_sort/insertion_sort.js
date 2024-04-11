import React, { useState, useEffect, useCallback } from "react";
import { Button, Input, Slider, Typography, Box } from "@mui/material";
import "./insertion_sort.scss"; // Import your SCSS file if needed

function InsertionSort() {
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

  // Function to perform Insertion Sort
  const insertionSort = useCallback(async () => {
    setSorting(true);
    const arrayCopy = [...array];

    for (let i = 1; i < arrayCopy.length; i++) {
      let currentValue = arrayCopy[i];
      let j = i - 1;

      currentValue.color = "#f39c12";
      setArray([...arrayCopy]);
      await sleep(speed);

      while (j >= 0 && arrayCopy[j].value > currentValue.value) {
        arrayCopy[j + 1] = arrayCopy[j];
        arrayCopy[j + 1].color = "#f39c12";
        setArray([...arrayCopy]);
        await sleep(speed);
        arrayCopy[j + 1].color = "#3498db";
        j--;
        if (j >= 0) {
          arrayCopy[j].color = "#f39c12";
          setArray([...arrayCopy]);
          await sleep(speed);
        }
      }

      arrayCopy[j + 1] = currentValue;
      setArray([...arrayCopy]);
      await sleep(speed);

      arrayCopy.forEach((item) => (item.color = "#3498db"));
      setArray([...arrayCopy]);
    }

    setSorting(false);
  }, [array, speed]);

  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  useEffect(() => {
    generateRandomArray(arraySize);
  }, [arraySize]);

  return (
    <Box display="flex" flexDirection="column" alignItems="center" padding="0">
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
          <Button onClick={insertionSort} disabled={sorting}>
            {sorting ? "Sorting..." : "Start Insertion Sort"}
          </Button>
        </Box>
        <Box display="flex" flexDirection="row" width="100%">
          <Typography variant="body1">Speed: {speed}</Typography>
          <Slider
            value={speed}
            min={1}
            max={500}
            onChange={(e) => setSpeed(parseInt(e.target.value))}
            disabled={sorting}
            style={{ width: "200px" }}
          />
        </Box>
      </Box>

      <Box marginTop="20px">
        {array.map((item, index) => (
          <div
            key={index}
            style={{
              height: `${item.value}px`,
              backgroundColor: item.color,
              width: "60px",
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
}

export default InsertionSort;
