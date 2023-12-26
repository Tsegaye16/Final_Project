import React,{useState, useEffect} from 'react';
import "./leftBar.scss";
import Home from '../../pages/homePage/Home';
////////////Proggress
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { FaAngleRight } from "react-icons/fa";
import { FaAngleDown } from "react-icons/fa6";

function LeftBar({ setSelectedItem }) {
  const [dataStructureVisible, setDataStructureVisible] = useState(true);
  const [linearDatastructureVisible,setLinearDatastructureVisible] = useState(true)
  const [noneLinearDatastructureVisible,setNoneLinearDatastructureVisible] = useState(true)
  const [algorithmVisible, setalgorithmVisible] = useState(true);
  const [searchAlgorithVisible,setSearchAlgorithVisible] = useState(true)
  const [sortingAlgorithVisible,setSortingAlgorithVisible] = useState(true)
  const [graphAlgorithmVisble, setGraphAlgorithVisisble] = useState(true)
  

  const toggleDataStructure = () => {
    setDataStructureVisible(!dataStructureVisible);    
  };
  const toggleLinearDatastructure = ()=>{
    setLinearDatastructureVisible(!linearDatastructureVisible)  
    
  }
  const toggleNoneLinearDatastructure = ()=>{
    setNoneLinearDatastructureVisible(!noneLinearDatastructureVisible)    
  }
  const toggleAlgorithm = () => {
    setalgorithmVisible(!algorithmVisible);    
  };
  const toggleSearchAlgorithm = () => {
    setSearchAlgorithVisible(!searchAlgorithVisible);    
  };
  const toggleSortingAlgorithm = () => {
    setSortingAlgorithVisible(!sortingAlgorithVisible);    
  };
  const toggleGraphAlgorithm = () => {
    setGraphAlgorithVisisble(!graphAlgorithmVisble)
  }
  const handleItemClick = (itemName) => {
    setSelectedItem(itemName);
  };
// Timing

  
  
  return (
    <div className='main-leftbar'>
      <div className='dsa-content'>
        <div className='data-structure'>
          <div className='category' onClick={toggleDataStructure}> {dataStructureVisible ? <FaAngleRight /> : <FaAngleDown />} Data Structure</div>
          
          <div className={`sub-category ${!dataStructureVisible ? '' : 'invisible-data-structures'}`}>
            <div className='linear '>
              <div className='category' onClick={toggleLinearDatastructure}> {linearDatastructureVisible ? <FaAngleRight /> : <FaAngleDown />} Linear</div>
              <ul>
                <li className={`${!linearDatastructureVisible ? '':'visible-linear'}`} onClick={() => {handleItemClick('array')}}>
                 
                Array</li>
                <li className={`${!linearDatastructureVisible ? '':'visible-linear'}`} onClick={() => {handleItemClick('stack')}}>
                  
                Stack</li>
                <li className={`${!linearDatastructureVisible ? '':'visible-linear'}`} onClick={() => {handleItemClick('queue')}}>
                  
                Queues</li>
                <li className={`${!linearDatastructureVisible ? '':'visible-linear'}`} onClick={() => {handleItemClick('linked-list')}}>
                  
                Linked list</li>
              </ul>
            </div>
            <div className='non-linear ' >
              <div className='category' onClick={toggleNoneLinearDatastructure}> {noneLinearDatastructureVisible ? <FaAngleRight /> : <FaAngleDown />} Non-linear</div>
              <ul>
                <li className='visible-none-linear'>Tree</li>
                <li className={` ${!noneLinearDatastructureVisible ? '':'visible-none-linear'}`} onClick={() => {handleItemClick('binary_tree')}}>
                  
                Binary Tree</li>
                <li className={` ${!noneLinearDatastructureVisible ? '':'visible-none-linear'}`} onClick={() => {handleItemClick('bst')}}>
                 
                Binary Search Tree</li>
                <li className={` ${!noneLinearDatastructureVisible ? '':'visible-none-linear'}`} onClick={() => {handleItemClick('hash_table')}}>
                  
                Hash Table</li>
                <li className={` ${!noneLinearDatastructureVisible ? '':'visible-none-linear'}`} onClick={() => {handleItemClick('graph')}}>
                 
                Graph</li>
              </ul>
            </div>
          </div>
        </div>
        <div className='algorithms'>
          <div className='category' onClick={toggleAlgorithm}> {algorithmVisible ? <FaAngleRight /> : <FaAngleDown />} Algorithms</div>
          <div className={`sub-category ${!algorithmVisible ? '' : 'invisible-algorithms'}`}>
            <div className='search'>
              <div className='category' onClick={toggleSearchAlgorithm}>{searchAlgorithVisible ? <FaAngleRight /> : <FaAngleDown />} Search</div>
              <ul>
                <li className={`${!searchAlgorithVisible ? '':'search-visible'}`} onClick={() => {handleItemClick('linear_search')}}>
                
                Linear Search</li>
                <li className={`${!searchAlgorithVisible ? '':'search-visible'}`}  onClick={() => {handleItemClick('binary_search')}}>
                
                Binary Search</li>
              </ul>
            </div>
            <div className='sorting'>
              <div className='category' onClick={toggleSortingAlgorithm}>{sortingAlgorithVisible ? <FaAngleRight /> : <FaAngleDown />} Sorting</div>
              <ul>
                <li className={`${!sortingAlgorithVisible ? '':'sorting-visible'}`}  onClick={() => {handleItemClick('bubble_sort')}}>
                 
                Bubble Sort</li>
                <li className={`${!sortingAlgorithVisible ? '':'sorting-visible'}`} onClick={() => {handleItemClick('insertion_sort')}}>
                   
                Insertion Sort</li>
                <li className={`${!sortingAlgorithVisible ? '':'sorting-visible'}`} onClick={() => {handleItemClick('selection_sort')}}>
                 
                Selection Sort</li>
                <li className={`${!sortingAlgorithVisible ? '':'sorting-visible'}`} onClick={() => {handleItemClick('merge_sort')}}>
                
                Merge Sort</li>
                <li className={`${!sortingAlgorithVisible ? '':'sorting-visible'}`}onClick={() => {handleItemClick('quick_sort')}}>
                 
                Quick Sort</li>
              </ul>
            </div>
            <div className='graph-algo'>
              <div className='category' onClick={toggleGraphAlgorithm}>{graphAlgorithmVisble ? <FaAngleRight /> : <FaAngleDown />} Graph Algorithm</div>
              <ul>
                <li className={`${!graphAlgorithmVisble ? '': 'graph-algorithm'}`} onClick={() => {handleItemClick('bfs')}}>
                 
                Breadth First Search (BFS)</li>
                <li className={`${!graphAlgorithmVisble ? '': 'graph-algorithm'}`} onClick={() => {handleItemClick('dfs')}}>
                 
                Depth First Search (DFS)</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="progress-container">
     
    </div>
      </div>
    </div>
  );
}

export default LeftBar;