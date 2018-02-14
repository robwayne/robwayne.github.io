$(document).ready(function(){
  var windowHeight = $(window).height()*0.9,
      windowWidth = $(window).width(),
      videoHeader = $(".header-video"),
      videoBg = $(".video-background");

  videoHeader.css({"height":windowHeight, "width":windowWidth});

  var playButton = $("#play-btn");
  playButton.click(function(){
    $(this).mawbutton({
      speed:400,
      effect:'ripple',
      scale:2
    });
  });

  var reviewSample = $(".review");
  reviewSample.each(function(){
    $(this).mouseenter(function(){
      $(this).addClass("scale");
      $(this).children().addClass("show");
    });

    $(this).mouseleave(function(){
      $(this).removeClass("scale");
      $(this).children().removeClass("show");
    });
  });

  var crew = $(".crew");
  crew.each(function(){
    $(this).mouseenter(function(){
      $(this).children().css({"visibility":"visible"})
    });

    $(this).mouseleave(function(){
      $(this).children().css({"visibility":"visible"})
    });
  });

  $(".scroll-down").click(function(){
    $('html, body').animate({
      scrollTop: $("#content").offset().top
    }, 1000);
  });

  new TypeIt('#slogan', {
    speed: 100,
    breakLines:false,
    autoStart: true
  }).type("an experience to die").pause(500).delete(3).type("<strong>cry</strong> for<span>;</span>").pause(1200).delete()
  .options({speed:250}).type("love...").pause(1000).delete(5)
  .options({speed:300}).type("ss<span>;</span>").pause(1200).delete()
  .options({speed:150}).type("the unexpected").pause(500).type(" <strong>expected</strong><span>;</span>").pause(1200).delete()
  .type("30 seconds of <strong>heart break</strong>.");


  function lowerVolume(){
    var bgAudio = $("#background-audio");
    bgAudio.volume = 0;
  }

});
