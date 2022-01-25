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
      if (e.key === "Backspace" &&wordsCopy[0]!=='') {
        let indexOfEmpty = wordsCopy[0].findIndex((letter) => letter === "");
        if(indexOfEmpty!==-1){wordsCopy[0][indexOfEmpty-1]=''}else{
          wordsCopy[0][4]=''
        }
      }else if(wordsCopy[0].findIndex((letter) => letter === "") !== -1) {
        wordsCopy[0][wordsCopy[0].findIndex((letter) => letter === "")] = e.key;
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
