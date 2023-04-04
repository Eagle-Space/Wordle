import React, { useState } from "react";
import axios from "axios";
import WordGenerator from "./WordGenerator";
import "./Game.css";
import Timer from "./Timer";
import Hint from "./Hint";
import GameSettings from "./GameSettings";
import Board from "./Board";

function Game({ word, debug }) {
  const [guess, setGuess] = useState("");
  const [guesses, setGuesses] = useState([]);
  const [attempts, setAttempts] = useState(0);
  const [maxAttempts, setMaxAttempts] = useState(6);
  const [usedLetters, setUsedLetters] = useState(new Set());
  const [stats, setStats] = useState({
    wins: 0,
    losses: 0,
    guessesForWins: [],
  });
  const [isWinning, setIsWinning] = useState(false);
  const [timerExpiry, setTimerExpiry] = useState(null);
  const [timerExpired, setTimerExpired] = useState(false);
  const [hint, setHint] = useState(null);
  const [settings, setSettings] = useState({
    backgroundColor: "#ffffff",
    fontFamily: "Arial, sans-serif",
  });

  function handleGuess(guess) {
    const guessArray = guess.toLowerCase().split("");
    const wordArray = word.split("");

    const result = guessArray.map((letter, i) => {
      if (wordArray.includes(letter)) {
        if (wordArray[i] === letter) {
          return "right letter, right place";
        } else {
          return "right letter, wrong place";
        }
      } else {
        return "wrong letter";
      }
    });

    setGuesses([...guesses, { guess, result }]);
    setGuess("");
    setAttempts(attempts + 1);

    const newUsedLetters = new Set(usedLetters);
    guessArray.forEach((letter) => newUsedLetters.add(letter));
    setUsedLetters(newUsedLetters);

    if (result.filter((r) => r.includes("right place")).length === 5) {
      setIsWinning(true);
      alert(
        `Congratulations! You guessed the word "${word}" in ${attempts} attempts.`
      );
      resetGame(true);
    } else if (attempts + 1 >= maxAttempts) {
      alert(`Sorry, you ran out of attempts. The word was "${word}".`);
      resetGame(false);
    }
  }

  function resetGame(won) {
    if (won) {
      setStats({
        ...stats,
        wins: stats.wins + 1,
        guessesForWins: [...stats.guessesForWins, attempts],
      });
    } else {
      setStats({ ...stats, losses: stats.losses + 1 });
    }
    setGuesses([]);
    setAttempts(0);
    setMaxAttempts(6);
    setUsedLetters(new Set());
    fetchWord();
  }

  function handleUpdateSettings(newSettings) {
    setSettings(newSettings);
  }

  function isGuessValid(guess) {
    return /^[a-zA-Z]+$/.test(guess) && guess.length === 5;
  }

  function handleInputChange(event) {
    setGuess(event.target.value.toUpperCase());
  }

  function handleFormSubmit(event) {
    event.preventDefault();

    if (!isGuessValid(guess)) {
      alert("Please enter a valid 5-letter word.");
      return;
    }

    if (
      usedLetters.has(guess[0]) ||
      usedLetters.has(guess[1]) ||
      usedLetters.has(guess[2]) ||
      usedLetters.has(guess[3]) ||
      usedLetters.has(guess[4])
    ) {
      alert(
        "You have already used one or more of the letters in that word. Please try again."
      );
      return;
    }

    handleGuess(guess);
  }

  function fetchWord() {
    axios
      .get(
        "https://api.wordsapi.com/v1/words?random=true&partOfSpeech=noun&letters=5&api_key=<your_api_key>"
      )
      .then((response) => {
        if (response.data.length === 0) {
          fetchWord();
        } else {
          const word = response.data[0].word.toUpperCase();
          setGuess("");
          setGuesses([]);
          setAttempts(0);
          setMaxAttempts(6);
          setUsedLetters(new Set());
          WordGenerator.set(word);
        }
      });
  }

  const styles = {
    fontFamily: "Arial, sans-serif",
    margin: "0 auto",
    maxWidth: 600,
    padding: 20,
  };

  const headingStyles = {
    textAlign: "center",
    marginBottom: 20,
    fontSize: 28,
  };

  const labelStyles = {
    fontSize: 18,
  };

  const inputStyles = {
    padding: 10,
    fontSize: 18,
  };

  const buttonStyles = {
    padding: "10px 20px",
    fontSize: 18,
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    borderRadius: 4,
    cursor: "pointer",
  };

  const infoStyles = {
    fontSize: 18,
    marginBottom: 10,
  };

  const resultStyles = {
    fontSize: 16,
  };

  return (
    <div style={styles}>
      <h1 style={headingStyles}>Guess the 5-letter word</h1>
      <p style={infoStyles}>
        Word:{" "}
        {word &&
          word
            .split("")
            .map(() => "_ ")
            .join("")}
      </p>
      <form onSubmit={handleFormSubmit}>
        <label htmlFor="guessInput" style={labelStyles}>
          Enter your guess:
        </label>
        <br />
        <input
          type="text"
          id="guessInput"
          value={guess}
          onChange={handleInputChange}
          style={inputStyles}
        />
        <br />
        <button type="submit" style={buttonStyles}>
          Guess
        </button>
      </form>
      <p style={infoStyles}>Attempts: {attempts}</p>
      <p style={infoStyles}>Max attempts: {maxAttempts}</p>
      <p style={infoStyles}>
        Used letters: {Array.from(usedLetters).join(", ")}
      </p>
      {debug && <p>Answer: {word}</p>}
      <h2 style={headingStyles}>Guess history:</h2>
      {guesses.map((guess, i) => (
        <div key={i} style={{ marginBottom: 20 }}>
          <p style={infoStyles}>{guess.guess}</p>
          <ul>
            {guess.result.map((result, i) => (
              <li key={i} style={resultStyles}>
                {result}
              </li>
            ))}
          </ul>
        </div>
      ))}
      {guesses.filter((r) => Array.isArray(r) && r.includes("right place"))
        .length === 5 && (
        <div style={{ marginBottom: 20 }}>
          <p
            className={isWinning ? "winning-message" : ""}
            style={headingStyles}
          >
            <p className={isWinning ? "winning-message" : ""}>
              Congratulations! You guessed the word "{word}" in {attempts}{" "}
              attempts.
            </p>
            <button onClick={resetGame}>Play again</button>
          </p>
        </div>
      )}

      {attempts + 1 >= maxAttempts && (
        <div>
          <p>Sorry, you ran out of attempts. The word was "{word}".</p>
          <button onClick={resetGame}>Play again</button>
        </div>
      )}
      <div>
        <Timer
          expiryTimestamp={Date.now() + 120000}
          onExpire={() => setTimerExpired(true)}
        />
        <Hint word={word} />
        <GameSettings
          settings={settings}
          onUpdateSettings={handleUpdateSettings}
        />
        <Board guesses={guesses} />
        <p>Wins: {stats.wins}</p>
        <p>Losses: {stats.losses}</p>
        <p>
          Avg guesses for wins:{" "}
          {stats.guessesForWins.length
            ? (
                stats.guessesForWins.reduce((a, b) => a + b, 0) /
                stats.guessesForWins.length
              ).toFixed(2)
            : 0}
        </p>
      </div>
    </div>
  );
}

export default Game;
