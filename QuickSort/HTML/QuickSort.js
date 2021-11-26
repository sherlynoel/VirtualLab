var arr, n = -1, i = 0, state = 0,time = 0,stepArr = [],step = [];

document.getElementById("size").addEventListener("keypress", function(e) {
	var key = e.which || e.keyCode;
	if (key === 13) {
		handleClick();
		e.preventDefault();
	}

}, false)

document.getElementById("ele").addEventListener("keypress", function(e) {
	var key = e.which || e.keyCode;
	if (key === 13) {
		add();
		e.preventDefault();
	}

}, false)


function handleClick() {
	n = parseInt(document.getElementById("size").value, 10);
	var val = document.getElementById("size").value;
	if (n === 0) {
		alert("Size cannot be 0")
	} else {
		arr = new Array(n);
		var parent = document.getElementById("ArraySize")
		var div = document.createElement("div");
		div.innerHTML = "<div style='margin-bottom:20px'><h3 style='color:grey;'> Array Size is: " + n + "</h3></div>"
		parent.appendChild(div);
		document.getElementById("ele").focus();
		document.getElementById("ele").scrollIntoView();
	}
}

function add() {
	if (n == -1) {
		alert("size not initialized");
	} else if (i >= n) {
		alert("Array is full");
		dispArr();
	} else {
		arr[i] = parseInt(document.getElementById("ele").value, 10);
		i = i + 1;
		if (i == n) {
			dispArr();
		}
	}
	document.getElementById("confirmation").innerHTML = "At index "+(i-1) +" Added " + document.getElementById("ele").value + " Succesfully";
	document.getElementById("confirmation").scrollIntoView();
	document.getElementById("ele").value = '';
}

function dispArr() {
	var div = document.getElementById("arr")
	div.setAttribute("class","probState")
	var table = "<h3 style='text-align:center; color:grey'>The Input Array</h3><table class='table table-bordered mb-2 text-center'><thead style='background-color:#2D3E52'><tr>";
	for (var i = 1; i <= n; i++) {
		table += "<th class='text-center'>" + i + "</th>"
	}
	table += "</tr></thead><tr>";

	for (var i=0; i <n; i++) {
		table += "<td>" + arr[i] + "</td>"
	}
	table += "</tr></table>";

	div.innerHTML = table;
	document.getElementById("sort").className = "conatiner text-center";
	div.scrollIntoView();
	document.getElementById("quick").focus();
}	

function partition(low, high){

	var tempArray = [];
	var pivot = arr[low];
	var i = low
	var j = high
	while(i <= j){
		while(arr[i] <= pivot)
			i++;
		while(arr[j] > pivot)
			j--;
		if(i < j){
			var temp = arr[i];
			arr[i] = arr[j];
			arr[j] = temp;
		}
	}
	arr[low] = arr[j]
	arr[j] = pivot
	state += 1
	for(var k = 0; k < n; k++)
		tempArray.push(arr[k])
	console.log(tempArray)
	time+=2000
	setTimeout(printArr,time,j,state,tempArray)
	return j;
}

function sort(low, high) {
	if (low < high) {
		var pi = partition(low, high);
		sort(low, pi - 1);
		sort(pi + 1, high);
	}
}

function quicksort() {
	sort(0, n - 1);
	setTimeout(finalArray,time+2000);
}

function printArr(val, st,temparr) {
	var div = document.getElementById("recursion")
	div.setAttribute("class","probState")
	div.scrollIntoView();
	var col2 = document.createElement("div")
	var table = "<br><h3 style='text-align:center'>Array State in Recursion Call " + st + " </h3><br><h3 style='text-align:center' > Highlighted element is the pivot</h3><br><br><table class='table table-bordered mb-2 text-center'><thead style='background-color:#2D3E52'><tr>";
	for (var i = 1; i <= n; i++) {
		table += "<th class='text-center' style='color:white'>" + i + "</th>"
	}
	table += "</tr></thead><tr>";

	for (var i = 0; i < n; i++) {
		if (val === i) {
			table += "<td style='background-color:#2D3E52; color:yellow'>" + temparr[i] + "</td>"
		} else
			table += "<td>" + temparr[i] + "</td>"
	}
	table += "</tr></table>";

	col2.innerHTML = table;
	div.appendChild(col2);
	col2.scrollIntoView()
	
}

function finalArray(){
	var div = document.getElementById("final")
	div.setAttribute("class","probState")
	var table = "<h3 style='text-align:center; color:grey'>The Sorted Array</h3><br><br><br><br><br><br><br><br><br><br><table class='table table-bordered text-center'><thead style='background-color:#2D3E52'><tr>";
	for (var i = 1; i <= n; i++) {
		table += "<th class='text-center' style='color:white'>" + i + "</th>"
	}
	table += "</tr></thead><tr>";

	for (var i = 0; i < n; i++) {
		table += "<td>" + arr[i] + "</td>"
	}
	table += "</tr></table><br><br><br><br><br><br><br><br><br>";

	div.innerHTML = table;
	div.scrollIntoView();
	document.getElementById("quick").blur();
}
