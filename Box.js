function Box(_x, _y){
  this.x = _x;
  this.y = _y;

  this.xSpeed = 0;
  this.ySpeed = random(1, 2); // 1 - 2 (falling)
  this.rSpeed = random(-.02, .02); // rotation speed

  this.angle = 0;

  /* choose a color scheme at random */
  if(random(100) > 50){ // 50-50 chance
    this.boxColor = color (180, random(170, 190), 0); // Yellow y 
  } else {
    this.boxColor = color(160, random(150, 170), 0); // Yellow
  }

  this.display = function(){

    push();
    translate(this.x, this.y);
   rotate(this.angle);

    rectMode(CENTER);
    fill(this.boxColor);
  triangle (-30, -30, -6, 20, 18, -10) // corn triangle part
   ellipse (0, 0, 40) // corn circle 
   // rectangle (10, 10, 10, 10, 10)

    pop();

  }
 

  this.move = function() {
    this.y += this.ySpeed; // spin
  }

  this.spin = function() {
    this.angle += this.rSpeed; // spin
  }



}