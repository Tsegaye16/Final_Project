import React, { useState } from 'react';
import './declaration.scss';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';

const Declaration = () => {
  const [variableName, setVariableName] = useState('');
  const [type, setType] = useState('');
  const [size, setSize] = useState('');
  const [memoryRows, setMemoryRows] = useState([]);
  const [assumption, setAssumption] = useState('');
  const [cDeclaration, setCDeclaration] = useState('');
  const [isTable, setIsTable] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleDeclare = () => {
    // Check if any input field is empty
    if (!variableName || !type || !size) {
      setErrorMessage('Please fill all input fields.');
      setIsTable(false);
      return;
    }

    // Create an array of rows for the memory table
    const rows = [];
    for (let i = 0; i < size; i++) {
      // Calculate the space occupied by the current element
      let space = 0;
      if (type === 'int') {
        space = 4; // Assuming 4 bytes for an integer
        setAssumption('Assuming 4 bytes for an integer');
      } else if (type === 'bool') {
        space = 1; // Assuming 1 byte for a boolean
        setAssumption('Assuming 1 byte for a boolean');
      } else if (type === 'str') {
        space = 2 * i; // Assuming 2 bytes per character for a string
        setAssumption('Assuming 2 bytes per character for a string');
      }

      rows.push(
        <tr key={i}>
          <td>{variableName}[{i}]</td>
          <td>{type}</td>
          <td>0</td> {/* Initial value */}
          <td>{space}</td> {/* Space occupied */}
        </tr>
      );
    }
    setMemoryRows(rows);
    setCDeclaration(`${type} ${variableName}[${size}];`);
    setIsTable(true);
    setErrorMessage('');
  };

  return (
    <div className='main-declaration'>
      <div className='input-fields'>
        <input
          type='text'
          placeholder='Variable Name'
          value={variableName}
          onChange={(e) => setVariableName(e.target.value)}
        />
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option value=''>Select Type</option>
          <option value='int'>int</option>
          <option value='bool'>bool</option>
          <option value='str'>str</option>
        </select>
        <input
          type='number'
          placeholder='Array Size'
          value={size}
          onChange={(e) => setSize(e.target.value)}
        />
        <button onClick={handleDeclare} className='declare'>Declare</button>
        {errorMessage && <p className='error-message'>{errorMessage}</p>}
      </div>
      <div className={`memory ${!isTable ? 'visibility' : ''}`}>
        <div className='table'>
          <table>
            <thead>
              <tr>
                <th>Variable</th>
                <th>Type</th>
                <th>Value</th>
                <th>Space(byte)</th>
              </tr>
            </thead>
            <tbody>
              {memoryRows.map((row, index) => (
                // Render each row of the memory table
                row
              ))}
            </tbody>
          </table>
        </div>
        <div className='assuming'>
          <div className='assumption'>
            {assumption}
          </div>
          <div className='declaring'>
            <SyntaxHighlighter language='c' wrapLines>
              {cDeclaration}
            </SyntaxHighlighter>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Declaration;