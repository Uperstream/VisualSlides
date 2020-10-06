function Particle(){
  this.pos = createVector(random(width),random(800,1600));
  this.vel = p5.Vector.random2D();
  this.acc = createVector(0,0);
  this.col = colorShift(random(col2));
  this.c = 0;
  this.prevPos = this.pos.copy();
  this.maxSpeed = 3;
  
  this.update = function(){
    this.vel.add(this.acc);
    this.vel.limit(this.maxSpeed);
    this.pos.add(this.vel);
    this.acc.mult(0);
  }
  
  this.follow = function(vectors){
    if(this.pos.x>gridXOff&&this.pos.x<gridXOff+1000&&this.pos.y>gridYOff&&this.pos.y<gridYOff+600){
      var x = floor((this.pos.x-gridXOff) / scl);
      var y = floor((this.pos.y-gridYOff) / scl);
      var index  = x + y *cols;
      var force = vectors[index];
      // print(index);
      this.applyForce(force);
    }
  }
  
  this.applyForce  = function(force){
    this.acc.add(force);
  }
  this.updatePrev = function(){
    this.prevPos = this.pos.copy();
  }
  
  this.show = function(){
    stroke(this.col);
    strokeWeight(5);
    // fill(255);
    // point(this.pos.x, this.pos.y);
    line(this.pos.x, this.pos.y, this.prevPos.x, this.prevPos.y);
    this.updatePrev();
  }
  
  this.edges = function(){
    if(this.pos.x>width){
      this.pos.x =0;
      this.updatePrev();
    }
    if(this.pos.x<0){
      this.pos.x =width;
      this.updatePrev();
      
    }
    if(this.pos.y>1600){
      this.pos.y =800;
      this.updatePrev();
      
    }
    if(this.pos.y<800){
      this.pos.y =1600;
      this.updatePrev();
    }
    if(this.pos.x>width*0.5+10&&this.pos.x<width*0.5+30&&this.pos.y>1200+10&&this.pos.y<1200+30){
      //x = 739, y = 1220
      // print("1");
      this.c ++;
      if(this.c>10){
        this.c = 0;
        this.pos.x = mouseX; 
        this.pos.y = mouseY;
        this.updatePrev();
        this.vel = p5.Vector.random2D();
      }
    }
  }
  
}
