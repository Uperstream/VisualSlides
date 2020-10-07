var data;
var cyclones = [];
var t = 0;
function preload(){
  data = loadJSON("Data/cyclone_tracks_global_1979-2016.json");
}

function setup() {
  createCanvas(1400,800);
  background(0);
  noStroke();
  colorMode(HSB);
  // var cyclone = data[0].positions;
  // var s = cyclone[Object.keys(cyclone)[0]].size
  // print();
  for(var i = 0;i < 5000;i++){
    var cts = [];
    var c = data[i].positions;
    for(var j = 0;j< Object.keys(c).length;j++){
      var s = c[Object.keys(c)[j]].size;
      var x = c[Object.keys(c)[j]].longitude;
      var y = c[Object.keys(c)[j]].latitude;
      var co = c[Object.keys(c)[j]].core_pressure;
      var d = c[Object.keys(c)[j]].diff_pressure;
      var cy = new CycloneInTime(x,y,s,co,d);
      cts.push(cy);
    }
    var cyc = new Cyclone(cts);
    cyclones.push(cyc);
    // cyclones.push(c);
    // sizes.push(s);
    // xs.push(x);
    // ys.push(y);
  }
  // print(Object.keys(cyclone).length);
  // ellipse(50,50,s);
  frameRate(5);
}

function draw() {
  // if(frameCount%10 ==0){
    background(0,0.2);
  // }
  push();
  translate(50,0);
  for(var i = 0;i < cyclones.length;i++){
    // for(var j = 0;j< cyclones[i].ct.length;j++){
    var rt = t%cyclones[i].ct.length;
      cyclones[i].show(rt);
    // }
  }
  pop();
  t++;
  
}

function CycloneInTime(x,y,size,core,diff){
  this.x = x;
  this.y = y;
  this.size = size;
  this.core = core;
  this.diff = diff;
}

function Cyclone (ct){
  this.ct = ct;
  this.scalar = 3.5;
  this.show = function(i){
    var col = this.ct[i].core - 800;
    fill(col,60,50,0.2);
    stroke(col,60,50,0.2);
    strokeWeight(this.ct[i].size*2);
    if(i>0){
    var pi = i-1;
    }else{
    var pi = 0;
    }
    var dis = dist(this.ct[pi].x,this.ct[pi].y,this.ct[i].x,this.ct[i].y);
    if(dis >= 100){
      noStroke();
      ellipse(this.ct[i].x*this.scalar,this.ct[i].y*this.scalar*2,this.ct[i].size*this.scalar);
    }else{
      line(this.ct[pi].x*this.scalar,this.ct[pi].y*this.scalar*2,this.ct[i].x*this.scalar,this.ct[i].y*this.scalar*2);
    }
  }
  
}