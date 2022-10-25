import React, { useEffect, useRef, useState } from "react";
import { Snake } from "../games/SnakeTypes.js";

const SnakeGame = () => {
  const ref = useRef(HTMLCanvasElement);
  const [snake, setSnake] = useState();
  const [isGameRunning, setIsGameRunning] = useState(false);

  useEffect(() => {
    if (ref.current) {
      const context = ref.current.getContext("2d");
      if (context) {
        console.log(snake);
        setSnake(new Snake(context));
      }
    }
  }, [ref]);

  useEffect(() => {
    if (snake) {
      snake.start();
      snake.pause();
    }
  }, [snake]);

  function startNewGame() {
    if (snake.isGameOver) {
      snake.restart();
      console.log(snake.timeoutID);
    } else if (snake.pauseGame && !isGameRunning) {
      console.log(snake.timeoutID);
      snake.pause();
      setIsGameRunning(true);
    }
  }

  function pauseGame() {
    if (isGameRunning && !snake.isGameOver) snake.pause();
  }

  return (
    <div className="canvas-div">
      <h3 className="snake-title">Snake</h3>
      <button className="snake-start-game" onClick={startNewGame}>
        Start new game
      </button>
      {isGameRunning && (
        <button className="snake-pause-game" onClick={pauseGame}>
          Pause
        </button>
      )}
      <br />
      <div>
        <canvas className="snake-canvas" ref={ref} width={400} height={400} />
      </div>
    </div>
  );
};

export default SnakeGame;
