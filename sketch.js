var fighter1X=20;
var fighter2X=380;
var fighterY=100;
var fighters1Image=['./assets/ryu.png', './assets/akuma.png', './assets/zangief.png', './assets/balrog.png', './assets/vega.png', './assets/blanka.png', './assets/sagat.png', './assets/cammy.png'];
var fighters2Image=['./assets/ken.png', './assets/long.png', './assets/chun.png', './assets/dahlsim.png', './assets/deejay.png', './assets/guile.png', './assets/hawk.png', './assets/honda.png'];
var fighter1Index=0;
var fighter2Index=fighters2Image.length-1;
var fft;
var mySong;
var frequency;
var fighter1Life=300;
var fighter2Life=300;
var maxLife=300;
var versus;
var midPointX=400;
var deadZone=50;
var wallpaper;
var amp;
var fighter1Victory=0;
var fighter2Victory=0

function preload(){
  mySong = loadSound('assets/bensound-highoctane.mp3');

  versus =loadImage('./assets/Versus.png');

  fighter1= loadImage(fighters1Image[fighter1Index]);

  fighter2=loadImage(fighters2Image[fighter2Index]);

  wallpaper=loadImage('./assets/scenario.jpg');

}

function setup() {
  mySong.play();
  createCanvas(800, 600);

  analyser=new p5.Amplitude();
  analyser.setInput(mySong);
  frequency = new p5.FFT();
  frequency.setInput(mySong);
  amp=new p5.Amplitude;


}

function draw() {
  image(wallpaper, 0, 0);
  //background(85,104,50);
  var vol= amp.getLevel();
  var dim= map(vol,0,1,width/15,width/4);

  push();
  noStroke();
  textFont('Stalinist One');
  textAlign(CENTER);
  textSize(40);
  fill(255);
  text(fighter1Victory, 50, 70);
  pop();

  push();
  noStroke();
  textFont('Stalinist One');
  textAlign(CENTER);
  textSize(40);
  fill(255);
  if(fighter2Victory<10){
  text(fighter2Victory, 750, 70);
}else{
  text(fighter2Victory, 740, 70);
}
  pop();



  push();
  var myText='Who\'s the strongest? Mouse decides!';
  noStroke();
  textFont('Stalinist One');
  textAlign(CENTER);
  textSize(20);
  fill(255);
  text(myText, width/2, 550);
  pop();

  push();
  scale(2, 2);
  if(mouseX<(midPointX-deadZone)){
    image(fighter1, fighter1X, fighterY);
  } else {
    image(fighter1, fighter1X, fighterY, dim+width/40, dim+height/25);
  }
  if(mouseX>(midPointX+deadZone)){
    image(fighter2, fighter2X-fighter2.width, fighterY);
  } else {
    image(fighter2, fighter2X, fighterY, -(dim+width/40), dim+height/25);
  }
  pop();

  push();
  scale(0.3, 0.3);
  image(versus, 1100, 180);
  pop();

  if (mySong.isPlaying() == true) {
    //mySong.play();
    noFill();
    stroke(255);
    strokeWeight(3);
    freqGen();
  }else{}

  noFill();
  strokeWeight(3);
  rect(20, 100, maxLife, 50);
  rect(480, 100, maxLife, 50);

  beginShape();
  fill(255, 0, 0);
  rect(20, 100, fighter1Life, 50);
  endShape();

  beginShape();
  fill(255, 0, 0);
  rect(480 + (maxLife-fighter2Life), 100, fighter2Life, 50);
  endShape();

  if(fighter1Life>0){
    if(mouseX<(midPointX-deadZone)){
      if(dim>width/8){
        fighter1Life-=dim/15;
      }
    }
  }else{
    fighter1Life=maxLife;
    fighter1Index=(fighter1Index+1)%fighters1Image.length;
    fighter1= loadImage(fighters1Image[fighter1Index]);
    fighter2Victory++;
  }

  if(fighter2Life>0){
    if(mouseX>(midPointX+deadZone)){
      if(dim>width/8){
        fighter2Life-=dim/15;
      }
    }
  }else{
    fighter2Life=maxLife;
    fighter2Index=(fighter2Index+1)%fighters2Image.length;

    if(fighter2Index<0){
      fighter2Index=fighter2Index+(-1);
    }
    fighter2= loadImage(fighters2Image[fighter2Index]);
    fighter1Victory++;
  }
}

function freqGen() {
  var spectrum = frequency.analyze();

  push();
  strokeWeight(6);

  beginShape();
  for (v = 200; v < 600; v += 20) {
    stroke(spectrum[v]*2,10,10);
    strokeWeight(spectrum[v]/10);
    vertex(v, map(spectrum[v], 200, 255, 170, 100));
  }
  endShape();
  pop();
}
