import React, { useEffect, useRef } from "react";
import { Hangman } from "../games/HangmanClass.js";

const HangmanGame = () => {
  const ref = useRef(HTMLCanvasElement);

  const [word, setWord] = React.useState("");
  const [definition, setDefinition] = React.useState("");

  // useEffect(() => {
  //   if (ref.current) {
  //     const context = ref.current.getContext("2d");
  //     if (context) {
  //       const hangman = new Hangman(context);
  //       console.log(hangman);
  //       hangman.start();
  //     }
  //   }
  // }, [ref]);

  const randomWordAPI = "https://api.api-ninjas.com/v1/randomword";
  const wordDefinitionAPI = "https://api.dictionaryapi.dev/api/v2/entries/en/";

  useEffect(() => {
    let flag = false;

    async function opsWithWord(data) {
      setWord(data.word);
      console.log("useEffect " + data.word);
      flag = true;
      return data.word;
    }

    async function opsWithDefinition(data) {
      if (data[0].meanings[0].definitions[0].definition) {
        setDefinition(data[0].meanings[0].definitions[0].definition);
      } else {
        setDefinition("No definition");
      }
    }

    const getWordandDefinition = async () => {
      if (!definition) {
        try {
          const res = await fetch(randomWordAPI);
          const data = await res.json();
          const randomWord = await opsWithWord(data);
          const definitionPhrase = await fetch(wordDefinitionAPI + randomWord);
          const data2 = await definitionPhrase.json();
          await opsWithDefinition(data2);
        } catch (err) {
          console.error(err);
          setDefinition("No definition");
        }
      }
    };
    do {
      getWordandDefinition();
      console.log("word=", word, "  flag=", flag);
    } while (false);
  }, []);

  /*useEffect(() => {
    if (!definition) {
      fetch(randomWordAPI)
        .then((res) => res.json())
        .then((data) => {
          setWord(data.word);
          console.log("useEffect " + data.word);
          return data.word;
        })
        .then((randomWord) => fetch(wordDefinitionAPI + randomWord))
        .then((res) => res.json())
        .then((data) => {
          if (data[0].meanings[0].definitions[0].definition) {
            setDefinition(data[0].meanings[0].definitions[0].definition);
          } else {
            setDefinition("No definition else");
          }
        })
        .catch((err) => {
          console.error(err);
          setDefinition("No Responce");
        });
    }
  }, []);*/

  useEffect(() => {
    if (definition) {
      //console.log(word, " = ", definition);
      if (ref.current) {
        const context = ref.current.getContext("2d");
        if (context) {
          const hangman = new Hangman(context, word, definition);
          console.log(hangman);
          hangman.start();
        }
      }
    }
  }, [definition]);

  return (
    <div id="hangman">
      <h2>Hangman game</h2>
      {/* <p style={{ width: "400px" }} id="service_1"></p> */}
      <p style={{ width: "400px" }} id="service_2"></p>
      <p style={{ width: "400px" }} id="service_3"></p>
      <p style={{ width: "400px" }} id="service_4"></p>
      <canvas ref={ref} width={400} height={400} />
    </div>
  );
};

export default HangmanGame;

//Initial simple version

// import React from "react";

// export default function Hangman() {
//   return (
//     <div>
//       <h2>Hangman</h2>
//     </div>
//   );
// }
