

//---------------------P5 CODE----------------------
//based on the tutorial by Daniel Schiffman (fft analyzer): https://www.youtube.com/watch?v=2O3nm0Nvbi4&t=487s
//preload the audio clip to be played and used in
preload = () => {
  sound = loadSound("assets/audio/baraha.wav");
  img = loadImage("assets/nyuad-bg.jpg");
}

let fft,y = 0, w,x;
setup = () => {
  colorMode(HSB);
  let canvas = createCanvas(windowWidth, windowHeight);
  let yPos = windowHeight*0.2;//center the canvas in the middle of the page
  canvas.position(0,0);
  fft = new p5.FFT(0.9,1024);
  let soundSpectrum = fft.analyze();
  w = width/(soundSpectrum.length-2);
  sound.amp(3);
}

let waveform,y2,green;
draw = () => {

  background(img);
  soundSpectrum = fft.analyze();
  for (let i = 0; i < soundSpectrum.length; i++){
    y = map(soundSpectrum[i], 0,256, height/2,0);
    y2 = map(soundSpectrum[i],0,256,0,height/2);
    x = map(i,0,soundSpectrum.length, 0,width);
    green = map(i,0, soundSpectrum.length, 0,127);
    noStroke();
    fill(255,green,255);
    rect(x,y,w-2,(height/2)-y);
    stroke(255);
    noStroke();
    rect(x,height/2, w-2,(height/2)-y);
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

  // sound.onended(() => {
  //   $("#playbutton").html('<i class="fas fa-redo"></i>');
  // });
}
//---------------------P5 CODE----------------------



//---------------------JQUERY CODE----------------------
$("#playbutton").click(() =>{
  if (sound.isPlaying()){
    sound.pause();
    $("#playbutton").html('<i class="fas fa-play"></i>');
  }else{
    sound.play();
    $("#playbutton").html('<i class="fas fa-pause"></i>');
  }
});

//---------------------JQUERY CODE----------------------
