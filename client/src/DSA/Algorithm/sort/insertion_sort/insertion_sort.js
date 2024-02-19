import React, { useState, useEffect, useCallback } from 'react';
import './insertion_sort.scss';

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
        value: Math.floor(Math.random() * 100) + 10,
        color: 'blue',
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

      // Mark the elements being compared as red
     //arrayCopy[j].color = 'red';
      currentValue.color = 'red';
      setArray([...arrayCopy]);
      await sleep(speed);

      while (j >= 0 && arrayCopy[j].value > currentValue.value) {
        // Move elements to the right
        arrayCopy[j + 1] = arrayCopy[j];
        arrayCopy[j + 1].color = 'red'; // Mark the element being moved as red
        setArray([...arrayCopy]);
        await sleep(speed);
        arrayCopy[j + 1].color = 'blue'; // Reset color after moving
        j--;
        if (j >= 0) {
          arrayCopy[j].color = 'red'; // Mark the new element being compared as red
          setArray([...arrayCopy]);
          await sleep(speed);
        }
      }

      // Place the current element in its correct position
      arrayCopy[j + 1] = currentValue;
      setArray([...arrayCopy]);
      await sleep(speed);

      // Reset colors after sorting
      arrayCopy.forEach((item) => (item.color = 'blue'));
      setArray([...arrayCopy]);
    }

    setSorting(false);
  }, [array, speed]);

  

  // Function to introduce delay
  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  // UseEffect to generate a random array when arraySize changes
  useEffect(() => {
    generateRandomArray(arraySize);
  }, [arraySize]);

  return (
    <div>
      <div>
        <label htmlFor="arraySize">Array Size:</label>
        <input
          type="number"
          id="arraySize"
          min={0}
          value={arraySize}
          onChange={(e) => setArraySize(parseInt(e.target.value))}
          disabled={sorting}
        />
        <button onClick={() => generateRandomArray(arraySize)} disabled={sorting}>
          Generate Array
        </button>
      </div>
      <div>
        <label htmlFor="speed">Speed: {speed}</label>
        <input
          type="range"
          id="speed"
          min="1"
          max="500"
          value={speed}
          onChange={(e) => setSpeed(parseInt(e.target.value))}
          disabled={sorting}
        />
      </div>
      <button onClick={insertionSort} disabled={sorting}>
        {sorting ? 'Sorting...' : 'Start Insertion Sort'}
      </button>
      <div>
        {array.map((item, index) => (
          <div
            key={index}
            style={{
              height: `${item.value}px`,
              backgroundColor: item.color,
              display: 'inline-block',
              margin: '2px',
              verticalAlign: 'bottom',
            }}
          >
            {item.value}
          </div>
        ))}
      </div>
    </div>
  );
}

export default InsertionSort;

