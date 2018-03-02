

//---------------------P5 CODE----------------------
//based on the tutorial by Daniel Schiffman (fft analyzer): https://www.youtube.com/watch?v=2O3nm0Nvbi4&t=487s
//preload the audio clip to be played and used in
let sound = new p5.SoundFile();
preload = () => {
  sound = loadSound("assets/audio/baraha.wav");
  img = loadImage("assets/nyuad-bg.jpg");
}

let fft,y, w,x; //create all globabl variables
setup = () => {

  fft = new p5.FFT(0.9,512); // create a new p5.FFT object to analyze the audio data - apply smoothing and create 1024 bins

  //Declare all the necessary variables for the skecth to create the wavy pattern.
  let soundSpectrum = [];
  //declare all the canvas and sketch related elements
  let canvas = createCanvas(windowWidth, windowHeight);
  let overlayDiv =  createDiv(""), headerDiv =  createDiv(""), linksDiv = createDiv("");
  let immersiveLink = createA('/','Immersive'), interactiveLink = createA('/interactive.html','Interactive');
  let titleDiv = createP("forty acres");

  titleDiv.class("title");
  overlayDiv.class("overlay");
  headerDiv.class("header");
  headerDiv.id("header");
  linksDiv.class("links");
  linksDiv.id("links");
  linksDiv.parent("header");

  immersiveLink.parent("links");
  immersiveLink.class("active");
  interactiveLink.parent("links");

  soundSpectrum = fft.analyze();
  sound.amp(3); //set the amplitude of the audio to 300% so that we can get enough data from the waveform to make the wave pattern
  w = width/(soundSpectrum.length-2); // this will be used for the width of each rect used to create the equalizer effect
  canvas.position(0,0); //position the canvas at 0,0 on the dom using p5.dom


}

let waveform,y2,green, currentTime = 0,x2;
let played = false;
let audioLength;
draw = () => {

  audioLength = sound.duration();
  background(img);

  soundSpectrum = fft.analyze();
  for (let i = 0; i < soundSpectrum.length; i++){
    y = map(soundSpectrum[i], 0,256, height/2,0);
    x = map(i,0,soundSpectrum.length, 0,width/2);
    noStroke();
    fill(255,255,255);
    rect((width/2)-x,y,w-2,(height/2)-y);
    noStroke();
    rect((width/2)-x,height/2, w-2,(height/2)-y);

    noStroke();
    rect(x+(width/2),y,w-2,(height/2)-y);
    noStroke();
    rect(x+(width/2),height/2, w-2,(height/2)-y);

  }

  waveform = fft.waveform();
  noFill();
  beginShape();
  strokeWeight(1);
  for(let i = 0; i<waveform.length;i++){
    x = map(i,0,waveform.length,0,width);
    y = map(waveform[i],-1,1,0,height);
    stroke(255);

    vertex(x,y);
  }
  endShape();

  //if the audio has been played fully, change the button icon to a replay icon
  currentTime = sound.currentTime();
  if(currentTime >= audioLength-0.2){
    $("#playbutton").html('<i class="fas fa-redo"></i>');
  }
  if (sound.isPlaying()){
    $("#description").fadeOut(500);
  }else{
    $("#description").fadeIn(500);
  }
}

function keyPressed() {
  if (keyCode === 32) {
    playAudio();
  }
  return false;
}
//---------------------P5 CODE----------------------



//---------------------JQUERY CODE----------------------
playAudio = () => {
  if (sound.isPlaying()){
    sound.pause();
    $("#playbutton").html('<i class="fas fa-play"></i>');
  }else{
    sound.play();
    $("#playbutton").html('<i class="fas fa-pause"></i>');
  }
}

$("#playbutton").click(() =>{
  playAudio();
});
//---------------------JQUERY CODE----------------------
