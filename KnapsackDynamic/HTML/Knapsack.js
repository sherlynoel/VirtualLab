let item, capacity, n, W,time=0;
var K, x, lastval;;
var wtArr = [],valArr = [];;

document.getElementById("weight").addEventListener('keypress', function(e){
	var key = e.which || e.keyCode;
	if (key === 13) {
		handleClick();
		e.preventDefault();
	}

}, false)



function handleClick() {
	item = document.getElementById("itemInput").value;
	capacity = document.getElementById("weight").value;
	if (item == 0 || capacity == 0) {
		alert("Fields cannot be empty")
		return;
	}
	document.getElementById("input-form").className = "probState"
	var op = document.getElementById("outputTable");
	op.className = 'col-md-8 boxing'
	form = document.getElementById("weighted-form");
	form2 = document.getElementById("value-form");

	for (var i = 1; i <= item; i++) {
		var div = document.createElement("div");
		div.className = 'form-group text-center';
		form.appendChild(div);



		var label = document.createElement("label");
		label.innerHTML = 'Weight of Item ' + i;
		div.appendChild(label);

		var input = document.createElement("input");
		input.className = 'form-control';

		input.type = 'text';
		input.id = i.toString() + 'weight';
		div.appendChild(input);


		div = document.createElement("div");
		div.className = 'form-group text-center';
		form2.appendChild(div);



		label = document.createElement("label");
		label.innerHTML = 'Value of Item ' + i;
		div.appendChild(label);

		input = document.createElement("input");
		input.className = 'form-control';
		input.type = 'text';
		input.id = i.toString() + 'value';
		div.appendChild(input);



	}
	op.scrollIntoView();
	var bt = document.getElementById("proceed-btn");
	bt.className = 'text-center';
	lastval = item.toString()+"value";
	
	document.getElementById(lastval).addEventListener('keypress', function(e){
	var key = e.which || e.keyCode;
	if (key === 13) {
		handleProceed();
		e.preventDefault();
	}

}, false)
	
	document.getElementById("1weight").focus();
	

}



function max(a, b) {
	return (a > b) ? a : b;
}



function handleProceed() {
	for (var i = 1; i <= item; i++) {
		wtArr[i - 1] = parseInt(document.getElementById(i.toString() + 'weight').value, 10);
		valArr[i - 1] = parseInt(document.getElementById(i.toString() + 'value').value, 10);
	}
	n = parseInt(item, 10);
	W = parseInt(capacity, 10);
	K = new Array(n + 1);
	for (var i = 0; i < K.length; i++) {
		K[i] = new Array(W + 1);
	}

	for (var i = 0; i <= n; i++) {
		for (var w = 0; w <= W; w++) {
			if (i === 0 || w === 0) {
				K[i][w] = 0;
			} else if (wtArr[i - 1] <= w) {
				K[i][w] = max(valArr[i - 1] + K[i - 1][w - wtArr[i - 1]], K[i - 1][w]);
			} else {
				K[i][w] = K[i - 1][w];
			}
		}
	}
	document.getElementById("tab").className = "text-center probState mt-1 mb-2";
	print(K, n, W)
}

function print(K, n, W) {
	var tab = document.getElementById("table")
	var table = document.createElement("table")
	table.setAttribute("border","1px solid gray")
	table.className = "table table-bordered mt-3 text-center"
	var thead  = document.createElement("thead")
	thead.setAttribute("style","background-color:#2D3E52")
	var tr  = document.createElement("tr")
	var th = document.createElement("th")
	tr.appendChild(th)
	for (var i = 0; i <= W; i++) {
		var th = document.createElement("th")
		th.setAttribute("style","color:white;")
		th.innerHTML = i;
		tr.appendChild(th)
		thead.appendChild(tr)
	}
	table.appendChild(thead)
	var tr
	for (var i = 0; i <= n; i++) {
		tr  = document.createElement("tr")
		var th = document.createElement("th")
		th.innerHTML = i;
		th.setAttribute("style","text-align:center")
		tr.appendChild(th)
		for (var j = 0; j <= W; j++) {
			var td = document.createElement("td")
			time+=1000
			setInterval(appender,time,td,K[i][j])
			tr.appendChild(td)
		}
		table.appendChild(tr)
	}
	tab.appendChild(table)
	
	var y = document.getElementById("maxval");
	var x = "<h3>The Maximum Profit Obtainable is: " + K[n][W] + "</h3>";
	y.innerHTML = x;
	y.scrollIntoView();
	var button = document.getElementById("chosenitems");
	button.innerHTML = "<button type='button'  id='display'class='btn btn-primary' onclick='itemchosed()'>Display Items</button>";
	button.scrollIntoView();
	document.getElementById('display').focus();
}

function appender(parent,child){
	parent.innerHTML = child
}

function itemchosed() {
	var i = n,
		j = W,
		item = 0;

	var x = [];
	for (var k = 0; k < n; k++) {
		x[k] = 0;
	}
	while (i !== 0 && j !== 0) {

		if (K[i][j] !== K[i - 1][j]) {
			x[i] = 1;

			j = j - wtArr[i - 1];

		}

		i = i - 1;

	}

	var itemArray = document.getElementById("items");
	var table = "<br><br><br><br><br><br><br><br><br><br><br><br><h3 style='text-center'>The Chosen items are marked with 1</h3><br><h3><table class='table table-bordered'><tr><thead style='background-color:#2D3E52'>";
	for (var i = 1; i <= n; i++) {
			table += "<th class='text-center'>" + i + "</th>"
	}
	table += "</tr></thead><tr>";
	
	for (var i = 1; i <=n; i++) {
			table += "<td>" + x[i] + "</td>"
	}
	table += "</tr></table><h3><br><br><br><br>";
	
	itemArray.innerHTML = table;
	document.getElementById('final').scrollIntoView();
}

