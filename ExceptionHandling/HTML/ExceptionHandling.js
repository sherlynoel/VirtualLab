document.getElementById("form").addEventListener("keypress", function(e) {
	var key = e.which || e.keyCode;
	if (key === 13) {
		handleClick();
		e.preventDefault();
	}

}, false)

function handleClick(){
	num1 = parseInt(document.getElementById("num1").value);
	num2 = parseInt(document.getElementById("num2").value);
	if(num2 !== 0){
		var op = document.getElementById("op")
		op.value = num1/num2;
		document.getElementById("matp").setAttribute("class","probState")
	} else {
		alert("Error !!!!: Denominator is 0! Division by zero ERROR")
	}
}



