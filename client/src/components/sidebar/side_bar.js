
import React,{useState, useEffect} from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { Link } from 'react-router-dom';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import './side_bar.scss';
import { IconContext } from 'react-icons';
//import LeftBar from '../leftBar/leftBar';
//import NavBar from '../navBar/NavBar';
//import { LeftBarData } from '../leftBar/leftBarData';
//import { LeftBarData } from "./side_bar_data"
import { FaAngleRight } from "react-icons/fa";
import { FaAngleDown } from "react-icons/fa6";
import StudentBoard from '../Student/student_board';
import Array from "../../DSA/DataStracture/Linear/array/array"
import Stack from '../../DSA/DataStracture/Linear/stack/stack';
import Welcome from '../../DSA/welcome/welcome';
import Queues from '../../DSA/DataStracture/Linear/queue/queues'
import Linked_list from '../../DSA/DataStracture/Linear/linked_list/linked_list';
import BT from '../../DSA/DataStracture/non_Linear/binary_Tree/BT';
import BST from '../../DSA/DataStracture/non_Linear/binary_tree_search/BST';
import Hash_table from '../../DSA/DataStracture/non_Linear/hash_table/hash_table';
import Graph from '../../DSA/DataStracture/non_Linear/graph/graph';
import Linear_search from '../../DSA/Algorithm/search/linear_search/linear_search';
import Binary_search from '../../DSA/Algorithm/search/binary_search/binary_search';
import Bubble_sort from '../../DSA/Algorithm/sort/bubble_sort/bubble_sort';
import Insertion_sort from '../../DSA/Algorithm/sort/insertion_sort/insertion_sort';
import Selection_sort from '../../DSA/Algorithm/sort/selection_sort/selection_sort';
import Merge_sort from '../../DSA/Algorithm/sort/merge_sort/merge_sort';
import Quick_sort from '../../DSA/Algorithm/sort/quick_sort/quick_sort';
import BFS from '../../DSA/Algorithm/graph/breadth_first_search/BFS';
import DFS from '../../DSA/Algorithm/graph/debth_first_search/DFS';

