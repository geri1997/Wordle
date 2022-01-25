import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [word, setWord] = useState("sugar");
  const [guessedWords, setGuessedWords] = useState([
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
  ]);

  useEffect(() => {
    function keypressHandler(e) {
      let wordsCopy = JSON.parse(JSON.stringify(guessedWords));
      let wordIndex = 0;

      for (let arr of wordsCopy) {
        if (!wordsCopy[wordIndex].includes("")) {
          if (wordIndex < 5) wordIndex += 1;
        }
      }
      if (
        e.key === "Backspace" &&
        wordsCopy[wordIndex][0] === "" &&
        wordIndex !== 0
      ) {
        wordIndex -= 1;
      }

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
      }

      setGuessedWords(wordsCopy);
    }
    window.addEventListener("keydown", keypressHandler);

    return () => window.removeEventListener("keydown", keypressHandler);
  }, [guessedWords]);

  return (
    <div className="wrapper">
      {guessedWords.map((guessedWord, i) => {
        return (
          <div key={`word${i}`} className="word">
            {guessedWord.map((letter, ii) => {
              return (
                <div key={`word${i} letter${ii}`} className="letter">
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
