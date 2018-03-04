
let libraryAudio = new p5.SoundFile();
let highlineAudio = new p5.SoundFile();
let palmTreesAudio = new p5.SoundFile();
let currentAudio = new p5.SoundFile();

preload = () => {
  bgImg = loadImage("assets/palm-bg.jpg");

  //load audio clips
  libraryAudio = loadSound("assets/audio/library.mp3");
  highlineAudio = loadSound("assets/audio/highline.mp3");
  palmTreesAudio = loadSound("assets/audio/palm-trees.mp3");
}

let fft,w,spectrum,waveform, x,x2, y;
setup = () => {
  let canvas = createCanvas(windowWidth, windowHeight);
  let overlayDiv =  createDiv(""), headerDiv =  createDiv(""), linksDiv = createDiv("");
  let immersiveLink = createA('/','Immersive'), interactiveLink = createA('/interactive.html','Interactive');
  let titleDiv = createP("forty acres");
  let libraryDiv = createDiv('<img src="assets/nyuad-bg.jpg"/>');
  let highlineDiv = createDiv('<img src="assets/nyuad-bg.jpg"/>');
  let palmTreesDiv = createDiv('<img src="assets/palm-bg.jpg"/>');
  let playButton = createButton('<i class="fas fa-play"></i>');

  libraryDiv.class("location");
  libraryDiv.id("library");
  libraryDiv.position(width*0.09,(height/2)-($('#library').height()/2));
  libraryDiv.mouseClicked(()=>{
    playAudio(libraryAudio);
  });

  playButton.parent("library");


  highlineDiv.class("location");
  highlineDiv.id("highline");
  highlineDiv.position(width*0.39,(height/2)-($('#highline').height()/2));
  highlineDiv.mouseClicked(()=>{
    playAudio(highlineAudio);
  });

  palmTreesDiv.class("location");
  palmTreesDiv.id("palmTrees");
  palmTreesDiv.position(width*0.69,(height/2)-($('#library').height()/2));
  palmTreesDiv.mouseClicked(() => {
    playAudio(palmTreesAudio);
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

  libraryAudio.amp(3);
  highlineAudio.amp(2);
  palmTreesAudio.amp(1.5);
}

draw = () => {

  background(bgImg);

  spectrum = fft.analyze();
  for(let i = 0; i < spectrum.length; i++){
    x = map(i,0,spectrum.length,0,width/2);
    x2 = map(i,0,spectrum.length-1,width/2,width*0.915);
    y = map(spectrum[i],0,256,0,height*0.15);
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
