import React, { useEffect, useRef, useState } from "react";
import { Hangman } from "../games/HangmanClass.js";

const HangmanGame = () => {
  const ref = useRef(HTMLCanvasElement);

  const [word, setWord] = useState("");
  const [definition, setDefinition] = useState("");

  const randomWordAPI = "https://api.api-ninjas.com/v1/randomword";
  const wordDefinitionAPI = "https://api.dictionaryapi.dev/api/v2/entries/en/";

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
        //console.log("word=", word, " do while flag=", flag, "counter =", count);
        if (count > 300) {
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
          const hangman = new Hangman(context, word, definition);
          console.log(hangman);
          document.getElementById("service_2").innerHTML = "";
          hangman.start();
        }
      }
    }
  }, [definition]);

  return (
    <div id="hangman">
      <h2>Hangman game</h2>
      {/* <p style={{ width: "400px" }} id="service_1"></p> */}
      <p style={{ width: "400px" }} id="service_2">
        Searching for a word...
      </p>
      <p style={{ width: "400px" }} id="service_3"></p>
      <p style={{ width: "400px" }} id="service_4"></p>
      <canvas ref={ref} width={400} height={400} />
    </div>
  );
};

export default HangmanGame;
