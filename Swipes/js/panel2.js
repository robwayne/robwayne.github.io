let  canvas = document.getElementById("panel1-canvas");


paper.setup(canvas);

let s = paper.project.importSVG('assets/02_01.svg', (item, origin)=>{
  let height = item.bounds.height;
  let width = item.bounds.width;
  let ratio = height/width;
  //calculate ratio of the svg to preserve aspect ratio of the svg, for some reason paperjs has a scaling bug that messes up the size of the svg when loaded
  let sendButton = item.children.send_button;

  $("#panel1").height($(window).height());
  $("#panel1").width($(window).width());

  width = $("#img2").width()*0.5;
  height = width * ratio;
  item.bounds.width = width;
  item.bounds.height = height;

  sendButton.onMouseEnter = () => {
    sendButton.fillColor = "#1FC352";
  }

  sendButton.onMouseLeave = () => {
    sendButton.fillColor = "#fff";
  }

  sendButton.onMouseUp = () => {
    loadNewSVG('assets/panel2.svg');
  }


});


loadNewSVG = (svg) => {
  paper.project.clear();

  paper.project.importSVG(svg, (item,origin) => {
    let height = item.bounds.height;
    let width = item.bounds.width;
    let ratio = height/width;
    let sendButton = item.children.send_button;

    $("#panel1").height($(window).height());
    $("#panel1").width($(window).width());

    width = $("#img2").width()*0.5;
    height = width * ratio;
    item.bounds.width = width;
    item.bounds.height = height;
  }, false);

}
