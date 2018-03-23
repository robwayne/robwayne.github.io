$(document).ready(() => {
  const panels = ["#panel1","#panel2","#panel3","#panel4","#panel5","#panel6"];
  let currentPanelIndex = 0;
  let currentPanel = panels[currentPanelIndex];

  $(window).scroll(() =>{
    //Add code to hide and show header bar and toTop button on scroll down/up
  });

  $('html, body').mousemove(()=>{
    $("#header").fadeIn();
  });

  $("#toTop").click(() => {
    currentPanelIndex = 0;
    $('html, body').animate({
      scrollTop:$("#panel1").offset().top
    });
    updatePageNumber();
  })

  //recognize all clicks on the document in order to scroll to next panel
  $(".content").click(()=>{
    scrollDown();
  });

  scrollDown = () => {
    currentPanelIndex = (currentPanelIndex + 1) % panels.length;
    currentPanel = panels[currentPanelIndex];
    $('html, body').animate({
      scrollTop: $(currentPanel).offset().top
    },400);
    updatePageNumber();
  }

  updatePageNumber = () => {
    $("#pn").html(currentPanelIndex+1);
  }
});
