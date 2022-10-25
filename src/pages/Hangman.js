import React, { useEffect, useRef, useState } from "react";
import { Hangman } from "../games/HangmanClass.js";

const HangmanGame = () => {
  const ref = useRef(HTMLCanvasElement);

  const [word, setWord] = useState("");
  const [definition, setDefinition] = useState("");
  const [hangman, setHangman] = useState(null);
  const [screenText, setScreenText] = useState({
    serv1: "",
    serv2: "Searching for a word...",
    serv3: "",
    serv4: "",
  });

  const randomWordAPI = "https://api.api-ninjas.com/v1/randomword";
  const wordDefinitionAPI = "https://api.dictionaryapi.dev/api/v2/entries/en/";

  function handleKeyStrokes() {
    console.log("Number of tries from page = ", hangman.numberOfTries);
    setScreenText({
      serv1: hangman.service1,
      serv2: hangman.service2,
      serv3: hangman.service3,
      serv4: hangman.service4,
    });
  }

  useEffect(() => {
    let flag = false;

    // This function does nothing to await for, therefore it does not need async
    // i.e. it is completely synchronous
    function opsWithWord(data) {
      setWord(data.word);
      return data.word;
    }

    // This function does nothing to await for, therefore it does not need async
    // i.e. it is completely synchronous
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
        const randomWord = opsWithWord(data); //sync func
        const definitionPhrase = await fetch(wordDefinitionAPI + randomWord);
        const data2 = await definitionPhrase.json();
        opsWithDefinition(data2); //sync func
      } catch (err) {
        console.error(err);
      }
    };

    const doWhile = async () => {
      let count = 0;
      do {
        count++;
        await getWordandDefinition(); // we are waiting for results of this func
        if (count > 50) {
          break;
        }
      } while (!flag);
    };

    doWhile();
  }, []);

  useEffect(() => {
    if (definition) {
      if (ref.current) {
        const context = ref.current.getContext("2d");
        if (context) {
          setHangman(new Hangman(context, word, definition));
          setScreenText((prevText) => ({ ...prevText, serv2: "" }));
        }
      }
    }
  }, [definition]);

  useEffect(() => {
    if (hangman) {
      hangman.start();
      window.addEventListener("keydown", handleKeyStrokes);
      setScreenText({
        serv1: hangman.service1,
        serv2: hangman.service2,
        serv3: hangman.service3,
        serv4: hangman.service4,
      });
    }
    return () => window.removeEventListener("keydown", handleKeyStrokes);
  }, [hangman]);

  return (
    <div className="hangman-div">
      <h2>Hangman game</h2>
      {hangman && <p className="hangman-messages">{screenText.serv1}</p>}

      <p width={400} className="hangman-messages">
        {screenText.serv2}
      </p>

      {/* {hangman && <p className="hangman-messages">{screenText.serv3}</p>}
      {hangman && <p className="hangman-messages">{screenText.serv4}</p>} */}

      {hangman && (
        <>
          <p className="hangman-messages">{screenText.serv3}</p>
          <p className="hangman-messages">{screenText.serv4}</p>
        </>
      )}
      <canvas className="hangman-canvas" ref={ref} width={200} height={200} />
    </div>
  );
};

export default HangmanGame;
