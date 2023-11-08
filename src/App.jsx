import { useEffect, useRef, useState } from "react";
import "./App.css";

function App() {
  const [InitialSecs, setInitialSecs] = useState(60);
  const [secs, setSecs] = useState(InitialSecs);

  useEffect(() => {
    setTimeout(() => {
      setSecs(secs - 1);
    }, 1000);
  }, []);

  const handleStart = () => {
    mins.current.color = "red";
  };

  return (
    <div id="container">
      <div id="break">
        <p id="break-label">Break Length</p>
        <p id="break-length">5</p>
        <button id="break-increment">⬆️</button>
        <button id="break-decrement">⬇️</button>
      </div>

      <button id="start_stop" onClick={handleStart}>
        Pause/Play
      </button>
      <button id="reset"> Reset</button>
      <div id="timer-label">Session</div>
      <div id="time-left">{secs}</div>
      <div id="session">
        <div id="session-label">Session Length</div>
        <div id="session-length">25</div>
        <button
          id="session-increment"
          onClick={() => setInitialSecs(InitialSecs + 1)}
        >
          ⬆️
        </button>
        <button id="session-decrement">⬇️</button>
      </div>
    </div>
  );
}

export default App;
