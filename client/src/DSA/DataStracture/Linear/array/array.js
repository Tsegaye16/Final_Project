// import React from "react";
// import "./array.scss";
// import Declaration from "./operations/declaration/declaration.js";
// import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
// import Insertion from "./operations/insertion/insertion.js";
// import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";
// import { useState } from "react";
// import Footer from "../../../../pages/landingPage/sample/dialog/footer.js";

// function Array() {
//   const [checked, setChecked] = useState(false);
//   const [text, setText] = useState("show");

//   const handleShow = () => {
//     setChecked(!checked);
//     setText(checked ? "show" : "hide");
//   };

//   const accessing = `#include <stdio.h>

// int main() {
//     // Define an array
//     int myArray[] = {10, 20, 30, 40, 50};

//     // Access elements by index
//     int firstElement = myArray[0]; // Access the first element (10)
//     int secondElement = myArray[1]; // Access the second element (20)
//     int lastElement = myArray[4]; // Access the last element (50)

//     printf("First element: %d", firstElement); // Output: First element: 10
//     printf("Second element: %d", secondElement); // Output: Second element: 20
//     printf("Last element: %d", lastElement); // Output: Last element: 50

//     return 0;
// }`;

//   return (
//     <div className="main-array">
//       <div className="title">Array</div>
//       <div className="introduction">
//         <span>Introduction </span>
//         <p>
//           {" "}
//           An array is a fundamental and versatile data structure in computer
//           science that plays a pivotal role in organizing and managing
//           collections of elements. It is a sequential, ordered arrangement of
//           data elements, each identified by an index or a key.
//           <br />
//           <br />
//           Arrays provide a systematic and efficient way to store and access
//           data, offering a contiguous block of memory where elements are stored
//           in consecutive locations. The simplicity and efficiency of arrays make
//           them a cornerstone in various algorithms and programming languages.{" "}
//         </p>
//       </div>
//       <div className="operation">
//         <span className="sub-title">Operation</span>
//         <p>
//           In the context of arrays, an operation typically refers to any action
//           or manipulation performed on the elements of the array. These
//           operations can include various tasks such as adding, removing,
//           updating, or accessing elements within the array.
//         </p>
//         <ol>
//           <li>
//             <span>
//               Declaration
//               <div className="show" onClick={handleShow}>
//                 {text}
//               </div>
//             </span>
//             <p>
//               In programming, the term "declaration" refers to the act of
//               creating a variable and specifying its type. When it comes to
//               arrays, declaration involves creating an array variable and
//               optionally specifying its size or initializing it with elements.
//               <br />
//               <br />
//               Requirement to declare:
//               <ul>
//                 <li>Variable name</li>
//                 <li>Type</li>
//                 <li>Size(optional if you initialize)</li>
//               </ul>
//             </p>
//             <div className={`declare-container ${!checked ? "hide" : ""}`}>
//               <Declaration />
//             </div>
//           </li>
//           <li>
//             <span>Accessing Element</span>
//             <p>
//               Accessing elements from an array is straightforward. You can
//               access elements by their index, which starts from 0 for the first
//               element and increments by 1 for each subsequent element. Here's
//               how you can access elements from an array:
//               <SyntaxHighlighter
//                 language="c"
//                 wrapLongLines
//                 customStyle={{ fontSize: "1px" }}
//               >
//                 {accessing}
//               </SyntaxHighlighter>
//             </p>
//           </li>
//           <li>
//             <span>Insertion</span>
//             <p>
//               {/* I need to discus  about insertion at beginning, end and at index in array here */}
//             </p>
//             <div>
//               <Insertion />
//             </div>
//           </li>
//           <li>
//             <span>Deletion</span>
//           </li>
//           <li>
//             <span>Updating</span>
//           </li>
//         </ol>
//       </div>
//       <div className="implementation">
//         <span>Implementation</span>
//       </div>
//       <div className="visualization">
//         <span>Visualization</span>
//       </div>
//       <div className="summary">
//         <span>Summary</span>
//       </div>
//     </div>
//   );
// }

// export default Array;

import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import SyntaxHighlighter from "react-syntax-highlighter";
import { atomOneLight } from "react-syntax-highlighter/dist/esm/styles/hljs";
import Declaration from "./operations/declaration/declaration";
import "./ArrayList.scss";
import IconButton from "@mui/material/IconButton";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import Insertion from "./operations/insertion/insertion";
import CodeTemplate from "./operations/code/CodeTemplate";
import Content from "../../../content/content";

const useStyles = {
  root: {
    backgroundColor: "#f0f0f0",
    borderRadius: "8px",
    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
    padding: "24px",
    marginBottom: "24px",
  },
  title: {
    fontWeight: "bold",
    marginBottom: "16px",
  },
  paragraph: {
    marginBottom: "24px",
  },
  subTitle: {
    fontWeight: "bold",
    marginBottom: "8px",
  },
  section: {
    marginBottom: "24px",
    border: "1px solid #e0e0e0",
    borderRadius: "8px",
    padding: "16px",
  },
};

