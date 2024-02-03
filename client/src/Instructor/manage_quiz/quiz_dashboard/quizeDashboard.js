import React, {useState} from 'react'
import NavBar from '../../components/nav_bar/nav_bar'
import './quizDashboard.scss'
function QuizeDashboard() {
    const [sidebarWidth, setSidebarWidth] = useState(0);

  const toggleSidebar = () => {
    setSidebarWidth((prevWidth) => (prevWidth === 0 ? 250 : 0));
  };

  return (
    <div className='quiz-dashboard-container'>
        <NavBar toggleSidebar={toggleSidebar} sidebarWidth={sidebarWidth}  />
        <div className="main-quiz-content" style={{ marginLeft: `${sidebarWidth}px`}}>
          <div className='add-quiz'>
            <div className='add'>+</div> 
            <div className='overlay'>Add Quiz</div>           
          </div>
          
          <div className='question-board'>question board</div>
          <div className='available-quiz'>available quiz</div>
        </div>
    </div>
  )
}

export default QuizeDashboard