//--------- initial simple version -----------
import React from "react";

export default function Tennis() {
  return (
    <div>
      <h2>Tennis</h2>
    </div>
  );
}

/* import React, { useEffect, useRef, useState } from "react";
import { Tennis } from "../games/TennisTypes.js";

const TennisGame = () => {
  const ref = useRef(HTMLCanvasElement);
  const [tennis, setTennis] = useState();
  const [isGameRunning, setIsGameRunning] = useState(false);

  useEffect(() => {
    if (ref.current) {
      const context = ref.current.getContext("2d");
      if (context) {
        console.log(tennis);
        setTennis(new Tennis(context));
      }
    }
  }, [ref]);

  useEffect(() => {
    if (tennis) {
      tennis.start();
      tennis.pause();
    }
  }, [tennis]);

  function startNewGame() {
    if (tennis.isGameOver) {
      tennis.restart();
      console.log(tennis.timeoutID);
    } else if (tennis.pauseGame && !isGameRunning) {
      console.log(tennis.timeoutID);
      tennis.pause();
      setIsGameRunning(true);
    }
  }

  function pauseGame() {
    if (isGameRunning && !tennis.isGameOver) tennis.pause();
  }

  return (
    <div>
      <h3>Tennis game</h3>
      {<button onClick={startNewGame}>Start new game</button>}
      {isGameRunning && <button onClick={pauseGame}>Pause</button>}

      <canvas ref={ref} width={400} height={400} />
    </div>
  );
};

export default TennisGame; */
