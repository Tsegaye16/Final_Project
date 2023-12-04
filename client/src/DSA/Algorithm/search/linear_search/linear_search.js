import React,{useState} from 'react'
import "./linear_search.scss"
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { CopyToClipboard } from 'react-copy-to-clipboard';
// import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
// import { a11yDark } from 'react-syntax-highlighter/dist/cjs/styles/hljs';
import LinearSearch from './logic';


function Linear_search() {
 
  const codeString = `
    function linear_search(arr, item) {
      let flag = [];
      for (let i = 0; i < arr.length; i++) {
        if (arr[i] == item) {
          flag.push(i);
        }
      }
      if (!flag[0]) {
        console.log("the item is not found in the list");
      } else {
        for (let j = 0; j < flag.length; j++) {
          console.log(\`the item \${item} is found at the index \${flag}\`);
        }
      }
    }
    linear_search([3, 6, 9, 2, 0, -5, 9], 10);
  `;
  return (
    <div className='main-Lsearch'>
      <div className='title'>Linear Search</div>
      <div className='introduction'>
        <span>Introduction </span>  
        <p>
        Linear search, also known as sequential search, is a simple and straightforward method for finding a target element within a list or array. It is one of the most basic and intuitive search algorithms. In linear search, each element of the list is examined one by one until a match is found or the entire list has been searched. 
        </p>
      </div>   
      <div className='operation'>
        
        
          <p><b>Objective:</b>&nbsp; Find the position (index) of a target value in a list or array.</p>
        
        <b>Algorithm:</b>
      <ol>
        <li>Start from the beginning of the list.</li>  
        <li>Compare the target value with each element in the list sequentially.</li>  
        <li>If a match is found, return the index of the element.</li>  
        <li>If the end of the list is reached without finding a match, return a special value (e.g., -1) to indicate that the target value is not in the list.</li>  
      </ol>   
      </div>   
      <div className='implementation'>
        <span>Implementation</span>
      </div>
      

        <SyntaxHighlighter language="javascript" style={dark} customStyle={{ fontSize: '20px', lineHeight: '1.6' }}>
          {codeString}
        </SyntaxHighlighter>
     
      
   
    <div className='visualization'>
        <span>Visualization</span>
        <LinearSearch/>
    </div>
      <div className='summery'>
        <span>Summary</span>
        Linear search is a fundamental algorithm and serves as a building block for more complex search algorithms. While it may not be the most efficient for all scenarios, it is a good starting point for understanding basic search principles.
      </div>
    </div>
  )
}

export default Linear_search