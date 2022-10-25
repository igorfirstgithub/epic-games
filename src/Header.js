import React from "react";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <div className="game-links-all">
      <Link to="/" className="game-link">
        <h3>Home </h3>
      </Link>
      <Link to="/hangman" className="game-link">
        <h3>Hangman </h3>
      </Link>
      <Link to="/snake" className="game-link">
        <h3>Snake </h3>
      </Link>
      <Link to="/tennis" className="game-link">
        <h3>Tennis </h3>
      </Link>
    </div>
  );
}
