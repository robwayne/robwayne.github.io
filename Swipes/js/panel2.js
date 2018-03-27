let  canvas = document.getElementById("panel2-canvas");
let smsNotif = document.getElementById("sms-audio");

paper.setup(canvas);

paper.project.importSVG('assets/panel2s.svg', (item, origin)=>{
  let height = item.bounds.height;
  let width = item.bounds.width;
  let ratio = height/width;
  //calculate ratio of the svg to preserve aspect ratio of the svg, for some reason paperjs has a scaling bug that messes up the size of the svg when loaded
  let sendButton = item.children.send_button;

  $("#panel2").height($(window).height());
  $("#panel2").width($(window).width());

  width = $("#img2").width()*0.6;
  height = width * ratio;
  item.bounds.width = width;
  item.bounds.height = height;

  sendButton.onMouseEnter = () => {
    sendButton.style = {
      fillColor: "#1FC352",
      strokeColor: "#000",
      strokeWidth: 0.9
    };
  }

  sendButton.onMouseLeave = () => {
    sendButton.style = {
      fillColor: "#fff",
      strokeColor: "#000",
      strokeWidth: 0.9
    };
  }

  sendButton.onMouseUp = () => {
    loadNewSVG('assets/conversation14.svg');
    smsNotif.play();
  }

});
