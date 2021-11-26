var a,b ;
var counter=0 ;
var wtArr  = [];
var IDcount2=1 ;
var ratio=[] ;
var ToBeSortedRatio=[] ;
var item=0,capacity=0;
var IDcount=1 ;
var src ;
var html ;
var allStep,tbl,tbdy,tr,td ;


document.getElementById("size").addEventListener("keypress", function(e) {
	var key = e.which || e.keyCode;
	if (key === 13) {
		handleClick();
		e.preventDefault();
	}

}, false)

document.getElementById("bt").addEventListener("keypress", function(e) {
	var key = e.which || e.keyCode;
	if (key === 13) {
		inputArr();
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
  var op = document.getElementById("outputTable");
  var count=0 ;
  var width = 100/item;
  for(var i = 1; i <= item; i++){
      for(var j=1;j<=item;j++){
        input = document.createElement("input");
        input.type = 'text';
        input.id = (IDcount).toString()+'value';
        input.setAttribute("style","width:"+width+"%;color:black;")
        IDcount=IDcount+1 ;
        op.appendChild(input);
      }
      br = document.createElement("br");
      op.appendChild(br);
  }
  
  //op.scrollIntoView()
  var bt = document.getElementById("proceed-btn");
  bt.className = 'probState text-center';
  bt.scrollIntoView()
  //document.getElementById("bt").focus()
  document.getElementById('1value').focus()
 
    
}

function inputArr(){

        var valArr = new Array(item); 
        for (var i = 1; i <= item; i++) 
        { 
            valArr[i] = new Array(item); 
        }
        for(var i = 1; i <= item; i++){
            for(var j=1;j<=item;j++){

            valArr[i][j] = document.getElementById(IDcount2.toString()+'value').value;
            IDcount2=IDcount2+1 ;

            }
        }

        /*********GRAPH CREATION ***************/
        document.getElementById("gp").className = "probState"
        const g = new Dracula.Graph
        var d=0 ;
        for(var i=1;i<=item;i++){
            for(var j=1;j<=item;j++)
            {
                if(valArr[i][j]!=0 && valArr[i][j]<99  ){

                d=valArr[i][j] ;        
                var mychar=65;
                a = String.fromCharCode(mychar+i);
                b =String.fromCharCode(mychar+j);

                g.addEdge(a,b,{ label: valArr[i][j].toString(),directed : true}  );

                }
            }
        }

        const layouter = new Dracula.Layout.Spring(g)
        const renderer = new Dracula.Renderer.Raphael('#canvas', g)
        renderer.draw()
    
        /*********GRAPH CREATION ***************/

         
        
        Prims(valArr,item) ;
         
    
       
        //  displayDij(src,item) ;


} 

var distanceArr=[] ;
var parentArr=[] ;
var visitedArray=[] ;
var i=0,j=0,k=0 ;
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
var min ;
var sum =0 ;
var mincost=0 ;
function Prims(valArr,n)
{                           
          var distanceArr = new Array(n); 
            for (var i = 1; i <= n; i++) { 
                distanceArr[i] = new Array(n); 
            }
          var graphArr = new Array(n); 
            for (var i = 1; i <= n; i++) { 
                graphArr[i] = new Array(n); 
            }
    
            
             for( i=1 ;i<=n;i++){
                for( j=1;j<=n;j++){
                    distanceArr[i][j]=99 ;
                    graphArr[i][j]=99 ;
                }
            }
              var html="<p>" ;     
          var parentArr=[] ;
            for(i=2;i<=n;i++){
                parentArr[i]=1 ;
            }
            parentArr[1]=0 ;
    
            for(i=1; i<n; i++)
            {
                
             min=999;
                for(j=1;j<=n;j++)
                {   
                   // console.log((valArr[j][parentArr[j]])) ;
                    if(parentArr[j]!=0 && valArr[j][parentArr[j]] < min)
                    {
                        min=valArr[j][parentArr[j]];
                        u=j;
                    }
                }
                distanceArr[i][1] = u;
                distanceArr[i][2] = parentArr[u];
                mincost =Number(mincost)+ Number(min);
                parentArr[u] = 0;
                for(k=1; k<=n; k++){
                    if(parentArr[k] != 0 && valArr[k][parentArr[k]] > valArr[k][u])
                        parentArr[k] = u;
                }
            // console.log(i+") Minimum edge is ("+distanceArr[i][1]+","+distanceArr[i][2]+") and its cost is :"+min);
            startNode=distanceArr[i][1] ;
            endNode=distanceArr[i][2] ;
            graphArr[startNode][endNode]=min ;
               //console.log("*********************") ;
                // for(var f=1;f<=item;f++){
                //     for(var h=1;h<=item;h++)
                //     {
                        
                //         html+=" "+graphArr[f][h]+"  " ;
                //     }
                //     html+="<br><br>" ;
                // }
                
          
                // var div = document.getElementById('demo');
                //    div.innerHTML += html;
                graphCreate(graphArr) ;
            }
    document.getElementById("final").className = "probState"
           

    
}
    
    
    
    
    


function graphCreate(graphArr)
{
/*********GRAPH CREATION ***************/
                    const gr = new Dracula.Graph
                    var di=0 ;
                    for( i=1;i<=item;i++){
                        for( j=1;j<=item;j++)
                        {
                            if(graphArr[i][j]!=0 && graphArr[i][j]<99  ){

                                   // di=valArr[i][j] ;        
                                    var mychar=64;
                                     a = String.fromCharCode(mychar+i);
                                     b =String.fromCharCode(mychar+j);

                                    gr.addEdge(a,b,{ label: graphArr[i][j].toString(),directed : true}  );


                               }
                        }

                    }



                    const layouter = new Dracula.Layout.Spring(gr)
                    var div = document.createElement("div")
                    var id = "mgraph"+myid;
                    div.setAttribute("id", id)
                    div.setAttribute("class","probState")
                    document.getElementById("graph").appendChild(div)
                    id = "#"+id

                    const renderer = new Dracula.Renderer.Raphael(id, gr) ;
                   	myid=myid+1 ;
                    renderer.draw()



                 /*********GRAPH CREATION ***************/

}