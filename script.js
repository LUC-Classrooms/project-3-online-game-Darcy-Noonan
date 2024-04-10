/**
 * Project 3 versions 0-4 - 2D Web Game
 * Name:
 * 
 * Use this template to get started creating a simple 2D game for the web using P5.js. 
 */
var gameState = "splash";
var player1; 
function setup() {

  createCanvas(600, 400);
 player1 = new Player(width/2, height* 4/5);
  console.log (player1);
}

function draw() {
  background(200);
  /* un-comment each line to see it work */
// splash(); // call the splash screen function (below)
 //play(); // call the play screen function (below)
 //gameOver(); // call the gameOver screen function (below)
switch (gameState) {
  case "splash" : 
  splash(); 
  break; // stops from connecting each case. Otherwise splash --> next condition. Too brief. 
  case "play" : 
  play();
  break; 
  case "gameOver" : 
  gameOver ();
  break; 
  default : 
  console.log("no match found!"); 
}
}

function splash() {
  // this is what you would see when the game starts
  background(200);
  textAlign(CENTER);
  textSize(16);
  text("Let's Play a Game!", width / 2, height / 2);
  textSize(12);
  text("(click the mouse to continue)", width / 2, height / 2 + 30);
}

function play() {
  // this is what you see when the game is running 
  background(0, 200, 0);
  fill(0, 0, 200)
  textAlign(CENTER);
  textSize(16);
 // text("This is where the Game happens", width / 2, height / 2);
player1.display();
}

function gameOver() {
  // this is what you see when the game ends
  background(0);
  fill(255, 0, 0)
  textAlign(CENTER);
  textSize(16);
  text("Game Over!", width / 2, height / 2);
}

function mousePressed() { // what happens in response to mouse click
if (gameState == "splash"){
  gameState = "play";
} else if (gameState == "play"){ // if first thing is not true it checks the next, then the next
// gameState = "gameOver"; // Stops click from making it game over screen
} else if (gameState == "gameOver"){
    gamestate = "splash"; 
 }
console.log(gameState)
  console.log("click!");

}

function keyPressed () {
 switch (keyCode) {
   case UP_ARROW :
        player1.y -=30; // move up 10 pix
        player1.angle = 0; // no rotation 
        if (player1.y < 0) {
        player1.y = height; } // wrap to bottom
     break;
    case DOWN_ARROW :
      player1.y +=30; // move down 10 pix
      player1.angle = PI; // flip 180 degrees
      if (player1.y > height) {
      player1.y = 0; } // wrap to top 
     break;
     case LEFT_ARROW : 
     console.log ("left"); 
     player1.x -=30; // move left 30 pix
     player1.angle = PI + HALF_PI; // no rotation 
     if (player1.x < 0) {
     player1.x = width; }
     break; 
     case RIGHT_ARROW : 
     console.log ("right"); 
     player1.x +=30; // move left 10 pix
     player1.angle = HALF_PI; // no rotation 
     if (player1.x > width) {
     player1.x = 0;
     }
     break; 
     default : 
     console.log ("use the arrow keys to move")
 }
}
