import React, {useState} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './Home.css';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import NavBar from '../../components/navBar/NavBar';
import LeftBar from '../../components/leftBar/leftBar';
import Stack from '../../DSA/DataStracture/Linear/stack/stack';
import Array from "../../DSA/DataStracture/Linear/array/array"
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
import Tree from '../../DSA/DataStracture/non_Linear/tree/tree';
import { FaBars, FaTimes } from 'react-icons/fa';
import ChatIcon from '@mui/icons-material/Chat';
import { useNavigate } from 'react-router-dom';
function Home() {
  const [selectedItem, setSelectedItem] = useState('');
  const [icon, setIcon] = useState('times');
  const navigate = useNavigate()

  const toggleSidebar = () => {
    setIcon((prevIcon) => (prevIcon === 'bars' ? 'times' : 'bars'));
  };

  const handleChat = ()=>{
    navigate("/chatBot")
  }

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
      case 'tree':
        return <Tree/>
      default:
        return <Welcome/>;
    }
  };
  let isUser = true
  
 
 return (
    <div className='main-home'>
      
        <div>
          <div className='NavBar'>
            <div className='toggle-side-bar' onClick={toggleSidebar}>

            {icon === 'bars' ? <FaBars /> : <FaTimes />}
            </div>
            <NavBar isUser={isUser}/>
          </div>
          <div className='main-body'>
            <div className={`left-bar ${icon === 'times' ? 'active' : 'inactive'}`}>
            <LeftBar setSelectedItem={setSelectedItem} />
            </div>
            <div className='main-body-part'>   
            <div className='rendered'>
            {renderSelectedComponent()}           
            </div>       
            <div className='chat' onClick={handleChat}>
              {<ChatIcon/>}
            </div>  
            </div>
          </div>
        </div>
      
    </div>
  );
}

export default Home;
