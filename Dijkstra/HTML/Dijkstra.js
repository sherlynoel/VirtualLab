var a,b ;
var counter=0 ;
var wtArr  = [];
var IDcount2=0 ;
var item=0,capacity=0;
var IDcount=0 ;
var src ;
var html ;
var allStep,tbl,tbdy,tr,td ;
var can=document.getElementById("canvas") ;
var op ;

document.getElementById("form").addEventListener("keypress", function(e) {
	var key = e.which || e.keyCode;
	if (key === 13) {
		handleClick();
		e.preventDefault();
	}

}, false)


function handleClick(){
	src=document.getElementById("src").value;
	item = document.getElementById("itemInput").value;
	if(item == 0 ){
	    alert("Fields cannot be empty")
	    return;
	}
	if(src > item || !src){
		alert("Source does not exist")
		return
	}

	op = document.getElementById("outputTable");
	var count = 0 ;
	var p = document.createElement("p") ;
	p.appendChild(document.createTextNode("Enter the Adjacency Matrix : "))
	op.append(p) ;
	for(var i = 0; i < item; i++){
	    for(var j=0;j< item;j++){
	        input = document.createElement("input");
	        input.type = 'text';
	        input.style.color="black" ;
	        input.id = (IDcount).toString()+'value';
	        IDcount=IDcount+1 ;
	        op.appendChild(input);
	    }
	    var br = document.createElement("br");
	    op.appendChild(br);
	}

	var br = document.createElement("br");
	op.appendChild(br);
	op.appendChild(br);
	var bt = document.getElementById("proceed-btn");
	bt.className = "probState text-center";
}

function proceed() {
	document.getElementById("opgraph").className = "probState"
  var valArr = new Array(item); 
  for (var i = 0; i < item; i++) { 
      valArr[i] = new Array(item); 
  }
  for(var i = 0; i < item; i++){
    for(var j=0;j<item;j++){
	    valArr[i][j] = document.getElementById(IDcount2.toString()+'value').value;
	    IDcount2=IDcount2+1 ;
    }
  }

  /*********GRAPH CREATION ***************/
  var g = new Dracula.Graph();
  var d=0 ;
  for(var i=0;i<item;i++){
    for(var j=0;j<item;j++){
      if(valArr[i][j]!=0 && valArr[i][j] < 999  ){

	      d=valArr[i][j] ;        
	      var mychar=65;
	      a = String.fromCharCode(mychar+i);
	      b =String.fromCharCode(mychar+j);

	      g.addEdge(a,b,{ label: valArr[i][j].toString(),directed : true} );

      }
    }
  }

  var layouter = new Dracula.Layout.Spring(g);
	layouter.layout();
	var renderer = new Dracula.Renderer.Raphael('#canvas', g);
	renderer.draw();
    
        /*********GRAPH CREATION ***************/

	allStep =document.getElementById("AllStep") ;
	allStep.className = "probState"  
	tbl = document.createElement('table');
	// tbl.style.width = '50%';
	// tbl.style.float="left" ;
	tbl.setAttribute('class', 'table'); 
        
        
    
	tbdy = document.createElement('thead') ;
	tr = document.createElement('tr');
	/*************************/
	td = document.createElement('th');
	//td.style.lineHeight="500px" ;
	td.appendChild(document.createTextNode('TREE VERTICES'))
	tr.appendChild(td) 
        /************************/
        /*************************/
	td = document.createElement('th');
	//td.style.lineHeight="500px" ;
	td.appendChild(document.createTextNode('REMAINNING VERTICES'))
	tr.appendChild(td) 
        /************************/
        /*************************/
  td = document.createElement('th');
  td.appendChild(document.createTextNode('ILLUSTRATION'))
  tr.appendChild(td) 
//        /************************/
  tbdy.appendChild(tr);
  tbl.appendChild(tbdy);
  //var prob =document.getElementById("problemState") ;
  allStep.appendChild(tbl) ; 
  //prob.style.backgroundColor="#2D3E50" ;
  //var outputTb=document.getElementById("outputTable") ;

    
  dijkstra(valArr,src,item) ;
       
        //  displayDij(src,item) ;


} 

var distanceArr=[] ;
var parentArr=[] ;
var visitedArray=[] ;
var i=0,j=0 ;
var iteration=0 ;
var startNode ;
var mychar ;
var endNode ;
var sNode ;
var eNode ;
var SelectedArray=[] ;
var UpdatedArray=[] ;
var minVertex ;
var myid=1 ;
var updatedEndNode ;
var updatedStartNode ;
var gr ;

