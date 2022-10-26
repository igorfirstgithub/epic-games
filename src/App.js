import React from "react";
import { Route, Routes } from "react-router-dom";

import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import Hangman from "./pages/Hangman";
import SnakeGame from "./pages/Snake";
import Tennis from "./pages/Tennis";

function App() {
  //let links = document.getElementsByClassName("game-link");
  //  console.log(Array.prototype.slice.call(links)[0].id);
  //let arrayOfLinks = Array.prototype.slice.call(links);
  // let targetElementId = arrayOfLinks.filter((el) =>
  //   document.URL.toString().endsWith(el.id)
  // );
  //console.log(document.URL.toString());
  //console.log(targetElementId);
  //document.getElementById()

  const allLinks = document.getElementsByClassName("link");

  for (const link of allLinks) {
    if (document.URL.toString().endsWith(link.id)) {
      link.className = "link current";
    } else {
      link.className = "link";
    }
  }

  return (
    <div>
      <Header />
      <hr />
      <Routes>
        <Route exact path="/" element={<Main />} />
        <Route path="/hangman" element={<Hangman />} />
        <Route path="/snake" element={<SnakeGame />} />
        <Route path="/tennis" element={<Tennis />} />
      </Routes>
      {/* <hr /> */}
      <Footer />
    </div>
  );
}

export default App;
