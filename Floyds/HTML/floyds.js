
  var row=0 ;
  var col=0 ;
  var counter=0 ;
  var wtArr  = [];
  var IDcount2=0 ;
  var ratio=[] ;
  var ToBeSortedRatio=[] ;
  var item=0,capacity=0;
	var IDcount=0 ;

document.getElementById("itemInput").addEventListener("keypress", function(e) {
	var key = e.which || e.keyCode;
	if (key === 13) {
		handleClick();
		e.preventDefault();
	}

}, false)


  function handleClick(){
		item = document.getElementById("itemInput").value;
		
		if(item == 0 ){
			alert("Fields cannot be empty")
			return;
		}
		var op = document.getElementById("outputTable");
	
	 	form2 = document.getElementById("value-form");
		//form2.style.right="250px" ;
		var count=0 ;
     
     
     
     
             document.getElementById("inputDiv").style.display = "block";
            
     var width = 100/item;
     width = width+"%";
			for(var i = 0; i < item; i++){
                    for(var j=0;j<item;j++){

                          
                            input = document.createElement("input");
                          
                            input.type = 'text';
                          
                          input.style.width= width ;
                         	input.setAttribute("style","color:black") ;
                           
                            input.id = (IDcount).toString()+'value';
                            IDcount=IDcount+1 ;
                            op.appendChild(input);

            
                }
                br = document.createElement("br");
                op.appendChild(br);
			
		}
     
     
		
		var bt = document.getElementById("proceed-btn");
		bt.className = 'text-center';
      
	}
    
    
   
  function handleProceed(){
        
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
       printGraph(valArr);
       floydWarshall(valArr) ;
    	
		
      }
    
function floydWarshall(valArr){
         
  var i=0 ;
  var dist = new Array(item); 
  for (i = 0; i < item; i++) { 
      dist[i] = new Array(item); 
  }
      
        
		
	var j=0,k=0 ;

	for (i = 0; i < item; i++) 
		for (j = 0; j < item; j++) 
			dist[i][j] = valArr[i][j]; 

		
		for (k = 0; k < item; k++) { 
			
			for ( i = 0; i < item; i++){ 
				
				for (j = 0; j < item; j++) { 
					
					if (Number(dist[i][k]) + Number(dist[k][j]) < Number(dist[i][j])){
                        
            dist[i][j]= Number(dist[i][k]) + Number(dist[k][j]);       
          } 	
				} 
			}
      var status = false      
			printSolution(dist,status); 
            
		} 

		var status = true
		printSolution(dist,status); 
	} 
       
      
    
    
    
    
     function printSolution(dist, status) {  
       var html = "";
     if(status){
     	html = "<div class='probState'><h3>The final minimum spanning tree adjacentcy matrix is: </h3></div><br><br>"
     }    
		  html += "<table class='table' border='1|1' style='color:black'>";
    
        
     
		for (var i=0; i<item; ++i) 
		{ 
            html+="<tr>";
             
			for (var j=0; j<item; ++j) 
			{    
                
                
                
                    if(i==row || j==col)
                    {
                         html+="<td style='background-color:#2D3E50; border:1px dotted black;color:white'>"+dist[i][j]+"</td>";
                       
                        
                    }
			
                
					else{
                         html+="<td>"+dist[i][j]+"</td>";
               }
			
                    
                    
            
				
			}
            
			 html+="</tr>";
		}
        
       
       
			html+="</table><br></br><br></br>";
			

      var allstep = document.getElementById('AllStep');
      
      allstep.innerHTML += html;
      
                 
      row=row+1 ;
      col=col+1 ;
        
	} 
    
    
    
function printGraph(valArr){ 

document.getElementById("opgraph").className = " ";   
const g = new Dracula.Graph
            
            for(var i=0;i<item;i++){
                for(var j=0;j<item;j++)
                {
                    if(valArr[i][j]!=0 && valArr[i][j]<99  ){
                            g.addEdge(i.toString(),(j).toString(),{label: valArr[i][j]}) ;
                       }
                }
                
            }



            const layouter = new Dracula.Layout.Spring(g)

            const renderer = new Dracula.Renderer.Raphael('#canvas', g)

            renderer.draw()

 }   
   

