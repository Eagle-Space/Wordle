import React, { useState } from 'react';

function GameSettings({ onUpdateSettings }) {
  const [backgroundColor, setBackgroundColor] = useState('#ffffff');
  const [fontFamily, setFontFamily] = useState('Arial, sans-serif');

  const handleSubmit = (event) => {
    event.preventDefault();
    onUpdateSettings({ backgroundColor, fontFamily });
  };

  const handleBackgroundColorChange = (event) => {
    setBackgroundColor(event.target.value);
  };

  const handleFontFamilyChange = (event) => {
    setFontFamily(event.target.value);
  };

  const styles = {
    padding: 20,
    maxWidth: 600,
    margin: '0 auto',
  };

  const inputStyles = {
    margin: '0 10px 0 0',
  };

  const buttonStyles = {
    padding: '10px 20px',
    fontSize: 18,
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: 4,
    cursor: 'pointer',
  };

  return (
    <form onSubmit={handleSubmit} style={styles}>
      <h2>Game Settings</h2>
      <div>
        <label htmlFor="backgroundColor">Background Color:</label>
        <input
          type="color"
          id="backgroundColor"
          value={backgroundColor}
          onChange={handleBackgroundColorChange}
          style={inputStyles}
        />
      </div>
      <div>
        <label htmlFor="fontFamily">Font Family:</label>
        <select
          id="fontFamily"
          value={fontFamily}
          onChange={handleFontFamilyChange}
          style={inputStyles}
        >
          <option value="Arial, sans-serif">Arial</option>
          <option value="'Helvetica Neue', sans-serif"> Neue</option>
          <option value="'Times New Roman', serif">Times New Roman</option>
          <option value="'Courier New', monospace">Courier New</option>
        </select>
      </div>
      <button type="submit" style={buttonStyles}>Apply</button>
    </form>
  );
}

export default GameSettings;
