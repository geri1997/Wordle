import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [word, setWord] = useState("sugar");
  const [wordIndex, setWordIndex] = useState(0);
  const [guessedWords, setGuessedWords] = useState([
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
  ]);

  function checkIfWon() {
    if (
      wordIndex > 0 &&
      word[0] === guessedWords[wordIndex - 1][0] &&
      word[1] === guessedWords[wordIndex - 1][1] &&
      word[2] === guessedWords[wordIndex - 1][2] &&
      word[3] === guessedWords[wordIndex - 1][3] &&
      word[4] === guessedWords[wordIndex - 1][4]
    ) {
      return true;
    }

    return false;
  }

  useEffect(() => {
    function keypressHandler(e) {
      let wordsCopy = JSON.parse(JSON.stringify(guessedWords));

      if (e.key === "Backspace" && wordsCopy[wordIndex][0] !== "") {
        let indexOfEmpty = wordsCopy[wordIndex].findIndex(
          (letter) => letter === ""
        );
        if (indexOfEmpty !== -1) {
          wordsCopy[wordIndex][indexOfEmpty - 1] = "";
        } else {
          wordsCopy[wordIndex][4] = "";
        }
      } else if (
        /[a-z]/.test(e.key) &&
        e.key.length === 1 &&
        wordsCopy[wordIndex].findIndex((letter) => letter === "") !== -1
      ) {
        wordsCopy[wordIndex][
          wordsCopy[wordIndex].findIndex((letter) => letter === "")
        ] = e.key;
      } else if (
        e.key === "Enter" &&
        wordsCopy[wordIndex].findIndex((letter) => letter === "") === -1
      ) {
        setWordIndex((prevIndex) => prevIndex + 1);
      }

      setGuessedWords(wordsCopy);
    }
    window.addEventListener("keydown", keypressHandler);

    return () => window.removeEventListener("keydown", keypressHandler);
  }, [guessedWords]);

  return (
    <div className="wrapper">
      {checkIfWon() && <h2>You Win</h2>}
      {guessedWords.map((guessedWord, i) => {
        return (
          <div key={`word${i}`} className="word">
            {guessedWord.map((letter, ii) => {
              return (
                <div
                  key={`word${i} letter${ii}`}
                  className={`letter ${
                    wordIndex > i && word.split("").indexOf(letter) === ii
                      ? "exact"
                      : wordIndex > i && word.split("").includes(letter)
                      ? "incld"
                      : ""
                  }`}
                >
                  {letter}
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}

export default App;
