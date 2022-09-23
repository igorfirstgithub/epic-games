import React, { useEffect } from "react";
import SG from "./snake-func";

export default function Snake() {
  useEffect(() => {
    // const script = document.createElement("script");

    // script.src = "../src/games/snake-func.js";
    // script.async = true;

    // document.body.appendChild(script);

    //const canvas = document.getElementById("canvas2");

    //if (canvas) {
    console.log("Privet");
    SG();
    //}

    // return () => {
    //   document.body.removeChild(script);
    // };
  }, []);

  return (
    <div id="canvas2">
      <h2>Snake game</h2>

      <canvas id="canvas" width={400} height={400}></canvas>

      {/* <script src="./snake-func.js"> </script> */}
    </div>
  );
}

// import React from "react";
// import Snake_func from "./snake-func";

// export default function Snake() {
//   return (
//     <div>
//       <h2>Snake</h2>
//       <body>
//         <script src="./snake-func"></script>
//       </body>
//     </div>
//   );
// }
