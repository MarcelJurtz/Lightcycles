var windowWidth;
var windowHeight;

var player1;
var player2;

var bgColor;

function setup() {
  windowHeight = window.innerHeight;
  windowWidth = window.innerWidth;
  bgColor = color(22,22,24);
  frameRate(30);

  createCanvas(windowWidth,windowHeight);
  background(bgColor);

  player1 = new player("Player 1", color(255,0,102), windowWidth / 3, windowHeight / 2, defaultDirection);
  player2 = new player("Player 2", color(127,255,0), (windowWidth / 3) * 2, windowHeight / 2, defaultDirection);
}

function draw() {
  background(bgColor);
  player1.move();
  player1.show();

  player2.move();
  player2.show();
}

// Key-Presses for both players
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

    // Space
    if(keyCode == 32) {
      player2.enableBoost();
    }

    if(keyCode == 13) {
      player1.enableBoost();
    }
    return 0;
}
