import styles from "./keyboard.module.css";

function Keyboard({letters, guessedLetters, selectedWord, onGuess}) {
    return (
        <div className={styles.keyboard}>
            {letters.map((letter) => {
                const alreadyGuessed = guessedLetters.includes(letter);
                const isCorrect = selectedWord.includes(letter);

                let className = styles.button;

                if (alreadyGuessed && isCorrect) {
                    className = `${styles.button} ${styles.correct}`;
                }

                if (alreadyGuessed && !isCorrect) {
                    className = `${styles.button} ${styles.wrong}`;
                }

                return (
                    <button key = {letter} className = {className} onClick = {() => onGuess(letter)} disabled = {alreadyGuessed}>
                        {letter}
                    </button>
                )
            })}
        </div>
    );
}

export default Keyboard;