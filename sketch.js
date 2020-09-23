var img;
var a = ['D', 'i', 'g', 'i', 't', 'a', 'l', 'L', 'e', 'a', 'k', 'R', 'e', 's', 'p', 'o', 'n', 'd', 'i', 'n', 'g'];
var q = [4, 9, 7, 9, 20, 1, 12, 12, 5, 1, 11, 18, 5, 19, 16, 15, 14, 4, 9, 14, 7];

function setup() {
  createCanvas(550, 500);
  background(0);
  colorMode(HSB);
  img = loadImage("1.png");

  for (i = 0; i <= 21; i++) {
    stroke(0);
    fill(48,80,64);
    ellipse(25 * (i+1), 100, q[i] * 2, q[i] * 2);
    fill(q[i]*13.85,80,80);
    rect(25 * (i+1)-15, 140,  25,q[i] * 2);
    noStroke();
    fill(q[i]*13.85,q[i]*3.85,100-q[i]*3.85);
    rect(25 * (i+1)-15, 220-q[i],  25,q[i] * 2);
    fill(50,255);
    ellipse(25 * (i+1), 300+map(q[i],0,26,-20,20), 5,5);
  }
}

function draw() {
  var t  = millis();
  image(img, 0, 0, img.width*0.51, img.height*0.51);
  fill(0);
  rect(0,320,550,200);
    for (i = 0; i <= 21; i++) {
    fill(q[i]*13.85,q[i]*3.85,120-q[i]*3.85,map(q[i],0,26,0.2,0.8));
    ellipse(25 * (i+1), 380+sin(t/500*(q[i]*0.1))*(q[i]), q[i] * 2, q[i] * 2);
    var off =sin(t/300*(q[i]*0.01));
    rect(25 * (i+1)-15, 380-q[i]*off*2,  25,q[i] * off * 4);

    fill(100,map(q[i],0,26,0.2,0.8));
            textSize(map(q[i],0,26,36,10));
    push();
    

    translate(25 * (i+1), 380);
    rotate(t/500*(q[i]*(1-0.9)));
    ellipse(0,map(q[i],0,26,-20,20), 5,5);
    
    pop();
    fill(200,map(q[i],0,26,0.8,0.2));
        text(''+a[i]+'',25 * (i+1)+sin(t/500*(q[i]*0.05))*(q[i]),380+sin(t/500));

    
    
  }
}