import React,{useState, useEffect} from 'react';
import "./leftBar.scss";
import Home from '../../pages/homePage/Home';
////////////Proggress
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faBreadSlice, faTree,faHatCowboy, faCircle, faSearch, faSort, faProjectDiagram } from '@fortawesome/free-solid-svg-icons';

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
          <div className='category' onClick={toggleDataStructure}>Data Structure</div>
          
          <div className={`sub-category ${!dataStructureVisible ? '' : 'invisible-data-structures'}`}>
            <div className='linear '>
              <div className='category' onClick={toggleLinearDatastructure}>Linear</div>
              <ul>
                <li className={`${!linearDatastructureVisible ? '':'visible-linear'}`} onClick={() => {handleItemClick('array')}}>
                <FontAwesomeIcon icon={faCircle} className='icon' />  
                Array</li>
                <li className={`${!linearDatastructureVisible ? '':'visible-linear'}`} onClick={() => {handleItemClick('stack')}}>
                <FontAwesomeIcon icon={faCircle} className='icon' />  
                Stack</li>
                <li className={`${!linearDatastructureVisible ? '':'visible-linear'}`} onClick={() => {handleItemClick('queue')}}>
                <FontAwesomeIcon icon={faCircle} className='icon'/>  
                Queues</li>
                <li className={`${!linearDatastructureVisible ? '':'visible-linear'}`} onClick={() => {handleItemClick('linked-list')}}>
                <FontAwesomeIcon icon={faCircle} className='icon'/>  
                Linked list</li>
              </ul>
            </div>
            <div className='non-linear ' >
              <div className='category' onClick={toggleNoneLinearDatastructure}>Non-linear</div>
              <ul>
                <li className='visible-none-linear'>Tree</li>
                <li className={` ${!noneLinearDatastructureVisible ? '':'visible-none-linear'}`} onClick={() => {handleItemClick('binary_tree')}}>
                <FontAwesomeIcon icon={faTree} className='icon'/>  
                Binary Tree</li>
                <li className={` ${!noneLinearDatastructureVisible ? '':'visible-none-linear'}`} onClick={() => {handleItemClick('bst')}}>
                <FontAwesomeIcon icon={faTree} className='icon'/>  
                Binary Search Tree</li>
                <li className={` ${!noneLinearDatastructureVisible ? '':'visible-none-linear'}`} onClick={() => {handleItemClick('hash_table')}}>
                <FontAwesomeIcon icon={faTree} className='icon'/>  
                Hash Table</li>
                <li className={` ${!noneLinearDatastructureVisible ? '':'visible-none-linear'}`} onClick={() => {handleItemClick('graph')}}>
                <FontAwesomeIcon icon={faProjectDiagram} className='icon' />  
                Graph</li>
              </ul>
            </div>
          </div>
        </div>
        <div className='algorithms'>
          <div className='category' onClick={toggleAlgorithm}>Algorithms</div>
          <div className={`sub-category ${!algorithmVisible ? '' : 'invisible-algorithms'}`}>
            <div className='search'>
              <div className='category' onClick={toggleSearchAlgorithm}>Search</div>
              <ul>
                <li className={`${!searchAlgorithVisible ? '':'search-visible'}`} onClick={() => {handleItemClick('linear_search')}}>
                <FontAwesomeIcon icon={faSearch} className='icon' /> 
                Linear Search</li>
                <li className={`${!searchAlgorithVisible ? '':'search-visible'}`}  onClick={() => {handleItemClick('binary_search')}}>
                <FontAwesomeIcon icon={faSearch} className='icon'/>
                Binary Search</li>
              </ul>
            </div>
            <div className='sorting'>
              <div className='category' onClick={toggleSortingAlgorithm}>Sorting</div>
              <ul>
                <li className={`${!sortingAlgorithVisible ? '':'sorting-visible'}`}  onClick={() => {handleItemClick('bubble_sort')}}>
                <FontAwesomeIcon icon={faSort}  className='icon'/>  
                Bubble Sort</li>
                <li className={`${!sortingAlgorithVisible ? '':'sorting-visible'}`} onClick={() => {handleItemClick('insertion_sort')}}>
                  <FontAwesomeIcon icon={faSort} className='icon'/>  
                Insertion Sort</li>
                <li className={`${!sortingAlgorithVisible ? '':'sorting-visible'}`} onClick={() => {handleItemClick('selection_sort')}}>
                <FontAwesomeIcon icon={faSort} className='icon'/> 
                Selection Sort</li>
                <li className={`${!sortingAlgorithVisible ? '':'sorting-visible'}`} onClick={() => {handleItemClick('merge_sort')}}>
                <FontAwesomeIcon icon={faSort} className='icon'/>
                Merge Sort</li>
                <li className={`${!sortingAlgorithVisible ? '':'sorting-visible'}`}onClick={() => {handleItemClick('quick_sort')}}>
                <FontAwesomeIcon icon={faSort} className='icon'/>  
                Quick Sort</li>
              </ul>
            </div>
            <div className='graph-algo'>
              <div className='category' onClick={toggleGraphAlgorithm}>Graph Algorithm</div>
              <ul>
                <li className={`${!graphAlgorithmVisble ? '': 'graph-algorithm'}`} onClick={() => {handleItemClick('bfs')}}>
                <FontAwesomeIcon icon={faHatCowboy} className='icon'/>  
                Breadth First Search (BFS)</li>
                <li className={`${!graphAlgorithmVisble ? '': 'graph-algorithm'}`} onClick={() => {handleItemClick('dfs')}}>
                <FontAwesomeIcon icon={faBreadSlice} className='icon'/>  
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
