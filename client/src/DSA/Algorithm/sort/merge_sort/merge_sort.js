import React, { useState, useEffect } from "react";
import { Button, Input, Slider, Typography, Box } from "@mui/material";
import "./merge_sort.scss";

function MergeSort() {
  const [array, setArray] = useState([]);
  const [arraySize, setArraySize] = useState(10);
  const [delay, setDelay] = useState(3000);

  useEffect(() => {
    generateRandomArray();
  }, []);

  const generateRandomArray = () => {
    const newArray = [];
    for (let i = 0; i < arraySize; i++) {
      const value = Math.floor(Math.random() * 25) * 3 + 2;
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
      animations.push({ type: "compare", indices: [left + i, mid + 1 + j] });

      if (leftArray[i].value <= rightArray[j].value) {
        animations.push({ type: "overwrite", index: k, value: leftArray[i] });
        arr[k++] = leftArray[i++];
      } else {
        animations.push({ type: "overwrite", index: k, value: rightArray[j] });
        arr[k++] = rightArray[j++];
      }
    }

    while (i < leftArray.length) {
      animations.push({ type: "overwrite", index: k, value: leftArray[i] });
      arr[k++] = leftArray[i++];
    }

    while (j < rightArray.length) {
      animations.push({ type: "overwrite", index: k, value: rightArray[j] });
      arr[k++] = rightArray[j++];
    }
  };

  const visualizeMergeSort = async (animations) => {
    const arrayBars = document.getElementsByClassName("array-bar");

    for (let i = 0; i < animations.length; i++) {
      const animation = animations[i];

      if (animation.type === "compare") {
        const [barOne, barTwo] = animation.indices;
        const barOneStyle = arrayBars[barOne].style;
        const barTwoStyle = arrayBars[barTwo].style;

        setTimeout(() => {
          barOneStyle.backgroundColor = "#f39c12";
          barTwoStyle.backgroundColor = "#f39c12";
        }, i * delay);

        setTimeout(
          () => {
            barOneStyle.backgroundColor = "#3498db";
            barTwoStyle.backgroundColor = "#3498db";
          },
          (i + 1) * delay
        );
      } else if (animation.type === "overwrite") {
        const { index, value } = animation;
        const barStyle = arrayBars[index].style;

        setTimeout(() => {
          barStyle.height = `${value.height}px`;
          array[index] = value;
          arrayBars[index].innerHTML = value.value;
        }, i * delay);
      }
    }
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" padding="0">
      <Box
        display="flex"
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
        marginBottom="20px"
        bgcolor="rgb(239, 235, 235)"
        padding="20px"
        borderRadius="5px"
        width="100%"
        borderBottom="2px solid black"
      >
        <Box
          display="flex"
          flexDirection="row"
          width="100%" // Setting width to 100% to ensure it takes full width on smaller screens
          flexWrap="wrap" // Allowing items to wrap when screen size is reduced
        >
          <Typography variant="body1">Array Size:</Typography>
          <Input
            type="number"
            value={arraySize}
            inputProps={{ min: 1, max: 25 }}
            onChange={handleArraySizeChange}
          />
          <Button onClick={generateRandomArray} className="merge-btn">
            Generate New Array
          </Button>
        </Box>
        <Box display="flex" flexDirection="row" width="100%">
          <Button onClick={mergeSort} className="merge-btn">
            Start Merge Sort
          </Button>
        </Box>
        <Box display="flex" flexDirection="row" width="100%">
          <Typography variant="body1">Delay (ms): {delay}</Typography>
          <Slider
            min={100}
            max={1000}
            value={delay}
            onChange={handleDelayChange}
            style={{ width: "200px", marginRight: "40px" }}
          />
        </Box>
      </Box>
      <Box marginTop="20px">
        <div style={{ marginTop: "20px" }}>
          {array.map((bar, index) => (
            <div
              className="array-bar"
              key={index}
              style={{
                height: `${bar.height}px`,
                width: "60px",
                display: "inline-block",
                margin: "2px",
                verticalAlign: "bottom",
              }}
            >
              {bar.value}
            </div>
          ))}
        </div>
      </Box>
    </Box>
  );
}

export default MergeSort;
