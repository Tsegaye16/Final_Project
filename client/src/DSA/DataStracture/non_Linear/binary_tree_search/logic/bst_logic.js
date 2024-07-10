import React, { useState, useRef } from "react";
import { Box, Typography, Input, Button } from "@mui/material";
import "./bst_logic.scss";

function BSTLogic() {
  const initialTree = {
    value: 10,
    left: {
      value: 5,
      left: { value: 3, left: null, right: null },
      right: { value: 8, left: null, right: null },
    },
    right: {
      value: 15,
      left: { value: 12, left: null, right: null },
      right: { value: 18, left: null, right: null },
    },
  };

  const [tree, setTree] = useState(initialTree);
  const [insertValue, setInsertValue] = useState("");
  const [deleteValue, setDeleteValue] = useState("");
  const defaultSpeed = (2000 - 100) / 2 + 100;
  const [speed, setSpeed] = useState(defaultSpeed); // Default speed: 1000 milliseconds (1 second)
  const [highlightedNodes, setHighlightedNodes] = useState([]);
  const animationRef = useRef();
  const [traversalType, setTraversalType] = useState("inOrder"); // Default to in-order traversal
  const [traversalResult, setTraversalResult] = useState([]);
  const [traversalIndex, setTraversalIndex] = useState(0);

  const traverseTree = () => {
    setTraversalResult([]); // Clear previous results
    setTraversalIndex(0); // Reset traversal index

    const result = traverse(tree, traversalType);
    setTraversalResult(result);
    animateTraversal(result);
  };
  const animateTraversal = (result) => {
    const animateInterval = speed; // Use the user-selected speed
    let currentIndex = 0;

    const animateStep = () => {
      if (currentIndex < result.length) {
        const currentNode = result[currentIndex];

        // Color the node
        setHighlightedNodes([currentNode.value]);
        setTraversalIndex(currentIndex);

        currentIndex++;

        if (currentIndex >= result.length) {
          clearInterval(animationRef.current);
          setHighlightedNodes([]);
        }
      }
    };

    const animateTraversalWithDelay = () => {
      animationRef.current = setInterval(() => {
        animateStep();
      }, animateInterval);
    };

    // Reset traversal index
    setTraversalIndex(0);

    // Start the animation with delay
    animateTraversalWithDelay();
  };

  const traverse = (root, type) => {
    if (!root) {
      return [];
    }

    switch (type) {
      case "inOrder":
        return inOrderTraversal(root);
      case "preOrder":
        return preOrderTraversal(root);
      case "postOrder":
        return postOrderTraversal(root);
      default:
        return [];
    }
  };

  const inOrderTraversal = (node) => {
    if (!node) {
      return [];
    }

    return [
      ...inOrderTraversal(node.left),
      node,
      ...inOrderTraversal(node.right),
    ];
  };

  const preOrderTraversal = (node) => {
    if (!node) {
      return [];
    }

    return [
      node,
      ...preOrderTraversal(node.left),
      ...preOrderTraversal(node.right),
    ];
  };

  const postOrderTraversal = (node) => {
    if (!node) {
      return [];
    }

    return [
      ...postOrderTraversal(node.left),
      ...postOrderTraversal(node.right),
      node,
    ];
  };
  const insertNode = () => {
    const newValue = parseInt(insertValue);
    if (!isNaN(newValue)) {
      const result = insertBST(tree, newValue);
      animateOperation(result);
      setInsertValue("");
    }
  };

  const deleteNode = () => {
    const deleteKey = parseInt(deleteValue);
    if (!isNaN(deleteKey)) {
      const result = deleteBST(tree, deleteKey);
      animateOperation(result);
      setDeleteValue("");
    }
  };

  const animateOperation = (result, isInsert, isDelete) => {
    const animateInterval = 1000; // Adjust the interval as needed
    let currentIndex = 0;

    const animateStep = () => {
      const currentNodes = result.nodes.slice(0, currentIndex + 1);

      // Color the nodes
      setHighlightedNodes(currentNodes);

      if (currentIndex > 0) {
        // Uncolor the previous node
        setHighlightedNodes((prevNodes) => {
          const lastHighlighted = prevNodes[prevNodes.length - 1];
          return lastHighlighted === currentNodes[currentIndex - 1]
            ? prevNodes
            : prevNodes.slice(0, prevNodes.length - 1);
        });
      }

      currentIndex++;

      if (currentIndex >= result.nodes.length) {
        clearInterval(animationRef.current);
        setTree(result.tree);
        setHighlightedNodes([]);

        // If it's an insertion, directly color the inserted node and its parent
        if (isInsert && result.insertedNode) {
          setHighlightedNodes([
            result.insertedNode.value,
            ...result.insertedNode.ancestors,
          ]);
        }

        // If it's a deletion, directly color the deleted node and its ancestors
        if (isDelete && result.deletedNode) {
          setHighlightedNodes([
            result.deletedNode.value,
            ...result.deletedNode.ancestors,
          ]);
        }
      }
    };

    animationRef.current = setInterval(animateStep, animateInterval);
  };

  // Function to insert a new node into the Binary Search Tree
  const insertBST = (root, value, nodes = [], ancestors = []) => {
    if (!root) {
      return {
        tree: { value, left: null, right: null },
        nodes,
        insertedNode: { value, ancestors },
      };
    }

    nodes.push(root.value);

    if (value < root.value) {
      const result = insertBST(root.left, value, nodes, [
        root.value,
        ...ancestors,
      ]);
      return {
        tree: { ...root, left: result.tree },
        nodes: result.nodes,
        insertedNode: result.insertedNode,
      };
    } else if (value > root.value) {
      const result = insertBST(root.right, value, nodes, [
        root.value,
        ...ancestors,
      ]);
      return {
        tree: { ...root, right: result.tree },
        nodes: result.nodes,
        insertedNode: result.insertedNode,
      };
    }

    return { tree: root, nodes, insertedNode: { value, ancestors } };
  };

  const deleteBST = (root, key, nodes = [], ancestors = []) => {
    if (!root) {
      return { tree: null, nodes, deletedNode: null, leafNode: null };
    }

    nodes.push(root.value);

    if (key < root.value) {
      const result = deleteBST(root.left, key, nodes, [
        root.value,
        ...ancestors,
      ]);
      return {
        tree: { ...root, left: result.tree },
        nodes: result.nodes,
        deletedNode: result.deletedNode,
        leafNode: result.leafNode,
      };
    } else if (key > root.value) {
      const result = deleteBST(root.right, key, nodes, [
        root.value,
        ...ancestors,
      ]);
      return {
        tree: { ...root, right: result.tree },
        nodes: result.nodes,
        deletedNode: result.deletedNode,
        leafNode: result.leafNode,
      };
    } else {
      // Node found, mark it as the node to be deleted
      const deletedNode = { value: root.value, ancestors: [] };

      if (!root.left && !root.right) {
        // Node with no children (leaf node)
        return { tree: null, nodes, deletedNode, leafNode: null };
      } else if (root.left && !root.right) {
        // Node with only left child
        return { tree: root.left, nodes, deletedNode, leafNode: root.left };
      } else if (!root.left && root.right) {
        // Node with only right child
        return { tree: root.right, nodes, deletedNode, leafNode: root.right };
      } else {
        // Node with both left and right children
        const rightmost = findRightmost(root.left);
        deletedNode.ancestors = [...rightmost.ancestors, root.value];
        root.value = rightmost.value;
        root.left = deleteBST(root.left, rightmost.value, nodes, [
          ...rightmost.ancestors,
          root.value,
          ...ancestors,
        ]).tree;
        return { tree: root, nodes, deletedNode, leafNode: rightmost };
      }
    }
  };

  // Helper function to find the rightmost node in a subtree
  const findRightmost = (node) => {
    let ancestors = [];
    while (node.right) {
      ancestors.push(node.value);
      node = node.right;
    }
    return { value: node.value, ancestors };
  };

  // Helper function to find the leftmost node in a subtree
  const findLeftmost = (node) => {
    let ancestors = [];
    while (node.left + 1) {
      ancestors.push(node.value);
      node = node.left;
    }
    return { value: node.value, ancestors };
  };
  // Helper function to find the smallest value in a BST
  const minValue = (node) => {
    let minValue = node.value;
    while (node.left) {
      minValue = node.left.value;
      node = node.left;
    }
    return minValue;
  };

  // Function to draw the tree
  const drawTree = (root, x, y, xOffset, highlightedNodes) => {
    if (!root) {
      return [];
    }

    const lines = [];

    // Draw lines and circles for the current node and its children
    if (root.left) {
      lines.push(
        <line
          key={`lineLeft${root.value}`}
          x1={x}
          y1={y}
          x2={x - xOffset}
          y2={y + 60}
          stroke="black"
          strokeWidth="2"
        />
      );
      lines.push(
        ...drawTree(
          root.left,
          x - xOffset,
          y + 60,
          xOffset / 2,
          highlightedNodes
        )
      );
    }

    if (root.right) {
      lines.push(
        <line
          key={`lineRight${root.value}`}
          x1={x}
          y1={y}
          x2={x + xOffset}
          y2={y + 60}
          stroke="black"
          strokeWidth="2"
        />
      );
      lines.push(
        ...drawTree(
          root.right,
          x + xOffset,
          y + 60,
          xOffset / 2,
          highlightedNodes
        )
      );
    }

    const circleColor = highlightedNodes.includes(root.value)
      ? "green"
      : "white";

    lines.push(
      <circle
        key={`circle${root.value}`}
        cx={x}
        cy={y}
        r="20"
        stroke="black"
        strokeWidth="2"
        fill={circleColor}
      />
    );
    lines.push(
      <text
        key={`text${root.value}`}
        x={x - 5}
        y={y + 5}
        fill="red"
        textAnchor="middle"
      >
        {root.value}
      </text>
    );

    return lines;
  };

  return (
    <div className="bst-container">
      <div className="user-interaction">
        <div className="insert">
          <input
            type="number"
            className="node-number"
            placeholder="number of nodes"
            value={insertValue}
            onChange={(e) => setInsertValue(e.target.value)}
          />
          <button className="create-button" onClick={insertNode}>
            insert
          </button>
        </div>
        <div className="delete">
          <input
            type="number"
            className="node-number"
            placeholder="value"
            value={deleteValue}
            onChange={(e) => setDeleteValue(e.target.value)}
          />
          <button className="create-button" onClick={deleteNode}>
            delete
          </button>
        </div>
        <div className="traverse">
          <select
            className="node-number"
            value={traversalType}
            onChange={(e) => setTraversalType(e.target.value)}
          >
            <option value="" disabled>
              Traversal Method
            </option>
            <option value="inOrder">in-order</option>
            <option value="preOrder">pre-order</option>
            <option value="postOrder">post-order</option>
          </select>
          <button className="create-button" onClick={traverseTree}>
            Traverse
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
            className="slider"
            value={speed}
            onChange={(e) => setSpeed(parseInt(e.target.value))}
            style={{
              width: "150px",
              margin: "10px",
            }} // Adjust width and margin as needed
          />
          {/* Display current time delay value */}
        </div>
      </div>
      <div>
        {traversalIndex > 0 &&
          traversalResult.slice(0, traversalIndex + 1).map((node) => (
            <span
              key={node.value}
              style={{ marginRight: "5px", fontWeight: "bold" }}
            >
              {node.value}
            </span>
          ))}
      </div>
      <div className="viualization">
        <svg height="70vh" width="100%" style={{ marginBottom: "20px" }}>
          {drawTree(tree, window.innerWidth / 2, 30, 150, highlightedNodes)}
        </svg>
      </div>
    </div>
  );
}

export default BSTLogic;
