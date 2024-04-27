/**
 * Project 3 versions 0-4 - 2D Web Game
 * Name:
 * 
 * Use this template to get started creating a simple 2D game for the web using P5.js. 
 */

// Variables Declared
var gameState = "splash";
var player1; 
var gameTimer; // time the game plays
var testBox; // a box to preview on the splash screen
var dropTimer; // regulate box drops
var presents = new Array(0); // an empty array called "presents" 
var score = 0; // keep track of points (starting at 0)

function setup() {
// Make screen, player constructor called on, timer, Box
  createCanvas(600, 400);
 player1 = new Player(width/2, height* 4/5);
  console.log (player1);
  gameTimer = new Timer(20000); // 20 second timer FOR THE GAME TIME
 dropTimer = new Timer(1000); // defined w/ a new timer object 
testBox = new Box(width/2, height/3); // new box object. 
}

// Allows for switches between screens
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
// Loading Screen Created and Designed 
function splash() {
  // this is what you would see when the game starts
  background(0, 150, 20);
  textAlign(CENTER);
  textSize(24);
  fill (0, 0, 10)
  text("The Duck Is Hungry!", width / 2, height / 2);
  textSize (20);
  text ("Use the arrow keys to collect corn!", width / 2, height / 2 + 30);
  text ("Avoid the bread :(", width / 2, height / 2 + 50)
  textSize(12);
  text("(click the mouse to continue)", width / 2, height / 2 + 80);

  // Shows the corn on Splash Screen
testBox.display();
testBox.spin();
}

// Play function and design. 
function play() {
  // this is what you see when the game is running 
  background(0, 100, 200); // blue background 
  fill(0, 0, 0)
  textAlign(CENTER);// text in the center
  textSize(16); // text size 

  // Player is shown, moves to Gameover, droptimer effects. 
player1.display();
if (gameTimer.isFinished()) {
  gameState = "gameOver"
} 
if(dropTimer.isFinished()) {
  let p = new Box (random (width), -40); 
  // new box, anywhere acorss the width of canvas but 40p above canvas
  presents.push (p); // add object 'p' to the 'presents' Array
  dropTimer.start (); // restart timer for next drop
}
// Corn seen, moved, deletes when off screen 
for (let i = 0; i < presents.length; i++) {
  presents[i].display();
  presents[i].move();
  presents[i].spin();

  // Missed corn leads to lost points 
  if (presents[i].y > height) {
    presents.splice(i, 1); // remove from array
    score--; // decrement score by 1
  }

  // COlission. Removes present when hit, adds a point. 
  let d = dist(presents[i].x, presents[i].y, player1.x, player1.y);
  // d is now the distance in pixels between presents[i] and player1
  if (d < 50) {
    presents.splice(i,1); // remove the present from the array
    // else if (presents [i].y > height)
   
      score ++; // add 1 point!
  }
} // end of for() loop

// Countdown
fill (0, 100, 20)
rect (0, 0, 600, 40)
textAlign(LEFT);
fill (0, 0, 0)
 text("time remaining: " + Math.trunc((gameTimer.time - gameTimer.elapsedTime)/1000), 100, 30);
 // show elapsed time in top left corner. String, X, Y. 
 text("Score: " + score, 20, 30);// shows score at the top
}

// Gameover Function
function gameOver() {
  // this is what you see when the game ends
  background("red");
  fill(100, 0, 10)
  textAlign(CENTER);
  textSize(30);
  text("Game Over!", width / 2, height / 2);
  text("Your final score: " + score, width/2, height * 2/3);}
if (score > 0) { 
  text ("Good job!", width / 2, height / 3);}


// Starts the game, resets player
function mousePressed() { // what happens in response to mouse click
if (gameState == "splash"){
  gameState = "play";
  gameTimer.start (); // start the game timer
  dropTimer.start (); // start the drop timer 
  score = 0; // reset score to 0 at start of game
  presents = new Array(0); // clear presents with the new game
  player1 = new Player (width/2, height * 5/6)
} else if (gameState == "play"){ // if first thing is not true it checks the next, then the next
// gameState = "gameOver"; // Stops click from making it game over screen
} else if (gameState == "gameOver"){
    gamestate = "splash"; 
 }
console.log(gameState)
  console.log("click!");

}
// Makes the keys control the duck
function keyPressed () {
 switch (keyCode) {
   case UP_ARROW :
        player1.y -=40; // move up 10 pix
        player1.angle = 0; // no rotation 
        if (player1.y < 0) {
        player1.y = height; } // wrap to bottom
     break;
    case DOWN_ARROW :
      player1.y +=40; // move down 10 pix
      player1.angle = PI; // flip 180 degrees
      if (player1.y > height) {
      player1.y = 0; } // wrap to top 
     break;
     case LEFT_ARROW : 
     console.log ("left"); 
     player1.x -=40; // move left 30 pix
     player1.angle = PI + HALF_PI; // no rotation 
     if (player1.x < 0) {
     player1.x = width; }
     break; 
     case RIGHT_ARROW : 
     console.log ("right"); 
     player1.x +=40; // move left 10 pix
     player1.angle = HALF_PI; // no rotation 
     if (player1.x > width) {
     player1.x = 0;
     }
     break; 
     default : 
     console.log ("use the arrow keys to move")
 }
}