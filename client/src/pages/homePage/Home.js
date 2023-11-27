import React, {useState} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './Home.css';
import NavBar from '../../components/navBar/NavBar';
import LeftBar from '../../components/leftBar/leftBar';
import Stack from '../../DSA/stack/stack';
import Array from "../../DSA/array/array"
import Welcome from '../../DSA/welcome/welcome';
import Queues from '../../DSA/queue/queues'
import Linked_list from '../../DSA/linked_list/linked_list';

function Home() {
  const [selectedItem, setSelectedItem] = useState('');

  const renderSelectedComponent = () => {
    switch (selectedItem) {
      case 'stack':
        return <Stack />;
      case 'array':
        return <Array/>
      case 'queue':
        return <Queues/>
      case 'linked-list':
        return <Linked_list/>
      // Add more cases for other components
      default:
        return <Welcome/>;
    }
  };
  let isUser = true

  const CustomComponent = () => (
    // Replace this with the component you want to display
    <div>
      <h1>This is a custom component</h1>
      <p>You can pass any component here to be displayed inside renderSelectedComponent.</p>
    </div>
  );
 return (
    <div className='main-home'>
      
        <div>
          <div className='NavBar'>
            <NavBar isUser={isUser}/>
          </div>
          <div className='main-body'>
            <div className='left-bar'>
            <LeftBar setSelectedItem={setSelectedItem} />
            </div>
            <div className='main-body-part'>
            <CustomComponent />
            {renderSelectedComponent()}
            
              
            </div>
          </div>
        </div>
      
    </div>
  );
}

export default Home;
