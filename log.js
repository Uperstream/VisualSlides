var img,img2;
var col,col2,col3 = [];
var circles = [];
var strokes = [];
var squares = [];
var spaces = [];
function preload(){
  img = loadImage('Images/1.png');
  img2 = loadImage('Images/2.png');
}
function setup() {
  col = [color(0,7,37),color(2,131,242),color(84,236,255),color(121,228,255),color(10,18,20),color(153,207,219)];
  col2 = [color(255,252,121),color(245,137,73),color(96,79,85)];
  col3 = [color(153,207,219),color(149,153,173),color(82,100,117),color(210,240,240),color(159,241,255)];
  createCanvas(1600, 800);
  background(0);
  noStroke();
  var p = createP("What do you want from me? ");
  var p1 = createP("Similar quistions like this came from the scientist we’ve been paired up.");
  var p2 = createP("I don’t know. That’s my answer, sincerely. As designer or artist, we are always looking for some inspiration, which could be anything. Not just visual elements, it’s actually limitless. Let’s say, a phrase.");
  // print(p);
  // p.element("1");

  p.style('color','#c3f8ff');
  p.style('font-family','Montserrat','sans-serif');
  p.style('font-size','58pt');
  p.style('font-weight','700');
  p.style('font-style','italic');
  p.position(20,-50);
  
  p1.position(20,80);
  p1.style('margin-right','60%');
  p1.style('color','#c3f8ff');
  p1.style('font-size','36pt');
  p1.style('font-weight','400');
  p1.style('font-family','Montserrat','sans-serif');
  // p1.style('background-color','#526475');
  
  p2.position(20,320);
  p2.style('margin-right','40%');
  p2.style('color','#c3f8ff');
  p2.style('font-size','36pt');
  p2.style('font-weight','400');
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
  }
  
}

function draw() {
  background(0);

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
  image(img2,500,260);
  image(img,500,100);
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
  this.y = random(-height*0.4,height*0.4);
  this.w = random(5,15);
  this.c = colorShift(random(col2));
  
  this.show = function(){
  fill(this.c);
  push();
  translate(width * 0.6, height *0.5);
  ellipse(this.x,this.y,this.w);
  pop();
  }
}

function Square(){
  this.x = random(width);
  this.y = random(height);
  if(random(1)<0.5){
      this.w = random(5,20);
      this.h = random(20,80);
    }else{
      this.w = random(40,100);
      this.h = random(5,10);
    }

  this.c = colorShift(random(col));
  
  this.show = function(){
  fill(this.c);
  rect(this.x,this.y,this.w,this.h);
  }
}

function Space(){
  this.x = random(width*0.1,width*0.5);
  this.w = random(160,220);
  this.h = random(80,120);
  this.c = colorShift(random(col3));
  this.r = PI * random(2);
  this.m = random(0.001);
  this.show = function(){
  fill(this.c);
  push();
  translate(width * 0.6, height*0.3);
  rotate(this.r);
  rect(this.x,0,this.w,this.h);
  pop();
  }
}

function Stroke(){
  this.x = random(0.2,0.8);
  this.y = random(0.2,0.6);
  this.tx = width * 0.6;
  this.ty = height *0.3;
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
      var h = width/this.j;
      rect(h*this.x*j,0,h*this.y,this.w);
      // c = colorShift(random(col3));
      // fill(c);
      // rect(random(width*0.1,width*0.5),0,random(160,220),random(80,120));
    }
  pop();
  }
}
