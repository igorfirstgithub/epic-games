// New version without jQuery

export class Hangman {
  constructor(ctx) {
    this.key = null;
    this.words = ["yes", "monkey"]; //Array of words to guess
    this.ctx = ctx;

    this.ctx.lineWidth = 4;
    this.ctx.strokeStyle = "Green";

    this.wrongLetters = [];

    //Choose the word
    this.word = this.words[Math.floor(Math.random() * this.words.length)]; //

    //Set an array of answers
    this.guess = null;
    this.answerArray = [];

    // for (let i = 0; i < this.word.length; i++) {
    //   this.answerArray[i] = "_";
    // }

    this.remainingLetters = this.word.length;
    this.numberOfTries = 9;
    this.isGuessRight = false;

    this.keyListener = this.keyListener.bind(this);

    this.serv1 = null; // This is an experiment how to insert newly created dom-elements to certain nodes
  }

  initAnswerArray() {
    for (let i = 0; i < this.word.length; i++) {
      this.answerArray[i] = "_";
    }
  }

  start() {
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    console.log("Start");
    this.initAnswerArray();
    console.log(this.answerArray);

    // How to append elements
    let parent = document.getElementById("hangman");
    this.serv1 = document.createElement("p");
    this.serv1.id = "service_1";
    parent.insertBefore(this.serv1, parent.children[1]); // After h2([0]) but before serv2([1])

    //document.getElementById("service_1").innerHTML = "Service 1";
    document.body.addEventListener("keydown", this.keyListener);

    document.getElementById("service_1").innerHTML = this.answerArray.join(" ");
    document.getElementById("service_2").innerHTML =
      "RULES:\n" +
      "Try to open the word guessing letters from A to Z.\n" +
      "Read carefully the rules now, because there is no way back\n" +
      "as soon as you start. Do not press wrong letters and more than once already used letters\n" +
      "if you don't want to pay for this. Let the game begin. Press some letter key.";
  }

  keyListener(event) {
    console.log(this.answerArray);
    document.getElementById("service_1").innerHTML = this.answerArray.join(" ");

    //this.ctx.clearRect(0, 0, 400, 400);  useful line
    //this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    this.checkTheKey(event);

    if (this.numberOfTries > 0 && this.remainingLetters > 0) {
      document.getElementById("service_1").innerHTML =
        this.answerArray.join(" ");
      document.getElementById("service_2").innerHTML =
        "Wrong letters: " + this.wrongLetters.join(" ");
    } else if (this.numberOfTries > 0 && this.remainingLetters === 0) {
      document.getElementById("service_1").innerHTML =
        this.answerArray.join(" ");
      document.getElementById("service_3").innerHTML =
        "VICTORY!!! It is really " +
        this.word.toUpperCase() +
        ". Press F5 to restart.";
      document.getElementById("service_2").innerHTML =
        "Wrong letters: " + this.wrongLetters.join(" ");
    }

    if (this.numberOfTries < 0) {
      document.getElementById("service_2").innerHTML = "GAME OVER";
      document.getElementById("service_3").innerHTML =
        "Useless clicking. Please, better press F5.";
    }
  }

  drawElement(xBegin, yBegin, xEnd, yEnd) {
    this.ctx.beginPath();
    this.ctx.moveTo(xBegin, yBegin);
    this.ctx.lineTo(xEnd, yEnd);
    this.ctx.stroke();
  }

  drawHangman(step) {
    switch (step) {
      case 8:
        this.drawElement(5, 150, 5, 1);
        return;

      case 7:
        this.drawElement(5, 1, 45, 1);
        return;

      case 6:
        this.drawElement(45, 1, 45, 22);
        return;

      case 5:
        this.ctx.strokeRect(35, 22, 20, 20);
        return;

      case 4:
        this.drawElement(45, 42, 45, 82);
        return;

      case 3:
        this.drawElement(45, 82, 65, 112);
        return;

      case 2:
        this.drawElement(45, 82, 30, 112);
        return;

      case 1:
        this.drawElement(45, 60, 30, 50);
        return;

      case 0:
        this.drawElement(45, 60, 60, 50);
        return;
      default:
        return;
    }
  }

  checkTheKey(event) {
    document.getElementById("service_2").innerHTML = "";

    if (this.numberOfTries <= 0) {
      this.numberOfTries--;
      return;
    }

    if (this.remainingLetters === 0) return;

    this.key = event.keyCode;
    this.guess = String.fromCharCode(this.key).toLowerCase();

    if (this.key < 65 || (this.key > 90 && this.key !== 116)) {
      document.getElementById("service_3").innerHTML =
        "This is the wrong key. Better press A-Z";
      return;
    }

    for (let j = 0; j < this.word.length; j++) {
      if (this.word[j] === this.guess && this.answerArray[j] === "_") {
        // Right guess
        this.isGuessRight = true;
        this.answerArray[j] = this.guess;
        this.remainingLetters--;
      }
    } // End of checking array

    if (!this.isGuessRight) {
      document.getElementById("service_3").innerHTML =
        String.fromCharCode(this.key) + " is a wrong letter. Guess carefully.";
      this.numberOfTries--;
      this.drawHangman(this.numberOfTries);
      if (this.wrongLetters.indexOf(this.guess) === -1) {
        this.wrongLetters.push(this.guess);
      }
    } else {
      this.isGuessRight = false;
    }

    if (this.numberOfTries === 0) {
      //this.ctx.clearRect(0, 0, 400, 400);
      document.getElementById("service_3").innerHTML =
        "GAME OVER. It was " +
        this.word.toUpperCase() +
        ". Press F5 to restart.";
    }
  }
}
