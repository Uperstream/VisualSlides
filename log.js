var img,img2,img3;
var col,col2,col3 = [];
var circles = [];
var strokes = [];
var squares = [];
var spaces = [];
var lands = [];
var scl = 40;
var cols, rows;
var zoff = 0;
var particles = [];
var flowfield = [];
var gridXOff,gridYOff = 0;
var gridCenterXoff =0;
var simulate = false;
var move = false;
// var simulateBtn;

function preload(){
  img = loadImage('Images/1.png');
  img2 = loadImage('Images/2.png');
  img3 = loadImage('Images/3.png');
}

function windowResized(){
  resizeCanvas(windowWidth, 2400);
  background(0);
}

function setup() {
  createCanvas(windowWidth, 2400);
  
  cols = floor(1000/scl);
  rows = floor(600/scl);
  gridXOff = 80;
  gridCenterXoff = (width-1000)*0.5-80;
  gridYOff = 800+(800-600)*0.5+20;
  // canvas.position(0,0);
  background(0);
  
  var simulateBtn = select(".cta","#part2");
  simulateBtn.mousePressed(simulateStart);
  var moveBtn = select(".cta", "#part3");
  moveBtn.mousePressed(moveStart);
  
  noStroke();
  
  col = [color(0,7,37),color(2,131,242),color(84,236,255),color(121,228,255),color(10,18,20),color(153,207,219)];
  col2 = [color(255,252,121),color(245,137,73),color(96,79,85)];
  col3 = [color(153,207,219),color(149,153,173),color(82,100,117),color(210,240,240),color(159,241,255)];
  col4 = [color(153,52,52),color(97,160,61),color(60,137,170),color(183,177,75),color(91,75,173),color(167,198,71),color(193,119,30),color(216,216,216)];
  col5 = [color(91,71,41),color(91,48,63),color(121,126,132),color(71,110,86)];
  col6 = [color(40,95,80),color(40,75,100)];
  
  for(var i = 0; i<100;i++){
    var st = new Stroke();
    strokes.push(st);
    st.show();
    var sp = new Space();
    spaces.push(sp);
    sp.show();
    var p = new Particle();
    particles.push(p);
    p.update();
    p.show();
  }
  for(var j = 0; j<200;j++){
    var s = new Circle();
    circles.push(s);
    s.show();
    var sqr = new Square();
    squares.push(sqr);
    sqr.show();

  }
  
  flowfield = new Array(cols*rows);
  
}

function draw() {
  // background(0);
  noStroke();
  // background(0);
  // fill(0);
  background(0,20);
  // fill(0,20);
  rectMode(CORNER);
  // fill(0,10);
  // rect(0,0,width,800);
  // rect(0,800,width,800);
  // if(frameCount%10 == 0){
  //   rect(0,800,width,800);
  // }
  // noStroke();
  
  image(img3,width*0.35,60);
  
  

  for(var l = 0; l<spaces.length;l++){
    spaces[l].x +=  cos(millis() * spaces[l].m) * noise(spaces[l].x) ;
    spaces[l].y +=  sin(millis() * spaces[l].m) * noise(spaces[l].y) ;
    spaces[l].show();
  }
  for(var j = 0; j<strokes.length;j++){
    strokes[j].x += 0.001* sin(millis() * (0.001)) ;
    strokes[j].y += 0.001* cos(millis() * (0.001)) ;
    strokes[j].tx +=  sin(millis() * random(0.001))* noise(strokes[j].tx) ;
    strokes[j].ty +=  cos(millis() * random(0.001))* noise(strokes[j].ty) ;
    strokes[j].show();
  }
  image(img2,width*0.35,260);
  image(img,width*0.35,100);

  for(var k = 0; k<squares.length;k++){
    squares[k].x +=  sin(millis() * random(0.001))*noise(squares[k].x) ;
    squares[k].y +=  cos(millis() * random(0.001))*noise(squares[k].y) ;
    squares[k].show();
  }
  for(var i = 0; i<circles.length;i++){
    circles[i].x += sin(millis() * random(0.001)) ;
    circles[i].y += cos(millis() * random(0.001)) ;
    circles[i].show();
  }

  // if(frameCount%5 == 0){
    push();
    translate(gridXOff, gridYOff);
    var yoff = 0;
    for (var y = 0; y < rows; y++){
      var xoff = 0;
      for (var x = 0; x < cols; x++){
        var index = x+ y*cols;
        var v = createVector(x-cols*0.5,y-rows*0.5);
        // v.normalize();
        var angle = noise(xoff,yoff,zoff) * TWO_PI;
        v = p5.Vector.fromAngle(angle+v.heading());
        // v.setMag(0.1);
        flowfield[index] = v;
        // v.add(a);
        xoff+= 0.1;
        
        // stroke(random(col));
        if(!simulate&&!move){push();
        translate(x * scl, y * scl);
        rotate(v.heading());
        noStroke();
        if(random(1)>0.3){
        fill(colorShift(random(col6),120));
        // fill(2,131+sin(millis() * random(0.001))*angle*50,242+cos(millis() * random(0.001))*angle*20,random(50));
        rectMode(CENTER);
        if(random(1)>0.5){
        ellipse(0,0,random(scl*1.5),random(scl*1.5));
        }else{
        rect(0,0,random(scl*1.5),random(scl*1.5));
        }
        }
        strokeWeight(3);
        // stroke(2,131+sin(millis() * random(0.001))*angle*50,242+cos(millis() * random(0.001))*angle*20,50);
        stroke(90,109,138,20);
        line(0, 0, scl, 0);
        pop();}
      }
      yoff+= 0.1;
    }
    zoff+= 0.05;
    pop();
    
  // }
  
  // print(flowfield[0]);
  for(var m = 0; m<particles.length;m++){
    // particles[m].x += sin(millis() * random(0.001)) ;
    // particles[m].y += cos(millis() * random(0.001)) ;
    if(move){
      particles[m].move();
      particles[m].moveEdges();
    }else{
      particles[m].follow(flowfield);
      particles[m].edges();
    }
    particles[m].update();
    particles[m].show();
  }
  
  stroke(255);
  noFill();
  line(0,1850,width,1850);
  for(var n = 0; n < width/20; n++){
    line(n*20,2000+noise(n*(millis()*0.00001))*400,(n+1)*20,2000+noise((n+1)*(millis()*0.00001))*400);
    lands[n] = createVector(n*20,2000+noise(n*(millis()*0.00001))*400);
  }

}

