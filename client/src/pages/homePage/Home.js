// import React, {useState} from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import './Home.css';
// import * as FaIcons from 'react-icons/fa';
// import * as AiIcons from 'react-icons/ai';
// import NavBar from '../../components/navBar/NavBar';
// import LeftBar from '../../components/leftBar/leftBar';
// import Stack from '../../DSA/DataStracture/Linear/stack/stack';
// import Array from "../../DSA/DataStracture/Linear/array/array"
// import Welcome from '../../DSA/welcome/welcome';
// import Queues from '../../DSA/DataStracture/Linear/queue/queues'
// import Linked_list from '../../DSA/DataStracture/Linear/linked_list/linked_list';
// import BT from '../../DSA/DataStracture/non_Linear/binary_Tree/BT';
// import BST from '../../DSA/DataStracture/non_Linear/binary_tree_search/BST';
// import Hash_table from '../../DSA/DataStracture/non_Linear/hash_table/hash_table';
// import Graph from '../../DSA/DataStracture/non_Linear/graph/graph';
// import Linear_search from '../../DSA/Algorithm/search/linear_search/linear_search';
// import Binary_search from '../../DSA/Algorithm/search/binary_search/binary_search';
// import Bubble_sort from '../../DSA/Algorithm/sort/bubble_sort/bubble_sort';
// import Insertion_sort from '../../DSA/Algorithm/sort/insertion_sort/insertion_sort';
// import Selection_sort from '../../DSA/Algorithm/sort/selection_sort/selection_sort';
// import Merge_sort from '../../DSA/Algorithm/sort/merge_sort/merge_sort';
// import Quick_sort from '../../DSA/Algorithm/sort/quick_sort/quick_sort';
// import BFS from '../../DSA/Algorithm/graph/breadth_first_search/BFS';
// import DFS from '../../DSA/Algorithm/graph/debth_first_search/DFS';
// import Tree from '../../DSA/DataStracture/non_Linear/tree/tree';
// import { FaBars, FaTimes } from 'react-icons/fa';
// import QuizIcon from '@mui/icons-material/Quiz';
// import { useNavigate } from 'react-router-dom';

// function Home() {
//   const [selectedItem, setSelectedItem] = useState('');
//   const [icon, setIcon] = useState('times');
//   const navigate = useNavigate()

//   const toggleSidebar = () => {
//     setIcon((prevIcon) => (prevIcon === 'bars' ? 'times' : 'bars'));
//   };

//   const handleChat = ()=>{
//     navigate("/chatBot")
//   }

//   const renderSelectedComponent = () => {
//     switch (selectedItem) {
//       case 'array':
//         return <Array/>
//       case 'stack':
//         return <Stack />;
//       case 'queue':
//         return <Queues/>
//       case 'linked-list':
//         return <Linked_list/>
//       case 'binary_tree':
//         return <BT/>
//       case 'bst':
//         return <BST/>
//       case 'hash_table':
//         return <Hash_table/>
//       case 'graph':
//         return <Graph/>
//       case 'linear_search':
//         return <Linear_search/>
//       case 'binary_search':
//         return <Binary_search/>
//       case 'bubble_sort':
//         return <Bubble_sort/>
//       case 'insertion_sort':
//         return <Insertion_sort/>
//       case 'selection_sort':
//         return <Selection_sort/>
//       case 'merge_sort':
//         return <Merge_sort/>
//       case 'quick_sort':
//         return <Quick_sort/>
//       case 'bfs':
//         return <BFS/>
//       case 'dfs':
//         return <DFS/>
//       case 'tree':
//         return <Tree/>
//       default:
//         return <Welcome/>;
//     }
//   };
//   let isUser = true
  
 
//  return (
//     <div className='main-home'>
      
//         <div>
//           <div className='NavBar'>
//             <div className='toggle-side-bar' onClick={toggleSidebar}>

