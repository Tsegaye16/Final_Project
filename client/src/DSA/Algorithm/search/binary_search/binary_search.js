import React, { useState, useEffect } from "react";
import { Button, Input, Slider, Typography, Box } from "@mui/material";

const BinarySearch = () => {
  const [numberOfElements, setNumberOfElements] = useState(10);
  const [elements, setElements] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [low, setLow] = useState(0);
  const [high, setHigh] = useState(0);
  const [mid, setMid] = useState(0);
  const [searching, setSearching] = useState(false);
  const [searchSpeed, setSearchSpeed] = useState(1000); // Adjust for desired speed
  const [searchResult, setSearchResult] = useState(null); // To store search result
  const [highlightedIndex, setHighlightedIndex] = useState(null); // To store highlighted index during search

  useEffect(() => {
    generateElements();
  }, [numberOfElements]); // Regenerated when numberOfElements changes

  const generateElements = () => {
    const newElements = Array.from(
      { length: numberOfElements },
      (_, index) => ({
        value: Math.floor(Math.random() * 100) + 1,
        index: index,
      })
    ).sort((a, b) => a.value - b.value);

    setElements(newElements);
    setLow(0);
    // Set high to the index of the last element in the list
    setHigh(newElements.length - 1);
    setMid(Math.floor((newElements.length - 1) / 2));
  };

  const search = async () => {
    setSearching(true);
    setSearchResult(null); // Reset search result
    setHighlightedIndex(null); // Reset highlighted index

    await binarySearch(low, high);

    setSearching(false);
  };

  const binarySearch = async (start, end) => {
    while (start <= end) {
      let mid = Math.floor((start + end) / 2);

      if (elements[mid].value < parseInt(searchValue)) {
        setLow(mid + 1);
        start = mid + 1;
        await sleep(searchSpeed);
        setMid(Math.floor((start + end) / 2)); // Update mid based on the new low
        await sleep(searchSpeed);

        await sleep(searchSpeed);
      } else if (elements[mid].value > parseInt(searchValue)) {
        setHigh(mid - 1);
        end = mid - 1;
        await sleep(searchSpeed);
        setMid(Math.floor((start + end) / 2)); // Update mid based on the new high

        await sleep(searchSpeed);
      } else {
        setMid(mid);
        setSearchResult("Element found!");
        setHighlightedIndex(mid);
        return;
      }
    }

    setSearchResult("Element not found.");
  };

  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

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
          <Input
            type="number"
            placeholder="Number of elements"
            inputProps={{ min: 3, max: 25 }}
            value={numberOfElements}
            onChange={(e) => setNumberOfElements(parseInt(e.target.value))}
          />
          <Button onClick={generateElements}>Generate</Button>
        </Box>
        <Box display="flex" flexDirection="row" width="100%">
          <Input
            type="number"
            placeholder="Value"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <Button onClick={search} disabled={searching}>
            Search
          </Button>
        </Box>
        <Box display="flex" flexDirection="row" width="100%">
          <Slider
            min={100}
            max={30000}
            value={searchSpeed}
            onChange={(e) => setSearchSpeed(parseInt(e.target.value))}
            style={{ width: "40%" }}
          />
        </Box>
      </Box>
      <Box marginTop="20px" width="100%" overflowX="auto">
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            overflowX: "auto",
          }}
        >
          <svg width={elements.length * 60} height="200">
            {elements.map((element, index) => (
              <rect
                key={index}
                x={index * 60}
                y={0}
                width="50"
                height="40"
                fill={
                  highlightedIndex === index
                    ? "black"
                    : index === low || index === mid || index === high
                      ? "red"
                      : "#3498db"
                }
              />
            ))}
            {elements.map((element, index) => (
              <text
                key={index}
                x={index * 60 + 20}
                y={20}
                fill={"white"}
                textAnchor="middle"
              >
                {element.value}
              </text>
            ))}
            {elements.map((el, i) => (
              <text
                key={i}
                x={i * 60 + 20}
                y={65}
                fill={i === low || i === mid || i === high ? "red" : "#3498db"}
              >
                {i}
              </text>
            ))}
            <text x={low * 60 + 20} y={85} fill="red" textAnchor="middle">
              low
            </text>
            <text x={mid * 60 + 20} y={85} fill="red" textAnchor="middle">
              mid
            </text>
            <text x={high * 60 + 20} y={85} fill="red" textAnchor="middle">
              high
            </text>
          </svg>
          <div>{searchResult}</div> {/* Display search result */}
        </div>
      </Box>
    </Box>
  );
};

export default BinarySearch;
