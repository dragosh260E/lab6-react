import styles from "./word.module.css";

function Word({ selectedWord, guessedLetters, gameStatus }) {
  return (
    <div className={styles.word}>
      {selectedWord.split("").map((letter, index) => {
        const showLetter =
          guessedLetters.includes(letter) || gameStatus === "lost";

        return (
          <span key={index} className={styles.letter}>
            {showLetter ? letter : "_"}
          </span>
        );
      })}
    </div>
  );
}

export default Word;