import WordRow from "../WordRow/WordRow";
import styles from "./GuessOutputs.module.css";

const GuessOutputs = ({ guesses, focusRow }) => {
  return (
    <div className={styles.wordRows}>
      {guesses.map((guess, index) => (
        <WordRow guess={guess} key={index} isFocus={focusRow === index} />
      ))}
    </div>
  );
};

export default GuessOutputs;
