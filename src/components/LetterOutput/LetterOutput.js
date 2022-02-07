import classNames from "classnames";
import styles from "./LetterOutput.module.css";

const matchClasses = [styles.noMatch, styles.inWord, styles.inPlace];

const LetterOutput = ({ children: letter, match = 0 }) => {
  return (
    <div
      className={classNames(
        styles.letter,
        !!letter && styles.hasContent,
        matchClasses[match]
      )}
    >
      {letter}
    </div>
  );
};

export default LetterOutput;
