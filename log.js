var img,img2;
function preload(){
  img = loadImage('Images/1.png');
  img2 = loadImage('Images/2.png');
}
function setup() {
  createCanvas(1600, 800);
  background(0);
  var p = createP('What do you want from me?');
  // print(p);
  // p.element("1");
  p.style('color','#fff');
  p.style('font-family','Oxygen','sans-serif');
  p.style('font-size','48pt');
  p.style('font-weight','700');
  p.position(20,-50);
  for(var i = 0; i<50;i++){
    // rect();
    
    push();
    translate();
    // stroke(255);
    // strokeWeight(10);
    translate(width / 2, height / 2);
    rotate(PI / random(3.0));
    // line(width*0.5,height*0.5,width*(0.5+random(0.5)), height*0.5);
    var jMax = int(random(5));
    for(var j = 1; j<jMax;j++){
      // stroke(255-j*50)
      fill(255,random(50,255));
      var q = random(1);
      var h = width/jMax;
      // line(width/(jMax+2)*(j-1),0,width/(jMax+2)*j-50,0);
      rect(h*random(0.5,0.8)*j,0,h*random(0.5,0.8),random(5,10));
      // line(width*(1.5-q),0,width*q, 0);
    }
    pop();
  }
    
    noStroke();
  for(var l = 0; l<100;l++){
    fill(255,random(50,255));
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