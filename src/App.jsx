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
      return { ...newState }; // Ensure to spread the newState
    case "RESET":
      // Reducer logic for resetting
      // ...
      return { ...newState };
    case "BREAK_DECREMENT":
      // Reducer logic for break decrement
      // ...
      return { ...newState };
    case "DECREMENT":
      // Reducer logic for decrement
      // ...
      return { ...newState };
    case "BREAK_INCREMENT":
      // Reducer logic for break increment
      // ...
      return { ...newState };
    case "CHANGE_TIME":
      // Reducer logic for changing time
      // ...
      return { ...newState };
    default:
      return state;
  }
};

// ... (previous code)

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
