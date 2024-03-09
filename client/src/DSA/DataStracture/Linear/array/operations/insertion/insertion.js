import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

function Insertion() {
  const initialArray = [1, 4, 6, 8, 5, 8, 6];
  const arrayLength = 11;
  const [array, setArray] = useState(initialArray);
  const [highlightedCells, setHighlightedCells] = useState([]);

  const shiftAndInsert = (value) => {
    let newArray = [...array];
    let highlighted = [];

    for (let i = array.length - 1; i >= 0; i--) {
      setTimeout(() => {
        newArray[i + 1] = newArray[i];
        highlighted = [i + 1];
        setArray([...newArray]);
        setHighlightedCells([...highlighted]);
      }, (array.length - 1 - i) * 500);
    }

    setTimeout(() => {
      newArray[0] = value;
      setArray([...newArray]);
      setHighlightedCells([]);
    }, array.length * 500);
  };

  const renderTableCells = () => {
    return Array(arrayLength)
      .fill(null)
      .map((_, index) => {
        const isShifting = highlightedCells.includes(index);
        const isCurrentCellFree =
          !isShifting && !highlightedCells.includes(index + 1);

        const boxStyle = {
          border: "1px solid #000",
          height: "30px",
          width: "30px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: isShifting
            ? "#f39c12"
            : isCurrentCellFree
            ? "transparent"
            : "#ecf0f1",
          transform: isShifting ? `translateX(${index * 30}px)` : "none",
          transition: isShifting ? "transform 0.5s ease-in-out" : "none",
        };

        return (
          <TableCell
            key={index}
            style={{ borderRight: "1px solid #000", width: "30px" }}
          >
            {array[index] !== undefined && (
              <Box style={boxStyle}>{array[index]}</Box>
            )}
          </TableCell>
        );
      });
  };

  const handleInsertBeginning = () => {
    const inputValue = parseInt(document.getElementById("insert-number").value);
    if (!isNaN(inputValue)) {
      shiftAndInsert(inputValue);
    }
  };

  return (
    <Box p={2}>
      <Box display="flex" justifyContent="space-between">
        <TextField id="insert-number" type="number" label="Number" />
        <Box display="flex" flexDirection="column">
          <Button
            onClick={handleInsertBeginning}
            variant="contained"
            color="secondary"
            style={{
              marginLeft: "8px",
              marginBottom: "20px",
              backgroundColor: "#2c3e50",
            }}
          >
            At the Beginning
          </Button>
          <Button variant="contained" style={{ backgroundColor: "#2c3e50" }}>
            At the End
          </Button>
        </Box>
        <Box>
          <TextField type="number" label="Index" placeholder="Index" />
          <Button
            variant="contained"
            color="secondary"
            style={{ marginLeft: "8px", backgroundColor: "#2c3e50" }}
          >
            At the Index
          </Button>
        </Box>
      </Box>
      <Paper elevation={3} style={{ marginTop: "16px" }}>
        <Table>
          <TableBody>
            <TableRow>{renderTableCells()}</TableRow>
          </TableBody>
        </Table>
      </Paper>
    </Box>
  );
}

export default Insertion;
