let directions = {
  37: "left",
  39: "right",
};

function circle(x, y, radius, fillCircle, ctx) {
  ctx.fillStyle = "Blue";
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2, false);
  if (fillCircle) {
    ctx.fill();
  } else {
    ctx.stroke();
  }
}
//---------------------------------------------- 3 - Block ------------------------------------------
class Block {
  constructor(col, row, blockSize = 10) {
    this.col = col;
    this.row = row;
    this.blockSize = blockSize;
  }

  drawSquare(color, ctx) {
    const x = this.col * this.blockSize;
    const y = this.row * this.blockSize;
    ctx.fillStyle = color;
    ctx.fillRect(x, y, this.blockSize, this.blockSize);
  }

  drawCircle(color, ctx) {
    const centerX = this.col * this.blockSize + this.blockSize / 2;
    const centerY = this.row * this.blockSize + this.blockSize / 2;
    ctx.fillStyle = color;
    circle(centerX, centerY, this.blockSize / 2, true, ctx);
  }

  equal(otherBlock) {
    return this.col === otherBlock.col && this.row === otherBlock.row;
  }
}

//----------------------------------------------- 4 - Snake -------------------------------
export class Tennis {
  constructor(ctx, blockSize = 10, timeout = 100) {
    this.heightInBlocks = ctx.canvas.height / blockSize;
    this.segments = [
      new Block(19, this.heightInBlocks - 2),
      new Block(18, this.heightInBlocks - 2),
      new Block(17, this.heightInBlocks - 2),
      new Block(16, this.heightInBlocks - 2),
      new Block(15, this.heightInBlocks - 2),
    ];

    this.score = 0;
    this.ctx = ctx;
    this.direction = "right";
    this.nextDirection = "right";
    this.timeoutID = null;
    this.timeout = timeout;
    this.blockSize = blockSize;
    this.ball = new Ball(
      ctx.canvas.width,
      ctx.canvas.height,
      blockSize,
      this.segments,
      this.gameOver,
      //this.circle,
      this.incScore,
      ctx,
      this.drawScore
    );
    this.widthInBlocks = ctx.canvas.width / blockSize;
    //this.heightInBlocks = ctx.canvas.height / blockSize; // moved upwards

    this.gameloop = this.gameloop.bind(this);
    this.setDirection = this.setDirection.bind(this);
    this.keyListener = this.keyListener.bind(this);
    this.draw = this.draw.bind(this);
    this.move = this.move.bind(this);
    this.drawBorder = this.drawBorder.bind(this);
    //this.incScore = this.incScore.bind(this);
    //this.drawSquare = this.drawSquare.bind(this);
  }

  keyListener(event) {
    let newDirection = directions[event.keyCode];
    if (newDirection !== undefined) {
      this.setDirection(newDirection);
      this.move();
    }
  }

  start() {
    this.score = 0;
    document.body.addEventListener("keydown", this.keyListener);
    this.gameloop();
  }

  draw() {
    for (let i = 0; i < this.segments.length; i++) {
      if (i % 2 === 0) {
        this.segments[i].drawSquare("Blue", this.ctx);
      } else {
        this.segments[i].drawSquare("Red", this.ctx);
      }
    }
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

  drawScore() {
    this.ctx.font = "20px Courier";
    this.ctx.fillStyle = "Black";
    this.ctx.textAlign = "left";
    this.ctx.textBaseline = "top";
    this.ctx.fillText("Score: " + this.score, this.blockSize, this.blockSize);
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
    document.body.removeEventListener("keydown", this.keyListener);
    clearTimeout(this.timeoutID);
  }

  move() {
    let head = this.segments[0];
    let tail = this.segments[this.segments.length - 1];
    let newHead;
    let newTail;

    this.direction = this.nextDirection;

    if (this.direction === "right" && head.col < this.widthInBlocks - 2) {
      newHead = new Block(head.col + 1, head.row);
      this.segments.unshift(newHead);
      this.segments.pop();
    } else if (this.direction === "left" && tail.col > 1) {
      newTail = new Block(tail.col - 1, tail.row);
      this.segments.push(newTail);
      this.segments.shift();
    }
  }

  setDirection(newDirection) {
    this.nextDirection = newDirection;
  }

  gameloop() {
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    //this.drawScore(); // moved to Ball

    this.draw();
    this.ball.move();
    this.ball.draw();
    this.drawBorder();
    this.timeoutID = setTimeout(this.gameloop, this.timeout);
  }

  incScore() {
    //console.log("Score = ", this.score);
    this.score++;
  }
}

//----------------------------------------------------- 5/5 - Ball --------------------------------------
class Ball {
  constructor(
    width,
    height,
    blockSize,
    segments,
    gameOver,
    //circle,
    incScore,
    ctx,
    drawScore
  ) {
    this.x = width / 6; //starting position
    this.y = height / 2;
    this.width = width;
    this.height = height;
    this.blockSize = blockSize;

    this.xSpeed = 3; // initial movement vector (5; 0)
    this.ySpeed = 5;

    this.speed = 5;
    this.radius = 30; //radius
    this.segments = segments;
    this.gameOver = gameOver;
    //this.circle = circle;
    this.incScore = incScore;
    this.ctx = ctx;
    this.score = 0;

    this.drawScore = drawScore;
  }

  move() {
    this.x += this.xSpeed;
    this.y += this.ySpeed;

    if (this.x < this.radius + this.blockSize) {
      this.xSpeed *= -1;
    } else if (this.x > this.width - this.radius - this.blockSize) {
      this.xSpeed *= -1;
    }

    if (this.y < this.radius + this.blockSize) {
      this.ySpeed *= -1;
    } else if (
      this.y === this.width - this.radius - 2 * this.blockSize &&
      this.ySpeed > 0
    ) {
      for (let i = 0; i < this.segments.length; i++) {
        if (
          this.segments[i].col * 10 < this.x &&
          this.segments[i].col * 10 + this.blockSize > this.x
        ) {
          this.ySpeed *= -1.15;
          this.xSpeed *= 1.2;
          //score++;
          this.incScore();
        }
      }
    } else if (this.y > this.height - this.radius - this.blockSize) {
      this.gameOver();
    }
    this.drawScore();
  }

  draw() {
    circle(this.x, this.y, this.radius, true, this.ctx);
  }
}
