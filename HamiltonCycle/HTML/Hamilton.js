var adj = [],path = [], n;
var id = 0;

document.getElementById("size").addEventListener("keypress", function(e) {
	var key = e.which || e.keyCode;
	if (key === 13) {
		handleClick();
		e.preventDefault();
	}

}, false)

function handleClick(){
	var IDcount = 0;
	n = parseInt(document.getElementById("size").value, 10);
	if(n > 0){
		var p = document.getElementById("matp")
		p.classList.remove("hide")
		var formData = document.getElementById("input-table");
			for(var i = 0; i < n; i++){
				for(var j=0;j< n;j++){
					input = document.createElement("input");
					input.type = 'text';
					input.setAttribute("style","width:80px;color:black");
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
		document.getElementById("0value").focus();
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

function contains(arr,item){
	for(var i = 0; i < arr.length; i++){
		if(arr[i] === item){
			return true;
		}
	}
	return false;
}

function generatepath(startvertex,nextvertex,pos){
	var canvas = document.getElementById("canvas");
	path[pos]=startvertex;
	pos=pos+1;
	if(!contains(path,nextvertex) && pos<n){
		path[pos]=nextvertex;

		startvertex=nextvertex;

		findCycle(startvertex,pos);

		if(pos == n-1 && adj[nextvertex][path[0]] == 1){
			var g = new Dracula.Graph();
			var arrayx = [];
			for(var i=0;i<n;i++){
				var inner = [];
				for(var j = 0; j <=i; j++){
					inner[j] = path[j];
				}
				arrayx[i] = inner;
		}
		//console.log(arrayx)
		var print = true;
		for(var x = 0; x < arrayx.length; x++){
			var newarr = arrayx[x];
			if(print){
				var div = document.createElement("div");
				div.className = "probState"
				var ele = "canvas"+id.toString();
				var text = document.createElement("div");
				text.innerHTML = "<br>Cycle starting from vertex " + newarr[0] + "<br><br>";
				div.setAttribute("id",ele);
				//div.setAttribute("style","border: 1px solid black");
				canvas.appendChild(text)
				canvas.appendChild(div)
				g.addNode(newarr[0].toString());
				ele = '#' + ele;
				var layouter = new Dracula.Layout.Spring(g);
				layouter.layout();
				var renderer = new Dracula.Renderer.Raphael(ele, g);
				renderer.draw();
				g.removeNode(newarr[0].toString())
				id++;
				div.appendChild(document.createElement("br"));
				print = false;
			}
			var loop = true;
			for(var y = 0 ; y < newarr.length - 1; y++){ 
					g.addEdge(newarr[y].toString(),newarr[y+1].toString(),{ directed : true })
					loop = false;
			}
			if(!loop){
				if(y == n - 1)
					g.addEdge(newarr[newarr.length - 1].toString(), newarr[0].toString(), { directed : true })
				var div = document.createElement("div");
				div.className = "probState"
				var ele = "canvas"+id.toString();
				div.setAttribute("id",ele);
				canvas.appendChild(div)
				ele = '#' + ele;
				var layouter = new Dracula.Layout.Spring(g);
				layouter.layout();
				var renderer = new Dracula.Renderer.Raphael(ele, g);
				renderer.draw();
				id++;
				div.appendChild(document.createElement("br"));
			}
		}
		}
	}

}

function findCycle(startvertex, pos){
	//console.log("find cycle is called with value " + startvertex + "and" + pos)
	for(var i=0;i< n;i++){
	//	console.log("Entering loop")
		if(adj[startvertex][i]!== 0){
			//console.log("adj index value is 0")
			generatepath(startvertex,i,pos);
			for(var j=pos+1;j<n;j++)
			path[j]=999;
		}
	}

}

function proceed(){
	if(n > 0){
		var count = 0;
		for(var i = 0; i < n; i++){
			var arr = [];
			for(var j = 0; j < n; j++){
				var c = (count).toString() + "value";
				var value = document.getElementById(c).value;
				arr[j] = parseInt(value);
				count++;
			}
			adj[i] = arr;
		}
		
		for(var i = 0; i < n; i++){
			for(var j = 0; j < n; j++){
				path[j] = 999;
			}
			//console.log("Cycle starting from vertex " + i );
			findCycle(i,0)	

		}
	}
	
}

