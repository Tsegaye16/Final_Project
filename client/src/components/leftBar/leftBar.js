import React from 'react';
import "./leftBar.css";

function LeftBar() {
  return (
    <div className='main-leftbar'>
      <div className='dsa-content'>
        <div className='data-structure'>
          <div className='category'>Data Structure</div>
          <div className='sub-category'>
            <div className='linear'>
              <div className='category'>Linear</div>
              <ul>
                <li>Array</li>
                <li>Stack</li>
                <li>Queues</li>
                <li>Linked list</li>
              </ul>
            </div>
            <div className='non-linear'>
              <div className='category'>Non-linear</div>
              <ul>
                <li>Tree</li>
                <li>Binary Tree</li>
                <li>Binary Search Tree</li>
                <li>Hash Table</li>
                <li>Graph</li>
              </ul>
            </div>
          </div>
        </div>
        <div className='algorithms'>
          <div className='category'>Algorithms</div>
          <div className='sub-category'>
            <div className='search'>
              <div className='category'>Search</div>
              <ul>
                <li>Linear Search</li>
                <li>Binary Search</li>
              </ul>
            </div>
            <div className='sorting'>
              <div className='category'>Sorting</div>
              <ul>
                <li>Bubble Sort</li>
                <li>Insertion Sort</li>
                <li>Selection Sort</li>
                <li>Merge Sort</li>
                <li>Quick Sort</li>
              </ul>
            </div>
            <div className='graph-algo'>
              <div className='category'>Graph Algorithm</div>
              <ul>
                <li>Breadth First Search (BFS)</li>
                <li>Depth First Search (DFS)</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LeftBar;
