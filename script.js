$(document).ready(() => {


  //create a list of links on the page. Get the corresponding link in the array when a project is clicked and navigate to that page
  let links = ['30MFF/index.html', 'forty-acres/index.html']
  let linkIndex = -1;
  //getting a list of all the projects on the page to loop over them later.
  let projects = $(".project");
  projects.each((index) => {
    //console.log(index);
    linkIndex = index;
    console.log(linkIndex);
    $(this).click(() =>{
      if (linkIndex !== -1){
        console.log(linkIndex);
        //window.location.href = links[linkIndex];
      }
    });
  });

});