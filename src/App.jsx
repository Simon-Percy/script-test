import React, { useEffect, useRef, useReducer } from "react";
import "./App.css";

const initialState = {
  breakMins: 5,
  initialMins: 25,
  mins: 25,
  secs: 0,
  timing: true,
  pause: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "TOGGLE_TIMER":
      return { ...state, pause: !state.pause };
    case "HANDLE_TIMEOUT":
      // Reducer logic for handling timeouts
      // ...
      const newStateTimeout = { ...state }; // Initialize newState based on current state
      // Update newState properties as needed
      // ...
      return newStateTimeout;
    case "RESET":
      // Reducer logic for resetting
      // ...
      const newStateReset = { ...state }; // Initialize newState based on current state
      // Update newState properties as needed
      // ...
      return newStateReset;
    case "BREAK_DECREMENT":
      // Reducer logic for break decrement
      // ...
      const newStateBreakDecrement = { ...state }; // Initialize newState based on current state
      // Update newState properties as needed
      // ...
      return newStateBreakDecrement;
    case "DECREMENT":
      // Reducer logic for decrement
      // ...
      const newStateDecrement = { ...state }; // Initialize newState based on current state
      // Update newState properties as needed
      // ...
      return newStateDecrement;
    case "BREAK_INCREMENT":
      // Reducer logic for break increment
      // ...
      const newStateBreakIncrement = { ...state }; // Initialize newState based on current state
      // Update newState properties as needed
      // ...
      return newStateBreakIncrement;
    case "CHANGE_TIME":
      // Reducer logic for changing time
      // ...
      const newStateChangeTime = { ...state }; // Initialize newState based on current state
      // Update newState properties as needed
      // ...
      return newStateChangeTime;
    default:
      return state;
  }
};

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const audio = useRef();

  useEffect(() => {
    const timerTimeout = setTimeout(() => {
      dispatch({ type: "HANDLE_TIMEOUT" });
    }, 1000);

    return () => clearTimeout(timerTimeout);
  }, [state.secs, state.pause, state.mins]);

  const toggleTimer = () => {
    dispatch({ type: "TOGGLE_TIMER" });
  };

  const reset = () => {
    dispatch({ type: "RESET" });
  };

  const breakDecrement = () => {
    dispatch({ type: "BREAK_DECREMENT" });
  };

  const decrement = () => {
    dispatch({ type: "DECREMENT" });
  };

  const breakIncrement = () => {
    dispatch({ type: "BREAK_INCREMENT" });
  };

  const changeTime = () => {
    dispatch({ type: "CHANGE_TIME" });
  };

  return (
    <div id="container">
      {/* UI components */}
      <div id="break">
        <p id="break-label">Break Length</p>
        <div id="break-length">{state.breakMins}</div>
        <button id="break-increment" onClick={breakIncrement}>
          ⬆️
        </button>
        <button id="break-decrement" onClick={breakDecrement}>
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
      <div id="timer-label">{state.timing ? "session" : "break"}</div>
      <div id="time-left">
        {(state.mins + "0").length > 2 ? state.mins : "0" + state.mins}:
        {(state.secs + "0").length > 2 ? state.secs : "0" + state.secs}
      </div>
      <div id="session">
        <div id="session-label">Session Length</div>
        <div id="session-length">{state.initialMins}</div>
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
