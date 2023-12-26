// dash_board.js
import React,{useState} from 'react';
import './dash_board.css'; // Make sure to import the CSS file
import NavBar from '../../components/nav_bar/nav_bar';
import image from "../../../assets/COSS-instructor-02.png"

function DashBoard() {
    const [sidebarWidth, setSidebarWidth] = useState(0);

  const toggleSidebar = () => {
    setSidebarWidth((prevWidth) => (prevWidth === 0 ? 250 : 0));
  };
  return (
    <div className="dashboard-container">
      <NavBar toggleSidebar={toggleSidebar} sidebarWidth={sidebarWidth}  />
      <div className="main-content" style={{ marginLeft: `${sidebarWidth}px`}}>
       <div className='dashboard-intro'>
       <div className='dashboard-greating'>
          <span>Wellcome Mr. X</span>
        </div>
        <div className='dashboard-img'>
          <img src={image} alt='image'/>
        </div>
       </div>
      
        
      </div>
    </div>
  );
}

export default DashBoard;