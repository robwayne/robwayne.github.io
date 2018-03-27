let  panel4Canvas = document.getElementById("panel4-canvas");
let smsNotif2 = document.getElementById("sms-audio");
let panel4CurrentMessageIndex = 1;
let panel4ItemGlobal;

paper.setup(panel4Canvas);

let panel4Layers = ["one","two","three", "four", "five", "six", "seven", "eight"];
let panel4RemovedElements = [];


panel4HideLayer = (layer) => {
  panel4RemovedElements.splice(panel4RemovedElements.indexOf(layer), 1);
}

panel4UnHideLayer = (layer) => {
  let i = 0;
  for(let i=0;i<panel4Layers.length;i++){
    if(panel4Layers[i] !== layer && !panel4RemovedElements.includes(panel4Layers[i])){
      panel4ItemGlobal.children[panel4Layers[i]].strokeWidth = 0.7;
      panel4ItemGlobal.children[panel4Layers[i]].strokeColor = new paper.Color(255,255,255,0);
      panel4ItemGlobal.children[panel4Layers[i]].fillColor = new paper.Color(255,255,255,0);
    }else{
      panel4ItemGlobal.children[panel4Layers[i]].strokeWidth = 1.2;
      panel4ItemGlobal.children[panel4Layers[i]].strokeColor = "#000";
    }
  }
  panel4RemovedElements.push(layer);
}

paper.project.importSVG('assets/panel4.svg', (item, origin)=>{
  $("#panel2").height($(window).height());
  $("#panel2").width($(window).width());

  panel4ItemGlobal = item;

  panel4ItemGlobal.position = (0,350);
  panel4ItemGlobal.scale(0.6);

  let sendButton = panel4ItemGlobal.children.send_button;

  panel4UnHideLayer("one");
  panel4UnHideLayer("two");

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
    switch(panel4CurrentMessageIndex){
      case 1:
        panel4HideLayer("two");
        panel4UnHideLayer("three");
        panel4UnHideLayer("four");
        panel4UnHideLayer("five");
        panel4CurrentMessageIndex += 1
        break;
      case 2:
        panel4HideLayer("five");
        panel4HideLayer("four");
        panel4UnHideLayer("six");
        panel4UnHideLayer("seven");
        panel4CurrentMessageIndex += 1
        break;
      case 3:
        panel4HideLayer("seven");
        panel4UnHideLayer("eight");
        break;
      default:
        break;
    }
  }

});
