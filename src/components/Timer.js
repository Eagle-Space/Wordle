import React from 'react';
import { useTimer } from 'react-timer-hook';

function Timer({ expiryTimestamp, onExpire }) {
  const {
    seconds,
    minutes,
    restart,
    isRunning,
  } = useTimer({
    expiryTimestamp,
    onExpire,
    autoStart: true,
  });

  const timerStyles = {
    fontSize: 24,
    marginBottom: 10,
  };

  return (
    <div>
      <p style={timerStyles}>
        {minutes < 10 ? `0${minutes}` : minutes}:{seconds < 10 ? `0${seconds}` : seconds}
      </p>
      {!isRunning && (
        <button onClick={restart}>Restart timer</button>
      )}
    </div>
  );
}

export default Timer;
