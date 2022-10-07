import React, { useEffect, useRef } from "react";
import { Hangman } from "../games/HangmanClass.js";

const HangmanGame = () => {
  const ref = useRef(HTMLCanvasElement);

  useEffect(() => {
    if (ref.current) {
      const context = ref.current.getContext("2d");
      if (context) {
        const hangman = new Hangman(context);
        console.log(hangman);
        hangman.start();
      }
    }
  }, [ref]);

  return (
    <div id="hangman">
      <h2>Hangman game</h2>
      {/* <p style={{ width: "400px" }} id="service_1"></p> */}
      <p style={{ width: "400px" }} id="service_2"></p>
      <p style={{ width: "400px" }} id="service_3"></p>
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
