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

    $(".full-video-container").show();
    $(".close").show();
    $(".content").hide();
    $(".header-section").hide();
    $(".reviews-sample-section").hide();
    $(".footer-section").hide();
  });


  $(".close").click(function(){
    $(".full-video-container").hide();
    $(".close").hide();
    $(".content").show();
    $(".header-section").show();
    $(".reviews-sample-section").show();
    $(".footer-section").show();
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

  $(".scroll-up").click(function(){
    $('html, body').animate({
      scrollTop: $(".header-section").offset().top
    },1000);
  });

  $(".header-links a").click(function(event){
    if($(this).hash !== ""){
      console.log(this.hash);
      event.preventDefault();
      var hash = this.hash;

      $('html, body').animate({
        scrollTop: $(hash).offset().top
      },1000, function(){
        if (hash !== "#home"){
          window.location.hash = hash;
        } else{
          window.location.hash = "";
        }
      });
    }
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

  $("#first-crew").hover(function(){
    $("#gaby").css({"visibility": "visible"});
  },function(){
    $("#gaby").css({"visibility": "hidden"});
  });

  $("#second-crew").hover(function(){
    $("#hatim").css({"visibility": "visible"});
  },function(){
    $("#hatim").css({"visibility": "hidden"});
  });

  $("#third-crew").hover(function(){
    $("#robert").css({"visibility": "visible"});
  },function(){
    $("#robert").css({"visibility": "hidden"});
  });

  $("#last-crew").hover(function(){
    $("#sara").css({"visibility": "visible"});
  },function(){
    $("#sara").css({"visibility": "hidden"});
  });

});
