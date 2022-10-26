import React, { useEffect, useRef } from "react";
import { Tennis } from "../games/TennisTypes";
import setClassNameToCurrent from "../classToCurr";

const TennisGame = () => {
  setClassNameToCurrent();

  const ref = useRef(HTMLCanvasElement);

  useEffect(() => {
    if (ref.current) {
      const context = ref.current.getContext("2d");
      if (context) {
        const tennis = new Tennis(context);
        tennis.start();
      }
    }
  }, [ref]);

  return (
    <div className="tennis-div">
      <h2>Tennis game</h2>
      <canvas ref={ref} width={400} height={400} />
    </div>
  );
};
export default TennisGame;
