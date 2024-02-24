import React, { useState } from 'react';
import './linked_list.scss';

function LinkedList() {
  const [list, setList] = useState([]);
  const [value, setValue] = useState('');
  const [addIndex, setAddIndex] = useState('');
  const [removeIndex, setRemoveIndex] = useState('');
  const headNode = 'HEAD';

  const addToFront = () => {
    if (!value) return;
    const newNode = { value, id: Date.now() };
    setList([newNode, ...list]);
    animateNewNode(newNode);
    setValue('');
  };

  const addToBack = () => {
    if (!value) return;
    const newNode = { value, id: Date.now() };
    setList([...list, newNode]);
    animateNewNode(newNode);
    setValue('');
  };

  const addToIndex = () => {
    if (!value || addIndex === '' || addIndex < 0 || addIndex > list.length) return;
    const newNode = { value, id: Date.now() };
    const newList = [...list];
    newList.splice(addIndex, 0, newNode);
    setList(newList);
    animateNewNode(newNode);
    setValue('');
    setAddIndex('');
  };

  const removeFromFront = () => {
    if (list.length === 0) return;
    const removedNode = list[0];
    setList(list.slice(1));
    animateRemovedNode(removedNode);
  };

  const removeFromBack = () => {
    if (list.length === 0) return;
    const removedNode = list[list.length - 1];
    setList(list.slice(0, -1));
    animateRemovedNode(removedNode);
  };

  const removeFromIndex = () => {
    if (removeIndex === '' || removeIndex < 0 || removeIndex >= list.length) return;
    const removedNode = list[removeIndex];
    const newList = [...list];
    newList.splice(removeIndex, 1);
    setList(newList);
    animateRemovedNode(removedNode);
    setRemoveIndex('');
  };

  const animateNewNode = (newNode) => {
    setTimeout(() => {
      const newNodeElement = document.getElementById(`node-${newNode.id}`);
      newNodeElement.classList.add('highlight');
      setTimeout(() => {
        newNodeElement.classList.remove('highlight');
      }, 1000);
    }, 100);
  };

  const animateRemovedNode = (removedNode) => {
    const removedNodeElement = document.getElementById(`node-${removedNode.id}`);
    removedNodeElement.classList.add('remove');
    setTimeout(() => {
      const newList = list.filter(node => node.id !== removedNode.id);
      setList(newList);
    }, 500);
  };

  return (
    <div className="linked-list-container">
      <div className="action-section">
        <div className="add-section">
          <input
            type="number"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Enter a number"
          />
          <button onClick={addToFront}>Add to Front</button>
          <button onClick={addToBack}>Add to Back</button>
          <input
            type="number"
            value={addIndex}
            onChange={(e) => setAddIndex(Math.min(e.target.value, list.length))}
            placeholder="Index"
            min="0"
            max={list.length}
          />
          <button onClick={addToIndex}>Add at Index</button>
        </div>
        <div className="remove-section">
          <button onClick={removeFromFront}>Remove from Front</button>
          <button onClick={removeFromBack}>Remove from Back</button>
          <input
            type="number"
            value={removeIndex}
            onChange={(e) => setRemoveIndex(Math.min(e.target.value, list.length - 1))}
            placeholder="Index"
            min="0"
            max={list.length - 1}
          />
          <button onClick={removeFromIndex}>Remove at Index</button>
        </div>
      </div>
      <div className="visualization-section">
        <div className="linked-list">
          <div className="node">{headNode}</div>
          {list.map((item) => (
            <React.Fragment key={item.id}>
              <div className="arrow">➔</div>
              <div id={`node-${item.id}`} className="node">{item.value}</div>
            </React.Fragment>
          ))}
          <div className="arrow">➔</div>
          <div className="empty-node"></div>
        </div>
      </div>
    </div>
  );
}

export default LinkedList;