//             {icon === 'bars' ? <FaBars /> : <FaTimes />}
//             </div>
//             <NavBar isUser={isUser}/>
//           </div>
//           <div className='main-body'>
//             <div className={`left-bar ${icon === 'times' ? 'active' : 'inactive'}`}>
//             <LeftBar setSelectedItem={setSelectedItem} />
//             </div>
//             <div className='main-body-part'>   
//             <div className='rendered'>
//             {renderSelectedComponent()}           
//             </div>       
//             <div className='chat' onClick={handleChat}>
//               {<QuizIcon/>}
//             </div>  
          
//             </div>
//           </div>
//         </div>
      
//     </div>
//   );
// }

// export default Home;
import React, {useState, useEffect} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './Home.scss';
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
//import {Tooltip } from '@mui/material';
import QuizIcon from '@mui/icons-material/Quiz';
import { useNavigate } from 'react-router-dom';
//import CircularProgress from '@mui/material/CircularProgress';
//import CircularProgress from '@mui/material/CircularProgress';
//import { Typography} from '@mui/material';
import { Tooltip, CircularProgress, Typography } from '@mui/material';
import { red } from '@mui/material/colors';



function Home() {
  const [selectedItem, setSelectedItem] = useState('');
  const [icon, setIcon] = useState('times');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate()
  const [sidebarWidth, setSidebarWidth] = useState(260);
  const [progress, setProgress] = useState(0)
  const [startTime, setStartTime] = useState(new Date().getTime()); // Define startTime here

  
  const toggleSidebar = () => {
    setIcon(prevIcon => (prevIcon === 'bars' ? 'times' : 'bars'));
    setSidebarOpen(prevState => !prevState);
    setSidebarWidth((prevWidth) => (prevWidth === 0 ? 260 : 0));
  };

  const handleChat = () => {
    navigate("/student/quiz")
  };

  const updateProgress = () => {
    const currentTime = new Date().getTime();
    const elapsedTime = (currentTime - startTime) / 1000; // in seconds
    const totalSeconds = 3600; // assume 1 minute for completion
    const newProgress = (elapsedTime / totalSeconds) * 100;

    // Ensure progress doesn't exceed 100%
    setProgress(Math.min(newProgress, 100));
  };

  // Update progress every second
  useEffect(() => {
    const intervalId = setInterval(updateProgress, 1000);

    return () => clearInterval(intervalId);
  }, [progress, startTime]);
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
      <div className='NavBar'>
        <NavBar isUser={isUser} icon={icon} toggleSidebar={toggleSidebar} />
      </div>
      <div className='main-body'>
        <div className={`left-bar ${sidebarOpen ? 'open' : 'closed'}`}>
          <LeftBar setSelectedItem={setSelectedItem} sidebarWidth={sidebarWidth} />
        </div>
        <div className="main-body-part" style={{ marginLeft: `${sidebarWidth}px`, width: '100%', position: 'relative' }}>
          <div className='rendered'>
            {renderSelectedComponent()}
          </div>
          <div style={{ position: 'fixed', right: '70px', top: '300px', zIndex: 9999 }}>
  {/* Remaining part of the circle */}
  {Math.round(progress)}%
  <CircularProgress
    variant="determinate"
    value={100}
    size={90}
    thickness={2}
    color="primary"
    sx={{
      position: 'absolute',
      left: '50%',
      top: '50%',
      marginLeft: '-45px',
      marginTop: '-45px',
    }}
  />
  {/* Percentage part of the circle */}
  <CircularProgress
    variant="determinate"
    value={progress}
    size={90}
    thickness={2}
    color="secondary"
    sx={{
      position: 'absolute',
      left: '50%',
      top: '50%',
      marginLeft: '-45px',
      marginTop: '-45px',
    }}
  >
    <Typography
      variant="caption"
      component="div"
      color="textSecondary"
      sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
    >
      
    </Typography>
  </CircularProgress>
</div>
          <div style={{ position: 'fixed', right: '20px', top: '80px' }}>
            <Tooltip title='Take Quiz' arrow>
              <div className='chat' onClick={handleChat}>
                <QuizIcon />
              </div>
            </Tooltip>
          </div>
        </div>
      </div>
    </div>
  );

}

export default Home;