function dijkstra(valArr,src,n){                                  

	var graphArr = new Array(item); 
	for (var i = 0; i < item; i++) { 
	  graphArr[i] = new Array(item); 
	}

  /****intialising graph arraay *****/
	for( i=0 ;i<item;i++){
	  for( j=0;j<item;j++){
	      graphArr[i][j]=99 ;
	    }
	}

  /*********************************/
  var u=-1,v,i,j;
  for(v=0;v<n;v++){
    distanceArr[v]=999;
    parentArr[v]=-1;
    visitedArray[v]=0 ;
    SelectedArray[v]=false ;
    UpdatedArray[v]=false ;
  }
  distanceArr[src]=0;
  SelectedArray[src]=true ;
  minVertex=src ;
//for source vertex


	for(i=0;i<n;i++){
		calDijkstra(graphArr,valArr) ;
	}
	tbdy.appendChild(tr);



}

function calDijkstra (graphArr,valArr){
  var min=99;
	for(j=0;j<item;j++){
  if(distanceArr[j] < min && visitedArray[j]==0){
    	min=distanceArr[j];
    	u=j;
    }
	}

  visitedArray[u]=1;
     /*******TREE VERTEX *******/

  mychar=65;
  startNode = String.fromCharCode(65+u);
  tr = document.createElement('tr');
  if(u==src){
  	td = document.createElement('td');
  	//td.style.lineHeight="500px" ;
    td.appendChild(document.createTextNode(startNode+"( _ , _ )")) ;
    tr.appendChild(td) ;
    // tbdy.appendChild(tr);
  } 
  else {
  	td = document.createElement('td');
    //td.style.lineHeight="500px" ;
    td.appendChild(document.createTextNode(startNode+"("+String.fromCharCode(65+parentArr[u])+", "+min+" )")) ;
    tr.appendChild(td) ;
    graphArr[u][parentArr[u]]=min ;
    // parentArr[u] will be v 

  }

  SelectedArray[u]=true ;
  td = document.createElement('td');
  for( v = 0; v < item; v++){
    if( (Number(distanceArr[u])+Number(valArr[u][v])<Number(distanceArr[v])) && (Number(u)!=Number(v)) && Number(visitedArray[v])==0  ){
	    startNode = String.fromCharCode(65+u);
	    endNode =String.fromCharCode(65+v);
	    distanceArr[v]=Number(distanceArr[u])+Number(valArr[u][v]);
	    parentArr[v]=u;
	    if(distanceArr[v]>=99){
	    	td.appendChild(document.createTextNode(endNode+"( - , INF ) ")) ;
	  	}
    	else{
	    	td.appendChild(document.createTextNode(""+endNode+"( "+startNode+" , "+distanceArr[u]+"+"+valArr[u][v]+" ) " )) ;
			  updatedStartNode = startNode ;
			  updatedEndNode = endNode ;
			  UpdatedArray[v]=true ;
    	}
    }

    else if( SelectedArray[v]==false  && UpdatedArray[v]==false ){
    	endNode =String.fromCharCode(65+v);
    	td.appendChild(document.createTextNode(""+endNode+"( - , INF ) " )) ;
    }

    else if(UpdatedArray[v]==true && SelectedArray[v]==false){
      startNode = String.fromCharCode(65+u);
      endNode =String.fromCharCode(65+v);
      td.appendChild(document.createTextNode(""+endNode+"( "+updatedStartNode+" , "+distanceArr[v]+"  ) " )) ;
    }
  }///end of for llop 
  tr.appendChild(td) ;
  td = document.createElement('td');
  td.setAttribute('id','mgraph'+myid ) ;
  tr.appendChild(td) ;
  tbdy.appendChild(tr);
  graphCreate(graphArr) ;
}
       
          
          

function graphCreate(graphArr){
      /*********GRAPH CREATION ***************/
  gr = new Dracula.Graph
  var di=0 ;
  for( i=0;i<item;i++){
    for( j=0;j<item;j++){
      if(graphArr[i][j]!=0 && graphArr[i][j]<99  ){

        // di=valArr[i][j] ;        
        var mychar=65;
        a = String.fromCharCode(mychar+i);
        b =String.fromCharCode(mychar+j);
        gr.addEdge(a,b,{ label: graphArr[i][j].toString(),directed : true}  );
      }
    }

  }
  const layouter = new Dracula.Layout.Spring(gr)
  const renderer = new Dracula.Renderer.Raphael('#mgraph'+myid, gr) ;
  myid=myid+1 ;
  renderer.draw()
}


          
          
// function path(v,src){
// if(parentArr[v]!=-1) 
// path(parentArr[v],src) ;
// if(v!=src)
// console.log("->",v," ") ;

// }

// function displayDij(src,item){

// for(var i=0;i<item;i++){
// if(i!=src)
// {
// console.log("*",src," ") ;
// path(i,src) ;
// }
// if(i!=src)
// console.log("="+distanceArr[i]+" ");
// console.log() ;

// }
// }
      

