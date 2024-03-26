import React, { useState, useEffect } from "react";

const BinarySearch = () => {
  const [numberOfElements, setNumberOfElements] = useState(10);
  const [elements, setElements] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [low, setLow] = useState(0);
  const [high, setHigh] = useState(0);
  const [mid, setMid] = useState(0);
  const [searching, setSearching] = useState(false);
  const [searchSpeed, setSearchSpeed] = useState(3000); // Adjust for desired speed
  const [searchResult, setSearchResult] = useState(null); // To store search result
  const [disabledIndices, setDisabledIndices] = useState([]); // To store disabled indices

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
    setHigh(newElements.length - 1);
    setMid(Math.floor(newElements.length / 2));
    setDisabledIndices([]); // Reset disabled indices
  };

  const search = async () => {
    setSearching(true);
    setSearchResult(null); // Reset search result
    setDisabledIndices([]); // Reset disabled indices

    await binarySearch();

    setSearching(false);
  };

  const binarySearch = async () => {
    let start = 0;
    let end = elements.length - 1;

    while (start <= end) {
      let mid = Math.floor((start + end) / 2);

      if (elements[mid].value === parseInt(searchValue)) {
        setMid(mid);
        setSearchResult("Element found!");
        await sleep(searchSpeed);
        break;
      } else if (elements[mid].value < parseInt(searchValue)) {
        setLow(mid + 1);
        setDisabledIndices([
          ...disabledIndices,
          ...Array.from({ length: mid + 1 }, (_, i) => i),
        ]);
        await sleep(searchSpeed);
        start = mid + 1;
      } else {
        setHigh(mid - 1);
        setDisabledIndices([
          ...disabledIndices,
          ...Array.from(
            { length: elements.length - mid - 1 },
            (_, i) => mid + 1 + i
          ),
        ]);
        await sleep(searchSpeed);
        end = mid - 1;
      }
    }

    if (!searchResult) {
      setMid(-1); // Not found
      setSearchResult("Element not found.");
    }
  };

  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  return (
    <div>
      <input
        type="number"
        placeholder="Number of elements"
        value={numberOfElements}
        onChange={(e) => setNumberOfElements(parseInt(e.target.value))}
      />
      <button onClick={generateElements}>Generate</button>
      <input
        type="number"
        placeholder="Value"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />
      <button onClick={search} disabled={searching}>
        Search
      </button>
      <input
        type="range"
        min={100}
        max={10000}
        value={searchSpeed}
        onChange={(e) => setSearchSpeed(parseInt(e.target.value))}
      />
      <div style={{ marginTop: "20px" }}>
        <svg width="100%" height="200">
          {elements.map((element, index) => (
            <rect
              key={index}
              x={index * 60}
              y={0}
              width="50"
              height="40"
              fill={
                disabledIndices.includes(index) ||
                index === low ||
                index === mid ||
                index === high
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
              fill={disabledIndices.includes(index) ? "gray" : "white"}
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
              fill={
                disabledIndices.includes(i) ||
                i === low ||
                i === mid ||
                i === high
                  ? "red"
                  : "#3498db"
              }
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
    </div>
  );
};

export default BinarySearch;
