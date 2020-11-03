function Particle(){
  this.pos = createVector(random(width),random(windowHeight,windowHeight*2));
  this.gradientPath = createVector(random(-1,1),random(-1,1));
  this.sizeScalar = random(1.5,3.5);
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
  this.colorLight = color(0,0,0);
  this.moveCol = random(moveCols);
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
 
    //colorful show
    //   noStroke();
    //   push();
    //   fill(this.col);
    //   rectMode(CENTER);
    //   translate(this.pos.x, this.pos.y);
    //   rotate(noise(this.xoff)*PI);
    //   rect(0,0,noise(this.xoff)*75,noise(this.yoff)*75);
    //   pop();
        

    // fill(this.col);
    // rect(this.pos.x+(noise(this.xoff)*20), this.pos.y+(noise(this.xoff)*20),sin(noise(this.xoff))*20,cos(noise(this.xoff))*20);
    // fill(colorShift(random(col4),20))
    // rect(this.pos.x+(noise(this.yoff)*-20), this.pos.y+(noise(this.yoff)*-20),sin(noise(this.yoff))*20,cos(noise(this.yoff))*20);
    // rect(this.pos.x+(noise(this.zoff)*30-15), this.pos.y+(noise(this.zoff)*30-15),sin(noise(this.zoff))*20,cos(noise(this.zoff))*20);
    // stroke(colorShift(random(col4),150));
    // strokeWeight(noise(this.yoff)*10);
    // point(this.pos.x, this.pos.y);
    // strokeWeight(1+noise(this.xoff)*2);
      
    // line(this.pos.x+(noise(this.xoff)*20), this.pos.y+(noise(this.xoff)*20), this.pposx.x, this.pposx.y);
    
    // line(this.pos.x+(noise(this.yoff)*-20), this.pos.y+(noise(this.yoff)*-20), this.pposy.x, this.pposy.y);
    
    // line(this.pos.x+(noise(this.zoff)*30-15), this.pos.y+(noise(this.zoff)*30-15), this.pposz.x, this.pposz.y);
    
    //plastic show
    
    push();
    translate(this.pos.x, this.pos.y);
    if(!move){
      this.gradientPath = this.vel.copy();
      this.gradientPath.setMag(this.sizeScalar-0.5);
      this.colorLight = (color(218,219,213));
    }else{
      this.gradientPath = createVector(1,this.vel.y);
      this.gradientPath.setMag(this.sizeScalar+0.5);
      this.colorLight = this.moveCol;
    }
    
    
    var ellipseCenter = createVector(0,0);
    if(!simulate){
    for(i = 0; i<20; i+=2){
      ellipseCenter.add(this.gradientPath);
    // this.gradientPath.mult();

    
      
      var g = lerpColor(color(104,105,106,120),this.colorLight,i*0.1);
    
      fill(g);
    // ellipse(this.gradientPath*i*0.3,this.gradientPath*i*0.3,20-i,20-i);
      ellipse(ellipseCenter.x,ellipseCenter.y,(21-i)*this.sizeScalar,(21-i)*this.sizeScalar);
    }
    }else{
      // fill(color(76,102,39));
      // ellipse(ellipseCenter.x,ellipseCenter.y,20*this.sizeScalar,20*this.sizeScalar);
      // this.colorLight = colorShift(color(216,166,150),150,150);
      fill(color(216,166,150));
      ellipse(ellipseCenter.x,ellipseCenter.y,20*this.sizeScalar,20*this.sizeScalar);
    //   for(i = 0; i<20; i+=2){
    //   ellipseCenter.add(this.gradientPath);
    //   var q = lerpColor(color(104,105,106,80),this.colorLight,i*0.1);
    //   fill(q);
    // // ellipse(this.gradientPath*i*0.3,this.gradientPath*i*0.3,20-i,20-i);
    //   ellipse(ellipseCenter.x,ellipseCenter.y,(20-i)*this.sizeScalar,(20-i)*this.sizeScalar);
    // }

    }

    
    pop();

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
    if(this.pos.y>windowHeight*2){
      this.pos.y =windowHeight;
      this.updatePrev();
      
    }
    if(this.pos.y<windowHeight){
      this.pos.y =windowHeight*2;
      this.updatePrev();
    }
    if(this.pos.x>width*0.35+gridXOff-20&&this.pos.x<width*0.35+gridXOff+20&&this.pos.y>windowHeight*1.5&&this.pos.y<windowHeight*1.5+40){
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
    if (this.pos.x > lands[n].x&&this.pos.y > lands[n].y||this.pos.y < windowHeight*2.3){
        // this.vel = createVector(0,10);
        // this.acc = createVector(0,10);
        this.alive = false;
    }else{
      // if(frameRate%5===0){
        // this.vel = createVector(random(-0.1,0.1),random(-0.1,0.1)+(mouseY-pmouseY));
      // }
      this.acc = createVector(random(-0.1,0.1),random(-0.1,0.1)+(mouseY-pmouseY));
    }
  }else{
    print("not valid");
  }
    // this.applyForce(createVector(1,0));
    
  }
  this.setMove = function(x1,x2,y1,y2){
    this.pos.x = random(x1,x2);
      this.pos.y = random(y1,y2);//1800
      this.vel = createVector(0,0);
      this.acc = createVector(0,0);
      this.updatePrev();
  }
  
  this.moveEdges = function(){

      if(this.pos.y>windowHeight*3.5){
        this.pos.y =windowHeight*2.3;
        this.updatePrev();
        
      }
      if(this.pos.y<windowHeight*2.3){
        this.pos.y =windowHeight*3.5;
        this.updatePrev();
      }
  }
  
}
