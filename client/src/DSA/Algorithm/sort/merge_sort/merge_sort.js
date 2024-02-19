import React, { useState, useEffect } from 'react';
import './merge_sort.scss'; // Make sure to create a CSS file for styling

function Merge_sort() {
  const [array, setArray] = useState([]);

  useEffect(() => {
    generateRandomArray();
  }, []);

  const generateRandomArray = () => {
    const newArray = [];
    for (let i = 0; i < 10; i++) {
      newArray.push(Math.floor(Math.random() * 100) + 10);
    }
    setArray(newArray);
  };

  const mergeSort = async () => {
    const animations = await mergeSortHelper([...array]);
    await visualizeMergeSort(animations);
  };

  const mergeSortHelper = async (arr) => {
    if (arr.length <= 1) {
      return arr;
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

      if (leftArray[i] <= rightArray[j]) {
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
        }, i * 50);

        setTimeout(() => {
          barOneStyle.backgroundColor = '#3498db';
          barTwoStyle.backgroundColor = '#3498db';
        }, (i + 1) * 50);
      } else if (animation.type === 'overwrite') {
        const { index, value } = animation;
        const barStyle = arrayBars[index].style;

        setTimeout(() => {
          barStyle.height = `${value}px`;
        }, i * 500);
      }
    }
  };

  return (
    <div className="merge-sort-visualizer">
      <div className="array-container">
        {array.map((value, index) => (
          <div
            className="array-bar"
            key={index}
            style={{ height: `${value}px` }}
          ></div>
        ))}
      </div>
      <div className="button-container">
        <button onClick={generateRandomArray}>Generate New Array</button>
        <button onClick={mergeSort}>Merge Sort</button>
      </div>
    </div>
  );
}

export default Merge_sort;
