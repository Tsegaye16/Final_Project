// dash_board.js
import React,{useState} from 'react';
import './dash_board.css'; // Make sure to import the CSS file
import NavBar from '../../components/nav_bar/nav_bar';

function DashBoard() {
    const [sidebarWidth, setSidebarWidth] = useState(250);

  const toggleSidebar = () => {
    setSidebarWidth((prevWidth) => (prevWidth === 0 ? 250 : 0));
  };
  return (
    <div className="dashboard-container">
      <NavBar toggleSidebar={toggleSidebar} sidebarWidth={sidebarWidth}  />
      <div className="main-content" style={{ marginLeft: `${sidebarWidth}px`}}>
        <h1>Dashboard</h1>
        
      </div>
    </div>
  );
}

export default DashBoard;
