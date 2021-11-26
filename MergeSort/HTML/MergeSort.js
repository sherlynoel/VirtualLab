var adj = [],path = [], n;
var id = 0;
var arr = []; 
var sum ;
var output=[] ;
var fraction=[] ;
var canvas=document.getElementById("canvas") ;
var html="";
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
			
				for(var j=0;j< n;j++){
					input = document.createElement("input");
					input.type = 'text';
					input.setAttribute("style","width:80px");
					input.setAttribute("class","inp");
                    input.style.color="black" ;
					input.setAttribute("required","");
					input.id = (IDcount).toString()+'value';
					IDcount=IDcount+1 ;
					formData.appendChild(input);
					}
				br = document.createElement("br");
				formData.appendChild(br);
					
		
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
	if(n > 0){
		var count = 0;
		
			for(var j = 0; j < n; j++){
				var c = (count).toString() + "value";
				var value = document.getElementById(c).value;
				output[j] = parseInt(value);
               // console.log(output[j]) ;
                //console.log(sum) ;
				count++;
			}
			
	
		
		
	}
      
        html+=" " ;
    
        mergeSort(output) ;
    
        html+="<br><br><p style='display:inline-block ;background-color:transparent;border:3px solid white; padding:7px;color:white; width:50%;'>The Sorted Array is [" ;
    
        for(var i=0;i<output.length;i++){
            html+=" "+output[i]+" , " ;
        }
        html+="]</p>" ;
    
        canvas.innerHTML += html;
    
	
}


function mergeSort(array) 
	{    
		 
	
		
		if(array.length==0  ) 
		{  
			
			return; 
		} 
		
		
		
		if(array.length > 1) 
		{ 
            
			var mid = Math.floor(array.length / 2); 
console.log(mid) ;
			// Split left part 
            var left =[] ;
			
			html+="<br><br><p>Dividng the array into sub Array</p><p style='display:inline-block ;background-color:transparent;border:3px solid white; padding:5px;color:white; width:33%;'> Left Array ["
			for(var i = 0; i < mid; i++) 
			{ 
                if(array[i]!=undefined)
                {
                  	left[i] = array[i]; 
				    html+=left[i]+" , ";  
                }
			
				
			}
			html+="]</p>" ;

			
			
			// Split right part 
			
			
			var right =[] ;
			html+="<p style='display:inline-block ;background-color:transparent;border:3px solid white; padding:5px;color:white; width:33%;'>   Right Array ["; 
			for(var i = mid; i < array.length; i++) 
			{
                if(array[i]!=undefined){
				right[i - mid] = array[i]; 
				html+=" "+ right[i - mid]+" , " ;
                }
			}
			html+="] </p>" ;
			html+="<br>" ;		
			
				
			
			
			mergeSort(left); 
			iterationCount=0 ;
			mergeSort(right); 
			
            html+="<br><br><p>Merging the sub array into the Array in sorted manner </p>" ;

			var i = 0; 
			var j = 0; 
			var k = 0; 
             
            html+="<p style='display:inline-block ;background-color:transparent;border:3px solid white; padding:5px;color:white; width:33%;'> ["
			// Merge left and right arrays 
			while(i < left.length && j < right.length) 
			{ 
				if(left[i] < right[j]) 
				{ 
					array[k] = left[i]; 
                    html+=" "+array[k]+" , " ;
					i++; 
				} 
				else
				{ 
					array[k] = right[j]; 
                     html+=" "+array[k]+" , " ;
					j++; 
				} 
				k++; 
			}
            html+="] </p>" ;
            
			// Collect remaining elements 
        html+="<p style='display:inline-block ;background-color:transparent;border:3px solid white; padding:5px;color:white; width:33%;'> ["
			while(i < left.length) 
			{ 
				array[k] = left[i]; 
                html+=" "+array[k]+" , " ;
				i++; 
				k++; 
			} 
            html+="] </p>" ;
            html+="<p style='display:inline-block ;background-color:transparent;border:3px solid white; padding:5px;color:white; width:33%;'> ["
			
			while(j < right.length) 
			{ 
				array[k] = right[j]; 
                html+=" "+array[k]+" , " ;
				j++; 
				k++; 
			}
             html+="] </p>" ;
		} 
	} 

