// takes the darkest points on a camera and renders them into circles; circles size varies based off of sound
// code developed from:
// Learning Processing   Daniel Shiffman  http://www.learningprocessing.com  Example 20-9: Mic input
//https://github.com/ITPNYU/ICM-2015/blob/master/09_video_sound/01_sound/example_20_09_mic_input/sketch.js
// and code by Daniel O'Sullivan for ITP ICM course https://github.com/ITPNYU/ICM-2015/wiki/Homework-Dano-Wednesday

var vid; //element to hold video
var img; //element to hold image
var canvas; // element to hold canvas
var pixelToSkip = 5;
var micInput;

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  canvas.position(0, 0);
  //noCanvas();
  //createCanvas(640, 480);
  vid = createCapture(VIDEO);
  devicePixelScaling(false);
  //vid.position(0, 0);
  canvas.child(vid);
  vid.size(width, height);
  //vid.position(canvas.width/2, canvas.height/2);
  vid.hide();
  micInput = new p5.AudioIn();
  micInput.start();
}

function draw() {
background(255, 0, 0);
//load the pixels from the camera image
  vid.loadPixels();
// go line by line of that image to get the pixel properties, but skip some to limit results
  for (var y = 0; y < vid.height; y = y+pixelToSkip) {
    for (var x = 0; x < vid.width; x = x+pixelToSkip){
      var pixelArray = vid.get(x, y);
//store those pixel properties with a variable name of red, green, blue      
      var r = pixelArray[0];
      var g = pixelArray[1];
      var b = pixelArray[2];
//find the darkest pixels and draw an ellipse there
      if (r+g+b-255 < 0){ 
      var vol = micInput.getLevel();
      fill(255, 255, 255);
      noStroke();
      ellipse(x, y, 2+vol*100, 2+vol*100);
      }
    }
  }
}