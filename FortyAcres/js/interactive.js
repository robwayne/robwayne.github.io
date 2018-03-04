
//Declaring global audio variables so they can be used inside the playAudio function
let libraryAudio = new p5.SoundFile();
let highlineAudio = new p5.SoundFile();
let palmTreesAudio = new p5.SoundFile();
let barahaAudio = new p5.SoundFile();
let d2Audio = new p5.SoundFile();
let libCafeAudio = new p5.SoundFile();
let currentAudio = new p5.SoundFile();
preload = () => {
  bgImg = loadImage("assets/palm-bg.jpg");

  //load audio clips
  libraryAudio = loadSound("assets/audio/library.mp3");
  highlineAudio = loadSound("assets/audio/highline.mp3");
  palmTreesAudio = loadSound("assets/audio/palm-trees.mp3");
  libCafeAudio = loadSound("assets/audio/lib-cafe.mp3");
  d2Audio = loadSound("assets/audio/d2.mp3");
  barahaAudio = loadSound("assets/audio/baraha.mp3");
  currentAudio = libraryAudio; //initialize it to libraryAudio so that it is not null when loaded into the draw() function and is.playing is called

}

//declare variables outside the setup function as globals - rather than inside the draw() function so they arent declared everytime the loop runs
let fft,w,spectrum,waveform, x,x2, y;
setup = () => {

  let canvas = createCanvas(windowWidth, windowHeight);
  let overlayDiv =  createDiv(""), headerDiv =  createDiv(""), linksDiv = createDiv("");
  let immersiveLink = createA('/','Immersive'), interactiveLink = createA('/interactive.html','Interactive');
  let titleDiv = createP("forty acres");
  let libraryDiv = createDiv('<img src="assets/library.jpg"/>');
  let highlineDiv = createDiv('<img src="assets/highline.jpg"/>');
  let palmTreesDiv = createDiv('<img src="assets/palm-trees.jpg"/>');

  let libCafeDiv = createDiv('<img src="assets/lib-cafe.jpg"/>');
  let d2Div = createDiv('<img src="assets/d2.jpg"/>');
  let barahaDiv = createDiv('<img src="assets/baraha.jpg"/>');
  audioTitleDiv = createDiv("");
  let audioTitleP = createP("");
  let playButton = createButton('<i class="fas fa-play"></i>');

  audioTitleDiv.class("audio-title");
  audioTitleDiv.id("audio-title");
  audioTitleP.parent("audio-title");
  audioTitleDiv.position(0, height*0.85);
  audioTitleDiv.center('horizontal');

  playButton.parent("audio-title");
  playButton.class("audio-button");
  playButton.id("audio-button");
  playButton.mouseClicked(() => {
    playAudio(currentAudio);
  });

  libraryDiv.class("location");
  libraryDiv.id("library");
  libraryDiv.position(width*0.09,(height/2)-($('#library').height()*1.2));
  libraryDiv.mouseClicked(()=>{
    audioTitleP.html("Library");
    playAudio(libraryAudio);
  });

  highlineDiv.class("location");
  highlineDiv.id("highline");
  highlineDiv.position(width*0.42,(height/2)-($('#highline').height()*1.2));
  highlineDiv.mouseClicked(()=>{
    audioTitleP.html("Highline");
    playAudio(highlineAudio);
  });

  palmTreesDiv.class("location");
  palmTreesDiv.id("palmTrees");
  palmTreesDiv.position(width*0.72,(height/2)-($('#palmTrees').height()*1.2));
  palmTreesDiv.mouseClicked(() => {
    audioTitleP.html("Palm Trees");
    playAudio(palmTreesAudio);
  });

  libCafeDiv.class("location");
  libCafeDiv.id("lib-cafe");
  libCafeDiv.position(width*0.09,(height/2)+($('#lib-cafe').height()*0.05));
  libCafeDiv.mouseClicked(()=>{
    audioTitleP.html("Library Café");
    playAudio(libCafeAudio);
  });

  d2Div.class("location");
  d2Div.id("d2");
  d2Div.position(width*0.42,(height/2)+($('#d2').height()*0.05));
  d2Div.mouseClicked(()=>{
    audioTitleP.html("Dining Hall (D2)");
    playAudio(d2Audio);
  });

  barahaDiv.class("location");
  barahaDiv.id("baraha");
  barahaDiv.position(width*0.72,(height/2)+($('#baraha').height()*0.05));
  barahaDiv.mouseClicked(() => {
    audioTitleP.html("Baraha");
    playAudio(barahaAudio);
  });

  titleDiv.class("title");
  titleDiv.id("interactive-title");

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
  highlineAudio.amp(1.5);
  palmTreesAudio.amp(1.5);

  $("#audio-title").hide();
}

draw = () => {

  background(bgImg);

  spectrum = fft.analyze();
  for(let i = 0; i < spectrum.length; i++){
    x = map(i,0,spectrum.length,0,width/2);
    x2 = map(i,0,spectrum.length-1,width/2,width*0.87);
    y = map(spectrum[i],0,256,0,height*0.05);
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
  for (let i = 0; i < waveform.length; i++){
    x = map(i,0,waveform.length-1,width*0.09,(width)*0.87);
    y = map(waveform[i],-1,1,height*0.6,height);
    stroke(255);
    vertex(x,y);
  }
  endShape();

  if (currentAudio.isPlaying()){
    $("#audio-title").fadeIn(500);
  }

}


playAudio = (audioFile) => {
  //check whether or not the currentAudio file is playing
  if (currentAudio.isPlaying()) {
    if (currentAudio !== audioFile){
      //if the currentAudio file is not the audio file to be played, stop the current one and play the new file
      currentAudio.stop();
      audioFile.play();
      $("#audio-button").html('<i class="fas fa-pause"></i>');
      currentAudio = audioFile;
    }else{
      //else if the current audio file is the same as the file to be played. pause it.
      currentAudio.pause();
      $("#audio-button").html('<i class="fas fa-play"></i>');
    }

  }else{
    //else if no audio is being played then play the audio to be played
    audioFile.play();
    $("#audio-button").html('<i class="fas fa-pause"></i>');
    currentAudio = audioFile;
  }
}
