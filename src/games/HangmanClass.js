export class Hangman {
  constructor(ctx, word1, definition1) {
    this.key = null;
    this.ctx = ctx;

    this.ctx.lineWidth = 4;
    this.ctx.strokeStyle = "Green";

    this.wrongLetters = [];

    this.word = word1;
    this.definition = definition1;

    this.guess = null;
    this.answerArray = [];

    this.remainingLetters = this.word.length;
    this.numberOfTries = 9;
    this.isGuessRight = false;

    this.serviceText1_AnswerArray = ""; //this.answerArray.join(" ");
    this.serviceText2 = ""; // nothing special, just serviceText
    this.serviceText3 = ""; // nothing special, just serviceText
    this.serviceText4_Definition = ""; // Definition

    this.keyListener = this.keyListener.bind(this);
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
    /*
    let parent = document.getElementById("hangman");
    this.serv1 = document.createElement("p");
    this.serv1.id = "service_1";
    parent.insertBefore(this.serv1, parent.children[1]); // After h2([0]) but before serv2([1])
    */

    document.body.addEventListener("keydown", this.keyListener);
    this.serviceText1_AnswerArray = this.answerArray.join(" ");

    this.serviceText2 =
      "RULES:\n" +
      "Try to open the word guessing letters from A to Z.\n" +
      "Read carefully the rules now, because there is no way back\n" +
      "as soon as you start. Do not press wrong letters and more than once already used letters\n" +
      "if you don't want to pay for this. Let the game begin. Press some letter key.";
  }

  keyListener(event) {
    console.log(this.answerArray);

    this.serviceText1_AnswerArray = this.answerArray.join(" ");
    this.checkTheKey(event);

    if (this.numberOfTries > 0 && this.remainingLetters > 0) {
      this.serviceText1_AnswerArray = this.answerArray.join(" ");
      this.serviceText2 = "Wrong letters: " + this.wrongLetters.join(" ");
    } else if (this.numberOfTries > 0 && this.remainingLetters === 0) {
      this.serviceText1_AnswerArray = this.answerArray.join(" ");
      this.serviceText3 =
        "VICTORY!!! It is really " +
        this.word.toUpperCase() +
        ". Press F5 to restart.";
      this.serviceText2 = "Wrong letters: " + this.wrongLetters.join(" ");
    }

    if (this.numberOfTries < 0) {
      this.serviceText4_Definition = "";
      this.serviceText2 = "GAME OVER";
      this.serviceText3 = "Useless clicking. Please, better press F5.";
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
    this.serviceText2 = "";

    if (this.numberOfTries <= 0) {
      this.numberOfTries--;
      return;
    }

    if (this.remainingLetters === 0) return;

    this.key = event.keyCode;
    this.guess = String.fromCharCode(this.key).toLowerCase();

    if (this.key < 65 || (this.key > 90 && this.key !== 116)) {
      this.serviceText3 = "This is the wrong key. Better press A-Z";
      return;
    }

    for (let j = 0; j < this.word.length; j++) {
      if (this.word[j] === this.guess && this.answerArray[j] === "_") {
        // Right guess
        this.isGuessRight = true;
        this.answerArray[j] = this.guess;
        this.remainingLetters--;
      }
    }

    if (!this.isGuessRight) {
      this.serviceText3 =
        String.fromCharCode(this.key) + " is a wrong letter. Guess carefully.";
      this.numberOfTries--;
      this.drawHangman(this.numberOfTries);
      if (this.wrongLetters.indexOf(this.guess) === -1) {
        this.wrongLetters.push(this.guess);
      }
    } else {
      this.isGuessRight = false;
    }

    if (this.numberOfTries === 2) {
      console.log("Two tries left. Service 4");
      this.serviceText4_Definition =
        "Maybe this helps? Definition: " + this.definition;
      console.log(this.serviceText4_Definition);
    }

    if (this.numberOfTries === 0) {
      this.serviceText3 =
        "GAME OVER. It was " +
        this.word.toUpperCase() +
        ". Press F5 to restart.";
    }
  }
}
