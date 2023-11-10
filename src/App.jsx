import { useEffect, useRef, useState } from "react";
import "./App.css";

function App() {
  const [breakMins, setBreakMins] = useState(5);
  const [initialMins, setInitialMins] = useState(25);
  const [mins, setMins] = useState(initialMins);
  const [secs, setSecs] = useState(parseInt(mins * 60) % 60);

  const [timing, setTiming] = useState(true);
  const [pause, setPause] = useState(false);
  const audio = useRef();

  const toggleTimer = () => {
    setPause(!pause);
  };
  let timerTimeout;
  const handleTimeout = () => {
    if (pause) {
      if (secs === 0 && mins === 0) {
        audio.current.play();
        if (timing) {
          setTiming(false);
          setMins(breakMins);
          setSecs((breakMins * 60) % 60);
        } else {
          setTiming(true);
          setMins(initialMins);
          setSecs((initialMins * 60) % 60);
        }
      } else {
        setSecs(secs - 1);
        if (secs === 0) {
          setSecs(59);
          setMins(mins - 1);
        }
        timerTimeout = setTimeout(handleTimeout, 1000);
      }
    }
  };
  const reset = () => {
    setInitialMins(25);
    setBreakMins(5);
    setMins(25);
    setPause(false);
    audio.current.pause();
    audio.current.currentTime = 0;
    setSecs((mins * 60) % 60);
    clearTimeout(timerTimeout);
    setTiming(true);
  };
  const breakdre = () => {
    if (breakMins > 1 && !pause) {
      setBreakMins(breakMins - 1);
      if (!timing) {
        setMins(breakMins - 1);
      }
    }
  };
  const decrement = () => {
    if (!pause && mins > 1) {
      setInitialMins(initialMins - 1);
      setMins(initialMins - 1);
    }
  };
  const breakIncre = () => {
    if (!pause && breakMins < 60) {
      setBreakMins(breakMins + 1);
      if (!timing) {
        setMins(breakMins + 1);
      }
    }
  };
  const changeTime = () => {
    if (!pause && mins < 60) {
      setInitialMins(initialMins + 1);
      setMins(initialMins + 1);
    }
  };

  useEffect(() => {
    timerTimeout = setTimeout(handleTimeout, 1000);

    return () => clearTimeout(timerTimeout);
  }, [secs, pause, mins]);

  return (
    <div id="container">
      <div id="break">
        <p id="break-label">Break Length</p>
        <div id="break-length">{breakMins}</div>
        <button id="break-increment" onClick={breakIncre}>
          ⬆️
        </button>
        <button id="break-decrement" onClick={breakdre}>
          ⬇️
        </button>
      </div>
      <audio
        id="beep"
        src="https://cdn.freecodecamp.org/testable-projects-fcc/audio/BeepSound.wav"
        ref={audio}
      ></audio>
      <button id="start_stop" onClick={toggleTimer}>
        Pause/Play
      </button>
      <button id="reset" onClick={reset}>
        {" "}
        Reset
      </button>
      <div id="timer-label">{timing ? "session" : "break"}</div>
      <div id="time-left">
        {(mins + "0").length > 2 ? mins : "0" + mins}:
        {(secs + "0").length > 2 ? secs : "0" + secs}
      </div>
      <div id="session">
        <div id="session-label">Session Length</div>
        <div id="session-length">{initialMins}</div>
        <button id="session-increment" onClick={changeTime}>
          ⬆️
        </button>
        <button id="session-decrement" onClick={decrement}>
          ⬇️
        </button>
      </div>
    </div>
  );
}

export default App;
