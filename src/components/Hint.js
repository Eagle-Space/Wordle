import React, { useState } from 'react';

function Hint({ word }) {
  const [hint, setHint] = useState(null);

  function revealHint() {
    const hintIndex = Math.floor(Math.random() * word.length);
    setHint(word[hintIndex]);
  }

  return (
    <div>
      <button onClick={revealHint}>Need a hint?</button>
      {hint && <p>The word contains the letter "{hint}".</p>}
    </div>
  );
}

export default Hint;
