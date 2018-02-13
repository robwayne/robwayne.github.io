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

  $(".scroll-down").click(function(){
    $('html, body').animate({
      scrollTop: $("#content").offset().top
    }, 1000);
  });

  // playButton.mouseenter(function(){
  //   $(this).addClass("hvr-bounce-to-right");
  // });
  //
  // playButton.mouseleave(function(){
  //   $(this).removeClass("hvr-bounce-to-right");
  // });

  // $("#cast").mouseenter(function(){
  //    $(this).addClass("strike");
  // });
  //
  // $("#cast").mouseleave(function(){
  //    $(this).removeClass("strike");
  // });
  //
  // $("#reviews").mouseenter(function(){
  //    $(this).addClass("strike");
  // });
  //
  // $("#reviews").mouseleave(function(){
  //    $(this).removeClass("strike");
  // });
  //
  // $("#bts").mouseenter(function(){
  //    $(this).addClass("strike");
  // });
  //
  // $("#bts").mouseleave(function(){
  //    $(this).removeClass("strike");
  // });
  //
  // $(".slogan-2").mouseenter(function(){
  //    $(this).css({"color":"#FF1D15"}).addClass("strike");
  // });
  //
  // $(".slogan-2").mouseleave(function(){
  //    $(this).css({"color":"#FFF"}).removeClass("strike");
  // });



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
