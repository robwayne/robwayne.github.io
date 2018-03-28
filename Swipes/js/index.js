let color = "#";
const colors = ["57068C", "DAEFB3", "ECD444", "F7C59F", "FB3640", "1D3461", "1F7A8C", "D6F6DD", "EFA9AE", "FC7753", "51E5FF", "F9F521", "1fc352"];

randomColor = () => {
  let index = Math.floor(Math.random()*colors.length);
  color += colors[index];
  $("#splash-btn").css({"background":color});
  console.log(color);
}

$(document).ready(()=>{

  setInterval(()=>{
    randomColor();
    color = "#";
  },1000);


});
