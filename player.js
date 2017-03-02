var defaultLength = 200;
var defaultDirection = 0;
var defaultThickness = 5;
// Default multiplier while boosting
var defaultBoostFactorEnabled = 3;
var defaultBoostFactorDisabled = 1;
// Default boosting-length (frames)
var defaultBoostFrames = 50;
var defaultBoostFramesStart = 0;

function player(name, color, xPos, yPos, direction) {
  // Directions:
  // 0 top
  // 1 right
  // 2 down
  // 3 left

  this.name = name;

  this.direction = defaultDirection;
  this.length = defaultLength;


  this.initX = xPos;
  this.initY = yPos;

  this.xPos = xPos;
  this.yPos = yPos;

  this.color = color;

  this.xSpeed = 0;
  this.ySpeed = 0;

  // Booster
  // Default multiplier
  this.boostFactor = defaultBoostFactorDisabled;
  // Frames left to boost
  this.boostFrames = defaultBoostFramesStart;


  this.thickness = defaultThickness;

  this.tail = [];
  this.living = true;

  for(var i = 0; i < this.length; i++) {
    this.tail.push(createVector(this.xPos, this.yPos));
  }

  this.changeDirection = function(addedDirection) {
    this.direction += addedDirection;
    if(this.direction > 3) this.direction = 0;
    if(this.direction < 0) this.direction = 3;
  }

  // Calculate Movement
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

    // Check boost
    if(this.boostFrames > defaultBoostFramesStart) {
      this.boostFrames--;
    } else {
      // Reset Boost after given amount of Frames
      this.boost = defaultBoostFactorDisabled;
    }

    // Wall Collision
    if(this.tail[this.tail.length -1].x > 0 && this.tail[this.tail.length -1].x < windowWidth - this.thickness &&
      this.tail[this.tail.length -1].y > 0 && this.tail[this.tail.length -1].y < windowHeight - this.thickness) {
      this.xPos += this.xSpeed * this.thickness * this.boost;
      this.yPos += this.ySpeed * this.thickness * this.boost;
    } else {
      if(this.name == player1.name) player2.win;
      else player1.win;
    }
  }

  // Display Tail
  this.show = function() {
    if(this.living) {
      for(var i = 0; i < this.tail.length; i++) {
        this.tail[i] = this.tail[i+1];
      }
      this.tail[this.tail.length-1] = createVector(this.xPos, this.yPos);
    }

    stroke(this.color);
    fill(this.color);
    for(var i = 0; i < this.tail.length; i++) {
      rect(this.tail[i].x, this.tail[i].y, this.thickness, this.thickness);
    }
    if(player1.dies() || player1.crashesInto(player2)) {
      player2.win();
    }
    if(player2.dies() || player2.crashesInto(player1)) {
      player1.win();
    }
  }

  this.enableBoost = function() {
    this.boost = defaultBoostFactorEnabled;
    this.boostFrames = defaultBoostFrames;
  }

  this.dies = function() {
    // Prevent Collision on Spawn
    if(this.tail[this.tail.length-1].x === this.initX && this.tail[this.tail.length-1].y === this.initY) {
      return false;
    } else {
      // Check for Collision
      var headIndex = this.tail.length-1;
      for(var i = 0; i < headIndex; i++) {
        var distance = dist(this.tail[i].x, this.tail[i].y, this.tail[headIndex].x, this.tail[headIndex].y);
        if(distance < 1) return true;
      }
    }
  }

  this.crashesInto = function(otherPlayer) {
    for(var i = 0; i < otherPlayer.tail.length; i++) {
      var distance = dist(this.tail[this.tail.length-1].x, this.tail[this.tail.length-1].y, otherPlayer.tail[i].x, otherPlayer.tail[i].y);
      if(distance < 1) return true;
    }
    return false;
  }

  this.win = function() {
    player1.living = false;
    player2.living = false;
    textSize(256);
    textAlign(CENTER);
    stroke(this.color);
    fill(this.color);
    text(this.name + " wins!", windowWidth / 2, windowHeight /2);
  }
}
