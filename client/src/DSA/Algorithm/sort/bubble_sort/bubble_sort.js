import React, { useState, useEffect, useCallback } from 'react';

// Implement Bubble Sort algorithm
const BubbleSort = () => {
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

  // Function to perform Bubble Sort
  const bubbleSort = useCallback(async () => {
    setSorting(true);
    const arrayCopy = [...array];
    let noSwap;
    for (let i = 0; i < arrayCopy.length - 1; i++) {
      noSwap = true
      for (let j = 0; j < arrayCopy.length - 1 - i; j++) {
        arrayCopy[j].color = 'red';
        arrayCopy[j + 1].color = 'red';
        setArray([...arrayCopy]);
        await sleep(speed);
        
        if (arrayCopy[j].value > arrayCopy[j + 1].value) {
          const temp = arrayCopy[j];
          arrayCopy[j] = arrayCopy[j + 1];
          arrayCopy[j + 1] = temp;
          setArray([...arrayCopy]);
          noSwap = false
        }
        arrayCopy[j].color = 'blue';
        arrayCopy[j + 1].color = 'blue';
        setArray([...arrayCopy]);
        
      }
      if(noSwap){
        break
      }
    }

    setSorting(false);
  }, [array, speed]);

  // Function to introduce delay
  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  // UseEffect to generate random array when arraySize changes
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
      <button onClick={bubbleSort} disabled={sorting}>
        {sorting ? 'Sorting...' : 'Start Bubble Sort'}
      </button>
      <div>
        {array.map((item, index) => (
          <div
            key={index}
            style={{
              height: `${item.value}px`,
              width:'40px',
              backgroundColor: item.color,
              display: 'inline-block',
              margin: '2px',
              verticalAlign:'bottom',
              
            }}
          >
            {item.value}
          </div>
        ))}
      </div>
    </div>
  );
};
  
export default BubbleSort;