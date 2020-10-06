var img,img2,img3;
var col,col2,col3 = [];
var circles = [];
var strokes = [];
var squares = [];
var spaces = [];
var scl = 40;
var cols, rows;
var zoff = 0;
var particles = [];
var flowfield = [];
var gridXOff,gridYOff = 0;

function preload(){
  img = loadImage('Images/1.png');
  img2 = loadImage('Images/2.png');
  img3 = loadImage('Images/3.png');
}
function setup() {
  createCanvas(windowWidth, 3200);
  cols = floor(1000/scl);
  rows = floor(600/scl);
  gridXOff = (width-1000)*0.5;
  gridYOff = 800+(800-600)*0.5;
  background(0);
  
  noStroke();
  
  col = [color(0,7,37),color(2,131,242),color(84,236,255),color(121,228,255),color(10,18,20),color(153,207,219)];
  col2 = [color(255,252,121),color(245,137,73),color(96,79,85)];
  col3 = [color(153,207,219),color(149,153,173),color(82,100,117),color(210,240,240),color(159,241,255)];

  var p0 = createP("What do you want from me? ");
  var p1 = createP("Similar quistions like this came from the scientist we’ve been paired up.");
  var p2 = createP("I don’t know. That’s my answer, sincerely. As designer and artist, we are always looking for some inspiration, which could be anything. Not just visual elements, it’s actually limitless. Let’s say, a phrase.");
  // print(p);
  // p.element("1");

  p0.style('color','#e6fc79');
  p0.style('font-family','Montserrat','sans-serif');
  p0.style('font-size','58pt');
  p0.style('font-weight','800');
  p0.style('font-style','italic');
  p0.position(20,-65);
  
  p1.position(20,80);
  p1.style('margin-right','60%');
  p1.style('margin-left','10px');
  p1.style('color','#e6fc79');
  p1.style('font-size','34pt');
  p1.style('font-weight','500');
  p1.style('font-family','Montserrat','sans-serif');
  // p1.style('background-color','#526475');
  
  p2.position(20,320);
  p2.style('margin-right','40%');
  p2.style('margin-left','10px');
  p2.style('color','#e6fc79');
  p2.style('font-size','34pt');
  p2.style('font-weight','500');
  p2.style('font-family','Montserrat','sans-serif');
  
  for(var i = 0; i<100;i++){
    var st = new Stroke();
    strokes.push(st);
    st.show();
    var sp = new Space();
    spaces.push(sp);
    sp.show();
  }
  for(var j = 0; j<200;j++){
    var s = new Circle();
    circles.push(s);
    s.show();
    var sqr = new Square();
    squares.push(sqr);
    sqr.show();
    var p = new Particle();
    particles.push(p);
    p.update();
    p.show();
  }
  
  flowfield = new Array(cols*rows);
  
}

function draw() {
  // background(0);
  noStroke();
  fill(0,15);
  rect(0,0,width,800);
  // fill(0,10);
  rect(0,800,width,800);
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
        strokeWeight(1);
        // stroke(random(col));
        stroke(2,131+sin(millis() * random(0.001))*angle*50,242+cos(millis() * random(0.001))*angle*20,50);
        push();
        translate(x * scl, y * scl);
        rotate(v.heading());
        line(0, 0, scl, 0);
        pop();
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
    particles[m].follow(flowfield);
    particles[m].update();
    particles[m].edges();
    particles[m].show();
  }
  
  // for(var i = 0; i<100;i++){
  //   // rect();
    
  //   push();
  //   push();
  //   translate(width * 0.6, height *0.5);
  //   c2 = colorShift(random(col2));
  //   fill(c2);
  //   ellipse(random(-width*0.4,width*0.4),random(-height*0.4,height*0.4),random(5,15));
  //   pop();
  //   translate(width * 0.6, height *0.3);
  //   rotate(PI / random(3.0));
  //   // line(width*0.5,height*0.5,width*(0.5+random(0.5)), height*0.5);
  //   var jMax = int(random(5));
  //   for(var j = 1; j<jMax;j++){
  //     // stroke(255-j*50)
  //     // fill(255,random(50,255));

  //     c = colorShift(random(col));
  //     fill(c);
  //     var q = random(1);
  //     var h = width/jMax;
  //     // line(width/(jMax+2)*(j-1),0,width/(jMax+2)*j-50,0);
  //     rect(h*random(0.5,0.8)*j,0,h*random(0.5,0.8),random(5,10));
  //     c = colorShift(random(col3));
  //     fill(c);
  //     rect(random(width*0.1,width*0.5),0,random(160,220),random(80,120));
  //     // line(width*(1.5-q),0,width*q, 0);
  //   }  
  //   pop();
  // }
  
    

  // for(var l = 0; l<200;l++){
  //   // fill(255,random(50,255));
  //   c = colorShift(random(col));
  //   fill(c);
  //   var x = random(width);
  //   var y = random(height);
  //   if(random(1)<0.5){
  //   rect(x,y,random(5,20),random(20,80));
  //   }else{
  //     rect(x,y,random(40,100),random(5,10));
  //   }
  // }

}

function colorShift(col){
  r = col.levels[0]+random(-20,20);
  g = col.levels[1]+random(-20,20);
  b = col.levels[2]+random(-20,20);
  a = random(255);
  c = color(r,g,b,a);
  return c
}

function Circle(){
  this.x = random(-width*0.4,width*0.4);
  this.y = random(-height*0.1,height*0.1);
  this.w = random(5,15);
  this.c = colorShift(random(col2));
  this.r = random();
  if(this.r>0.5){
  this.c2 = colorShift(random(col3));
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

  this.c = colorShift(random(col));
  this.c2 = colorShift(random(col2));
  
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
  this.c = colorShift(random(col3));
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
  this.c = colorShift(random(col));
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

function mouseClicked(){
  print(mouseX);
  print(mouseY)
}

// let myp5 = new p5(s, 'p5sketch');
