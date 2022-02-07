import classNames from "classnames";
import { useContext } from "react";
import { keyboardContext } from "../Keyboard/Keyboard";
import styles from "./Key.module.css";

const keyHighlights = [styles.notInWord, styles.inWord, styles.inPlace];

const Key = ({ children: value, onClick: onClickOverride }) => {
  const { onClick, highlights } = useContext(keyboardContext);
  const handleOnClick = () => {
    if (onClickOverride) {
      onClickOverride(value);
    } else if (onClick) {
      onClick(value);
    }
  };

  return (
    <button
      className={classNames(
        styles.key,
        highlights[value] !== null && keyHighlights[highlights[value]]
      )}
      onClick={handleOnClick}
    >
      {value}
    </button>
  );
};

export default Key;
