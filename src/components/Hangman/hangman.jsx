import {useState, useEffect} from "react";
import Word from "../Word";
import Keyboard from "../Keyboard";
import { words } from "../../constants/words";
import { letters } from "../../constants/letters";
import { stages } from "../../constants/stages";
import styles from "./hangman.module.css";

function Hangman() {
    const [selectedWord, setSelectedWord] = useState("");
    const [guessedLetters, setGuessedLetters] = useState([]);
    const [wrongCount, setWrongCount] = useState(0);
    const [gameStatus, setGameStatus] = useState("playing");

    const maxWrong = stages.length;

    function getRandomWord() {
        const randomIndex = Math.floor(Math.random() * words.length);
        return words[randomIndex].toUpperCase();
    }

    function resetGame() {
        const newWord = getRandomWord();
        setSelectedWord(newWord);
        setGuessedLetters([]);
        setWrongCount(0);
        setGameStatus("playing");
    }

    useEffect(() => {
        resetGame();
      }, []);

    function handleGuess(letter) {
        if (gameStatus !== "playing") return;
        if (guessedLetters.includes(letter)) return;

        const updatedLetters = [...guessedLetters, letter];
        setGuessedLetters(updatedLetters);

        if (selectedWord.includes(letter)) {
            const isWinner = selectedWord.split("").every((char) => updatedLetters.includes(char));
            if (isWinner) {
                setGameStatus("won");
            }
        } else {
            const newWrongCount = wrongCount + 1;
            setWrongCount(newWrongCount);
            if (newWrongCount >= maxWrong) {
                setGameStatus("lost");
            }
        }
    } 
    
    return (
        <div className={styles.container}>
            {gameStatus === "won" && <h1 className={styles.win}>YOU WON</h1>}
            {gameStatus === "lost" && <h1 className={styles.lose}>YOU LOST</h1>}

            <div className={styles.stage}>
                <img src={stages[wrongCount]} alt="hangman stage" />
            </div>

            <Word
                selectedWord={selectedWord}
                guessedLetters={guessedLetters}
                gameStatus={gameStatus}
            />

            {gameStatus === "playing" && (
                <Keyboard
                    letters={letters}
                    guessedLetters={guessedLetters}
                    selectedWord={selectedWord}
                    onGuess={handleGuess}
                />
            )}

            {gameStatus !== "playing" && (
                <button className={styles.retryButton} onClick={resetGame}>
                    TRY AGAIN
                </button>
            )}
        </div>
    );
}

export default Hangman;