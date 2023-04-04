import React from 'react';

function Board({ guesses }) {
  const styles = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  };

  const squareStyles = {
    width: 150,
    height: 50,
    borderRadius: 4,
    marginRight: 10,
    fontSize: 32,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
  };

  const correctStyles = {
    backgroundColor: 'green',
    color: 'white',
  };

  const wrongStyles = {
    backgroundColor: 'red',
    color: 'white',
  };

  return (
    <div style={styles}>
      {guesses.map((guess, i) => (
        <div key={i} style={{ ...squareStyles, ...(guess.isCorrect ? correctStyles : wrongStyles) }}>
          {guess.guess}
        </div>
      ))}
    </div>
  );
}

export default Board;