function Array({ title, userData }) {
  const [checked, setChecked] = useState(false);
  const [text, setText] = useState("show");

  const handleShow = () => {
    setChecked(!checked);
    setText(checked ? "show" : "hide");
  };

  const accessing = `
  #include <stdio.h>

int main() {
    // Define an array
    int myArray[] = {10, 20, 30, 40, 50};

    // Access elements by index
    int firstElement = myArray[0]; // Access the first element (10)
    int secondElement = myArray[1]; // Access the second element (20)
    int lastElement = myArray[4]; // Access the last element (50)

    printf("First element: %d", firstElement); // Output: First element: 10
    printf("Second element: %d", secondElement); // Output: Second element: 20
    printf("Last element: %d", lastElement); // Output: Last element: 50

    return 0;
}

  `;
  return (
    <>
      <Container maxWidth="lg">
        <Box sx={useStyles.section}>
          <Box sx={useStyles.root}>
            <Typography variant="h6" sx={useStyles.title}>
              Introduction
            </Typography>
            <Typography variant="body1" sx={useStyles.paragraph}>
              An array is a fundamental and versatile data structure in computer
              science that plays a pivotal role in organizing and managing
              collections of elements. It is a sequential, ordered arrangement
              of data elements, each identified by an index or a key.
              <br />
              <br />
              Arrays provide a systematic and efficient way to store and access
              data, offering a contiguous block of memory where elements are
              stored in consecutive locations. The simplicity and efficiency of
              arrays make them a cornerstone in various algorithms and
              programming languages.
            </Typography>
          </Box>

          <Box sx={useStyles.root}>
            <Typography variant="h6" sx={useStyles.title}>
              Operation
            </Typography>
            <ol>
              <li>
                <span>
                  Declaration
                  <IconButton onClick={handleShow}>
                    {checked ? <VisibilityIcon /> : <VisibilityOffIcon />}
                  </IconButton>
                </span>
                <p>
                  In programming, the term "declaration" refers to the act of
                  creating a variable and specifying its type. When it comes to
                  arrays, declaration involves creating an array variable and
                  optionally specifying its size or initializing it with
                  elements.
                  <br />
                  <br />
                  Requirement to declare:
                  <ul>
                    <li>Variable name</li>
                    <li>Type</li>
                    <li>Size(optional if you initialize)</li>
                  </ul>
                </p>
                <div className={`declare-container ${!checked ? "hide" : ""}`}>
                  <Declaration />
                </div>
              </li>

              <li>
                <span>Accessing Element</span>
                <p>
                  Accessing elements from an array is straightforward. You can
                  access elements by their index, which starts from 0 for the
                  first element and increments by 1 for each subsequent element.
                  Here's how you can access elements from an array:
                  <SyntaxHighlighter
                    language="c"
                    style={atomOneLight}
                    wrapLongLines
                    customStyle={{ fontSize: "14px", lineHeight: "1.5" }}
                  >
                    {accessing}
                  </SyntaxHighlighter>
                </p>
              </li>
              <li>
                <span>Insertion</span>
                <p>
                  Inserting elements into an array can be done at various
                  positions: the beginning, the end, or at a specific index.
                </p>
                <div>
                  <div>
                    <Typography variant="subtitle1">
                      Inserting at the Beginning:
                    </Typography>
                    <ol>
                      <li>
                        Check for Space: Before inserting, verify if there's
                        enough space in the array.
                      </li>
                      <li>
                        Shift Elements: Shift all existing elements one position
                        to the right.
                      </li>
                      <li>
                        Insert the Element: Place the new element at the
                        beginning (index 0) of the array.
                      </li>
                    </ol>
                  </div>
                  <div>
                    <Typography variant="subtitle1">
                      Inserting at the End:
                    </Typography>
                    <ol>
                      <li>
                        Check for Space: Same as at the beginning, check if
                        there's space in the array.
                      </li>
                      <li>
                        Calculate the End Index: Find the index of the last
                        element.
                      </li>
                      <li>
                        Insert the Element: Place the new element at the
                        calculated index.
                      </li>
                    </ol>
                  </div>
                  <div>
                    <Typography variant="subtitle1">
                      Inserting at a Specific Index:
                    </Typography>
                    <ol>
                      <li>
                        Check for Space and Valid Index: Make sure there's space
                        and the index is valid.
                      </li>
                      <li>
                        Shift Elements: Shift all elements from the target index
                        to the end of the array.
                      </li>
                      <li>
                        Insert the Element: Place the new element at the target
                        index.
                      </li>
                    </ol>
                  </div>
                  <div>
                    <Typography variant="subtitle1">Complexity:</Typography>
                    <ul>
                      <li>
                        Inserting at the beginning or end has a time complexity
                        of O(n) in the worst case, where n is the number of
                        elements in the array. This is because we might need to
                        shift all elements.
                      </li>
                      <li>
                        Inserting at a specific index also has a worst-case time
                        complexity of O(n) due to the potential shifting of
                        elements.
                      </li>
                    </ul>
                  </div>
                  <div>
                    <Typography variant="subtitle1">
                      Things to Consider:
                    </Typography>
                    <ul>
                      <li>
                        In some languages, arrays have fixed sizes. Consider
                        using data structures like linked lists for frequent
                        insertions.
                      </li>
                      <li>
                        Depending on the language, there might be built-in
                        functions for inserting elements.
                      </li>
                    </ul>
                  </div>
                  <Insertion />
                </div>
              </li>
            </ol>
          </Box>

          <Box sx={useStyles.root}>
            <Typography variant="h6" sx={useStyles.title}>
              Implementation
            </Typography>
            <CodeTemplate />
          </Box>

          <Content title={title} userData={userData} />
        </Box>
      </Container>
      {/* <Footer /> */}
    </>
  );
}

export default Array;
