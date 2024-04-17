/**
 * Project 3 versions 0-4 - 2D Web Game
 * Name:
 * 
 * Use this template to get started creating a simple 2D game for the web using P5.js. 
 */
var gameState = "splash";
var player1; 
var gameTimer; // time the game plays
var testBox; // a box to preview on the splash screen
var dropTimer; // regulate box drops
var presents = new Array(0); // an empty array called "presents" 

function setup() {

  createCanvas(600, 400);
 player1 = new Player(width/2, height* 4/5);
  console.log (player1);
  gameTimer = new Timer(10000); // 10 second timer
 dropTimer = new Timer(1000); // defined w/ a new timer object 
testBox = new Box(width/2, height/3);  
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

testBox.display();
testBox.spin();
}

function play() {
  // this is what you see when the game is running 
  background(0, 200, 0); // green background 
  fill(0, 0, 200)
  textAlign(CENTER);// text in the center
  textSize(16); // text size 
 // text("This is where the Game happens", width / 2, height / 2);
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
for(let i = 0; i < presents.length; i++) {// This shows and moves the presents. 
  // for each element of the array, represented by 'i', do the following:
  presents[i].display(); // draw it on the canvas
  presents[i].move(); // make it drop
  presents[i].spin() // make it rotate

  let d = dist(presents[i].x, presents[i].y, player1.x, player1.y);
  if (d < 50) {  // if it's within 50 pixels, do something!
  }
  if (d < 50) {
    presents.splice(i, 1); // remove 1 item at index 'i'
  } else if(presents[i].y > height) { // This clears the presents when they leave the screen. 
    // present went below the canvas
    presents.splice(i, 1);
    // remove 1 element from from "presents" at index 'i'
  }
}

textAlign(LEFT);
 text("elapsed time: " + gameTimer.elapsedTime, 40, 100);
 // show elapsed time in top left corner
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
  gameTimer.start (); // start the game timer
  dropTimer.start (); // start the drop timer 
  presents = new Array(0); // clear presents with the new game
  player1.x = width/2;  // reset location
  player1.y = height * 5/6; // reset location
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
