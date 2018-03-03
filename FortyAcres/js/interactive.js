
let barahaAudio = new p5.SoundFile();
let gymAudio = new p5.SoundFile();
let birdsAudio = new p5.SoundFile();
let currentAudio = new p5.SoundFile();

preload = () => {
  bgImg = loadImage("assets/palm-bg.jpg");

  //load audio clips
  barahaAudio = loadSound("assets/audio/baraha.wav");
  gymAudio = loadSound("assets/audio/gym.wav");
  birdsAudio = loadSound("assets/audio/birds.wav");
}

let fft,w,spectrum,waveform, x,x2, y;
setup = () => {
  let canvas = createCanvas(windowWidth, windowHeight);
  let overlayDiv =  createDiv(""), headerDiv =  createDiv(""), linksDiv = createDiv("");
  let immersiveLink = createA('/','Immersive'), interactiveLink = createA('/interactive.html','Interactive');
  let titleDiv = createP("forty acres");
  let barahaDiv = createDiv('<img src="assets/nyuad-bg.jpg"/>');
  let gymDiv = createDiv('<img src="assets/nyuad-bg.jpg"/>');
  let birdsDiv = createDiv('<img src="assets/palm-bg.jpg"/>');

  let playButton = createButton('<i class="fas fa-play"></i>');

  barahaDiv.class("location");
  barahaDiv.id("baraha");
  barahaDiv.position(width*0.09,(height/2)-($('#baraha').height()/2));
  barahaDiv.mouseClicked(()=>{
    playAudio(barahaAudio);
  });


  gymDiv.class("location");
  gymDiv.id("gym");
  gymDiv.position(width*0.39,(height/2)-($('#gym').height()/2));
  gymDiv.mouseClicked(()=>{
    playAudio(gymAudio);
  });

  birdsDiv.class("location");
  birdsDiv.id("birds");
  birdsDiv.position(width*0.69,(height/2)-($('#baraha').height()/2));
  birdsDiv.mouseClicked(() => {
    playAudio(birdsAudio);
  });

  titleDiv.class("title");

  //create the layout of the page
  overlayDiv.class("overlay");
  overlayDiv.id("interactive-overlay");
  headerDiv.class("header");
  headerDiv.id("header");
  linksDiv.class("links");
  linksDiv.id("links");
  linksDiv.parent("header");

  immersiveLink.parent("links");
  interactiveLink.parent("links");
  interactiveLink.class("active");
  canvas.position(0,0);

  fft = new p5.FFT(0.9, 128);
  spectrum = fft.analyze();
  w = (((width/2)*0.915) - width*0.09)/(spectrum.length-4);

  barahaAudio.amp(3);
  gymAudio.amp(2);
  birdsAudio.amp(1.5);
}

draw = () => {

  background(bgImg);

  spectrum = fft.analyze();
  for(let i = 0; i < spectrum.length; i++){
    x = map(i,0,spectrum.length,0,width/2);
    x2 = map(i,0,spectrum.length-1,width/2,width*0.915);
    y = map(spectrum[i],0,256,0,height*0.15);
    console.log(x);
    noStroke();
    fill(255,255,255);
    rect((width/2)-x,(height*0.8)-y,w-2,y);
    noStroke();
    rect((width/2)-x,height*0.8, w-2,y);
    noStroke();
    rect(x2,(height*0.8)-y,w-2,y);
    noStroke();
    rect(x2,height*0.8, w-2,y);
  }

  waveform = fft.waveform();
  beginShape();
  strokeWeight(1);
  for (let i = 0; i< waveform.length; i++){
    x = map(i,0,waveform.length-1,width*0.09,(width)*0.915);
    y = map(waveform[i],-1,1,height*0.6,height);
    stroke(255);
    vertex(x,y);
  }
  endShape();

}


playAudio = (audioFile) => {
  //check whether or not the currentAudio file is playing
  if (currentAudio.isPlaying()) {
    if (currentAudio !== audioFile){
      //if the currentAudio file is not the audio file to be played, stop the current one and play the new file
      currentAudio.stop();
      audioFile.play();
      currentAudio = audioFile;
    }else{
      //else if the current audio file is the same as the file to be played. pause it.
      currentAudio.pause();
    }

  }else{
    //else if no audio is being played then play the audio to be played
    audioFile.play();
    currentAudio = audioFile;
  }
};
