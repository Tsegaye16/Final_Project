// dash_board.js
import React,{useState} from 'react';
import './student_board.css'; // Make sure to import the CSS file
import Side_bar from '../sidebar/side_bar';



function StudentBoard() {
    
    

  
  
  return (
    <div className="dashboard-container">
      <Side_bar toggleSidebar={toggleSidebar} sidebarWidth={sidebarWidth} setSelectedItem={setSelectedItem} />
      <div className="main-content" >     
     
       {renderSelectedComponent() }

       
      </div>
    </div>
  );
}

export default StudentBoard;