import { useCallback, useEffect, useReducer } from "react";
import GuessOutputs from "./components/GuessOutputs/GuessOutputs";
import Keyboard from "./components/Keyboard/Keyboard";
import {
  arrayOfVal,
  arrayOfObj,
  isAlphabeticalChar,
  randomChoice,
  backspaceString,
  matchString,
} from "./utils";
import guessWords from "./words/guessWords.bak";
import dictWords from "./words/dictionaryWords.bak";

import styles from "./App.module.css";

const WORDLENGTH = 5;
const GUESSLIMIT = 6;

// Returns a new default state object
const getDefaultState = () => ({
  word: "",
  input: "",
  guessCount: 0,
  canGuess: true,
  error: "",
  guesses: arrayOfObj(
    {
      word: " ".repeat(WORDLENGTH),
      match: arrayOfVal(0, WORDLENGTH),
    },
    GUESSLIMIT
  ),
  letterState: {},
});

const processLetterMatch = (letterState, input, match) => {
  // Find the match level of each letter based on previous matches
  let newLetterState = { ...letterState };
  match.forEach((matchLevel, index) => {
    let currentLevel = newLetterState[input[index]] || 0;
    // Set current match level to highest out of matches
    newLetterState[input[index]] = Math.max(matchLevel, currentLevel);
  });
  return newLetterState;
};

const setWord = (state, word) => {
  return { ...state, word: word.toUpperCase() };
};

const submitGuess = (state) => {
  if (!state.canGuess) {
    return { ...state, error: "You can no longer submit a guess." };
  }
  if (state.input.length !== WORDLENGTH) {
    return { ...state, error: "Please fill all blank spaces." };
  }
  if (!dictWords.includes(state.input)) {
    return { ...state, error: "Not a valid word." };
  }

  let guesses = [...state.guesses];
  let { result: matchResult, isMatch } = matchString(state.input, state.word);
  guesses[state.guessCount].match = matchResult;

  return {
    ...state,
    guesses: guesses,
    input: "",
    error: "",
    guessCount: Math.min(state.guessCount + (isMatch ? 0 : 1), GUESSLIMIT - 1),
    canGuess: state.guessCount < GUESSLIMIT - 1 && !isMatch,
    letterState: processLetterMatch(
      state.letterState,
      state.input,
      matchResult
    ),
  };
};

const pushInput = (state, input) => {
  if (!state.canGuess) return state;
  if (!isAlphabeticalChar(input)) return state;
  if (state.input.length === WORDLENGTH) return state;

  let newInput = state.input + input.toUpperCase();
  let guesses = [...state.guesses];
  guesses[state.guessCount].word = newInput;

  return { ...state, input: newInput, guesses: guesses };
};

const backspace = (state) => {
  let newInput = backspaceString(state.input);
  let guesses = [...state.guesses];
  guesses[state.guessCount].word = newInput;
  return { ...state, input: newInput, guesses: guesses };
};

const dumpState = (state) => {
  // Save the gameState into localstorage as a JSON string
  const stateJson = JSON.stringify(state);
  localStorage.setItem("gameState", stateJson);
};

const loadJsonState = (jsonState) => {
  return JSON.parse(jsonState);
};

const reducer = (state, action) => {
  switch (action.type) {
    case "setWord": {
      return setWord(state, action.word);
    }
    case "setRandomWord": {
      return setWord(state, randomChoice(guessWords));
    }
    case "submitGuess": {
      return submitGuess(state);
    }
    case "pushInput": {
      return pushInput(state, action.input);
    }
    case "backspace": {
      return backspace(state);
    }
    case "dumpState": {
      dumpState(state);
      return state;
    }
    case "resetGame": {
      let newState = getDefaultState();
      newState.word = randomChoice(guessWords);
      dumpState(newState);
      return newState;
    }
    case "loadJsonState": {
      return loadJsonState(action.jsonState);
    }
    default: {
      throw new Error();
    }
  }
};

const App = () => {
  const [gameState, dispatch] = useReducer(reducer, getDefaultState());

  useEffect(() => {
    let savedState = localStorage.getItem("gameState");
    if (savedState) {
      // Load saved game
      dispatch({ type: "loadJsonState", jsonState: savedState });
    } else {
      // New word
      dispatch({ type: "setRandomWord" });
    }
  }, []);

  // Log word for debug
  const { word } = gameState;
  useEffect(() => {
    console.log(word);
  }, [word]);

  const handleKeyPress = useCallback(
    (key) => {
      dispatch({ type: "pushInput", input: key });
    },
    [dispatch]
  );

  const handleOnSubmit = () => {
    dispatch({ type: "submitGuess" });
    dispatch({ type: "dumpState" });
  };

  const handleOnBackspace = () => {
    dispatch({ type: "backspace" });
  };

  const handleResetOnClick = () => {
    dispatch({ type: "resetGame" });
  };

  return (
    <>
      <GuessOutputs
        guesses={gameState.guesses}
        focusRow={gameState.guessCount}
      />
      <button className={styles.resetButton} onClick={handleResetOnClick}>
        Reset
      </button>
      <div className={styles.error}>{gameState.error}</div>
      <Keyboard
        onKeyPress={handleKeyPress}
        onSubmit={handleOnSubmit}
        onBackspace={handleOnBackspace}
        highlights={gameState.letterState}
      />
    </>
  );
};

export default App;
