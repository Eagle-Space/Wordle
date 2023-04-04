import React, { useState } from 'react';
import WordGenerator from './components/WordGenerator';
import Game from './components/Game';
import './components/Game.css'

function App() {
  const [debug, setDebug] = useState(false);
  const word = WordGenerator();

  function toggleDebug() {
    setDebug(!debug);
  }

  return (
    <div>
      <h1>Wordle</h1>
      <button onClick={toggleDebug}>Toggle Debug Mode</button>
      {word && <Game word={word} debug={debug} />}
    </div>
  );
}

export default App;
