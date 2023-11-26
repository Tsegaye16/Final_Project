import React,{useState, useEffect} from 'react';
import "./leftBar.scss";
import Home from '../../pages/homePage/Home';

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


  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let timer;
    let startTime;
    let elapsedTime = 0;

    const startTimer = () => {
      startTime = Date.now() - elapsedTime;
      timer = setInterval(updateProgress, 1000);
    };

    const updateProgress = () => {
      const currentTime = Date.now();
      elapsedTime = currentTime - startTime;
      const newProgress = Math.min((elapsedTime / (5 * 60 * 1000)) * 100, 100); // Assuming a 5-minute timer
      setProgress(newProgress);
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        // Window is not visible, save the timer state
        localStorage.setItem('timerStartTime', startTime);
        clearInterval(timer);
      } else {
        // Window is visible, resume the timer using the saved state
        const savedStartTime = localStorage.getItem('timerStartTime');
        if (savedStartTime) {
          startTime = parseInt(savedStartTime, 10);
          startTimer();
        }
      }

    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    startTimer(); // Start the timer when the component mounts
    

    return () => {
      clearInterval(timer); // Clear the timer when the component unmounts
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []); 
  const greenPercentage = progress;
 const redPercentage = 100 - progress;// 
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
        <div className='progress' style={{ border: `2px solid transparent`, background: `conic-gradient(green ${greenPercentage}%, red ${redPercentage}%)` }}>
        {Math.round(progress)}%
        </div>
      </div>
    </div>
  );
}

export default LeftBar;
