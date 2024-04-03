import React, { useState, useRef, useEffect } from "react";
import "./hash_table.scss";

function Hash_table() {
  const [tableSize, setTableSize] = useState(6);
  const [index, setIndex] = useState([]);
  const [speed, setSpeed] = useState(500);
  const [insertValue, setInsertValue] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [deleteValue, setDeleteValue] = useState("");
  const [searchIndex, setSearchIndex] = useState(null);
  const [searchResult, setSearchResult] = useState("");
  const [searchHighlight, setSearchHighlight] = useState([]); // New state for search visualization

  // create the hash table with given tableSize
  const creatinitialTable = (size) => {
    let newTable = [];
    for (let i = 0; i < size; i++) {
      newTable[i] = null;
    }
    setIndex(newTable);
  };

  const handleCreateTable = () => {
    creatinitialTable(tableSize);
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

    if (newIndex[pos] === null || newIndex[pos] === undefined) {
      newIndex[pos] = [item];
    } else {
      newIndex[pos].push(item);
    }

    // Update the state with the modified copy
    setIndex(newIndex);

    return pos;
  };

  // Searching in the table using the search algorithm
  const searchInTable = async () => {
    const value = parseInt(searchValue);
    const pos = getHashCode(value, tableSize); // Get the hash of the search value
    setSearchIndex(pos);
    const bucket = index[pos] || []; // Get the bucket corresponding to the hash index
    let found = false; // Flag to track if the value is found

    // Color the hash index
    setSearchHighlight([pos]);

    // Introduce a delay before coloring the inserted values
    await sleep(parseInt(speed));

    // Loop through each value within the bucket and color them one after the other
    for (let i = 0; i < bucket.length; i++) {
      await sleep(parseInt(speed)); // Introduce delay
      setSearchHighlight((prevHighlight) => [...prevHighlight, pos]);
      if (bucket[i] === value) {
        // If value found
        setSearchResult(`${value} found at index ${pos}`);
        found = true;
        break;
      }
    }

    // If value not found after searching the entire bucket
    if (!found) {
      setSearchResult(`${value} not found in the table`);
    }
  };

  const sleep = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
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
            value={tableSize}
            onChange={(e) => setTableSize(parseInt(e.target.value))}
          />
          <button className="create-button" onClick={handleCreateTable}>
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
            value={insertValue}
            onChange={(e) => setInsertValue(parseInt(e.target.value))}
          />
          <button
            className="create-button"
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
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <button className="create-button" onClick={searchInTable}>
            search
          </button>
        </div>
        <div className="remove-value">
          <input type="number" className="node-number" placeholder="value" />
          <button className="create-button">remove</button>
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
                fill={searchHighlight.includes(i) ? "yellow" : "white"}
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
                    {/* Highlight circles being searched */}
                    <circle
                      cx={j * 70 + 110}
                      cy={i * 70 + 50}
                      r="16"
                      fill={
                        index[i] && index[i].includes(item)
                          ? searchHighlight.includes(i) // Highlight circles being searched
                            ? "yellow"
                            : "lightgray"
                          : "white"
                      }
                      stroke="black"
                    />
                    <text
                      x={j * 70 + 110}
                      y={i * 70 + 55}
                      textAnchor="middle"
                      fontSize="14"
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

export default Hash_table;
