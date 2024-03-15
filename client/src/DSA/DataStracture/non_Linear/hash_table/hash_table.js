import React, { useState, useRef, useEffect } from "react";
import "./hash_table.scss";

// Simple division hash function (replace with more robust options)
function hashFunction(key) {
  const hash = key.charCodeAt(0) % 10; // Adjust divisor based on table size
  return hash >= 0 ? hash : hash + 10; // Handle negative hash values
}

function Hash_table() {
  const [tableSize, setTableSize] = useState(10); // Initial table size
  const [buckets, setBuckets] = useState(Array(tableSize).fill(null)); // Array representing buckets
  const [key, setKey] = useState("");
  const [value, setValue] = useState("");
  const [message, setMessage] = useState(""); // State for user messages
  const svgRef = useRef(null); // Ref to hold the SVG element

  const handleInsert = () => {
    if (!key || !value) {
      setMessage("Please enter a key and value.");
      return;
    }

    const index = hashFunction(key); // Calculate hash index
    const bucket = buckets[index];

    if (bucket) {
      // Collision occurred, handle using separate chaining
      setMessage("Collision occurred! Adding to linked list.");
      const newLinkedList =
        bucket instanceof Array
          ? [...bucket, { key, value }]
          : [{ key, value }];
      setBuckets([
        ...buckets.slice(0, index),
        newLinkedList,
        ...buckets.slice(index + 1),
      ]);
    } else {
      setBuckets([
        ...buckets.slice(0, index),
        key,
        value,
        ...buckets.slice(index + 1),
      ]);
      setMessage("Key-value pair inserted successfully!");
      setKey("");
      setValue(""); // Clear input fields after insertion
    }
  };

  const handleSearch = () => {
    if (!key) {
      setMessage("Please enter a key to search.");
      return;
    }

    const index = hashFunction(key);
    const bucket = buckets[index];

    if (bucket === null) {
      setMessage(`Key '${key}' not found.`);
    } else if (bucket instanceof Array) {
      // Search within the linked list (separate chaining)
      const foundItem = bucket.find((item) => item.key === key);
      if (foundItem) {
        setMessage(
          `Key '<span class="math-inline">\{key\}' found with value '</span>{foundItem.value}'.`
        );
      } else {
        setMessage(
          `Key '${key}' not found in the linked list at index ${index}.`
        );
      }
    } else if (bucket === key) {
      setMessage(`Key '${key}' found!`);
    } else {
      setMessage(
        "Unexpected data structure at bucket. Consider a different hash function."
      );
    }
  };

  // Function to update SVG visualization based on buckets state
  const updateVisualization = () => {
    const svg = svgRef.current;
    if (!svg) return;

    svg.innerHTML = ""; // Clear existing content

    // Draw the hash table as an array of boxes
    for (let i = 0; i < tableSize; i++) {
      const bucket = buckets[i];
      const x = i * 100; // Adjust spacing between boxes

      const rect = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "rect"
      );
      rect.setAttribute("x", x);
      rect.setAttribute("y", 50);
      rect.setAttribute("width", 80);
      rect.setAttribute("height", 40);
      rect.setAttribute("fill", "white");
      rect.setAttribute("stroke", "black");
      svg.appendChild(rect);

      const text = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "text"
      );
      text.setAttribute("x", x + 40);
      text.setAttribute("y", 75);
      text.setAttribute("dominantBaseline", "middle");
      text.setAttribute("textAnchor", "middle");
      text.textContent = bucket instanceof Array ? "Linked List" : bucket; // Display "Linked List" if collision
      svg.appendChild(text);
    }
  };

  // Update SVG visualization on state changes and component mount
  useEffect(() => {
    updateVisualization();
  }, [buckets, tableSize]);
  return (
    <div className="hash-table-container">
      <h2>Hash Table Visualizer</h2>
      <div className="settings">
        <label htmlFor="table-size">Table Size:</label>
        <input
          type="number"
          id="table-size"
          value={tableSize}
          onChange={(e) => setTableSize(parseInt(e.target.value))}
          min="5" // Adjust minimum table size
        />
      </div>
      <div className="input-fields">
        <label htmlFor="key">Key:</label>
        <input
          type="text"
          id="key"
          value={key}
          onChange={(e) => setKey(e.target.value)}
        />
        <label htmlFor="value">Value:</label>
        <input
          type="text"
          id="value"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </div>
      <div className="buttons">
        <button onClick={handleInsert}>Insert</button>
        <button onClick={handleSearch}>Search</button>
      </div>
      <div className="message">{message}</div>
      <svg ref={svgRef} width="100%" height="200px"></svg>
    </div>
  );
}

export default Hash_table;
