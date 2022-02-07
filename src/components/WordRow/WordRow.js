import classNames from "classnames";
import LetterOutput from "../LetterOutput/LetterOutput";
import styles from "./WordRow.module.css";

const WordRow = ({ guess, isFocus }) => {
  return (
    <div className={classNames(styles.wordRow, isFocus && styles.isFocus)}>
      {guess.match.map((matchResult, index) => (
        <LetterOutput key={index} match={matchResult} index={index}>
          {guess.word[index]}
        </LetterOutput>
      ))}
    </div>
  );
};

export default WordRow;
