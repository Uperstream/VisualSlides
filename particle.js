function Particle(){
  this.pos = createVector(random(width),random(800,1600));
  this.vel = p5.Vector.random2D();
  this.acc = p5.Vector.random2D();
  this.acc.setMag(3);
  this.c = 0;
  this.prevPos = this.pos.copy();
  this.maxSpeed = 5;
  this.col = colorShift(random(col5),50);
  this.xoff = random(100);
  this.yoff = random(100);
  this.zoff = random(100);
  this.pposx = this.pos.copy();
  this.pposy = this.pos.copy();
  this.pposz = this.pos.copy();
  this.alive = true;
  this.child = function(children){
    this.children = children;
  }
  
  this.update = function(){
    this.vel.add(this.acc);
    this.vel.limit(this.maxSpeed);
    this.pos.add(this.vel);
      // this.pos.add(noise(this.off));
      // this.off += random(0.06,0.1);
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
    this.pposx = createVector(this.pos.x+(noise(this.xoff)*20), this.pos.y+(noise(this.xoff)*20));
    this.pposy = createVector(this.pos.x+(noise(this.yoff)*-20), this.pos.y+(noise(this.yoff)*-20));
    this.pposz = createVector(this.pos.x+(noise(this.zoff)*30-15), this.pos.y+(noise(this.zoff)*30-15));
    // this.acc.mult(this.xoff);
    // this.pposx.add(this.acc.mult);
    // this.acc.mult(this.yoff);
    // this.pposy.add(this.acc.mult);
    // this.acc.mult(this.zoff);
    // this.pposz.add(this.acc.mult);
    this.xoff+=0.05;
    this.yoff+=0.08;
    this.zoff+=0.1;
  }
  
  this.show = function(){
    // if(random()>1){stroke(this.col);
    // strokeWeight(noise(this.xoff)*45);
    // // fill(255);
    // // point(this.pos.x, this.pos.y);
    // line(this.pos.x, this.pos.y, this.prevPos.x, this.prevPos.y);
      
    // }else{
      // if(!colorIn){noStroke();
      
      noStroke();
      push();
      fill(this.col);
      rectMode(CENTER);
      translate(this.pos.x, this.pos.y);
      rotate(noise(this.xoff)*PI);
      rect(0,0,noise(this.xoff)*75,noise(this.yoff)*75);
      pop();
        
      // }else{
    // }
    // strokeWeight(noise(this.yoff)*20);
    // line(this.pos.x+noise(this.xoff)*50, this.pos.y+noise(this.yoff)*50, this.prevPos.x+noise(this.xoff)*10, this.prevPos.y+noise(this.yoff)*10);
    // stroke(colorShift(this.col,200));
    fill(this.col);
    rect(this.pos.x+(noise(this.xoff)*20), this.pos.y+(noise(this.xoff)*20),sin(noise(this.xoff))*20,cos(noise(this.xoff))*20);
    fill(colorShift(random(col4),20))
    rect(this.pos.x+(noise(this.yoff)*-20), this.pos.y+(noise(this.yoff)*-20),sin(noise(this.yoff))*20,cos(noise(this.yoff))*20);
    rect(this.pos.x+(noise(this.zoff)*30-15), this.pos.y+(noise(this.zoff)*30-15),sin(noise(this.zoff))*20,cos(noise(this.zoff))*20);
    stroke(colorShift(random(col4),150));
    strokeWeight(noise(this.yoff)*10);
    point(this.pos.x, this.pos.y);
    strokeWeight(1+noise(this.xoff)*2);
    
    // line(this.pos.x, this.pos.y,this.pos.x+(noise(this.xoff)*10), this.pos.y+(noise(this.xoff)*10));
    // line(this.pos.x, this.pos.y,this.pos.x+(noise(this.yoff)*-10), this.pos.y+(noise(this.yoff)*-10));
    // line(this.pos.x, this.pos.y,this.pos.x+(noise(this.zoff)*30-15), this.pos.y+(noise(this.zoff)*30-15));
    
    // line(this.pos.x, this.pos.y, this.prevPos.x, this.prevPos.y);

      
    line(this.pos.x+(noise(this.xoff)*20), this.pos.y+(noise(this.xoff)*20), this.pposx.x, this.pposx.y);
    
    line(this.pos.x+(noise(this.yoff)*-20), this.pos.y+(noise(this.yoff)*-20), this.pposy.x, this.pposy.y);
    
    line(this.pos.x+(noise(this.zoff)*30-15), this.pos.y+(noise(this.zoff)*30-15), this.pposz.x, this.pposz.y);

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
    if(this.pos.x>width*0.5-gridCenterXoff+10&&this.pos.x<width*0.5-gridCenterXoff+30&&this.pos.y>1200+20&&this.pos.y<1200+40){
      //x = 739, y = 1220
      // print("1");
      this.c ++;
      if(this.c>10){
        this.c = 0;
        this.pos.x = mouseX; 
        this.pos.y = mouseY;
        this.updatePrev();
        // this.vel = p5.Vector.random2D();
      }
    }
  }
  
  this.move = function(){
      // if(this.alive&&this.pos.y<2000){this.pos.x = 0;
      // this.pos.y = 2000;
      // this.updatePrev();
      // }
  var n = 0;
  if(floor(this.pos.x/lineGap)<lands.length&&floor(this.pos.x/lineGap)>0){
    
    n = floor(this.pos.x/lineGap);
  }else{
    n = lands.length-1;
    // print("1");
    // print(n);
  }
  // if(lands[n]){
  // print(lands.length);
  // print(n);
  if(lands[n]){
    if (this.pos.x > lands[n].x&&this.pos.y > lands[n].y||this.pos.y < 1800){
        this.vel = createVector(0,10);
        this.acc = createVector(0,10);
    }else{
      this.vel = createVector(0,0);
      this.acc = createVector(random(-1,1),random(-1,1)+(mouseY-pmouseY)*5);
    }
  }else{
    print("not valid");
  }
    // this.applyForce(createVector(1,0));
    
  }
  this.setMove = function(){
    this.pos.x = random(width);
      this.pos.y = 1800+random(500);
      this.vel = createVector(0,0);
      this.acc = createVector(0,0);
      this.updatePrev();
  }
  
  this.moveEdges = function(){
    // if(this.pos.x>width){
    //     this.pos.x =0;
    //     this.updatePrev();
    //   }
    //   if(this.pos.x<0){
    //     this.pos.x =width;
    //     this.updatePrev();
    //   }
      if(this.pos.y>2400){
        this.pos.y =1600;
        this.updatePrev();
        
      }
      if(this.pos.y<1600){
        this.pos.y =2400;
        this.updatePrev();
      }
  }
  
}
