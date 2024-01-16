import React, { useState, useRef } from 'react';
import './logic.scss';
import { ToastContainer, toast } from 'react-toastify';

const LinearSearch = () => {
  const [inputValue, setInputValue] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [array, setArray] = useState([]);
  const [searchIndex, setSearchIndex] = useState(null);
  const [delayTime, setDelayTime] = useState(1000);
  const [isPlaying, setIsPlaying] = useState(false);

  const intervalRef = useRef(null);
  const currentSearchIndex = useRef(0);

  const createNode = () => {
    const newNode = { value: inputValue, color: '#fff' };
    setArray((prevArray) => [...prevArray, newNode]);
    setInputValue('');
  };

  const linearSearch = () => {
    let found = false;

    intervalRef.current = setInterval(() => {
      if (currentSearchIndex.current >= array.length) {
        clearInterval(intervalRef.current);
        setIsPlaying(false);
        
        return;
      }

      const newArray = [...array];

      // Uncolor the previous node
      if (currentSearchIndex.current > 0) {
        if (newArray[currentSearchIndex.current - 1].value !== searchValue) {
          newArray[currentSearchIndex.current - 1].color = '#ffffff'; // Uncolor if the previous node's value is not equal to the searched one
        }
      }

      newArray[currentSearchIndex.current].color =
        newArray[currentSearchIndex.current].value === searchValue ? '#00ff00' : '#f0ad4e'; // Green if matched, else orange
      setArray(newArray);

      if (newArray[currentSearchIndex.current].value === searchValue) {
        setSearchIndex(currentSearchIndex.current);
        found = true;
        toast.success(`Found at index ${currentSearchIndex.current}`);
        
      } else if (currentSearchIndex.current === array.length - 1 && !found) {
        toast.error('Not found');
      }
      
      
      currentSearchIndex.current += 1;
      
    }, delayTime);
   
  };

  const handlePlayPause = () => {
    if (isPlaying) {
      clearInterval(intervalRef.current);
    } else {
      currentSearchIndex.current = 0;
      linearSearch();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="linear-search">
      <div className="input-section">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="value"
        />
        <button onClick={createNode}>Create</button>
        <ToastContainer />
      </div>

      <div className="input-section">
        <input
          type="text"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder="Search value"
        />
        <button onClick={handlePlayPause}>{isPlaying ? 'Pause' : 'Play'}</button>
      </div>

      

      <div className="visualization">
        {array.map((node, index) => (
          <div
            key={index}
            className={`node ${searchIndex === index ? 'searched' : ''}`}
            style={{ backgroundColor: node.color }}
          >
            {node.value}
          </div>
        ))}
      </div>
      <div className="delay-slider-container">
        <label htmlFor="delaySlider">Delay Time:</label>
        <input
          type="range"
          id="delaySlider"
          value={delayTime}
          onChange={(e) => setDelayTime(parseInt(e.target.value, 10))}
          min="100"
          max="2000"
          step="100"
          style={{
            background: `linear-gradient(to right, #f0ad4e 0%, #f0ad4e ${((delayTime - 100) / 19) * 5}%, #fff ${((delayTime - 100) / 19) * 5}%, #fff 100%)`,
          }}
        />
        <span>{delayTime} ms</span>
      </div>
    </div>
  );
};

export default LinearSearch;
