import { useCallback, useEffect } from "react";
import Key from "../Key/Key";
import styles from "./Keyboard.module.css";

const Keyboard = ({ onKeyPress, onSubmit, onBackspace }) => {
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
    <div className={styles.keyboard}>
      <div className={styles.keyboardRow}>
        <Key onClick={handleKeyClick}>Q</Key>
        <Key onClick={handleKeyClick}>W</Key>
        <Key onClick={handleKeyClick}>E</Key>
        <Key onClick={handleKeyClick}>R</Key>
        <Key onClick={handleKeyClick}>T</Key>
        <Key onClick={handleKeyClick}>Y</Key>
        <Key onClick={handleKeyClick}>U</Key>
        <Key onClick={handleKeyClick}>I</Key>
        <Key onClick={handleKeyClick}>O</Key>
        <Key onClick={handleKeyClick}>P</Key>
      </div>
      <div className={styles.keyboardRow}>
        <Key onClick={handleKeyClick}>A</Key>
        <Key onClick={handleKeyClick}>S</Key>
        <Key onClick={handleKeyClick}>D</Key>
        <Key onClick={handleKeyClick}>F</Key>
        <Key onClick={handleKeyClick}>G</Key>
        <Key onClick={handleKeyClick}>H</Key>
        <Key onClick={handleKeyClick}>J</Key>
        <Key onClick={handleKeyClick}>K</Key>
        <Key onClick={handleKeyClick}>L</Key>
      </div>
      <div className={styles.keyboardRow}>
        <Key onClick={handleSubmit}>Enter</Key>
        <Key onClick={handleKeyClick}>Z</Key>
        <Key onClick={handleKeyClick}>X</Key>
        <Key onClick={handleKeyClick}>C</Key>
        <Key onClick={handleKeyClick}>V</Key>
        <Key onClick={handleKeyClick}>B</Key>
        <Key onClick={handleKeyClick}>N</Key>
        <Key onClick={handleKeyClick}>M</Key>
        <Key onClick={handleBackspace}>⌫</Key>
      </div>
    </div>
  );
};

export default Keyboard;
