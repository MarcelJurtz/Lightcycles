var windowWidth;
var windowHeight;

var defaultDirection = 0;
var defaultLength = 10;

var player1;
var player2;

var bgColor;

function setup() {
  windowHeight = window.innerHeight;
  windowWidth = window.innerWidth;
  bgColor = color(22,22,24);
  frameRate(10);

  createCanvas(windowWidth,windowHeight);
  background(bgColor);

  player1 = new player(color(0,230,255), windowWidth / 3, windowHeight / 2, defaultLength, defaultDirection);
  player2 = new player(color(0,230,255), (windowWidth / 3) * 2, windowHeight / 2, defaultLength, defaultDirection);
}

function draw() {
  background(bgColor);
  player1.move();
  player1.show();

  player2.move();
  player2.show();
}

function player(color, xPos, yPos, length, direction) {
  // Directions:
  // 0 top
  // 1 right
  // 2 down
  // 3 left

  this.direction = direction;
  this.length = length;

  this.xPos = xPos;
  this.yPos = yPos;

  this.color = color;

  this.xSpeed = 0;
  this.ySpeed = 0;

  this.thickness = 5;

  this.tail = [];

  //stroke(color);
  //fill(color);
  //rect(xPos,yPos, 5, 5);
  for(var i = 0; i < this.length; i++) {
    this.tail.push(createVector(this.xPos, this.yPos));
  }

  this.changeDirection = function(addedDirection) {
    this.direction += addedDirection;
    if(this.direction > 3) this.direction = 0;
    if(this.direction < 0) this.direction = 3;
  }

  this.move = function() {
    switch(this.direction) {
      case 0:
        this.xSpeed = 0;
        this.ySpeed = -1;
        break;
      case 1:
        this.xSpeed = 1;
        this.ySpeed = 0;
        break;
      case 2:
        this.xSpeed = 0;
        this.ySpeed = 1;
        break;
      case 3:
        this.xSpeed = -1;
        this.ySpeed = 0;
        break;
      default:
        this.xSpeed = 0;
        this.ySpeed = 0;
    }
    this.xPos += this.xSpeed * this.thickness;
    this.yPos += this.ySpeed * this.thickness;
  }
  this.show = function() {
    for(var i = 0; i < this.tail.length; i++) {
      this.tail[i] = this.tail[i+1];
    }
    this.tail[this.tail.length-1] = createVector(this.xPos, this.yPos);

    stroke(this.color);
    fill(this.color);
    for(var i = 0; i < this.tail.length; i++) {
      rect(this.tail[i].x, this.tail[i].y, this.thickness, this.thickness);
    }
  }
}

function keyPressed() {
    // Player 1
    if(keyCode == LEFT_ARROW) {
        player1.changeDirection(-1);
    } else if (keyCode == RIGHT_ARROW) {
        player1.changeDirection(1);
    }
    // Player 2
    if(keyCode == 65) {
      player2.changeDirection(-1);
    } else if(keyCode == 83) {
      player2.changeDirection(1);
    }
    return 0;
}
