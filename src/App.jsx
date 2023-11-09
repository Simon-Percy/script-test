import { useEffect, useRef, useState } from "react";
import "./App.css";

function App() {
  const [secs, setSecs] = useState(0);
  const [breakMins, setBreakMins] = useState(5);
  const [initialMins, setInitialMins] = useState(25);
  const [mins, setMins] = useState(initialMins);
  const [timing, setTiming] = useState(true);
  const timin = useRef("");
  const [pause, setPause] = useState(false);
  const audio = useRef();
  const [timerID, setTimerID] = useState(null);

  const reset = () => {
    setTiming(true);
    setInitialMins(25);
    setBreakMins(5);
    setMins(25);
    setSecs(0);
    timin.current.textContent = "Session";
    setPause(false);
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
    if (pause) {
      const timer = setTimeout(() => {
        if (secs === 0) {
          setSecs(59);
          setMins(mins - 1);
        } else {
          setSecs(secs - 1);
        }
      }, 1000);
      setTimerID(timer);
    } else {
      clearTimeout(timerID);
      setTimerID(null);
    }
    if (mins <= 0 && secs <= 0) {
      audio.current.play();
      if (timing) {
        timin.current.textContent = "break";
        setMins(breakMins);
        setSecs((breakMins * 60) % 60);
        setTiming(!timing);
      } else {
        timin.current.textContent = "Session";
        setMins(initialMins);
        setSecs((initialMins * 60) % 60);
        setTiming(!timing);
      }
    }
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
        src="https://cdn.freecodecamp.org/testable-projects-fcc/audio/BeepSound.wav"
        ref={audio}
      ></audio>
      <button id="start_stop" onClick={() => setPause(!pause)}>
        Pause/Play
      </button>
      <button id="reset" onClick={reset}>
        {" "}
        Reset
      </button>
      <div id="timer-label" ref={timin}>
        Session
      </div>
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
