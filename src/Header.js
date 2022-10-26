import React from "react";
import { Link } from "react-router-dom";

export default function Header() {
  // document.getElementById("qqq").className += " current-link";
  //console.log(document.URL);

  return (
    <div className="game-links-all">
      <Link to="/" className="link current" id="/">
        <h3>Home </h3>
      </Link>
      <Link to="/hangman" className="link" id="/hangman">
        <h3>Hangman </h3>
      </Link>
      <Link to="/snake" className="link" id="/snake">
        <h3>Snake </h3>
      </Link>
      <Link to="/tennis" className="link" id="/tennis">
        <h3>Tennis </h3>
      </Link>
    </div>
  );
}

// document
//   .querySelectorAll('a[href="' + document.URL + '"]')
//   .forEach(function (elem) {
//     elem.className += " current-link";
//   });
