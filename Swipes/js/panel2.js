let  canvas = document.getElementById("panel2-canvas");
let smsNotif = document.getElementById("sms-audio");
let currentMessageIndex = 1;
let itemGlobal;

paper.setup(canvas);

let layers = ["one","two","three", "four", "five", "six", "seven", "eight", "nine", "ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "click"];
let removedElements = [];


hideLayer = (layer) => {
  removedElements.splice(removedElements.indexOf(layer), 1);
}

unhideLayer = (layer) => {
  let i = 0;
  for(let i=0;i<layers.length;i++){
    if(layers[i] !== layer && !removedElements.includes(layers[i])){
      itemGlobal.children[layers[i]].strokeWidth = 0.7;
      itemGlobal.children[layers[i]].strokeColor = new paper.Color(255,255,255,0);
      itemGlobal.children[layers[i]].fillColor = new paper.Color(255,255,255,0);//"#fff";
    }else{
      itemGlobal.children[layers[i]].strokeColor = "#000";
    }
  }
  removedElements.push(layer);
}


paper.project.importSVG('assets/panel2.svg', (item, origin)=>{
  $("#panel2").height($(window).height());
  $("#panel2").width($(window).width());

  itemGlobal = item;

  itemGlobal.position = (0,350);
  itemGlobal.scale(0.67);

  unhideLayer("click");

  let sendButton = item.children.send_button;

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
    switch(currentMessageIndex){
      case 1:
        hideLayer("click");
        unhideLayer("one");
        currentMessageIndex += 1
        break;
      case 2:
        hideLayer("one");
        unhideLayer("two");
        currentMessageIndex += 1
        break;
      case 3:
        unhideLayer("three");
        currentMessageIndex += 1
        break;
      case 4:
        hideLayer("three");
        unhideLayer("four");
        currentMessageIndex += 1
        break;
      case 5:
        unhideLayer("five");
        currentMessageIndex += 1
        break;
      case 6:
        unhideLayer("six");
        currentMessageIndex += 1
        break;
      case 7:
        hideLayer("five");
        unhideLayer("seven");
        smsNotif.play();
        currentMessageIndex += 1
        break;
      case 8:
        hideLayer("six");
        unhideLayer("eight");
        smsNotif.play();
        currentMessageIndex += 1
        break;
      case 9:
        unhideLayer("nine");
        currentMessageIndex += 1
        break;
      case 10:
        hideLayer("nine");
        unhideLayer("ten");
        currentMessageIndex += 1
        break;
      case 11:
        unhideLayer("eleven");
        currentMessageIndex += 1
        break;
      case 12:
        hideLayer("eleven");
        unhideLayer("twelve");
        currentMessageIndex += 1
        break;
      case 13:
        unhideLayer("thirteen");
        currentMessageIndex += 1
        break;
      case 14:
        hideLayer("thirteen");
        unhideLayer("fourteen");
        currentMessageIndex += 1
        break;
      case 15:
        unhideLayer("fifteen");
        break;
      default:
        break;
    }
  }

});
