import React from 'react';
import "./array.scss";
import Declaration from './operations/declaration/declaration.js';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import Insertion from './operations/insertion/insertion.js';

import { useState } from 'react';

function Array() {
  const [checked, setChecked] = useState(false);
  const [text, setText] = useState('show');

  const handleShow = () => {
    setChecked(!checked);
    setText(checked ? 'show' : 'hide');
  };

  const accessing = `#include <stdio.h>

int main() {
    // Define an array
    int myArray[] = {10, 20, 30, 40, 50};

    // Access elements by index
    int firstElement = myArray[0]; // Access the first element (10)
    int secondElement = myArray[1]; // Access the second element (20)
    int lastElement = myArray[4]; // Access the last element (50)

    printf("First element: %d\n", firstElement); // Output: First element: 10
    printf("Second element: %d\n", secondElement); // Output: Second element: 20
    printf("Last element: %d\n", lastElement); // Output: Last element: 50

    return 0;
}`;

  return (
    <div className='main-array'>
      <div className='title'>Array</div>
      <div className='introduction'>
        <span>Introduction </span>  
        <p> An array is a fundamental and versatile data structure in computer science
        that plays a pivotal role in organizing and managing collections of elements.
         It is a sequential, ordered arrangement of data elements, each identified by an
          index or a key.<br/><br/>

        Arrays provide a systematic and efficient way to store and access data,
         offering a contiguous block of memory where elements are stored in consecutive
          locations. The simplicity and efficiency of arrays make them a cornerstone in 
          various algorithms and programming languages. </p>
      </div>   
      <div className='operation'>
        <span className='sub-title'>Operation</span>    
         <p>
            In the context of arrays, an operation typically refers to any
            action or manipulation performed on the elements of the array.
            These operations can include various tasks such as adding, removing,
            updating, or accessing elements within the array. 
            
         </p>
         <ol>
            <li>
              <span>Declaration 
                <div className='show' onClick={handleShow}>{text}</div>
              </span>
              <p>In programming, the term "declaration" refers to the act of 
                creating a variable and specifying its type. When it comes to 
                arrays, declaration involves creating an array variable and optionally
                specifying its size or initializing it with elements.<br/><br/>
                Requirement to declare:
                <ul>
                  <li>Variable name</li>
                  <li>Type</li>
                  <li>Size(optional if you initialize)</li>
                </ul>
              </p> 
              <div className={`declare-container ${!checked ? 'hide': ''}`}>
                <Declaration/>
              </div>
            </li>
            <li>
              <span>Accessing Element</span>
              <p>Accessing elements from an array is straightforward.
                 You can access elements by their index, which starts from 0 for the 
                 first element and increments by 1 for each subsequent element. Here's 
                 how you can access elements from an array:
                 
                 <SyntaxHighlighter language='c' wrapLines customStyle={{fontSize:'1px'}}>
                   {accessing}
                 </SyntaxHighlighter>
              </p>
            </li>
            <li>
              <span>Insertion</span>
             <p>
              some thing about Insertion_sort
             </p>
             <div>
              <Insertion/>
             </div>
            </li>
            <li>
              <span>Deletion</span>
            </li>
            <li>
              <span>Updating</span>
            </li>
          </ol>
      </div>   
      <div className='implementation'>
        <span>Implementation</span>
      </div>
      <div className='visualization'>
        <span>Visualization</span>
      </div>
      <div className='summary'>
        <span>Summary</span>
      </div>
    </div>
  );
}

export default Array;
