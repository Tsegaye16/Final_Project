import React, { useEffect, useState, useRef } from "react";

import "./graph.scss";
const SVG_PADDING = 30;

function Graph() {
  const [numNodes, setNumNodes] = useState(0);
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [draggingNodeId, setDraggingNodeId] = useState(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [addEdgeMessage, setAddEdgeMessage] = useState(null);
  const [removeNodeMessage, setRemoveNodeMessage] = useState(null);
  const [nodeToRemove, setNodeToRemove] = useState("");
  const [removeEdgeMessage, setRemoveEdgeMessage] = useState(null);
  const [fromNodeToRemove, setFromNodeToRemove] = useState("");
  const [toNodeToRemove, setToNodeToRemove] = useState("");
  const [nodeColors, setNodeColors] = useState({});
  const [edgeColors, setEdgeColors] = useState({});
  const [nodeToTraverse, setNodeToTraverse] = useState("");
  const [traversalMethod, setTraversalMethod] = useState("");
  const [traversalPath, setTraversalPath] = useState([]);
  const [traversing, setTraversing] = useState(false);
  // handling graph traversal

  const performBFS = async (
    adjacencyList,
    currentNode,
    setTraversalPath,
    setNodeColors,
    setEdgeColors
  ) => {
    const visited = {};
    const queue = [];
    const path = [];

    queue.push(currentNode);

    while (queue.length > 0) {
      const currentNode = queue.shift();
      path.push(currentNode.value);
      console.log("Processing node:", currentNode.value);
      // Update node color here
      setNodeColors((prevColors) => ({
        ...prevColors,
        [currentNode.value]: "lightblue",
      }));

      await new Promise((resolve) => setTimeout(resolve, 1000)); // Adjust delay as needed

      const neighbors = currentNode.neighbors || [];

      for (const neighbor of neighbors) {
        if (!visited[neighbor]) {
          visited[neighbor] = true;
          const neighborNode = nodes.find((node) => node.value === neighbor);

          if (neighborNode) {
            // Update edge color here
            setEdgeColors((prevColors) => ({
              ...prevColors,
              [`${currentNode.value}-${neighbor}`]: "lightblue",
            }));

            // Update next node color here (optional, can be outside the loop)
            setNodeColors((prevColors) => ({
              ...prevColors,
              [currentNode.value]: "lightblue",
            }));

            queue.push(neighborNode);
          }
        }
      }
    }

    setTraversalPath(path);
  };

  const performDFS = async (
    adjacencyList,
    currentNode,
    setTraversalPath,
    setNodeColors,
    setEdgeColors
  ) => {
    const visited = {};
    const path = [];

    const dfs = async (currentNode) => {
      visited[currentNode.value] = true;
      path.push(currentNode.value);

      // Color the current node
      setNodeColors((prevColors) => ({
        ...prevColors,
        [currentNode.value]: "lightcoral",
      }));

      await new Promise((resolve) => setTimeout(resolve, 1000)); // Adjust delay as needed

      const neighbors = adjacencyList[currentNode.value] || []; // Access neighbors using adjacency list

      for (const neighbor of neighbors) {
        const neighborNode = nodes.find((node) => node.value === neighbor);

        if (neighborNode && !visited[neighbor]) {
          // Color the edge
          setEdgeColors((prevColors) => ({
            ...prevColors,
            [`${currentNode.value}-${neighbor}`]: "lightcoral",
          }));

          // Color the next node to be traversed
          setNodeColors((prevColors) => ({
            ...prevColors,
            [neighbor]: "lightblue", // Adjust color for next node
          }));

          await dfs(neighborNode);
        }
      }
    };

    await dfs(currentNode);
    setTraversalPath(path);
  };

  const traverseGraph = async (startNodeValue, traversalMethod) => {
    setTraversing(true);
    setTraversalPath([]);

    const adjacencyList = getAdjacencyList(); // You can use either adjacency matrix or list
    const startNode = nodes.find((node) => node.value === startNodeValue);

    let traversedElements;

    if (traversalMethod === "BFS") {
      traversedElements = await performBFS(
        adjacencyList,
        startNode,
        setTraversalPath,
        setNodeColors,
        setEdgeColors
      );
    } else if (traversalMethod === "DFS") {
      traversedElements = await performDFS(
        adjacencyList,
        startNode,
        setTraversalPath,
        setNodeColors,
        setEdgeColors
      );
    }

    setTraversing(false);
  };

  // Add this useEffect to reset traversal path when nodes or edges change
  useEffect(() => {
    setTraversalPath([]);
  }, [nodes, edges]);
  ///////////////////////////////////////////////

  const svgRef = useRef(null);

  const handleNodeNumberChange = (event) => {
    setNumNodes(parseInt(event.target.value));
  };

  const createGraph = () => {
    if (numNodes > 0) {
      const newNodes = [];
      const usedCharacters = new Set(); // Track used characters
      for (let i = 0; i < numNodes; i++) {
        let randomChar;
        do {
          randomChar = String.fromCharCode(Math.floor(Math.random() * 26) + 65);
        } while (usedCharacters.has(randomChar)); // Regenerate if collision
        usedCharacters.add(randomChar); // Mark character as used
        const newNode = {
          id: i,
          value: randomChar,
          x: getRandomX(SVG_PADDING, window.innerWidth - SVG_PADDING),
          y: getRandomY(SVG_PADDING, window.innerHeight - SVG_PADDING),
        };
        newNodes.push(newNode);
      }
      setNodes(newNodes);
    } else {
      setNodes([]); // Clear nodes when numNodes becomes 0
    }
    setEdges([]); // Clear edges when creating a new graph
  };

  const getRandomX = (min, max) => {
    return Math.floor(Math.random() * (max - min) + min);
  };

  const getRandomY = (min, max) => {
    return Math.floor(Math.random() * (max - min) + min);
  };

  const handleAddEdge = () => {
    const fromLabel = document.getElementById("from-node").value;
    const toLabel = document.getElementById("to-node").value;
    const isDirected =
      document.getElementById("edge-direction").value === "directed";

    const fromNode = nodes.find((node) => node.value === fromLabel); // Find node by label
    const toNode = nodes.find((node) => node.value === toLabel); // Find node by label

    // Check if both nodes exist before adding edge
    if (fromNode && toNode) {
      // Check if the edge already exists
      const isEdgeExist = edges.some(
        (edge) =>
          (edge.from === fromLabel && edge.to === toLabel) ||
          (!isDirected && edge.from === toLabel && edge.to === fromLabel)
      );

      if (isEdgeExist) {
        setAddEdgeMessage(
          "Nodes are already connected. Remove the existing edge first."
        );
        setTimeout(() => {
          setAddEdgeMessage(null);
        }, 5000); // Adjust the duration (in milliseconds) as needed
      } else {
        const newEdge = {
          from: fromLabel,
          to: toLabel,
          directed: isDirected,
        };
        setEdges([...edges, newEdge]);
      }
    } else {
      // Handle the case where either fromNode or toNode is not found
      setAddEdgeMessage(
        "Invalid node input. Both nodes must exist in the graph."
      );
      setTimeout(() => {
        setAddEdgeMessage(null);
      }, 5000); // Adjust the duration (in milliseconds) as needed
    }
  };

  const isValidEdge = (fromLabel, toLabel) => {
    // Not used in the provided code, but included for clarity
    return (
      nodes.some((node) => node.value === fromLabel) &&
      nodes.some((node) => node.value === toLabel)
    );
  };

  const getAdjacencyMatrix = () => {
    if (nodes.length === 0) return [];

    const matrix = Array(nodes.length)
      .fill(null)
      .map(() => Array(nodes.length).fill(0));

    for (const edge of edges) {
      const fromIndex = nodes.findIndex((node) => node.value === edge.from);
      const toIndex = nodes.findIndex((node) => node.value === edge.to);
      matrix[fromIndex][toIndex] = 1;
      if (!edge.directed) {
        matrix[toIndex][fromIndex] = 1; // Add for undirected edges
      }
    }

    // Prepend the first row and column with node values
    const withHeaders = [];
    withHeaders.push([""].concat(nodes.map((node) => node.value))); // First row
    for (let i = 0; i < matrix.length; i++) {
      withHeaders.push([nodes[i].value].concat(matrix[i])); // Remaining rows
    }

    return withHeaders;
  };

  // Function to create the adjacency list representation
  const getAdjacencyList = () => {
    if (nodes.length === 0) return [];

    const list = nodes.map((node) => ({ value: node.value, neighbors: [] }));

    for (const edge of edges) {
      const fromIndex = nodes.findIndex((node) => node.value === edge.from);
      const toIndex = nodes.findIndex((node) => node.value === edge.to);
      list[fromIndex].neighbors.push(nodes[toIndex].value);
      if (!edge.directed) {
        list[toIndex].neighbors.push(nodes[fromIndex].value); // Add for undirected edges
      }
    }
    return list;
  };

  const hasSelfLoops = () => {
    return edges.some((edge) => edge.from === edge.to);
  };

  // Function to adjust self-loop coordinates for visual representation
  const adjustSelfLoopCoordinates = (node) => {
    const radius = 20; // Adjust radius based on your node size
    const angleOffset = Math.PI / 2; // Adjust angle offset as needed

    return {
      x1: node.x + radius * Math.cos(angleOffset),
      y1: node.y + radius * Math.sin(angleOffset),
      x2: node.x - radius * Math.cos(angleOffset),
      y2: node.y - radius * Math.sin(angleOffset), // Corrected typo: math.sin should be math.sin
    };
  };

  useEffect(() => {
    // Clear existing nodes and edges when numNodes changes
    if (numNodes === 0) {
      setNodes([]);
      setEdges([]);
    }
  }, [numNodes]);

  // Handling moving node by dragging the node as you need
  const handleNodeMouseDown = (event, nodeId) => {
    setDraggingNodeId(nodeId);
    const { clientX, clientY } = event;
    const node = nodes.find((n) => n.id === nodeId);
    const offsetX = clientX - node.x;
    const offsetY = clientY - node.y;
    setDragOffset({ x: offsetX, y: offsetY });
  };

  const handleNodeMouseMove = (event) => {
    if (draggingNodeId !== null) {
      const { clientX, clientY } = event;
      const updatedNodes = nodes.map((node) => {
        if (node.id === draggingNodeId) {
          return {
            ...node,
            x: clientX - dragOffset.x,
            y: clientY - dragOffset.y,
          };
        }
        return node;
      });
      setNodes(updatedNodes);
    }
  };

  const handleNodeMouseUp = () => {
    setDraggingNodeId(null);
    setDragOffset({ x: 0, y: 0 });
  };

  useEffect(() => {
    // Attach event listeners during mount
    document.addEventListener("mousemove", handleNodeMouseMove);
    document.addEventListener("mouseup", handleNodeMouseUp);

    // Detach event listeners during unmount
    return () => {
      document.removeEventListener("mousemove", handleNodeMouseMove);
      document.removeEventListener("mouseup", handleNodeMouseUp);
    };
  }, [handleNodeMouseMove, handleNodeMouseUp]);
  // Handle removing node
  const removeNode = (nodeValue) => {
    // Check if the node to be removed exists in the graph
    const nodeExists = nodes.some((node) => node.value === nodeValue);

    if (!nodeExists) {
      setRemoveNodeMessage(
        "The node you want to remove is not present in the graph."
      );
      setTimeout(() => {
        setRemoveNodeMessage(null);
      }, 5000); // Adjust the duration (in milliseconds) as needed
      return;
    }

    // Remove edges connected to the node to be deleted
    const updatedEdges = edges.filter(
      (edge) => edge.from !== nodeValue && edge.to !== nodeValue
    );

    // Remove the node
    const updatedNodes = nodes.filter((node) => node.value !== nodeValue);

    // Update state
    setEdges(updatedEdges);
    setNodes(updatedNodes);
  };

  // Handle removing edge
  const removeEdge = () => {
    const fromLabel = document.getElementById("remove-from-node").value;
    const toLabel = document.getElementById("remove-to-node").value;

    // Check if the edge to be removed exists in the graph
    const edgeExists = edges.some(
      (edge) =>
        (edge.from === fromLabel && edge.to === toLabel) ||
        (!edge.directed && edge.from === toLabel && edge.to === fromLabel)
    );

    if (!edgeExists) {
      setRemoveEdgeMessage(
        "The edge you want to remove is not present in the graph."
      );
      setTimeout(() => {
        setRemoveEdgeMessage(null);
      }, 5000); // Adjust the duration (in milliseconds) as needed
      return;
    }

    // Remove the edge
    const updatedEdges = edges.filter(
      (edge) =>
        !(edge.from === fromLabel && edge.to === toLabel) &&
        !(edge.directed && edge.from === toLabel && edge.to === fromLabel)
    );

    // Update state
    setEdges(updatedEdges);
  };

  //Handling graph

  return (
    <div className="graph-container">
      <div className="user-interaction">
        <div className="create-node">
          <input
            type="number"
            className="node-number"
            min={0}
            max={26}
            placeholder="number of nodes"
            value={numNodes}
            onChange={handleNodeNumberChange}
          />
          <button className="create-button" onClick={createGraph}>
            create graph
          </button>
        </div>
        <div className="add-edge">
          <input
            type="text"
            className="node-number"
            id="from-node"
            placeholder="from"
          />
          <input
            type="text"
            className="node-number"
            id="to-node"
            placeholder="to"
          />

          <select id="edge-direction" className="node-number">
            <option value="directed">directed</option>
            <option value="undirected">undirected</option>
          </select>
          <button className="create-button" onClick={handleAddEdge}>
            add edge
          </button>
          {addEdgeMessage && (
            <div className="warning-message">{addEdgeMessage}</div>
          )}
        </div>
        <div className="remove-node">
          <input
            type="text"
            className="node-number"
            placeholder="value"
            onChange={(e) => setNodeToRemove(e.target.value)}
          />
          <button
            className="create-button"
            onClick={() => removeNode(nodeToRemove)}
          >
            remove node
          </button>
          {removeNodeMessage && (
            <div className="warning-message">{removeNodeMessage}</div>
          )}
        </div>
        <div className="remove-edge">
          <input
            type="text"
            className="node-number"
            id="remove-from-node"
            placeholder="from"
            onChange={(e) => setFromNodeToRemove(e.target.value)}
          />
          <input
            type="text"
            className="node-number"
            id="remove-to-node"
            placeholder="to"
            onChange={(e) => setToNodeToRemove(e.target.value)}
          />
          <button className="create-button" onClick={removeEdge}>
            Remove edge
          </button>
          {removeEdgeMessage && (
            <div className="warning-message">{removeEdgeMessage}</div>
          )}
        </div>
        <div className="traverse">
          <input
            type="text"
            placeholder="start node"
            className="node-number"
            onChange={(e) => setNodeToTraverse(e.target.value)}
          />
          <select
            className="node-number"
            onChange={(e) => setTraversalMethod(e.target.value)}
          >
            <option value="BFS">BFS</option>
            <option value="DFS">DFS</option>
          </select>
          <button
            className="create-button"
            onClick={() => traverseGraph(nodeToTraverse, traversalMethod)}
            disabled={traversing}
          >
            Traverse
          </button>
        </div>
      </div>
      <div>Traversed elements: {traversalPath.join(" -> ")}</div>
      <div className="logical-representation">
        <svg width="100%" height="100vh" style={{ backgroundColor: "yellow" }}>
          {/* Render nodes */}
          {nodes.map((node) => (
            <g
              key={node.id}
              onMouseDown={(event) => handleNodeMouseDown(event, node.id)}
              style={{ cursor: "grab" }}
            >
              <circle
                cx={node.x}
                cy={node.y}
                r="20"
                fill={
                  traversalPath.includes(node.value) ? "lightgreen" : "white"
                }
                stroke="black"
                strokeWidth="2"
              />
              <text
                x={node.x}
                y={node.y + 4} // Adjust text position as needed
                textAnchor="middle"
                fontSize="14"
              >
                {node.value}
              </text>
            </g>
          ))}
          {/* Render edges */}
          {edges.map((edge) => {
            const { x1, y1, x2, y2 } =
              hasSelfLoops() && edge.from === edge.to
                ? adjustSelfLoopCoordinates(
                    nodes.find((n) => n.value === edge.from)
                  ) // Use node details for self-loops
                : {
                    x1: nodes.find((n) => n.value === edge.from).x,
                    y1: nodes.find((n) => n.value === edge.from).y,
                    x2: nodes.find((n) => n.value === edge.to).x,
                    y2: nodes.find((n) => n.value === edge.to).y,
                  };
            return (
              <line
                key={`${edge.from}-${edge.to}`}
                x1={x1} // Find node by label
                y1={y1} // Find node by label
                x2={x2} // Find node by label
                y2={y2} // Find node by label
                //stroke="black"
                stroke={
                  traversalPath.includes(edge.from) &&
                  traversalPath.includes(edge.to)
                    ? "lightgreen"
                    : "black"
                }
                //strokeDasharray={edge.directed ? "none" : "5, 5"} // Dashed line for undirected
                strokeWidth="2"
                // Optional: Add arrowhead for directed edges
                markerEnd={edge.directed ? "url(#marker-arrow)" : undefined}
              />
            );
          })}
          {/* Define arrow marker (optional) */}
          <defs>
            <marker
              id="marker-arrow"
              markerWidth="6"
              markerHeight="4"
              refX="5" // Adjusted the refX value for proper positioning
              refY="2"
              orient="auto"
              markerUnits="strokeWidth"
              fill="rgba(0, 0, 0, 0.4)"
            >
              <path d="M0,0 L0,4 L6,2 Z" />
            </marker>
          </defs>
        </svg>
      </div>
      <div
        className="other-representation"
        style={{ border: "1px solid #ddd", padding: "10px" }}
      >
        <div className="adjacency-matrix">
          <h3>Adjacency Matrix</h3>
          <table style={{ borderCollapse: "collapse", margin: "0 auto" }}>
            <tbody>
              {getAdjacencyMatrix().map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {row.map((cellValue, colIndex) => (
                    <td
                      key={`${rowIndex}-${colIndex}`}
                      style={{ border: "1px solid #ddd", padding: "5px" }}
                    >
                      {cellValue}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="adjacency-list">
          <h3>Adjacency List</h3>
          <table style={{ borderCollapse: "collapse", margin: "0 auto" }}>
            <tbody>
              {getAdjacencyList().map((node, index) => (
                <tr key={index}>
                  <td style={{ border: "1px solid #ddd", padding: "5px" }}>
                    {node.value}
                  </td>
                  <td style={{ border: "1px solid #ddd", padding: "5px" }}>
                    {node.neighbors.length > 0
                      ? node.neighbors.join(", ") // Join neighbors with comma and space
                      : "None"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Graph;
