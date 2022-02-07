import styles from "./Key.module.css";

const Key = ({ children: value, onClick }) => {
  const handleOnClick = (event) => {
    onClick && onClick(value);
  };

  return (
    <button className={styles.key} onClick={handleOnClick}>
      {value}
    </button>
  );
};

export default Key;
