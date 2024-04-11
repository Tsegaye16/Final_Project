import React, { useState, useRef } from "react";
import "./operation.scss";

function Operation() {
  const [value, setValue] = useState(""); // State to store input value
  const [position, setPosition] = useState(""); // State to store selected position
  const [nodes, setNodes] = useState([]); // State to store nodes
  const [searchValue, setSearchValue] = useState(""); // State to store search value
  const animationRef = useRef(null); // Ref to store animation reference
  const [removePosition, setRemovePosition] = useState("");
  const [isOperationInProgress, setIsOperationInProgress] = useState(false); // State to track operation progress
  const [timeDelay, setTimeDelay] = useState(1000);

  // Handling time delay for operation
  const handleTimeDelayChange = (event) => {
    setTimeDelay(event.target.value);
  };

  const handleValueChange = (event) => {
    setValue(event.target.value);
  };

  // Function to handle position selection change
  const handlePositionChange = (event) => {
    setPosition(event.target.value);
  };

  // Function to handle insert button click
  const handleInsert = () => {
    if (!value || !position || isOperationInProgress) {
      alert("Please enter a value and select a position.");
      return;
    }

    let insertIndex;
    if (position === "at index") {
      insertIndex = parseInt(prompt("Enter the index:"));
      if (insertIndex < 0 || insertIndex > nodes.length) {
        alert("Invalid index.");
        return;
      }
    }

    setIsOperationInProgress(true); // Set operation in progress

    // Visualize search process during insertion at the end or specific index
    if (position === "at end" || position === "at index") {
      visualizeSearch(position === "at index" ? insertIndex : nodes.length);
    } else {
      insertNode(position);
      setIsOperationInProgress(false); // Reset operation progress
    }
  };

  // Function to visualize search process
  const visualizeSearch = (endIndex) => {
    let currentIndex = 0;

    const intervalId = setInterval(() => {
      if (currentIndex < endIndex) {
        // Highlight the current node being searched
        const updatedNodes = nodes.map((node, index) => ({
          ...node,
          color: index === currentIndex ? "green" : node.color,
        }));
        setNodes(updatedNodes);
        currentIndex++;
      } else {
        clearInterval(intervalId);
        insertNode(endIndex);
        setIsOperationInProgress(false); // Reset operation progress
      }
    }, timeDelay); // Adjust the delay between each step as needed
  };

  // Function to insert node at specified position
  const insertNode = (index) => {
    // Create a copy of nodes array
    const updatedNodes = [...nodes];

    // Insert the new node at the specified index
    updatedNodes.splice(index, 0, { value, x: 100, y: 100 }); // Insert at the specified index

    // Update the positions of the nodes based on the insertion
    for (let i = index; i < updatedNodes.length; i++) {
      updatedNodes[i].x += 100; // Shift the positions of nodes to the right
    }

    setNodes(updatedNodes);
  };

  // Function to handle position selection change for removal
  const handleRemovePositionChange = (event) => {
    setRemovePosition(event.target.value);
  };

  // Function to handle remove button click
  const handleRemove = () => {
    if (isOperationInProgress) {
      alert("Another operation is in progress.");
      return;
    }

    let removeIndex;

    if (removePosition === "from begin") {
      if (nodes.length === 0) {
        alert("Linked list is empty.");
        return;
      }
      removeIndex = 0; // Removing from the beginning
    } else if (removePosition === "from end") {
      if (nodes.length === 0) {
        alert("Linked list is empty.");
        return;
      }
      removeIndex = nodes.length - 1; // Removing from the end
    } else if (removePosition === "from index") {
      const removeValue = parseInt(
        document.getElementById("remove-input").value
      );
      if (isNaN(removeValue)) {
        alert("Please enter a valid index.");
        return;
      }

      if (removeValue < 0 || removeValue >= nodes.length) {
        alert("Invalid index.");
        return;
      }

      removeIndex = removeValue;
    }

    setIsOperationInProgress(true); // Set operation in progress

    // Visualize search process before removal
    visualizeSearchForRemoval(removeIndex);
  };

  // Function to visualize search process before removal
  const visualizeSearchForRemoval = (index) => {
    let currentIndex = 0;

    const intervalId = setInterval(() => {
      if (currentIndex <= index) {
        // Highlight the current node being searched
        const updatedNodes = nodes.map((node, idx) => ({
          ...node,
          color: idx === currentIndex ? "green" : node.color,
        }));
        setNodes(updatedNodes);
        currentIndex++;
      } else {
        clearInterval(intervalId);
        removeNode(index);
        setIsOperationInProgress(false); // Reset operation progress
      }
    }, timeDelay); // Adjust the delay between each step as needed
  };

  // Function to remove node at specified index
  const removeNode = (index) => {
    // Create a copy of nodes array
    const updatedNodes = [...nodes];

    // Remove the node at the specified index
    updatedNodes.splice(index, 1);

    // Update the positions of the nodes after removal
    for (let i = index; i < updatedNodes.length; i++) {
      updatedNodes[i].x -= 100; // Shift the positions of nodes to the left
    }

    setNodes(updatedNodes);
  };

  // Function to handle search value change
  const handleSearchValueChange = (event) => {
    setSearchValue(event.target.value);
  };

  // Function to handle search button click
  const handleSearch = () => {
    if (isOperationInProgress) {
      alert("Another operation is in progress.");
      return;
    }

    if (!searchValue) {
      alert("Please enter a value to search.");
      return;
    }

    setIsOperationInProgress(true); // Set operation in progress

    // Visualize search process
    visualizeSearchByValue();
  };

  // Function to visualize search process by value
  const visualizeSearchByValue = () => {
    let currentIndex = 0;
    const foundIndex = nodes.findIndex((node) => node.value === searchValue);

    const intervalId = setInterval(() => {
      if (currentIndex <= foundIndex) {
        // Highlight the current node being searched
        const updatedNodes = nodes.map((node, idx) => ({
          ...node,
          color: idx === currentIndex ? "green" : node.color,
        }));
        setNodes(updatedNodes);
        currentIndex++;
      } else {
        clearInterval(intervalId);
        if (foundIndex !== -1) {
          // Change color of the found node
          const updatedNodes = [...nodes];
          updatedNodes[foundIndex].color = "blue";
          setNodes(updatedNodes);
        }

        setIsOperationInProgress(false); // Reset operation progress
      }
    }, timeDelay); // Adjust the delay between each step as needed
  };

  return (
    <div className="linked-list-container">
      <div className="user-interaction">
        <div className="insert">
          <input
            type="number"
            className="node-number"
            placeholder="Enter value"
            value={value}
            onChange={handleValueChange}
            disabled={isOperationInProgress} // Disable input during operation
          />
          <select
            className="node-number"
            value={position}
            onChange={handlePositionChange}
            disabled={isOperationInProgress} // Disable input during operation
          >
            <option value="">Select position</option>
            <option value="at begin">At Beginning</option>
            <option value="at end">At End</option>
            <option value="at index">At Index</option>
          </select>

          <button
            className="create-button"
            onClick={handleInsert}
            disabled={isOperationInProgress} // Disable button during operation
          >
            Insert
          </button>
        </div>
        <div className="remove">
          <input
            type="number"
            className="node-number"
            id="remove-input"
            placeholder="Enter index"
            disabled={isOperationInProgress || removePosition !== "from index"} // Disable input when not needed or during operation
          />
          <select
            className="node-number"
            value={removePosition}
            onChange={handleRemovePositionChange}
            disabled={isOperationInProgress} // Disable input during operation
          >
            <option value="">Select position</option>
            <option value="from begin">From Beginning</option>
            <option value="from end">From End</option>
            <option value="from index">From Index</option>
          </select>
          <button
            className="create-button"
            onClick={handleRemove}
            disabled={isOperationInProgress} // Disable button during operation
          >
            Remove
          </button>
        </div>
        <div className="search">
          <input
            type="number"
            className="node-number"
            placeholder="value"
            value={searchValue}
            onChange={handleSearchValueChange}
            disabled={isOperationInProgress} // Disable input during operation
          />
          <button
            className="create-button"
            onClick={handleSearch}
            disabled={isOperationInProgress} // Disable button during operation
          >
            Search
          </button>
        </div>
        <div className="time-slider-container">
          <input
            type="range"
            min="500"
            max="3000"
            className="slider"
            value={timeDelay}
            onChange={handleTimeDelayChange}
            style={{
              transform: "rotate(-90deg)",
              width: "100px",
              marginTop: "50px",
            }}
            disabled={isOperationInProgress} // Disable input during operation
          />
          {/* Display current time delay value */}
        </div>
      </div>
      <div className="logical-representation">
        <svg height="200px" width="100%" style={{ backgroundColor: "yellow" }}>
          <text
            x="60"
            y="35"
            dominantBaseline="middle"
            textAnchor="middle"
            fill="black"
            fontSize="20"
            fontFamily="Arial"
          >
            head
          </text>
          {/* a rectangle that represents the head of the linked list */}
          <rect x="30" y="50" width="50" height="40" fill="white" />
          {/* diagonal of a rectangle that represents empty data */}
          <line
            x1="30"
            y1="50"
            x2="80"
            y2="90"
            stroke="black"
            strokeWidth={2}
          />
          {/* the lines that points to the next node of linked list */}
          <line
            x1="55"
            y1="90"
            x2="55"
            y2="125"
            stroke="black"
            strokeWidth={2}
          />
          <line
            x1="55"
            y1="125"
            x2="100"
            y2="125"
            stroke="black"
            strokeWidth={2}
            markerEnd="url(#arrow)"
          />

          {/* Render rectangles representing nodes */}
          {nodes.map((node, index) => (
            <g key={index}>
              <rect
                x={100 + index * 100} // Adjust the positioning with gaps between nodes
                y={node.y}
                width="70"
                height="50"
                fill={node.color || "white"} // Use the node's color if available, otherwise default to white
              />
              <text
                x={125 + index * 100} // Adjust the positioning with gaps between nodes
                y={node.y + 25}
                dominantBaseline="middle"
                textAnchor="middle"
                fill="black"
                fontSize="16"
              >
                {node.value}
              </text>
              <line
                x1={140 + index * 100}
                y1={node.y}
                x2={140 + index * 100}
                y2={node.y + 50}
                stroke="black"
              />

              {/* Render arrow connecting to the next node */}
              {index < nodes.length - 1 && (
                <line
                  x1={170 + index * 100} // Adjust the positioning with gaps between nodes
                  y1={node.y + 25}
                  x2={200 + (index + 1) * 100} // Adjust the positioning with gaps between nodes
                  y2={node.y + 25}
                  stroke={nodes[index].lineColor || "black"} // Use the line's color if available, otherwise default to black
                  strokeWidth={2}
                  markerEnd="url(#arrow)"
                />
              )}
            </g>
          ))}
          {/* Render arrow pointing to the first node if it exists */}
          {nodes.length > 0 && (
            <line
              x1={170} // Adjust the positioning with gaps between nodes
              y1={nodes[0].y + 25}
              x2={200} // Adjust the positioning with gaps between nodes
              y2={nodes[0].y + 25}
              stroke="black"
              strokeWidth={2}
              markerEnd="url(#arrow)"
            />
          )}
          {/* Define arrow marker */}
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

export default Operation;
