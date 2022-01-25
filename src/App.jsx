import { useState } from "react";
import "./App.css";

function App() {
  const [word, setWord] = useState("sugar");
  const [guessedWords, setGuessedWords] = useState([
    ["A", "C", "W", "Q", "E"],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
  ]);

  //

  return (
    <div className="wrapper">
      {guessedWords.map((guessedWord) => {
        console.log(guessedWord);
        return (
          <div className="word">
            {guessedWord.map((letter) => {
              return <div className="letter">{letter}</div>;
            })}
          </div>
        );
      })}
    </div>
  );
}

export default App;
