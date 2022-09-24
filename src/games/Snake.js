import React, { useEffect } from "react";

export default function Snake() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "snake-func.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div>
      <h2>Snake game</h2>
      <canvas id="canvas" width={400} height={400} />
    </div>
  );
}

/*
// This works, you only need to wrap the script snake-func.js in an export default function SG() {}

import React, { useEffect } from "react";

import SG from "./snake-func";

export default function Snake() {
  useEffect(() => {
    console.log("Privet");
    SG();
  }, []);

  return (
    <div id="canvas2">
      <h2>Snake game</h2>
      <canvas id="canvas" width={400} height={400}></canvas>
    </div>
  );
}
*/
