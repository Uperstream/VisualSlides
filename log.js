var img,img2;
var col = [];
function preload(){
  img = loadImage('Images/1.png');
  img2 = loadImage('Images/2.png');
}
function colorShift(col){
  r = col.levels[0]+random(-20,20);
  g = col.levels[1]+random(-20,20);
  b = col.levels[2]+random(-20,20);
  a = random(255);
  c = color(r,g,b,a);
  return c
}
function setup() {
  col = [color(0,7,37),color(2,131,242),color(84,236,255),color(121,228,255),color(10,18,20),color(153,207,219)];
  createCanvas(1600, 800);
  background(0);
  noStroke();
  var p = createP('What do you want from me?');
  // print(p);
  // p.element("1");
  p.style('color','#c3f8ff');
  p.style('font-family','Oxygen','sans-serif');
  p.style('font-size','48pt');
  p.style('font-weight','700');
  p.position(20,-50);
  for(var i = 0; i<100;i++){
    // rect();
    
    push();
    translate();
    // stroke(255);
    // strokeWeight(10);
    translate(width * 0.6, height *0.3);
    rotate(PI / random(3.0));
    // line(width*0.5,height*0.5,width*(0.5+random(0.5)), height*0.5);
    var jMax = int(random(5));
    for(var j = 1; j<jMax;j++){
      // stroke(255-j*50)
      // fill(255,random(50,255));
      c = colorShift(random(col));
      fill(c);
      var q = random(1);
      var h = width/jMax;
      // line(width/(jMax+2)*(j-1),0,width/(jMax+2)*j-50,0);
      rect(h*random(0.5,0.8)*j,0,h*random(0.5,0.8),random(5,10));
      // line(width*(1.5-q),0,width*q, 0);
    }
    pop();
  }
    

  for(var l = 0; l<200;l++){
    // fill(255,random(50,255));
    c = colorShift(random(col));
    fill(c);
    var x = random(width);
    var y = random(height);
    if(random(1)<0.5){
    rect(x,y,random(5,20),random(20,80));
    }else{
      rect(x,y,random(40,100),random(5,10));
    }
  }
  image(img2,420,260);
  image(img,420,100);
  
}

function draw() {

}
