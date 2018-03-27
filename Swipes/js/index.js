$(document).ready(() => {

  $("#panel3-container").mouseover(()=>{
    $("#panel3-img").prop("src","assets/03_02.png");
  });

  $("#panel3-container").mouseleave(()=>{
    $("#panel3-img").prop("src","assets/03_01.png");
  });

  const panels = ["#panel1","#panel2","#panel3","#panel4","#panel5","#panel6"];
  let currentPanelIndex = 0, lastScroll = 0, scrollDelta = 5;
  let headerHeight = $("#header").outerHeight();
  let currentPanel = panels[currentPanelIndex];
  let autoScroll = true, muted = false, didScroll = false, mouseMoved = false;

  d2Audio = document.getElementById("d2audio");
  d2Audio.volume = 0;
  d2Audio.play();

  //---------HEADER CONTROLS---------
  //mute the volume of the background audio if the volume button is pressed
  $("#volume").click(()=>{
    volumeButton = $("#volume");
    if(!muted){
      d2Audio.volume = 0;
      volumeButton.html('<i class="fas fa-volume-up"></i>');
      volumeButton.css({"color":"#907C6C"});
    }else{
      d2Audio.volume = 0.3;
      $("#volume").html('<i class="fas fa-volume-off"></i>');
      $("#volume").css({"color":"#808080"});
    }
    muted = !muted;
  });

  $("#next-btn").click(()=>{

  });



  $("#previousButton-btn").click(()=>{});
  //---------HEADER CONTROLS---------

  $(window).scroll(() =>{
    let scrollTop = $(this).scrollTop();
    let header = $("#header");

    if(header.offset().top !== 0){
      if(!header.hasClass("shadow")){
        header.addClass("shadow");
      }
    } else {
      header.removeClass("shadow");
    }

    if( (0 <= scrollTop) && (scrollTop < $("#panel2").offset().top) ){
      updatePageNumber(0);
      $("#toTop").hide();
    }else if( ($("#panel2").offset().top <= scrollTop) && (scrollTop < $("#panel3").offset().top) ){
      updatePageNumber(1);
    } else if ( ($("#panel3").offset().top <= scrollTop) && (scrollTop < $("#panel4").offset().top) ){
      updatePageNumber(2);
      $("#toTop").show();
    } else if ( ($("#panel4").offset().top <= scrollTop) && (scrollTop < $("#panel5").offset().top) ){
      updatePageNumber(3);
    } else if ( ($("#panel5").offset().top <= scrollTop) && (scrollTop < $("#panel6").offset().top) ){
      updatePageNumber(4);
    } else if ( ($("#panel6").offset().top <= scrollTop)){
      updatePageNumber(5);
    }
    didScroll = true;
  });

  $('html, body').mousemove(()=>{
    mouseMoved = true;
  });

  //Intervals for when to change things on the page eg. hide the header etc.
  setInterval(()=>{
    if(didScroll){
      hideHeaderOnScrollDown();
      didScroll = false;
      if(lastScroll == 0){
        $("#header").fadeIn();
      } else if (lastScroll >= scrollDelta + headerHeight){
      }
    }
  },250);

  //get the status of the checkbox every 0.1s and set it as autoScroll
  setInterval(()=>{
    autoScroll = $("#autoScroll").prop('checked');

    let previousButton = $("#previous-btn"), nextButton = $("#next-btn");
    if(currentPanelIndex === 0){
      previousButton.addClass("disabled");
    }else if (currentPanelIndex === (panels.length -1)){
      nextButton.addClass("disabled");
    }else{
      if(previousButton.hasClass("disabled")){
        previousButton.removeClass("disabled");
      }
      if(nextButton.hasClass("disabled")){
        nextButton.removeClass("disabled");
      }
    }

  },100);

  //if autoScroll is on then scrolDown every twenty seconds
  setInterval(()=>{
    if (autoScroll) {
      scrollDown();
    }
  },5000);

  //unchecks the autoScroll checkbox
  uncheckAutoScroll = () => {
    autoScroll = false;
    $("#autoScroll").prop('checked', autoScroll);
  }

  hideHeaderOnScrollDown = () => {
    let currentScroll = $(this).scrollTop();
    if((currentScroll - lastScroll) > scrollDelta){
      if(currentScroll > headerHeight){
        $("#header").fadeOut();
      }
    } else {
      if(currentScroll + $(window).height() < $(document).height()){
        $("#header").fadeIn();
      }
    }
    lastScroll = currentScroll;
  }


  $("#toTop").click(() => {
    $('html, body').animate({
      scrollTop:$("#panel1").offset().top
    });
    updatePageNumber(0);
  })

  //recognize all clicks on the document in order to scroll to next panel
  $(".content").click(()=>{
    autoScroll = $("#autoScroll").prop('checked');
    if (!autoScroll) {
      scrollDown();
    }
  });

  scrollDown = () => {
    currentPanel = panels[currentPanelIndex+1];
    $('html, body').animate({
      scrollTop: $(currentPanel).offset().top+50
    },900);
    updatePageNumber();
  }

  $("#previous-btn").click(()=>{
    console.log("go back");
  });

  updatePageNumber = (index = ((currentPanelIndex + 1) % panels.length)) => {
    currentPanelIndex = index;
    $("#pn").html(currentPanelIndex+1);
  }

});
