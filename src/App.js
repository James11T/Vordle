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
import words from "./words";

import styles from "./App.module.css";

const WORDLENGTH = 5;
const GUESSLIMIT = 6;

const defaultState = {
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
};

const setWord = (state, word) => {
  console.log(word);
  return { ...state, word: word.toUpperCase() };
};

const submitGuess = (state) => {
  if (!state.canGuess) {
    return { ...state, error: "You can no longer submit a guess." };
  }
  if (state.input.length !== WORDLENGTH) {
    return { ...state, error: "Please fill all blank spaces." };
  }
  if (!words.includes(state.input)) {
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
    guessCount: Math.min(state.guessCount + (isMatch ? 0 : 1), 5),
    canGuess: state.guessCount < 5 && !isMatch,
  };
};

const pushInput = (state, input) => {
  if (!isAlphabeticalChar(input)) return state;
  if (state.input.length === 5) return state;
  if (!state.canGuess) return state;

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

const reducer = (state, action) => {
  switch (action.type) {
    case "setWord": {
      return setWord(state, action.word);
    }
    case "setRandomWord": {
      return setWord(state, randomChoice(words));
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
    default: {
      throw new Error();
    }
  }
};

const App = () => {
  const [gameState, dispatch] = useReducer(reducer, defaultState);

  useEffect(() => {
    dispatch({ type: "setRandomWord" });
  }, []);

  const handleKeyPress = useCallback(
    (key) => {
      dispatch({ type: "pushInput", input: key });
    },
    [dispatch]
  );

  const handleOnSubmit = () => {
    dispatch({ type: "submitGuess" });
  };

  const handleOnBackspace = () => {
    dispatch({ type: "backspace" });
  };

  return (
    <>
      <GuessOutputs
        guesses={gameState.guesses}
        focusRow={gameState.guessCount}
      />
      <div className={styles.error}>{gameState.error}</div>
      <Keyboard
        onKeyPress={handleKeyPress}
        onSubmit={handleOnSubmit}
        onBackspace={handleOnBackspace}
      />
    </>
  );
};

export default App;
