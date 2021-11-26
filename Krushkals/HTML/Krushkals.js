var adj = [],path = [], n;
var dict ={} ;
var id = 0;
var parentArr=[] ;
var sortedDict = [];
var items=[] ;
var canvas = document.getElementById("canvas");
var myid=0 ;
var mytabid=0;
var graphDiv ;
var mygraphid;
var outputArr=[] ;
var Tindex=0 ;

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
					input.setAttribute("style","width:10%");
					input.setAttribute("class","inp");
          input.style.color="black" ;
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


function proceed(){
    
    var arr = new Array(n); 
        for (var i = 0; i < n; i++) { 
            arr[i] = new Array(n); 
        }
    
    for(var i=0;i<n;i++)
            parentArr[i]=0;
    
    
	if(n > 0){
		var count = 0;
		for(var i = 0; i < n; i++)
        {
			
			for(var j = 0; j < n; j++){
				var c = (count).toString() + "value";
				var value = document.getElementById(c).value;
				arr[i][j] = parseInt(value);
				count++;
                 
			}
			
           
		}
		
		
	}
	var min = kruskals(n,arr,arr) ;
	var p = document.createElement("p")
	p.setAttribute("style","border: 2px solid gray;font-size:200%");
	p.appendChild(document.createTextNode("Minimum cost is: " + min))
	document.getElementById("minCost").appendChild(p)

}

function union(i,j){
    if(i<j)
        parentArr[i]=j 
    else 
        parentArr[j]=i ;  
}


/*************************************************************************/
/****This Function to sort the edges in increasing order of the weight***/
/*************************************************************************/
function mysorted(dict)
{
    
    //creating an array so here storing all the vallue of dictinary into array as object
    items = Object.keys(dict).map(function(key)
    {
      return [key, dict[key]];
    });

    // Sort the array based on the second element
    items.sort(function(first, second) 
    {
      return first[1] - second[1];
    });

}


/*************************************************************************/
/*************************************************************************/





/*************************************************************************/
/*****Table created for displaying the edges and their weight Values*****/
/*************************************************************************/
function tableCreate(items) {

  var td ;
  var tableCanvas=document.getElementById("tableCanvas") ; 
  p = document.createElement("p")
  p.appendChild(document.createTextNode("Highlighted edge is the chosen minimum edge"))
  tableCanvas.appendChild(p)
  tableCanvas.setAttribute("class","probState") 
  var tbl = document.createElement('table');


  tbl.setAttribute("class","table text-center") ;
  tbl.style.width = '100%';
  tbl.setAttribute('border', '1');

  var tbdy = document.createElement('tbody');
  tbdy.setAttribute("style","color:white")


   /**********ROW FOR THE EDGES***************/
    var tr = document.createElement('tr');
    for (var j = 0; j < items.length; j++) {
    		var ans=items[j][0][0]+ items[j][0][1];
    		var op = outputArr[0];
    		// console.log(ans)
    		// console.log(op)
        td = document.createElement('td');
        //td.setAttribute("color","white") ;
        if(ans == op){
          td.style.backgroundColor="white" ;
          td.style.color="black" ;
        }
        else {
          td.style.backgroundColor="transparent" ;
          td.style.color="white" ;
        }
        td.style.width= 100/items.length + "%";
        td.appendChild(document.createTextNode(items[j][0][0]+ items[j][0][1]))
        tr.appendChild(td)

    }
    td = document.createElement('td');
    td.appendChild(document.createTextNode("Illustration"))
    td.style.width= 100/items.length + "%";
    tr.appendChild(td)
    tbdy.appendChild(tr);

    /**********ROW FOR THE weight of the Edges***************/

  var tr = document.createElement('tr');
    for (var j = 0; j < items.length; j++) {
      td = document.createElement('td');
     	td.style.width= 100/items.length + "%";
      td.appendChild(document.createTextNode(items[j][1]))
      tr.appendChild(td)
    }
    td = document.createElement('td');
    td.setAttribute("style","background-color:white") ;
    td.style.width= 100/items.length + "%";
    td.setAttribute("id","mgraph"+mytabid);
    mytabid++;
    tr.appendChild(td)
    tbdy.appendChild(tr);

  tbl.appendChild(tbdy);
  tableCanvas.append(tbl) ;
}

/*************************************************************************/
/*************************************************************************/



/*************************************************************************/
/****************KRUSHKAL ALGORITHM***************************************/
/*************************************************************************/
function  kruskals(n,wt,cpy){   
    /********************/
  var graphArr = new Array(n); 
  for (var i = 0; i < n; i++) { 
      graphArr[i] = new Array(n); 
  }

    /****intialising graph arraay which sotred the graph to be displayed by Dracula js library *****/
	for( i=0 ;i<n;i++){
	  for( j=0;j<n;j++){
	    graphArr[i][j]=999;
	  }
	}
    
    /*******************/
  var ne=0,min,u=0,v=0,cost=0,a=0,b=0 ;
  var A,B,index = 0 ;
  while(ne < n-1) {      
    min=999 ;
    for(var i=0;i<n;i++){
      for(var j=0;j<n;j++){ 
        if(wt[i][j]<min && i!=j){   
            min=wt[i][j] ;
            a=u=i ;
            b=v=j ;
        }

        if(cpy[i][j] != 999 && i!=j){   
            /*******converting int to char ***********/
            var mychar=65 ;
            A = String.fromCharCode(mychar+i);
            B =String.fromCharCode(mychar+j);
            var mykey = A+B ;
            dict[mykey] = cpy[i][j] ;
            cpy [j][i] = 999;
        }

      }
    }

    while(parentArr[u]>0)
        u = parentArr[u];
    while(parentArr[v]>0)
        v = parentArr[v];
    if(u!=v){
    	mysorted(dict);
    	graphArr[a][b]=wt[a][b];
    	var mychar=65 ;
      A = String.fromCharCode(mychar+a);
      B =String.fromCharCode(mychar+b);
      var mykey = A+B ;
    	outputArr.push(mykey)
    	tableCreate(items);
    	outputArr.pop()
    	graphCreate(graphArr);
     	union(u,v) 
      
      /****************calling graph create method***********/
      cost=cost+min;
      ne = ne+1 ;
    }
    wt[a][b]=wt[b][a]=999 ;
    
	}
 return cost;
  
}

function graphCreate(graphArr){
	var gr = new Dracula.Graph
	for( i=0;i<n;i++){
    for( j=0;j<n;j++){
      if(graphArr[i][j]!=0 && graphArr[i][j] < 999  ){
        var mychar=65;
        a = String.fromCharCode(mychar+i);
        b =String.fromCharCode(mychar+j);
        gr.addEdge(a,b,{ label: graphArr[i][j].toString(),directed : true});
      }
    }
	}
	const layouter = new Dracula.Layout.Spring(gr)
	const renderer = new Dracula.Renderer.Raphael('#mgraph'+myid, gr) ;
	myid=myid+1 ;
	renderer.draw()
}
        




