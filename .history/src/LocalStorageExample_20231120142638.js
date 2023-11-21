import React, { useState, useEffect } from 'react';

function LocalStorageExample() {
  const [value, setValue] = useState('');

  function handleChange(event) {
    setValue(event.target.value);
  }

  function saveToLocalStorage() {
    localStorage.setItem('storedValue', value);
  }

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
}

export default LocalStorageExample;
