import React, { useState, useRef } from "react";
import "./BST.scss";

function BST() {
  const [rootNode, setRootNode] = useState(null);
  const [svgElements, setSvgElements] = useState([]);
  const [rootInputDisabled, setRootInputDisabled] = useState(false);
  const svgRef = useRef(null);

  const handleCreateRoot = (event) => {
    event.preventDefault();

    const inputValue = document.getElementById("rootValue").value;

    if (inputValue === "" || isNaN(parseInt(inputValue, 10))) {
      alert("Please enter a valid number for the root node.");
      return;
    }

    const newNode = { value: inputValue, left: null, right: null };
    setRootNode(newNode);
    setRootInputDisabled(true);

    const svgWidth = svgRef.current.clientWidth;
    const svgHeight = svgRef.current.clientHeight;
    const padding = 20;

    const x = svgWidth / 2;
    const y = 20 + padding;

    setSvgElements((prevSvgElements) => [
      ...prevSvgElements,
      {
        id: inputValue,
        x,
        y,
        element: (
          <g key={inputValue}>
            <circle
              cx={x}
              cy={y}
              r={20}
              fill="white"
              stroke="black"
              strokeWidth={2}
            />
            <text
              x={x}
              y={y}
              fontSize="12"
              textAnchor="middle"
              dominantBaseline="middle"
              fill="black"
            >
              {inputValue}
            </text>
          </g>
        ),
      },
    ]);
  };

  const handleAddNode = () => {
    const inputValue = document.getElementById("addNodeValue").value;

    if (inputValue === "" || isNaN(parseInt(inputValue, 10))) {
      alert("Please enter a valid number for the node value.");
      return;
    }

    if (!rootNode) {
      alert("Please create a root node first.");
      return;
    }

    // Function to insert a node into the BST
    const insertNode = (root, value) => {
      if (!root) {
        return { value, left: null, right: null };
      }

      if (value < root.value) {
        root.left = insertNode(root.left, value);
      } else if (value > root.value) {
        root.right = insertNode(root.right, value);
      }

      return root;
    };

    // Insert the new node into the BST
    const updatedRootNode = insertNode(rootNode, parseInt(inputValue, 10));

    // Update the state with the new root node
    setRootNode(updatedRootNode);

    // Update the SVG visualization
    const updatedSvgElements = [...svgElements];

    const x = svgRef.current.clientWidth / 2;
    const y = 20 + 20 * updatedSvgElements.length;

    updatedSvgElements.push({
      id: inputValue,
      x,
      y,
      element: (
        <g key={inputValue}>
          <circle
            cx={x}
            cy={y}
            r={20}
            fill="white"
            stroke="black"
            strokeWidth={2}
          />
          <text
            x={x}
            y={y}
            fontSize="12"
            textAnchor="middle"
            dominantBaseline="middle"
            fill="black"
          >
            {inputValue}
          </text>
        </g>
      ),
    });

    setSvgElements(updatedSvgElements);
  };

  return (
    <div className="bst-container">
      <div className="user-interaction">
        <div className="create-root">
          <input
            type="number"
            id="rootValue"
            placeholder="root node"
            className="input-values"
            disabled={rootInputDisabled}
          />
          <button
            className="action-button"
            onClick={handleCreateRoot}
            disabled={rootInputDisabled}
          >
            create
          </button>
        </div>
        <div className="add-node">
          <input
            type="number"
            id="addNodeValue"
            placeholder="value to add"
            className="input-values"
          ></input>
          <button className="action-button" onClick={handleAddNode}>
            add node
          </button>
        </div>
        <div className="delete-node">
          <input
            type="number"
            placeholder="value to delete"
            className="input-values"
          ></input>
          <button className="action-button">delete node</button>
        </div>
        <div className="traverse-tree">
          <select className="input-values">
            <option value="" selected disabled hidden>
              Traversal Method
            </option>
            <option value="inorder">InOrder</option>
            <option value="preorder">preOrder</option>
            <option value="postorder">PostOrder</option>
          </select>
          <button className="action-button">traverse</button>
        </div>
        <div className="contorl-time">
          <input type="range" min={10000} max={60000}></input>
        </div>
      </div>
      <div className="visualization">
        <svg
          ref={svgRef}
          width="100%"
          height="60vh"
          style={{ backgroundColor: "yellow" }}
        >
          {svgElements.map((svgElement) => (
            <React.Fragment key={svgElement.id}>
              {svgElement.element}
            </React.Fragment>
          ))}
          {/* Add lines connecting nodes here */}
        </svg>
      </div>
    </div>
  );
}

export default BST;
