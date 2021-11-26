let n = 0;
var sTop = 0;
document.getElementById("size").addEventListener("keypress", function(e) {
	var key = e.which || e.keyCode;
	if (key === 13) {
		handleClick();
		e.preventDefault();
	}

}, false)


function handleClick(){
	n = parseInt(document.getElementById('size').value)
	if(n <= 0){
		alert("size cannot be 0 or less")
		return;
	} else {
		var stack = document.getElementById('stack')
		for (var i = n; i > 0; i--) {
			var count = i.toString();
			var input = document.createElement('input')
			input.setAttribute('type','text')
			input.setAttribute('id',('id' + count))
			input.setAttribute('class','form-control text-center')
			input.setAttribute('style','width:50%')
			input.setAttribute('readonly', 'true')
			stack.appendChild(input) 
		}
		matp = document.getElementById('matp')
		matp.setAttribute('class','probState')
		matp.scrollIntoView()
		document.getElementById('push').focus()
	}
}

document.getElementById("push").addEventListener("keypress", function(e) {
	var key = e.which || e.keyCode;
	if (key === 13) {
		push();
		e.preventDefault();
	}

}, false)


function push(){
	if(sTop >= n){
		alert("Over flow! cannot insert more elements")
		return
	} else {
		sTop++;
		var push = document.getElementById('push')
		var value = push.value
		push.value = '';
		var id = "id" + sTop;
		var ip = document.getElementById(id)
		ip.setAttribute('value',value) 
	}

}

document.getElementById("pop").addEventListener("keypress", function(e) {
	var key = e.which || e.keyCode;
	if (key === 13) {
		pop();
		e.preventDefault();
	}

}, false)

function pop(){
	if(sTop <= 0){
		alert("cannot remove element from empty stack")
		return
	} else {
		var value = document.getElementById('pop')
		var id = "id" + sTop;
		var ip = document.getElementById(id)
		var val = ip.value
		ip.setAttribute('value','') 
		value.setAttribute('value',val)
		sTop--;
	}
}