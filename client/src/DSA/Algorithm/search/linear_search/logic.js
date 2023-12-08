import React, { useState } from 'react';
import './logic.scss';
//import { toast } from 'react-toastify';
import { ToastContainer, toast } from 'react-toastify';

const LinearSearch = () => {
  const [inputValue, setInputValue] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [array, setArray] = useState([]);
  const [searchIndex, setSearchIndex] = useState(null);

  const createNode = () => {
    const newNode = { value: inputValue, color: '#fff' };
    setArray((prevArray) => [...prevArray, newNode]);
    setInputValue("")
  };

  const linearSearch = () => {
    let found = false;

  for (let i = 0; i < array.length; i++) {
    setTimeout(() => {
      const newArray = [...array];

      // Uncolor the previous node
      if (i > 0) {
        if (newArray[i - 1].value !== searchValue) {
          newArray[i - 1].color = '#ffffff'; // Uncolor if the previous node's value is not equal to the searched one
        }
      }

      newArray[i].color = newArray[i].value === searchValue ? '#00ff00' : '#f0ad4e'; // Green if matched, else orange
      setArray(newArray);

      if (newArray[i].value === searchValue) {
        setSearchIndex(i);
        found = true;
        toast.success(`Found at index ${i}`);
      } else if (i === array.length - 1 && !found) {
        toast.error('Not found');
      }
    }, i * 1000); // Adjust the timer delay as needed
  }
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
        <ToastContainer/>
      </div>

      <div className="input-section">
        <input
          type="text"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder="Search value"
        />
        <button onClick={linearSearch}>Search</button>
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
    </div>
  );
};

export default LinearSearch;
