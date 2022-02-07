import classNames from "classnames";
import styles from "./LetterOutput.module.css";

const matchClasses = [styles.noMatch, styles.inWord, styles.inPlace];

const LetterOutput = ({ children: letter, match, index }) => {
  return (
    <div
      className={classNames(styles.letter, matchClasses[match])}
      style={{ "--index": index || 0 }}
    >
      {letter}
    </div>
  );
};

export default LetterOutput;
