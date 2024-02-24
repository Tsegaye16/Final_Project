import React, { useState, useEffect } from 'react';
import './merge_sort.scss'; 


function Merge_sort() {
  const [array, setArray] = useState([]);
  const [arraySize, setArraySize] = useState(10);
  const [delay, setDelay] = useState(3000);


  useEffect(() => {
    generateRandomArray();
  }, []);


  const generateRandomArray = () => {
    const newArray = [];
    for (let i = 0; i < arraySize; i++) {
      const value = Math.floor(Math.random() * 100) + 1;
      newArray.push({ value, height: value * 3 }); 
    }
    setArray(newArray);
  };


  const handleArraySizeChange = (e) => {
    setArraySize(parseInt(e.target.value));
  };


  const handleDelayChange = (e) => {
    setDelay(parseInt(e.target.value));
  };

  
  const mergeSort = async () => {
    const animations = await mergeSortHelper([...array]);
    await visualizeMergeSort(animations);
  };

  const mergeSortHelper = async (arr) => {
    if (arr.length <= 1) {
      return [];
    }

    const animations = [];
    await mergeSortRecursive(arr, 0, arr.length - 1, animations);
    return animations;
  };

  const mergeSortRecursive = async (arr, left, right, animations) => {
    if (left < right) {
      const mid = Math.floor((left + right) / 2);

      await mergeSortRecursive(arr, left, mid, animations);
      await mergeSortRecursive(arr, mid + 1, right, animations);

      await merge(arr, left, mid, right, animations);
    }
  };

  const merge = async (arr, left, mid, right, animations) => {
    const leftArray = arr.slice(left, mid + 1);
    const rightArray = arr.slice(mid + 1, right + 1);

    let i = 0;
    let j = 0;
    let k = left;

    while (i < leftArray.length && j < rightArray.length) {
      animations.push({ type: 'compare', indices: [left + i, mid + 1 + j] });

      if (leftArray[i].value <= rightArray[j].value) {
        animations.push({ type: 'overwrite', index: k, value: leftArray[i] });
        arr[k++] = leftArray[i++];
      } else {
        animations.push({ type: 'overwrite', index: k, value: rightArray[j] });
        arr[k++] = rightArray[j++];
      }
    }

    while (i < leftArray.length) {
      animations.push({ type: 'overwrite', index: k, value: leftArray[i] });
      arr[k++] = leftArray[i++];
    }

    while (j < rightArray.length) {
      animations.push({ type: 'overwrite', index: k, value: rightArray[j] });
      arr[k++] = rightArray[j++];
    }
  };

  const visualizeMergeSort = async (animations) => {
    const arrayBars = document.getElementsByClassName('array-bar');

    for (let i = 0; i < animations.length; i++) {
      const animation = animations[i];

      if (animation.type === 'compare') {
        const [barOne, barTwo] = animation.indices;
        const barOneStyle = arrayBars[barOne].style;
        const barTwoStyle = arrayBars[barTwo].style;

        setTimeout(() => {
          barOneStyle.backgroundColor = '#f39c12';
          barTwoStyle.backgroundColor = '#f39c12';
        }, i * delay);

        setTimeout(() => {
          barOneStyle.backgroundColor = '#3498db';
          barTwoStyle.backgroundColor = '#3498db';
        }, (i + 1) * delay);
      } else if (animation.type === 'overwrite') {
        const { index, value } = animation;
        const barStyle = arrayBars[index].style;

        setTimeout(() => {
          barStyle.height = `${value.height}px`; 
          array[index] = value; 
          arrayBars[index].innerHTML = value.value; 
        }, i * delay );
      }
    }
  };


  return (
    <div className="merge-sort-visualizer">
      <div className="array-container">
        {array.map((bar, index) => (
          <div
            className="array-bar"
            key={index}
            style={{ height: `${bar.height}px`, width: '60px' }}
          >{bar.value}</div>
        ))}
      </div>
      <div className="controls">
        <label htmlFor="arraySize">Array Size:</label>
        <input
          type="number"
          id="arraySize"
          min={1}
          max={100}
          value={arraySize}
          onChange={handleArraySizeChange}
        />
        <label htmlFor="delay">Delay (ms):</label>
        <input
          type="range"
          id="delay"
          min="1"
          max="100"
          value={delay}
          onChange={handleDelayChange}
        />
        <button onClick={generateRandomArray}>Generate New Array</button>
        <button onClick={mergeSort}>Merge Sort</button>
      </div>
    </div>
  );
}

export default Merge_sort;
