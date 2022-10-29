import React from "react";
import setClassNameToCurrent from "./classToCurr";

export default function Main() {
  setClassNameToCurrent();

  return (
    <div className="main-div">
      <h2 className="main-text">Legendary games</h2>
    </div>
  );
}
