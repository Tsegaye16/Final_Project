// dash_board.js
import React,{useState} from 'react';
import './dash_board.scss'; // Make sure to import the CSS file
import NavBar from '../../components/nav_bar/nav_bar';


function DashBoard() {
    const [sidebarWidth, setSidebarWidth] = useState(0);

  const toggleSidebar = () => {
    setSidebarWidth((prevWidth) => (prevWidth === 0 ? 250 : 0));
  };
  return (
    <div className="dashboard-container">
      <NavBar toggleSidebar={toggleSidebar} sidebarWidth={sidebarWidth}  />
      <div className="main-content" style={{ marginLeft: `${sidebarWidth}px`}}>
       <div className='dashboard'>
       
        
       </div>
      
        
      </div>
    </div>
  );
}

export default DashBoard;