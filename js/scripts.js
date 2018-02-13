var windowHeight = $(window).height()*0.9,
    windowWidth = $(window).width()*0.998,
    videoHeader = $(".header-video"),
    videoBg = $(".video-background");

videoHeader.css({"height":windowHeight, "width":windowWidth});

$("#play-btn").click(function(){
  $(this).mawbutton({
    speed:400,
    effect:'ripple',
    scale:2
  });
});

$("#cast").mouseenter(function(){
   $(this).addClass("strike");
});

$("#cast").mouseleave(function(){
   $(this).removeClass("strike");
});

$("#reviews").mouseenter(function(){
   $(this).addClass("strike");
});

$("#reviews").mouseleave(function(){
   $(this).removeClass("strike");
});

$("#bts").mouseenter(function(){
   $(this).addClass("strike");
});

$("#bts").mouseleave(function(){
   $(this).removeClass("strike");
});

$(".slogan-2").mouseenter(function(){
   $(this).css({"color":"#FF1D15"}).addClass("strike");
});

$(".slogan-2").mouseleave(function(){
   $(this).css({"color":"#FFF"}).removeClass("strike");
});


new TypeIt('#slogan', {
  strings: [
      "An Experience to cry for",
      "Death without closure is a loss",
      "The closure of life is death",
      "30 seconds of heart break",
    ],
  speed: 180,
  breakLines:false,
  autoStart: true
});
