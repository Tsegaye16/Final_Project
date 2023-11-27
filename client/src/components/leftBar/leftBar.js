import React,{useState, useEffect} from 'react';
import "./leftBar.scss";
import Home from '../../pages/homePage/Home';
////////////Proggress
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

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

const [counter, setCounter] = useState(0);

  useEffect(() => {
    let interval;
    const startTime = Date.now();

    const updateCounter = () => {
      const elapsedTime = Date.now() - startTime;
      const remainingTime =  60 * 60 * 1000 - elapsedTime; // 2 hours in milliseconds

      if (remainingTime > 0) {
        setCounter((prevCounter) => prevCounter + 1000);
      } else {
        clearInterval(interval);
      }
    };

    interval = setInterval(updateCounter, 1000);

    // Pause the interval when the tab is not active
    const handleVisibilityChange = () => {
      if (document.hidden) {
        clearInterval(interval);
      } else {
        interval = setInterval(updateCounter, 1000);
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      clearInterval(interval);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);
  
  
  return (
    <div className='main-leftbar'>
      <div className='dsa-content'>
        <div className='data-structure'>
          <div className='category' onClick={toggleDataStructure}>Data Structure</div>
          
          <div className={`sub-category ${!dataStructureVisible ? '' : 'invisible-data-structures'}`}>
            <div className='linear '>
              <div className='category' onClick={toggleLinearDatastructure}>Linear</div>
              <ul>
                <li className={`${!linearDatastructureVisible ? '':'visible-linear'}`} onClick={() => {handleItemClick('array')}}>Array</li>
                <li className={`${!linearDatastructureVisible ? '':'visible-linear'}`} onClick={() => {handleItemClick('stack')}}>Stack</li>
                <li className={`${!linearDatastructureVisible ? '':'visible-linear'}`} onClick={() => {handleItemClick('queue')}}>Queues</li>
                <li className={`${!linearDatastructureVisible ? '':'visible-linear'}`} onClick={() => {handleItemClick('linked-list')}}>Linked list</li>
              </ul>
            </div>
            <div className='non-linear ' >
              <div className='category' onClick={toggleNoneLinearDatastructure}>Non-linear</div>
              <ul>
                <li className='visible-none-linear'>Tree</li>
                <li className={` ${!noneLinearDatastructureVisible ? '':'visible-none-linear'}`}>Binary Tree</li>
                <li className={` ${!noneLinearDatastructureVisible ? '':'visible-none-linear'}`}>Binary Search Tree</li>
                <li className={` ${!noneLinearDatastructureVisible ? '':'visible-none-linear'}`}>Hash Table</li>
                <li className={` ${!noneLinearDatastructureVisible ? '':'visible-none-linear'}`}>Graph</li>
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
                <li className={`${!searchAlgorithVisible ? '':'search-visible'}`}>Linear Search</li>
                <li className={`${!searchAlgorithVisible ? '':'search-visible'}`}>Binary Search</li>
              </ul>
            </div>
            <div className='sorting'>
              <div className='category' onClick={toggleSortingAlgorithm}>Sorting</div>
              <ul>
                <li className={`${!sortingAlgorithVisible ? '':'sorting-visible'}`} >Bubble Sort</li>
                <li className={`${!sortingAlgorithVisible ? '':'sorting-visible'}`}>Insertion Sort</li>
                <li className={`${!sortingAlgorithVisible ? '':'sorting-visible'}`}>Selection Sort</li>
                <li className={`${!sortingAlgorithVisible ? '':'sorting-visible'}`}>Merge Sort</li>
                <li className={`${!sortingAlgorithVisible ? '':'sorting-visible'}`}>Quick Sort</li>
              </ul>
            </div>
            <div className='graph-algo'>
              <div className='category' onClick={toggleGraphAlgorithm}>Graph Algorithm</div>
              <ul>
                <li className={`${!graphAlgorithmVisble ? '': 'graph-algorithm'}`}>Breadth First Search (BFS)</li>
                <li className={`${!graphAlgorithmVisble ? '': 'graph-algorithm'}`}>Depth First Search (DFS)</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="progress-container">
      <CircularProgressbar
        value={(counter / (60 * 60 * 1000)) * 100}
        text={`${Math.floor((60 * 60 * 1000 - counter) / (60 * 1000))}m`}
        styles={buildStyles({
          pathColor: counter > 0 ? 'green' : 'red',
          trailColor: 'transparent',
        })}
      />
    </div>
      </div>
    </div>
  );
}

export default LeftBar;
