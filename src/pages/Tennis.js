import React, { useEffect, useRef } from "react";
import { Tennis } from "../games/TennisTypes";
import setClassNameToCurrent from "../classToCurr";

const TennisGame = () => {
  setClassNameToCurrent();

  const canvasRef = useRef(HTMLCanvasElement);

  useEffect(() => {
    if (canvasRef.current) {
      const context = canvasRef.current.getContext("2d");
      if (context) {
        const tennis = new Tennis(context);
        tennis.start();
      }
    }
  }, [canvasRef]);

  return (
    <div className="tennis-div">
      <h2>Tennis game</h2>
      <canvas ref={canvasRef} width={400} height={400} />
    </div>
  );
};
export default TennisGame;
