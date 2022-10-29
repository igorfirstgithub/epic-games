import React, { useEffect, useRef, useState } from "react";
import { Hangman } from "../games/HangmanClass.js";
import setClassNameToCurrent from "../classToCurr";

const HangmanGame = () => {
  setClassNameToCurrent();

  const canvasRef = useRef(HTMLCanvasElement);

  const [word, setWord] = useState("");
  const [definition, setDefinition] = useState("");
  const [hangman, setHangman] = useState(null);
  const [screenText, setScreenText] = useState({
    serviceText1_AnswerArray: "",
    serviceText2: "Searching for a word...",
    serviceText3: "",
    serviceText4_Definition: "",
  });

  const randomWordAPI = "https://api.api-ninjas.com/v1/randomword";
  const wordDefinitionAPI = "https://api.dictionaryapi.dev/api/v2/entries/en/";

  function handleKeyStrokes() {
    //console.log("Number of tries from page = ", hangman.numberOfTries);
    setScreenText({
      serviceText1_AnswerArray: hangman.serviceText1_AnswerArray,
      serviceText2: hangman.serviceText2,
      serviceText3: hangman.serviceText3,
      serviceText4_Definition: hangman.serviceText4_Definition,
    });
  }

  useEffect(() => {
    let flag = false;

    function opsWithWord(data) {
      setWord(data.word);
      return data.word;
    }

    function opsWithDefinition(data) {
      if (data[0].meanings[0].definitions[0].definition) {
        setDefinition(data[0].meanings[0].definitions[0].definition);
        flag = true;
      }
    }

    const getWordandDefinition = async () => {
      try {
        const res = await fetch(randomWordAPI);
        const data = await res.json();
        const randomWord = opsWithWord(data);
        const definitionPhrase = await fetch(wordDefinitionAPI + randomWord);
        const data2 = await definitionPhrase.json();
        opsWithDefinition(data2);
      } catch (err) {
        console.error(err);
      }
    };

    const getWordAndDefTogether = async () => {
      let count = 0;
      do {
        count++;
        await getWordandDefinition();
        if (count > 50) {
          break;
        }
      } while (!flag);
    };

    getWordAndDefTogether();
  }, []);

  useEffect(() => {
    if (definition) {
      if (canvasRef.current) {
        const context = canvasRef.current.getContext("2d");
        if (context) {
          setHangman(new Hangman(context, word, definition));
          setScreenText((prevText) => ({ ...prevText, serviceText2: "" }));
        }
      }
    }
  }, [definition]);

  useEffect(() => {
    if (hangman) {
      hangman.start();
      window.addEventListener("keydown", handleKeyStrokes);
      setScreenText({
        serviceText1_AnswerArray: hangman.serviceText1_AnswerArray,
        serviceText2: hangman.serviceText2,
        serviceText3: hangman.serviceText3,
        serviceText4_Definition: hangman.serviceText4_Definition,
      });
    }
    return () => window.removeEventListener("keydown", handleKeyStrokes);
  }, [hangman]);

  return (
    <div className="hangman-div">
      <h2>Hangman game</h2>
      {hangman && (
        <p className="hangman-messages">
          {screenText.serviceText1_AnswerArray}
        </p>
      )}

      <p width={400} className="hangman-messages">
        {screenText.serviceText2}
      </p>

      {hangman && (
        <>
          <p className="hangman-messages">{screenText.serviceText3}</p>
          <p className="hangman-messages">
            {screenText.serviceText4_Definition}
          </p>
        </>
      )}
      <canvas
        className="hangman-canvas"
        ref={canvasRef}
        width={200}
        height={200}
      />
    </div>
  );
};

export default HangmanGame;
