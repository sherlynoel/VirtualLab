let open = true;
function openNav() {
	if(open){
  	document.getElementById("mySidenav").style.width = "20%";
  	document.getElementById("main").style.marginLeft = "20%";
    document.getElementById("main").style.width = "80%";
    open = false;
   } else {
   	document.getElementById("mySidenav").style.width = "0";
  	document.getElementById("main").style.marginLeft= "70px";
  	document.getElementById("main").style.width = "90%";
  	open = true;
   }
}

// function closeNav() {
//   document.getElementById("mySidenav").style.width = "0";
//   document.getElementById("main").style.marginLeft= "";
//   document.getElementById("main").style.width = "90%";
// }