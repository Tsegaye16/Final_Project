import React, { useState } from "react";
import "./hash_logic.scss";

function HashLogic() {
  const [tableSize, setTableSize] = useState(6);
  const [index, setIndex] = useState([]);
  const [speed, setSpeed] = useState(500);
  const [insertValue, setInsertValue] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [searchResult, setSearchResult] = useState("");
  const [isSearching, setIsSearching] = useState(false); // New state for search in progress
  const [searchResultIndex, setSearchResultIndex] = useState(null);
  const [colorCircles, setColorCircles] = useState(false);
  const [beignCompare, setBeingCompare] = useState("");
  const [removeValue, setRemoveValue] = useState("");

  // create the hash table with given tableSize
  const createInitialTable = (size) => {
    let newTable = [];
    for (let i = 0; i < size; i++) {
      newTable[i] = null;
    }
    setIndex(newTable);
  };

  const handleCreateTable = () => {
    setSearchResultIndex(null);
    setIsSearching(false);
    createInitialTable(tableSize);
  };

  const handleTime = (event) => {
    setSpeed(event.target.value);
    console.log("Speed: ", speed);
  };

  // implement the hash function number % tableSize
  const getHashCode = (key, size) => {
    return key % size;
  };

  // Append the inserted value to its correct index
  const insertIntoTable = (item) => {
    const pos = getHashCode(item, tableSize);

    // Create a copy of the index array
    const newIndex = [...index];

    // If the index position is empty, insert the value directly
    if (newIndex[pos] === null || newIndex[pos] === undefined) {
      newIndex[pos] = [item];
    } else {
      // If there's a collision, append the value to the existing chain
      newIndex[pos] = [...newIndex[pos], item];
    }

    // Update the state with the modified copy
    setIndex(newIndex);

    return pos;
  };

  // Inside the searchInTable function

  const searchInTable = async (value) => {
    setIsSearching(true); // Set searching state to true
    setSearchResult(""); // Clear previous search result
    setColorCircles(true); // Enable coloring of circles during search

    const pos = getHashCode(value, tableSize);
    setSearchResultIndex(pos); // Store the index where the search was performed
    await new Promise((resolve) => setTimeout(resolve, speed));
    if (index[pos] === null || index[pos] === undefined) {
      setSearchResult(`${value} not found`);
      setIsSearching(false); // Set searching state to false after delay
      setColorCircles(false); // Disable coloring of circles after the search process
      return;
    }

    let current = index[pos];
    let found = false;

    for (let i = 0; i <= current.length; i++) {
      // Highlight the current index being searched
      setSearchResultIndex(pos);

      // Highlight the current element with a delay
      await new Promise((resolve) => setTimeout(resolve, speed));
      setBeingCompare(current[i]); // Highlight the current value

      if (current[i] === value) {
        found = true;
        setSearchResult(`${value} found  at index ${pos}`);
        break;
      } else {
        setSearchResult(`${current[i]} is being compared`); // Update search progress
      }
    }

    if (!found) {
      setSearchResult(`${value} not found`);
    }

    setColorCircles(false); // Disable coloring of circles after the search process
    setIsSearching(false); // Set searching state to false after delay
  };

  const removeFromTable = async (value) => {
    setIsSearching(true); // Set searching state to true
    setSearchResult(""); // Clear previous search result
    setColorCircles(true); // Enable coloring of circles during search

    const pos = getHashCode(value, tableSize);
    setSearchResultIndex(pos); // Store the index where the search was performed
    //setBeingCompare(value); // Highlight the value to be removed

    await new Promise((resolve) => setTimeout(resolve, speed)); // Delay to highlight index and value

    if (index[pos] === null || index[pos] === undefined) {
      setSearchResult(`${value} not found`);
      setIsSearching(false); // Set searching state to false after delay
      setColorCircles(false); // Disable coloring of circles after the search process
      return;
    }

    let current = index[pos];
    let found = false;

    for (let i = 0; i < current.length; i++) {
      // Highlight the current index being searched
      setSearchResultIndex(pos);

      // Highlight the current element with a delay
      await new Promise((resolve) => setTimeout(resolve, speed));
      setBeingCompare(current[i]); // Highlight the current value

      if (current[i] === value) {
        found = true;
        // After a short delay, remove the item visually
        setTimeout(() => {
          const updatedIndex = [...index];
          updatedIndex[pos].splice(i, 1);
          setIndex(updatedIndex);
          setSearchResult(`${value} removed from index ${pos}`);
          setIsSearching(false); // Set searching state to false after delay
          setColorCircles(false); // Disable coloring of circles after the search process
        }, speed);
        break;
      } else {
        setSearchResult(`${current[i]} is being compared`);
      }
    }

    if (!found) {
      setSearchResult(`${value} not found`);
      setIsSearching(false); // Set searching state to false after delay
      setColorCircles(false); // Disable coloring of circles after the search process
    }
  };

  return (
    <div className="hash-container">
      <div className="user-interaction">
        <div className="creat-table">
          <input
            min={1}
            max={14}
            type="number"
            className="node-number"
            placeholder="table size"
            disabled={isSearching}
            value={tableSize}
            onChange={(e) => setTableSize(parseInt(e.target.value))}
          />
          <button
            className="create-button"
            onClick={handleCreateTable}
            disabled={isSearching}
          >
            create
          </button>
        </div>
        <div className="insert-value">
          <input
            type="number"
            min={0}
            max={500}
            className="node-number"
            placeholder="value"
            disabled={isSearching}
            value={insertValue}
            onChange={(e) => setInsertValue(parseInt(e.target.value))}
          />
          <button
            className="create-button"
            disabled={isSearching}
            onClick={() => insertIntoTable(insertValue)}
          >
            insert
          </button>
        </div>
        <div className="search-value">
          <input
            type="number"
            className="node-number"
            placeholder="value"
            value={searchValue}
            disabled={isSearching}
            onChange={(e) => setSearchValue(parseInt(e.target.value))}
          />
          <button
            className="create-button"
            disabled={isSearching} // Disable if searching or no table
            onClick={() => searchInTable(searchValue)}
          >
            search
          </button>
        </div>
        <div className="remove-value">
          <input
            type="number"
            disabled={isSearching}
            className="node-number"
            placeholder="value"
            value={removeValue}
            onChange={(e) => setRemoveValue(parseInt(e.target.value))}
          />
          <button
            className="create-button"
            disabled={isSearching}
            onClick={() => removeFromTable(removeValue)}
          >
            remove
          </button>
        </div>
        <div
          className="time-slider-container"
          style={{
            paddingTop: "40px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <input
            type="range"
            min="1000" // Minimum one second
            max="60000"
            disabled={isSearching}
            className="slider"
            style={{
              width: "150px",
              margin: "10px",
            }}
            value={speed}
            onChange={handleTime}
          />
          {/* Display current time delay value */}
        </div>
        <p>{searchResult}</p>
      </div>
      <div className="logical-representation">
        <svg width="100%" height={1000}>
          {index.map((column, i) => (
            <React.Fragment key={i}>
              {/* Highlight hash index */}
              <circle
                cx={30}
                cy={i * 70 + 50}
                r="25"
                fill={
                  colorCircles && i === searchResultIndex
                    ? "yellow" // Yellow for currently searching index
                    : "lightgray"
                }
                stroke="black"
                strokeWidth="2"
              />
              <text x={30} y={i * 70 + 55} textAnchor="middle" fontSize="14">
                {i}
              </text>
              {column &&
                column.map((item, j) => (
                  <React.Fragment key={`${i}-${j}`}>
                    <line
                      x1={j * 70 + 55}
                      y1={i * 70 + 50}
                      x2={j * 70 + 95}
                      y2={i * 70 + 50}
                      stroke="black"
                      markerEnd="url(#arrow)"
                    />
                    {/* Color the circle being searched or found during search */}
                    <circle
                      cx={j * 70 + 110}
                      cy={i * 70 + 50}
                      r="16"
                      fill={
                        searchResultIndex !== null &&
                        i === searchResultIndex &&
                        item === beignCompare
                          ? "green" // Green for found item
                          : "lightgray"
                      }
                      stroke="black"
                    />
                    <text
                      x={j * 70 + 110}
                      y={i * 70 + 55}
                      textAnchor="middle"
                      fontSize="14"
                      fill="black"
                      // Green for found item text
                    >
                      {item}
                    </text>
                  </React.Fragment>
                ))}
            </React.Fragment>
          ))}

          <defs>
            <marker
              id="arrow"
              markerWidth="10"
              markerHeight="10"
              refX="9"
              refY="3"
              orient="auto"
              markerUnits="strokeWidth"
            >
              <path d="M0,0 L0,6 L9,3 z" fill="#000" />
            </marker>
          </defs>
        </svg>
      </div>
    </div>
  );
}

export default HashLogic;
