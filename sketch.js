var fighter1X=20;
var fighter2X=300;
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


function preload(){
  mySong = loadSound('assets/bensound-highoctane.mp3');

  versus =loadImage('./assets/Versus.png');

  fighter1= loadImage(fighters1Image[fighter1Index]);

  fighter2=loadImage(fighters2Image[fighter2Index]);

  wallpaper=loadImage('./assets/scenario.jpg');

  //mySong = loadSound("./assets/Slinte_-_06_-_The_Manx_Lullaby.mp3");

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
  var dim= map(vol,0,2,width/15,width/4);


  push();
  var myText='Who\'s the strongest? Mouse decides!';
  textFont('Stalinist One');
  textAlign(CENTER);
  textSize(20);
  fill(200);
  text(myText, width/2, 550);
  pop();

  push();
  scale(2, 2);
  //image(fighter1, fighter1X, fighterY);
  //image(fighter2, fighter2X, fighterY);
  image(fighter1, fighter1X, fighterY, dim+width/40, dim+height/25);
  image(fighter2, fighter2X, fighterY, dim+width/40, dim+height/25);
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
      if(frameCount%10==0){
        fighter1Life-=10
      }
    }
  }else{
    fighter1Life=maxLife;
    fighter1Index=(fighter1Index+1)%fighters1Image.length;
    fighter1= loadImage(fighters1Image[fighter1Index]);

  }

  if(fighter2Life>0){
    if(mouseX>(midPointX+deadZone)){
      if(frameCount%10==0){
        fighter2Life-=10
      }
    }
  }else{
    fighter2Life=maxLife;
    fighter2Index=(fighter2Index+1)%fighters2Image.length;
    if(fighter2Index<0){
      fighter2Index=fighter2Index+(-1);
    }
    fighter2= loadImage(fighters2Image[fighter2Index]);

  }

  /*var myRate = map(mouseX,0,height,0,2);
  //mySong.rate(4);
  mySong.rate(myRate);
  mySong.amp(mouseX/height);*/



}


function freqGen() {
  var spectrum = frequency.analyze();
  var y=random(10,100);

  noFill();
  push();
  translate(0,y/10)
  stroke(255,153,51);
  strokeWeight(6);

  beginShape();
  for (v = 200; v < 600; v += 20) {
    vertex(v, map(spectrum[v], 180, 255, 170, 100));
  }
  endShape();
  pop();
}