export default function SideBar() {
  const [selectedItem, setSelectedItem] = useState('');
  const [sidebarWidth, setSidebarWidth] = useState(250);
  
  const [isVisible, setIsVisible] = useState(true);
  const [dataStructureVisible, setDataStructureVisible] = useState(true);
  const [linearDatastructureVisible,setLinearDatastructureVisible] = useState(true)
  const [noneLinearDatastructureVisible,setNoneLinearDatastructureVisible] = useState(true)
  const [algorithmVisible, setalgorithmVisible] = useState(true);
  const [searchAlgorithVisible,setSearchAlgorithVisible] = useState(true)
  const [sortingAlgorithVisible,setSortingAlgorithVisible] = useState(true)
  const [graphAlgorithmVisble, setGraphAlgorithVisisble] = useState(true)
  
  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

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

  const renderSelectedComponent = () => {
    switch (selectedItem) {
      case 'array':
        return <Array/>
      case 'stack':
        return <Stack />;
      case 'queue':
        return <Queues/>
      case 'linked-list':
        return <Linked_list/>
      case 'binary_tree':
        return <BT/>
      case 'bst':
        return <BST/>
      case 'hash_table':
        return <Hash_table/>
      case 'graph':
        return <Graph/>
      case 'linear_search':
        return <Linear_search/>
      case 'binary_search':
        return <Binary_search/>
      case 'bubble_sort':
        return <Bubble_sort/>
      case 'insertion_sort':
        return <Insertion_sort/>
      case 'selection_sort':
        return <Selection_sort/>
      case 'merge_sort':
        return <Merge_sort/>
      case 'quick_sort':
        return <Quick_sort/>
      case 'bfs':
        return <BFS/>
      case 'dfs':
        return <DFS/>
      
      default:
        return <Welcome/>;
    }
  };
  const toggleSidebar = () => {
    setSidebarWidth((prevWidth) => (prevWidth === 0 ? 250 : 0));
  };
  return (
    <>
      <IconContext.Provider value={{ color: '#fff' }}>
        <div className='sidebar-container'>
          <div className='navbar'>
            {sidebarWidth === 0 ? (
              <Link to='#' className='menu-bars' onClick={toggleSidebar}>
                <FaIcons.FaBars />
              </Link>
            ) : (
              <Link to='#' className='menu-bars' onClick={toggleSidebar}>
                <FaIcons.FaTimes />
              </Link>
            )}
          </div>
          <div className='entire-side-bar-menu'>
          <nav className={sidebarWidth !== 0 ? 'nav-menu active' : 'nav-menu'}>
            
            <ul className='nav-menu-items'>
              
              <li className='dsa-content'>
                <li className='data-structure'>
                  <div className='category' onClick={toggleDataStructure}> 
                  {dataStructureVisible ? <FaAngleRight /> : <FaAngleDown />} Data Structure
                  </div>
                  <ul className={`sub-category ${!dataStructureVisible ? '' : 'invisible-data-structures'}`}>
                    <li className='linear '>
                      <div className='category' onClick={toggleLinearDatastructure}>{linearDatastructureVisible ? <FaAngleRight /> : <FaAngleDown />} Linear</div>
                      <ul>
                      <li className={`${!linearDatastructureVisible ? '':'visible-linear'}`} onClick={() => {handleItemClick('array')}}> Array</li>
                      <li className={`${!linearDatastructureVisible ? '':'visible-linear'}`} onClick={() => {handleItemClick('stack')}}>  stack</li>
                      <li className={`${!linearDatastructureVisible ? '':'visible-linear'}`} onClick={() => {handleItemClick('queue')}}>  Queues</li>
                      <li className={`${!linearDatastructureVisible ? '':'visible-linear'}`} onClick={() => {handleItemClick('linked-list')}}> Linked list</li>
                      </ul>
                    </li>
                    <li className='non-linear ' >
                      <div className='category' onClick={toggleNoneLinearDatastructure} >{noneLinearDatastructureVisible ? <FaAngleRight /> : <FaAngleDown />} Non-linear</div>
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
                    </li>
                  </ul>
                </li>
                <li className='algorithms'>
                  <div className='category' onClick={toggleAlgorithm}>{algorithmVisible ? <FaAngleRight /> : <FaAngleDown />} Algorithms</div>
                  <ul className={`sub-category ${!algorithmVisible ? '' : 'invisible-algorithms'}`}>
                    <li className='search'>
                      <div className='category'onClick={toggleSearchAlgorithm}>{searchAlgorithVisible ? <FaAngleRight /> : <FaAngleDown />} Search</div>
                      <ul>
                      <li className={`${!searchAlgorithVisible ? '':'search-visible'}`} onClick={() => {handleItemClick('linear_search')}}>
                
                Linear Search</li>
                <li className={`${!searchAlgorithVisible ? '':'search-visible'}`}  onClick={() => {handleItemClick('binary_search')}}>
                
                Binary Search</li>
                      </ul>
                    </li>
                    <li className='sorting'>
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
                    </li>
                    <li className='graph-algo'>
                      <div className='category' onClick={toggleGraphAlgorithm}>{graphAlgorithmVisble ? <FaAngleRight /> : <FaAngleDown />} Graph Algorithm</div>
                      <ul>
                      <li className={`${!graphAlgorithmVisble ? '': 'graph-algorithm'}`} onClick={() => {handleItemClick('bfs')}}>
                 
                 Breadth First Search (BFS)</li>
                 <li className={`${!graphAlgorithmVisble ? '': 'graph-algorithm'}`} onClick={() => {handleItemClick('dfs')}}>
                  
                 Depth First Search (DFS)</li>
                      </ul>
                    </li>
                  </ul>
                </li>
              </li>
            </ul>            
          </nav>
          <div className='main-container' style={{ marginLeft: `${sidebarWidth}px`, width:`calc(100% - ${sidebarWidth}px)`}} >
          {renderSelectedComponent() }
          </div>
          </div>
          
        </div>
      </IconContext.Provider>
    </>
  );
}
