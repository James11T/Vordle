import { useCallback, useEffect, createContext } from "react";
import Key from "../Key/Key";
import styles from "./Keyboard.module.css";

const keyboardContext = createContext();

const Keyboard = ({ onKeyPress, onSubmit, onBackspace, highlights }) => {
  const handleBackspace = useCallback(() => {
    onBackspace && onBackspace();
  }, [onBackspace]);

  const handleSubmit = useCallback(() => {
    onSubmit && onSubmit();
  }, [onSubmit]);

  const handleKeyDown = useCallback(
    (event) => {
      const key = event.key.toUpperCase();
      if (key === "BACKSPACE") handleBackspace();
      if (key === "ENTER") handleSubmit();
      onKeyPress(key);
    },
    [onKeyPress, handleBackspace, handleSubmit]
  );

  const handleKeyClick = (key) => {
    onKeyPress(key.toUpperCase());
  };

  useEffect(() => {
    document.body.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  return (
    <keyboardContext.Provider
      value={{ onClick: handleKeyClick, highlights: highlights }}
    >
      <div className={styles.keyboard}>
        <div className={styles.keyboardRow}>
          <Key>Q</Key>
          <Key>W</Key>
          <Key>E</Key>
          <Key>R</Key>
          <Key>T</Key>
          <Key>Y</Key>
          <Key>U</Key>
          <Key>I</Key>
          <Key>O</Key>
          <Key>P</Key>
        </div>
        <div className={styles.keyboardRow}>
          <Key>A</Key>
          <Key>S</Key>
          <Key>D</Key>
          <Key>F</Key>
          <Key>G</Key>
          <Key>H</Key>
          <Key>J</Key>
          <Key>K</Key>
          <Key>L</Key>
        </div>
        <div className={styles.keyboardRow}>
          <Key onClick={handleSubmit}>Enter</Key>
          <Key>Z</Key>
          <Key>X</Key>
          <Key>C</Key>
          <Key>V</Key>
          <Key>B</Key>
          <Key>N</Key>
          <Key>M</Key>
          <Key onClick={handleBackspace}>⌫</Key>
        </div>
      </div>
    </keyboardContext.Provider>
  );
};

export default Keyboard;
export { keyboardContext };
