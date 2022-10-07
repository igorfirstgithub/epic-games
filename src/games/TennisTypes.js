export class Snake {
  drawScore() {
    this.ctx.font = "20px Courier";
    this.ctx.fillStyle = "Black";
    this.ctx.textAlign = "left";
    this.ctx.textBaseline = "top";
    this.ctx.fillText("Score: " + score, this.blockSize, this.blockSize);
  }

  drawBorder() {
    this.ctx.fillStyle = "Gray";
    this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.blockSize);
    this.ctx.fillRect(
      0,
      this.ctx.canvas.height - this.blockSize,
      this.ctx.canvas.width,
      this.blockSize
    );
    this.ctx.fillRect(0, 0, this.blockSize, this.ctx.canvas.height);
    this.ctx.fillRect(
      this.ctx.canvas.width - this.blockSize,
      0,
      this.blockSize,
      this.ctx.canvas.height
    );
  }

  gameLoop() {
    if (!this.pauseGame) {
      this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
      this.drawScore();
      this.move();
      this.draw();
      this.apple.draw(this.ctx);
      this.drawBorder();
      this.timeoutID = setTimeout(this.gameLoop, this.timeout);
    }
  }

  draw() {
    for (let i = 0; i < this.segments.length; i++) {
      if (i % 2 === 0) {
        this.segments[i].drawSquare("Blue");
      } else {
        this.segments[i].drawSquare("Red");
      }
    }
  }

  gameOver() {
    this.ctx.font = "60px Courier";
    this.ctx.fillStyle = "Black";
    this.ctx.textAlign = "center";
    this.ctx.textBaseline = "middle";

    this.ctx.fillText(
      "Game Over",
      this.ctx.canvas.width / 2,
      this.ctx.canvas.height / 2
    );
    this.isGameOver = true;
    clearTimeout(this.timeoutID);
  }
}

//================== Old version =========================

//-------------------------------------------------------------- 1 - Canvas --------
let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

let width = canvas.width;
let height = canvas.height;

let blockSize = 10;
let widthInBlocks = width / blockSize;
let heightInBlocks = height / blockSize;

let score = 0;
let timeout = 100;

//------------------------------------------------------------- 2- Borders ---------

function circle(x, y, radius, fillCircle) {
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2, false);
  if (fillCircle) {
    ctx.fill();
  } else {
    ctx.stroke();
  }
}

//---------------------------------------------- 3 - Block ------------------------------------------
let Block = function (col, row) {
  this.col = col;
  this.row = row;
};

Block.prototype.drawSquare = function (color) {
  let x = this.col * blockSize;
  let y = this.row * blockSize;
  ctx.fillStyle = color;
  ctx.fillRect(x, y, blockSize, blockSize);
};

Block.prototype.drawCircle = function (color) {
  let centerX = this.col * blockSize + blockSize / 2;
  let centerY = this.row * blockSize + blockSize / 2;
  ctx.fillStyle = color;
  circle(centerX, centerY, blockSize / 2, true);
};

Block.prototype.equal = function (otherBlock) {
  return this.col === otherBlock.col && this.row === otherBlock.row;
};

//----------------------------------------------- 4 - Snake -------------------------------
let Snake = function () {
  this.segments = [
    new Block(9, heightInBlocks - 2),
    new Block(8, heightInBlocks - 2),
    new Block(7, heightInBlocks - 2),
    new Block(6, heightInBlocks - 2),
    new Block(5, heightInBlocks - 2),
  ];

  this.direction = "right";
  this.nextDirection = "right";
};

Snake.prototype.move = function () {
  let head = this.segments[0];
  let tail = this.segments[this.segments.length - 1];
  let newHead;
  let newTail;

  this.direction = this.nextDirection;

  if (this.direction === "right" && head.col < widthInBlocks - 2) {
    newHead = new Block(head.col + 1, head.row);
    this.segments.unshift(newHead);
    this.segments.pop();
  } else if (this.direction === "left" && tail.col > 1) {
    newTail = new Block(tail.col - 1, tail.row);
    this.segments.push(newTail);
    this.segments.shift();
  }
};

Snake.prototype.checkCollision = function (head) {
  let leftCollision = tail.col === 0;
  //let topCollision = (head.row === 0);
  let rightCollision = head.col === widthInBlocks - 1;
  //let bottomCollision = (head.row === heightInBlocks - 1);

  let wallCollision =
    leftCollision || topCollision || rightCollision || bottomCollision;

  let selfCollision = false;
  for (let i = 0; i < this.segments.length; i++) {
    if (head.equal(this.segments[i])) {
      selfCollision = true;
    }
  }

  return wallCollision || selfCollision;
};

Snake.prototype.setDirection = function (newDirection) {
  this.nextDirection = newDirection;
};

//----------------------------------------------------- 5/5 - Ball --------------------------------------
let Ball = function (radius = 20) {
  this.x = width / 6; //starting position
  this.y = height / 2;

  this.xSpeed = 3; // initial movement vector (5; 0)
  this.ySpeed = 5;

  this.speed = 5;
  this.radius = 30;
};

Ball.prototype.move = function () {
  this.x += this.xSpeed;
  this.y += this.ySpeed;

  if (this.x < this.radius + blockSize) {
    this.xSpeed *= -1;
  } else if (this.x > width - this.radius - blockSize) {
    this.xSpeed *= -1;
  }

  if (this.y < this.radius + blockSize) {
    this.ySpeed *= -1;
  } else if (
    this.y === width - this.radius - 2 * blockSize &&
    this.ySpeed > 0
  ) {
    for (let i = 0; i < snake.segments.length; i++) {
      if (
        snake.segments[i].col * 10 < this.x &&
        snake.segments[i].col * 10 + blockSize > this.x
      ) {
        this.ySpeed *= -1.15;
        this.xSpeed *= 1.2;
        score++;
      }
    }
  } else if (this.y > height - this.radius - blockSize) {
    gameOver();
  }
};

Ball.prototype.draw = function () {
  circle(this.x, this.y, this.radius, true);
};

//----------------------------------------------------- 6 - snake + apple -------------------------------
let snake = new Snake();
let ball = new Ball();
let timeoutID;

let gameloop = function () {
  ctx.clearRect(0, 0, width, height);
  drawScore();
  snake.draw();
  ball.move();
  ball.draw();
  drawBorder();
  timeoutID = setTimeout(gameloop, timeout);
};

gameloop();

//------------------------------------------------------ 7 - Keyboard -------------------------------------
let directions = {
  37: "left",

  39: "right",
};
document.body.addEventListener("keydown", function (event) {
  let newDirection = directions[event.keyCode];
  if (newDirection !== undefined) {
    snake.setDirection(newDirection);
    snake.move();
  }
});
