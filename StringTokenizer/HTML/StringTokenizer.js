
document.getElementById("form").addEventListener("keypress", function(e) {
	var key = e.which || e.keyCode;
	if (key === 13) {
		handleClick();
		e.preventDefault();
	}

}, false)

function handleClick(){
	var name = document.getElementById("name").value
	var dob = document.getElementById("dob").value
	var new_dob = dob.split("/")
	var op = document.getElementById("op")
	op.setAttribute("style","color:black")
	op.value = name + "," + new_dob;
	document.getElementById("matp").setAttribute("class","probState");
}


	


