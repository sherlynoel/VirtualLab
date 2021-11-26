var counter=0 ;
var wtArr  = [];
var valArr  = [];
var ratio=[] ;
var ToBeSortedRatio=[] ;
var item,capacity;
var fraction=[] ;
var ItemArr="" ;
var cost=0 ;
var temp=0 ;
function handleClick(){      
  document.getElementById("input-form").className = "probState"
	item = document.getElementById("itemInput").value;
	capacity = document.getElementById("weight").value;
	if(item == 0 || capacity == 0){
		alert("Fields cannot be empty")
		return;
	}
	var op = document.getElementById("outputTable");
	op.className = 'col-md-8 boxing'
	form = document.getElementById("weighted-form");
 	form2 = document.getElementById("value-form");
	
	for(var i = 1; i <= item; i++){
		var div = document.createElement("div");
		div.className='form-group text-center';
		form.appendChild(div);
		
	
		
		var label = document.createElement("label");
		label.innerHTML = 'Weight of Item ' + i;
		div.appendChild(label);
		
		var input = document.createElement("input");
		input.className = 'form-control';
		input.type = 'text';
		input.id = i.toString()+'weight';
		div.appendChild(input);
		
		
		div = document.createElement("div");
		div.className='form-group text-center';
		form2.appendChild(div);
		
	
		
		label = document.createElement("label");
		label.innerHTML = 'Value of Item ' + i;
		div.appendChild(label);
		
		input = document.createElement("input");
		input.className = 'form-control';
		input.type = 'text';
		input.id = i.toString()+'value';
		div.appendChild(input);
		
	}

	var bt = document.getElementById("proceed-btn");
	bt.className = 'text-center';

	}
function handleProceed(){

	document.getElementById("step1").style.display = "block";
	document.getElementById("step2").style.display = "block";
	document.getElementById("step3").style.display = "block";
 
    
	
	for(var i = 1; i <= item; i++){
		wtArr[i] = document.getElementById(i.toString()+'weight').value;
		valArr[i] = document.getElementById(i.toString()+'value').value;
    ratio[i]=valArr[i]/wtArr[i] ;
    ToBeSortedRatio[i]=ratio[i] ;
		
	}
  
  var html ="<br><p style='color:white'>STEP 1: Calculate the Profit/Weight Ratio of all the Elements </p>" ;
  html+= "<br><br><table class='table table-bordered' border='1px solid white' style='width:60% ;'>";
  html+="<thead style='background-color:#2D3E52 ;color:white;'><tr><th scope='col'>Item Number</th> <th scope='col'> Weight </th><th> Profit </th><th scope='col'> Ratio =Profit/Weight</th></tr></thead><tbody>" ;
   
  for (var i = 1; i <= item; i++) {
    html+="<tr>";
    html+="<td>"+i +"</td>";
    html+="<td>"+wtArr[i] +"</td>";
    html+="<td>"+valArr[i]+"</td>";
    html+="<td>"+valArr[i]+"/"+wtArr[i]+"="+ratio[i].toFixed(2);+"</td>";
    html+="</tr>";
  }
        
  html+="</tbody></table ><br>";
 

  document.getElementById("step1").innerHTML = html;


  html="<br><p style='color:white'>STEP 2 :Sort all the based on the profit/weight ratio in Decreasing Order </p><br>" ;
 
  html+= "<table class='table table-bordered' style='width:60% ;' border='1px solid white'>";
 
  html+="<thead style='background-color:#2D3E52 ;color:white;'><tr><th>Item Number</th> <th>Profit/Weight ratio</th></tr></thead>" ;

  ToBeSortedRatio.sort() ;
  ToBeSortedRatio=ToBeSortedRatio.reverse();
   
  
 	for(var i=1;i<=item;i++){
	  for(var j=1;j<=item;j++){
	    if(ToBeSortedRatio[i]==ratio[j]){
        html+="<tr>";
        html+="<td>"+j +"</td>";
        html+="<td>"+ToBeSortedRatio[i].toFixed(2)+"</td>";
        html+="</tr>";
	    }
	  } 
 	}
 
  html+="</table><br>" ;
  
 	document.getElementById("step2").innerHTML = html;
     
      // bubble sort wrt to ratio array 
      
      
      
  for(var i=1;i<=ratio.length-1;i++){
    for(var j=1;j<=ratio.length-i;j++){
      if(ratio[j-1]<=ratio[j]){
        temp=ratio[j-1] ;
        ratio[j-1]=ratio[j] ;
        ratio[j]=temp ;
        
        temp=valArr[j-1] ;
        valArr[j-1]=valArr[j] ;
        valArr[j]=temp ;
        
        temp=wtArr[j-1] ;
        wtArr[j-1]=wtArr[j] ;
        wtArr[j]=temp ;
      }
    }
  }
     
  html="<br><p style='color:white'>Step 3 : Start filling the knapsack by putting the items in Knapsack one by one.</p><br>" ;
  html+= "<table class='table table-bordered'table-bordered' style='width:60% ;'>";
  html+="<thead style='background-color:#2D3E52 ;color:white;'><tr><th>Knapsack Weight</th> <th>Items in the Knapsack</th> <th>Fraction</th><th>Cost</th></tr></thead>" ;

       
  html+="<tr>";
  html+="<td>"+capacity+"</td>";
 	html+="<td>NULL</td>";
	html+="<td> 0 </td>";
  html+="<td> 0 </td>";
	html+="</tr>";
        
     
 
 
       
       
 	for(var i =1;i<=item;i++){
   if (wtArr[i] <  capacity ) {
	    fraction[i]=1 ;
	    ItemArr+= i + "," ;
	    capacity=capacity-wtArr[i] ;
	    cost=Number(cost)+Number(valArr[i]) ;
	    cost=Number(cost) ;
	    html+="<tr>";
	    html+="<td>"+capacity+"</td>";
	    html+="<td>"+ItemArr+"</td>";
	    html+="<td>"+fraction[i].toFixed(2)+"</td>";
	    html+="<td>"+cost.toFixed(2)+"</td>";
	    html+="</tr>";
   } else{
   	break ;
   }
     
 }
    
     
    
	if(i<item){
  	fraction[i]=capacity/wtArr[i] ;
    cost=cost+(fraction[i]*valArr[i]) ;
    ItemArr+= i + " " ;
    alert(ItemArr) ;
    html+="<tr>";
	  html+="<td>"+capacity+"</td>";
	  html+="<td>"+ItemArr+"</td>";
	  html+="<td>"+fraction[i].toFixed(2)+"</td>";
	  html+="<td>"+cost.toFixed(2)+"</td>";
   	html+="</tr>";
	}

	html+="</table>";
	html+="<br></br>" ;
	document.getElementById("step3").innerHTML = html;         
}