function colorShift(col,al){
  r = col.levels[0]+random(-20,20);
  g = col.levels[1]+random(-20,20);
  b = col.levels[2]+random(-20,20);
  a = random(10,al);
  c = color(r,g,b,a);
  return c
}

function Circle(){
  this.x = random(-width*0.4,width*0.4);
  this.y = random(-height*0.1,height*0.1);
  this.w = random(5,15);
  this.c = colorShift(random(col2),120);
  this.r = random();
  if(this.r>0.5){
  this.c2 = colorShift(random(col3),120);
  this.xOff = random(-5,5);
  this.yOff = random(-5,5);
  this.s = random(1.0,2.0);
  }
  
  this.show = function(){
  push();
  translate(width * 0.6, height *0.125);
  if(this.r>0.5){
    fill(this.c2);
    // rect(this.x+this.xOff,this.y+this.yOff,this.w*this.s,this.w*this.s);
    ellipse(this.x+this.xOff,this.y+this.yOff,this.w*this.s);
  }
  fill(this.c);
  ellipse(this.x,this.y,this.w);
  pop();
  }
}

function Square(){
  this.x = random(width);
  this.y = random(height*0.25);
  this.r = PI * random(2);
  if(random(1)<0.5){
      this.w = random(5,20);
      this.h = random(20,80);
      this.xOff = random(20);
      this.yOff = random(5);
      this.s = random(0.2,.4);
    }else{
      this.w = random(40,100);
      this.h = random(5,10);
      this.xOff = random(5);
      this.yOff = random(10);
      this.s = random(0.4,0.8);
    }

  this.c = colorShift(random(col),120);
  this.c2 = colorShift(random(col2),120);
  
  this.show = function(){
  fill(this.c);
  // push();
  // translate(width * 0.6, height*0.3);
  // rotate(this.r);
  rect(this.x,this.y,this.w,this.h);
  fill(this.c2);
  rect(this.x+this.xOff,this.y+this.yOff,this.w*this.s,this.h*this.s);
  // pop();
  }
}

function Space(){
  this.x = random(width*0.1,width*0.3);
  this.w = random(160,220);
  this.h = random(80,120);
  this.c = colorShift(random(col3),80);
  this.r = PI * random();
  this.m = random(0.001);
  this.show = function(){
  fill(this.c);
  push();
  translate(width * 0.6, height*0.075);
  rotate(this.r);
  rect(this.x,0,this.w,this.h);
  pop();
  }
}

function Stroke(){
  this.x = random(0.2,0.8);
  this.y = random(0.2,0.6);
  this.tx = width * 0.6;
  this.ty = height *0.075;
  this.w = random(5,10);
  this.c = colorShift(random(col),120);
  this.r = PI * random(2);
  this.j = int(random(5));
  
  this.show = function(){
  fill(this.c);
  push();
  translate(this.tx, this.ty);
  rotate(this.r);
  // ellipse(this.x,this.y,this.w);
    for(var j = 1; j<this.j;j++){
      var h = width*0.8/this.j;
      rect(h*this.x*j,0,h*this.y,this.w);
      // c = colorShift(random(col3));
      // fill(c);
      // rect(random(width*0.1,width*0.5),0,random(160,220),random(80,120));
    }
  pop();
  }
}

function simulateStart(){
  simulate = true;
  mvoe = false;
}

function moveStart(){
  simulate = false;
  move = true;
  for(var m = 0; m<particles.length;m++){
    particles[m].setMove();
  }
}

function mouseClicked(){
  // saveCanvas('mycanvas', 'jpg');
  // save("log.jpg");
  // print(mouseX);
  // print(mouseY);
}

// let myp5 = new p5(s, 'p5sketch');
