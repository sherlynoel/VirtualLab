var c = [],dist=[],n;

document.getElementById("size").addEventListener("keypress", function(e) {
	var key = e.which || e.keyCode;
	if (key === 13) {
		handleClick();
		e.preventDefault();
	}

}, false)

function handleClick(){
	var IDcount = 1;
	n = parseInt(document.getElementById("size").value, 10);
	if(n <= 1 || isNaN(n)){
		alert("Path cannot exist");
	}
	else{
		var p = document.getElementById("matp")
		p.classList.remove("hide")
		var formData = document.getElementById("input-table");
			for(var i = 1; i <= n; i++){
				for(var j=1;j<= n;j++){
					input = document.createElement("input");
					input.type = 'text';
					input.setAttribute("style","width:80px");
					input.setAttribute("class","inp");
					input.setAttribute("required","");
					input.id = (IDcount).toString()+'value';
					IDcount=IDcount+1 ;
					formData.appendChild(input);
					}
				br = document.createElement("br");
				formData.appendChild(br);
				}	
		
		formData.scrollIntoView();
		document.getElementById("1value").focus();
		var button = document.createElement("input")
		button.type = "button";
		button.setAttribute("value","Click to Proceed")
		button.setAttribute("class","btn btn-primary")
		button.setAttribute("style","margin-top:15px")
		button.setAttribute("onclick","proceed()")
		formData.appendChild(button)	
		
		formData.addEventListener("keypress",function(e){
			var key = e.which || e.keyCode;
			if (key === 13) {
					proceed();
					e.preventDefault();
			}
		}, false)
		}
	
}

function proceed(){
	if(n > 0){
		document.getElementById("warn").className = "probState"
		var count = 1;
		for(var i = 1; i <= n; i++){
			var arr = [];
			var distarr = [];
			for(var j = 1; j <= n; j++){
				var d = (count).toString() + "value";
				var value = document.getElementById(d).value;
				arr[j] = parseInt(value);
				distarr[j-1] = parseInt(value);
				count++;
			}
			c[i] = arr;
			dist[i-1] = distarr;
		}
		console.log(dist)
	}
	document.getElementById("warning").innerHTML = "Please Move the graph to look at the weights"
	var g = new Dracula.Graph();
	for(var i = 1; i <= n; i++){
		for(var j = 1; j <= n; j++){
			if(i !== j){
				if(c[i][j] !== 0)
					g.addEdge(i.toString(),j.toString(),{label: c[i][j].toString(),directed:"true"})
				else
					g.addEdge(i.toString(),j.toString(),{label: "Not Connected",directed:"true"})
			}
		}
	}
	var layouter = new Dracula.Layout.Spring(g);
	layouter.layout();
	var renderer = new Dracula.Renderer.Raphael("#canvas",g,600,400);
	renderer.draw();
	document.getElementById("canvas").scrollIntoView()

	var button = document.createElement("input")
	button.type = "button";
	button.setAttribute("value","Output")
	button.setAttribute("class","btn btn-primary")
	button.setAttribute("style","margin-top:10px;margin-bottom:25px")
	button.setAttribute("onclick","output()")	

	var op = document.getElementById("output")
	op.appendChild(button)
	button.focus()
	op.addEventListener("keypress",function(e){
		var key = e.which || e.keyCode;
			if (key === 13) {
					output();
					e.preventDefault();
			}
		}, false)
}
var iter = 0;
var step = [];
function output(){
	var tour = [], cost = null;
	for(var i = 1;i <=n;i++){
		tour[i]=i;
	}
	cost = tspdp(c, tour, 1, n,0,0);

	if(cost !== null ){
		if(n == 4){
			var print = 0;
			document.getElementById("steps").className = "probState"
			var br = document.createElement("br")
			document.getElementById("steps").appendChild(br)
			document.getElementById("steps").appendChild(br)
			for(var steps = 0; steps < step.length; steps++){
				if(steps%5== 0){
					root = step[steps];
				}

				var div = document.createElement("div")
				div.className = "probState";
				div.innerHTML = step[steps];
				document.getElementById("steps").appendChild(div)
				if((steps + 1) % 5 == 0){
					var br = document.createElement("br")
					document.getElementById("steps").appendChild(br)
					document.getElementById("steps").appendChild(br)
				}

				if(step[steps].includes("br") && (steps+1)%5 !== 0){
					var div = document.createElement("div")
					div.className = "probState";
					div.innerHTML = root;
					var br = document.createElement("br")
					document.getElementById("steps").appendChild(br)
					document.getElementById("steps").appendChild(br)
					document.getElementById("steps").appendChild(div)
				}
				
			}
		}	
		document.getElementById("last-block").className="probState"
		document.getElementById("sentence").className="probState"
		document.getElementById("sentence").innerHTML = "The accurate path is: "; 
		var gr = new Dracula.Graph
		for(i=1;i<n;i++){
			gr.addEdge(tour[i].toString(),tour[i+1].toString(),{label: c[tour[i]][tour[i+1]].toString(),directed: "true"});

		}
		gr.addEdge(tour[i].toString(),tour[1].toString(),{label: c[tour[i]][1].toString(),directed: "true"});
		var layouter = new Dracula.Layout.Spring(gr);
		layouter.layout();
		var renderer = new Dracula.Renderer.Raphael("#final", gr,600,400);
		renderer.draw();
		document.getElementById("final").className = "probState"
		document.getElementById("mincost").className = "probState"
		document.getElementById("mincost").innerHTML = "The accurate mincost is <b>"+cost + "</b>";
	}
}
function tspdp(c,tour,start,n,iterationCount,cost){
	iterationCount++;
	var mintour= [], temp=[], mincost=999, ccost, i, j, k;
	if(start == n-1){
		step[iter++] = "From Node "+tour[n-1]+" to "+tour[n]+" cost is " + c[tour[n-1]][tour[n]] + "<br> From last Node "+tour[n]+" to starting "+tour[1]+" cost is " + c[tour[n]][tour[1]]  + "<br> Total cost of the path is "+ (cost+c[tour[n-1]][tour[n]] + c[tour[n]][1]) ;
		return (c[tour[n-1]][tour[n]] + c[tour[n]][1]);
	}
	for(i=start+1; i<=n; i++)	{
		for(j=1; j<=n; j++){
			temp[j] = tour[j];
		}

		temp[start+1] = tour[i];
		temp[i] = tour[start+1];
		step[iter++] = "From Node "+tour[start]+" to "+tour[i]+" cost is " + c[tour[start]][tour[i]];
		ccost = tspdp(c,temp,start+1,n,iterationCount,(cost+c[tour[start]][tour[i]]))
		if((c[tour[start]][tour[i]]+(ccost))<mincost){ 
			mincost = c[tour[start]][tour[i]] + ccost;
			for(k=1; k<=n; k++){
				mintour[k] = temp[k];
			}
		}
	}

	for(var k=1; k<=n; k++){
		tour[k] = mintour[k];
	}
	return mincost;

}




