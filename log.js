var img, img2, img3;
var img4;
var col, col2, col3 = [];
var moveCols = [];
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
var gridXOff, gridYOff = 0;
var gridCenterXoff = 0;
var simulate = false;
var move = false;
var table;
var years = [];
var months = [];
var temps = [];
var counter = 1;
var lineGap = 20;
var nPPlusIndex, nIndex, nPlusIndex = 0;
var gradientA, gradientB;
var gradientCenter;
var lastYear = false;

// var simulateBtn;

function preload() {
  img = loadImage('Images/1.png');
  img2 = loadImage('Images/2.png');
  img3 = loadImage('Images/3.png');
  img4 = loadImage('Images/4.png');
  table = loadTable('tempGlobal.csv', 'csv', 'header');
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight*3.2);
  background(0);
}

function setup() {
  // createCanvas(windowWidth, 2400);
  createCanvas(windowWidth, windowHeight*3.2);
  // print(table.getRowCount() + ' total rows in table');
  // print(table.getColumnCount() + ' total columns in table');
  textFont('Charter-Bold',16);
  moveCols = [color(88,81,61),color(196,190,161),color(68,66,43),color(105,92,39),color(148,114,77)];
  for (var k = 0; k < table.getRowCount(); k++) {
    var row = table.getRow(k).arr;
    years[k] = row[0];
    // temps[k] =
  }

  table.removeColumn('Year');
  table.removeColumn('J-D');
  table.removeColumn('D-N');
  table.removeColumn('DJF');
  table.removeColumn('MAM');
  table.removeColumn('JJA');
  table.removeColumn('SON');
  for (var l = 0; l < table.getRowCount(); l++) {
    // var row = table.getRow(l).arr;
    for (var m = 0; m < table.getColumnCount(); m++) {
      temps.push(table.getArray()[l][m]);
      months.push(years[l] + '.' + table.columns[m]);
    }
    // temps[k] =
  }
  // print(temps.length);
  // print(temps[temps.length-1])
  // print(months);

  cols = floor(windowWidth*0.7 / scl);
  rows = floor(windowHeight*0.8 / scl);
  gridXOff = 80;
  gridCenterXoff = (width - 1000) * 0.5 - 80;
  gridYOff = windowHeight + (windowHeight*0.2) * 0.5 + 20;
  // canvas.position(0,0);
  background(0);

  var simulateBtn = select(".cta", "#part2");
  simulateBtn.mousePressed(simulateStart);
  var moveBtn = select(".cta", "#part3");
  moveBtn.mousePressed(moveStart);
  var bot = select("#bot");
  // bot.style("height","10vh");
  bot.position(0,windowHeight*3.2);
  // var end = select("#end");
  // end.style("margin","0");

  noStroke();

  col = [color(0, 7, 37), color(2, 131, 242), color(84, 236, 255), color(121, 228, 255), color(10, 18, 20), color(153, 207, 219)];
  col2 = [color(255, 252, 121), color(245, 137, 73), color(96, 79, 85)];
  col3 = [color(153, 207, 219), color(149, 153, 173), color(82, 100, 117), color(210, 240, 240), color(159, 241, 255)];
  col4 = [color(153, 52, 52), color(97, 160, 61), color(60, 137, 170), color(183, 177, 75), color(91, 75, 173), color(167, 198, 71), color(193, 119, 30), color(216, 216, 216)];
  col5 = [color(91, 71, 41), color(91, 48, 63), color(121, 126, 132), color(71, 110, 86)];
  col6 = [color(40, 95, 80), color(40, 75, 100)];

  for (var i = 0; i < 50; i++) {
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
  for (var j = 0; j < 200; j++) {
    var s = new Circle();
    circles.push(s);
    s.show();
    var sqr = new Square();
    squares.push(sqr);
    sqr.show();

  }

  flowfield = new Array(cols * rows);

  gradientA = color(0, 82, 127);
  gradientB = color(218, 219, 213);
  gradientCenter = createVector(gridXOff + 250, gridYOff - 550);

}

function draw() {
  // background(0);
  noStroke();
  // background(0);
  // fill(0);
  background(0, 20);
  // fill(0,20);
  rectMode(CORNER);
  // fill(0,10);
  // rect(0,0,width,800);
  // rect(0,800,width,800);
  // if(frameCount%10 == 0){
  //   rect(0,800,width,800);
  // }
  // noStroke();

  image(img3, width * 0.35, windowHeight*0.08);



  for (var l = 0; l < spaces.length; l++) {
    spaces[l].x += cos(millis() * spaces[l].m) * noise(spaces[l].x);
    spaces[l].y += sin(millis() * spaces[l].m) * noise(spaces[l].y);
    spaces[l].show();
  }
  for (var j = 0; j < strokes.length; j++) {
    strokes[j].x += 0.001 * sin(millis() * (0.001));
    strokes[j].y += 0.001 * cos(millis() * (0.001));
    strokes[j].tx += sin(millis() * random(0.001)) * noise(strokes[j].tx);
    strokes[j].ty += cos(millis() * random(0.001)) * noise(strokes[j].ty);
    strokes[j].show();
  }
  image(img2, width * 0.35, windowHeight*0.325);
  image(img, width * 0.35, windowHeight*0.125);

  for (var k = 0; k < squares.length; k++) {
    squares[k].x += sin(millis() * random(0.001)) * noise(squares[k].x);
    squares[k].y += cos(millis() * random(0.001)) * noise(squares[k].y);
    squares[k].show();
  }
  for (var i = 0; i < circles.length; i++) {
    circles[i].x += sin(millis() * random(0.001));
    circles[i].y += cos(millis() * random(0.001));
    circles[i].show();
  }

  // if(frameCount%5 == 0){
  push();
  translate(gridXOff, gridYOff);

  var yoff = 0;
  for (var y = 0; y < rows; y++) {
    var xoff = 0;
    // stroke(gradientB);
    // line(scl*-noise(xoff,yoff,zoff), y*scl-20, scl*x+scl*-noise(xoff,yoff,zoff), y*scl-20);
    // line( 445+y*scl-20,-10,  445+y*scl-20,scl*x*0.55-10);
    for (var x = 0; x < cols; x++) {
      var index = x + y * cols;
      var v = createVector(x - cols * 0.5, y - rows * 0.5);
      // v.normalize();
      var noiseCurrent = noise(xoff, yoff, zoff);
      var angle = noiseCurrent * TWO_PI;
      if(!simulate){
        v = p5.Vector.fromAngle(angle + v.heading());
        // v.setMag(0.1);
        flowfield[index] = v;
      }else{
        if(y%2===0){
          v = p5.Vector.fromAngle( x%2 *  0.5*PI + 0.25*PI);
        }else{
          v = p5.Vector.fromAngle( x%2 *  -0.5*PI - 0.25*PI);
        }
        angle *= constrain(map(dist(mouseX,mouseY,x*scl+gridXOff,y*scl+gridYOff),0,300,1,0),0,20)*20;
        // angle = 0;        
        // text(dist(mouseX,mouseY,x*scl+gridXOff,y*scl+gridYOff), x*scl+gridXOff,y*scl+gridYOff);
        
        v = p5.Vector.fromAngle(angle + v.heading());
        // v = p5.Vector.fromAngle( ((x%2)-(y%2)) *  0.5*PI + 0.25*PI);
        // v = createVector(cols * 0.5 - x, rows * 0.5 - y);
        flowfield[index] = v;
      }
      // v.add(a);
      xoff += 0.1;

      // stroke(random(col));
      if (!simulate && !move) {
        push();
        translate(x * scl, y * scl);
        translate(scl * -noiseCurrent, scl * -noiseCurrent);
        // noStroke();

        // fill(gradientB);
        // rect(2,2,scl,scl);
        var gradientDis = gradientCenter.dist(createVector(x * scl, y * scl));
        gradientDis = map(gradientDis, 0, width*0.3, 0, 1);
        var gradient = lerpColor(gradientA, gradientB, gradientDis * (0.6 + 0.4 * map(noiseCurrent, 0, 1, -1, 1)));
        fill(gradient);
        // rect(0,0,scl,scl);
        rect(0, 0, scl * 1.15, scl * 1.15);
        // stroke(gradientB);
        // noFill();


        // print(v.heading());
        strokeWeight(2);
        stroke(color(218, 219, 213, noiseCurrent * 255));
        
        // if(noise(xoff,yoff,zoff)>0.65){

        // }

        // noStroke();


        //original picture
        // if(random(1)>0.3){
        // fill(colorShift(random(col6),120));
        // // fill(2,131+sin(millis() * random(0.001))*angle*50,242+cos(millis() * random(0.001))*angle*20,random(50));
        // rectMode(CENTER);
        // if(random(1)>0.5){
        // ellipse(0,0,random(scl*1.5),random(scl*1.5));
        // }else{
        // rect(0,0,random(scl*1.5),random(scl*1.5));
        // }
        // }



        // rect(0,0,scl*(0.8+0.5*noise(xoff,yoff,zoff)),scl*(0.8+0.5*noise(xoff,yoff,zoff)));
        // fill(gradientB);
        // rect(0,0,5,random(scl*1.5));






        // stroke(2,131+sin(millis() * random(0.001))*angle*50,242+cos(millis() * random(0.001))*angle*20,50);
        // stroke(90,109,138,20);

        // rect(0,0,scl,scl);
        if (v.heading() > 0) {

          // line(0, 0, scl, 0);
          // translate(scl, scl);
          // rotate(v.heading());

          // line(scl, 0, 0, 0);
        } else {
          line(0, 0, scl, 0);
          line(scl, 0, scl, scl);
          translate(scl, scl);
          rotate(v.heading());
          line(0, 0, scl, 0);
        }

        pop();
      }else if(simulate){
        push();
        translate(x * scl, y * scl);
        translate(scl * -noiseCurrent, scl * -noiseCurrent);
        // noStroke();
        gradientA = color(171,63,84);
        gradientB = color(214,140,68);
        
        // fill(gradientB);
        // rect(2,2,scl,scl);
        gradientCenter = createVector(constrain(mouseX,gridXOff,gridXOff+cols*scl),constrain(mouseY-gridYOff,0,rows*scl));
        gradientDis = gradientCenter.dist(createVector(x * scl, y * scl));
        gradientDis = map(gradientDis, 0, width*0.3, 0, 1);
        gradient = lerpColor(gradientA, gradientB, gradientDis * (0.6 + 0.4 * map(noiseCurrent, 0, 1, -1, 1)));
        fill(gradient);
        rect(0, 0, scl * 1.15, scl * 1.15);
        
        //debugStroke
        strokeWeight(2);
        stroke(color(53,186,185,noiseCurrent*255));
        // rotate(v.heading());
        // line(0, 0, scl, 0);
        line(0, 0, scl, 0);
        line(scl, 0, scl, scl);
        if (v.heading() > 0) {

          // line(0, 0, scl, 0);
          rotate(v.heading());
          line(scl, 0, 0, 0);
        } else {

          rotate(v.heading());
          line(0, 0, scl, 0);
        }

        pop();
      }
    }
    yoff += 0.1;
  }
  zoff += 0.01;
  // image(img4,img4.width*0.2,0,img4.width*0.78,img4.height*0.78);
  pop();

  // }
  // fill(62,82,91);
  for(var n = 0; n < 10; n++){
    var bgGradient = lerpColor(color(62,82,91),color(216,176,124),n*0.1);
    fill(bgGradient);
    rect(0,windowHeight*2.3+n*40,width,windowHeight*0.2);
  }

  // print(flowfield[0]);
  for (var m = particles.length-1; m > 0; m--) {
    // particles[m].x += sin(millis() * random(0.001)) ;
    // particles[m].y += cos(millis() * random(0.001)) ;
    if (move) {
      particles[m].move();
      particles[m].moveEdges();
      particles[m].update();
      particles[m].show();
      if(!particles[m].alive){
        particles.splice(m,1);
      }
    } else {
      particles[m].follow(flowfield);
      particles[m].edges();
      particles[m].update();
      particles[m].show();
    }

  }

  stroke(255);
  noFill();
  line(0, windowHeight*2.3, width, windowHeight*2.3);
  // if(frameCount%30===0){
  if (nPlusIndex < temps.length&&move) {
    counter += 0.001 + map(counter,0,24,0,0.1);
    // counter +=1;
    // print(counter);
  }
  // }
  fill(30,61,63);
  noStroke();
  rect(0,windowHeight*2.95,width,windowHeight*0.25);
  textSize(160);
  fill(19,31,51);
  textAlign(CENTER);
  text("SURVIOR:"+particles.length,width*0.5,windowHeight*3.2);
  fill(37,124,120);
  textAlign(RIGHT);
  textSize(32);
  text("Temperature Anomaly",width,windowHeight*3.05);
  textSize(20);
  textAlign(LEFT);
  for (var n = 0; n < width / lineGap; n++) {
    // line(n*20,2000+noise(n*(millis()*0.00001))*400,(n+1)*20,2000+noise((n+1)*(millis()*0.00001))*400);

    nIndex = (n * floor(counter));
    nPlusIndex = ((n + 1) * floor(counter));
    nPIndex = (n * floor(counter + 1));
    nPPlusIndex = ((n + 1) * floor(counter + 1));
    // stroke(200);
    if(nPIndex < 1684){
    fill(30,61,63);
    var x1 = n * lineGap;
    var y1 = windowHeight*2.75 + temps[floor(n * counter)] * -220;
    var x2 = (n + 1) * lineGap;
    var y2 = windowHeight*2.75 + temps[floor((n + 1) * counter)] * -220;
    // line(n * lineGap, windowHeight*2.75 + temps[floor(n * counter)] * -220, (n + 1) * lineGap, windowHeight*2.75 + temps[floor((n + 1) * counter)] * -220);
    quad(x1, y1, x2,y2, x2,windowHeight*2.95,x1,windowHeight*2.95);
    
    fill(37,124,120);
    if (n % 6 == 1) {
      text(months[floor(n * counter)], x1 , windowHeight*3.09);
      // linedash(x1,y1,x1,windowHeight*3.05, 5,'-');
    }}else{
      fill(30,61,63);
      // rect(x2,y2,60,200);
      quad(x2,y2,width,y2, width,windowHeight*2.95,x2,windowHeight*2.95);
      rect(x1, windowHeight*3.07,100,30);
      fill(37,124,120);
      text(months[1684], x1 , windowHeight*3.09);
      lastYear = true;
    }

    // lands[n] = createVector(n*20,2000+noise(n*(millis()*0.00001))*400); 
    lands[n] = createVector(n * lineGap, windowHeight*2.75 + temps[floor(n * counter)] * -220);
  }
  // text(temps[floor(n * counter)],x1-25,y1-10);
  stroke(37,124,120);
  strokeWeight(2);
  if(lastYear){
    line(x2-10,y2,x2+10,y2);
    linedash(x2,y2,x2,windowHeight*3, 5,'-');
    noStroke();
    text(temps[1684],x2-25,y2-10);
  }else{
    line(x1-10,y1,x1+10,y1);
    linedash(x1,y1,x1,windowHeight*3, 5,'-');
    noStroke();
    text(temps[floor(n * counter)],x1-25,y1-10);
  }

    // stroke(255,0,0);
    // line(width*0.35+gridXOff-30,windowHeight*1.5,width*0.35+gridXOff+30,windowHeight*1.5+60);
}

function colorShift(col, al,ql) {
  var qql = 0;
  if(!ql){
    qql = 10;
  }else{
    qql = ql;
  }
  r = col.levels[0] + random(-20, 20);
  g = col.levels[1] + random(-20, 20);
  b = col.levels[2] + random(-20, 20);
  a = random(qql, al);
  c = color(r, g, b, a);
  return c
}

function Circle() {
  this.x = random(-width * 0.4, width * 0.4);
  this.y = random(-height * 0.1, height * 0.1);
  this.w = random(5, 15);
  this.c = colorShift(random(col2), windowHeight* 0.15);
  this.r = random();
  if (this.r > 0.5) {
    this.c2 = colorShift(random(col3), windowHeight* 0.15);
    this.xOff = random(-5, 5);
    this.yOff = random(-5, 5);
    this.s = random(1.0, 2.0);
  }

  this.show = function() {
    push();
    translate(width * 0.6, height * 0.125);
    if (this.r > 0.5) {
      fill(this.c2);
      // rect(this.x+this.xOff,this.y+this.yOff,this.w*this.s,this.w*this.s);
      ellipse(this.x + this.xOff, this.y + this.yOff, this.w * this.s);
    }
    fill(this.c);
    ellipse(this.x, this.y, this.w);
    pop();
  }
}

function Square() {
  this.x = random(width);
  this.y = random(height * 0.25);
  this.r = PI * random(2);
  if (random(1) < 0.5) {
    this.w = random(5, 20);
    this.h = random(20, 80);
    this.xOff = random(20);
    this.yOff = random(5);
    this.s = random(0.2, .4);
  } else {
    this.w = random(40, 100);
    this.h = random(5, 10);
    this.xOff = random(5);
    this.yOff = random(10);
    this.s = random(0.4, 0.8);
  }

  this.c = colorShift(random(col), 120);
  this.c2 = colorShift(random(col2), 120);

  this.show = function() {
    fill(this.c);
    // push();
    // translate(width * 0.6, height*0.3);
    // rotate(this.r);
    rect(this.x, this.y, this.w, this.h);
    fill(this.c2);
    rect(this.x + this.xOff, this.y + this.yOff, this.w * this.s, this.h * this.s);
    // pop();
  }
}

function Space() {
  this.x = random(width * 0.1, width * 0.3);
  this.w = random(160, 220);
  this.h = random(80, 120);
  this.c = colorShift(random(col3), 80);
  this.r = PI * random();
  this.m = random(0.001);
  this.show = function() {
    fill(this.c);
    push();
    translate(width * 0.6, height * 0.075);
    rotate(this.r);
    rect(this.x, 0, this.w, this.h);
    pop();
  }
}

function Stroke() {
  this.x = random(0.2, 0.8);
  this.y = random(0.2, 0.6);
  this.tx = width * 0.6;
  this.ty = height * 0.075;
  this.w = random(5, 10);
  this.c = colorShift(random(col), 120);
  this.r = PI * random(2);
  this.j = int(random(5));

  this.show = function() {
    fill(this.c);
    push();
    translate(this.tx, this.ty);
    rotate(this.r);
    // ellipse(this.x,this.y,this.w);
    for (var j = 1; j < this.j; j++) {
      var h = width * 0.8 / this.j;
      rect(h * this.x * j, 0, h * this.y, this.w);
      // c = colorShift(random(col3));
      // fill(c);
      // rect(random(width*0.1,width*0.5),0,random(160,220),random(80,120));
    }
    pop();
  }
}

function simulateStart() {
  simulate = true;
  move = false;
  for (var m = 0; m < particles.length; m++) {
    particles[m].setMove(gridXOff+scl,gridXOff+(cols-1)*scl,gridYOff+scl,gridYOff+(rows-1)*scl);
    particles[m].sizeScalar=random(1,1.5);
    // particles[m].colorLight = colorShift(color(216,166,150),255,255);
    particles[m].maxSpeed = 2;
    // gridXOff,gridXOff+cols*scl),constrain(mouseY-gridYOff,0,rows*scl)
  }
}

function moveStart() {
  simulate = false;
  move = true;
  for (var m = 0; m < particles.length; m++) {
    particles[m].setMove(0,width,windowHeight*2.25,windowHeight*2.875);
    particles[m].maxSpeed = 1;
    // particles[m].sizeScalar *= 0.5;
  }
  var moveBtn = select(".cta", "#part3");
  moveBtn.style('display','none');
  
}

function linedash(x1, y1, x2, y2, delta, style) {
  // delta is both the length of a dash, the distance between 2 dots/dashes, and the diameter of a round
  var distances = dist(x1,y1,x2,y2);
  var dashNumber = distances/delta;
  var xDelta = (x2-x1)/dashNumber;
  var yDelta = (y2-y1)/dashNumber;

  for (var i = 0; i < dashNumber; i+= 2) {
    var xi1 = i*xDelta + x1;
    var yi1 = i*yDelta + y1;
    var xi2 = (i+1)*xDelta + x1;
    var yi2 = (i+1)*yDelta + y1;

    if (style == '-') { line(xi1, yi1, xi2, yi2); }
    else if (style == '.') { point(xi1, yi1); }
    else if (style == 'o') { ellipse(xi1, yi1, delta/2); }
  }
}

function mouseClicked() {
  // saveCanvas('mycanvas', 'jpg');
  // save("log.jpg");
  // print(mouseX);
  // print(mouseY);
}

// let myp5 = new p5(s, 'p5sketch');
