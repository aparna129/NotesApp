import React, { useState, useEffect } from 'react';

const LocalStorageExample = () => {
  const [value, setValue] = useState('');

  // Function to handle changes in the input field
  const handleChange = (event) => {
    setValue(event.target.value);
  };

  // Function to handle saving the value to localStorage
  const saveToLocalStorage = () => {
    localStorage.setItem('storedValue', value);
  };

  // Function to load the stored value from localStorage on initial render
  useEffect(() => {
    const storedValue = localStorage.getItem('storedValue');
    if (storedValue) {
      setValue(storedValue);
    }
  }, []);

  return (
    <div>
      <input
        type="text"
        value={value}
        placeholder="Enter a value"
        onChange={handleChange}
      />
      <button onClick={saveToLocalStorage}>Save</button>
      <p>Stored Value: {value}</p>
    </div>
  );
};

export default LocalStorageExample;
