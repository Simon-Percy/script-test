import { useEffect, useRef, useState } from "react";
import "./App.css";

function App() {
  const [secs, setSecs] = useState(1500 % 60);
  const [breakMins, setBreakMins] = useState(5);
  const [initialMins, setInitialMins] = useState(25);
  const [mins, setMins] = useState(initialMins);
  const [timing, setTiming] = useState(true);
  const timin = useRef();
  const [pause, setPause] = useState(false);

  const pausing = () => {
    setPause(!pause);
    if (pause) {
    } else {
      clearTimeout();
    }
  };
  useEffect(() => {
    const timer = setInterval(() => {
      if (secs === 0) {
        setSecs(59);
        setMins(mins - 1);
      } else {
        setSecs(secs - 1);
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [secs]);

  return (
    <div id="container">
      <div id="break">
        <p id="break-label">Break Length</p>
        <div id="break-length">{breakMins}</div>
        <button
          id="break-increment"
          onClick={() => setBreakMins(breakMins + 1)}
        >
          ⬆️
        </button>
        <button
          id="break-decrement"
          onClick={() => setBreakMins(breakMins - 1)}
        >
          ⬇️
        </button>
      </div>

      <button id="start_stop" onClick={pausing}>
        Pause/Play
      </button>
      <button id="reset"> Reset</button>
      <div id="timer-label" ref={timin}>
        Session
      </div>
      <div id="time-left">
        {mins}:{secs}
      </div>
      <div id="session">
        <div id="session-label">Session Length</div>
        <div id="session-length">{initialMins}</div>
        <button
          id="session-increment"
          onClick={() => setInitialMins(initialMins + 1)}
        >
          ⬆️
        </button>
        <button
          id="session-decrement"
          onClick={() => setInitialMins(initialMins - 1)}
        >
          ⬇️
        </button>
      </div>
    </div>
  );
}

export default App;
