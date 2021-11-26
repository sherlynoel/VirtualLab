var adj = [],path = [], n;
var id = 0;
var arr = []; 
var sum ;
var output=[] ;
var fraction=[] ;
var canvas=document.getElementById("canvas") ;
var html;
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
	sum = parseInt(document.getElementById("sum").value);
	
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
               // console.log(arr[j]) ;
                //console.log(sum) ;
				count++;
			}
			
	
		
		
	}
    var arraySum=0 ;
    
    for(var i=0;i<n;i++)
    {
        fraction[i]=0 ;
        arraySum+=output[i] ;
    }
    
    html="<h4>Solution</h4>" ;
    if(arraySum > sum) {
        
        html+="<div style='font-size:15px ;'><b>Intialization step</b> Start with an Empty set OUTPUT = { }<br><br>"
        subset(0,0,arraySum) ;
    }
    
    html+="</div>" ;
        canvas.innerHTML += html;
    
	
}

function subset(prev_sum,k,r)
{
    
    fraction[k]=1 ;
    html+="<p class='ptext' style='border:2px solid white ;margin:25px ;'><b>STEP 1 :</b> Add the Next Element from the List to the set OUTPUT = { " ;
    for(var i =0;i<=n;i++){
        if(fraction[i]==1)
            html+=output[i]+" , " ;
    }
    html+=" } <br>" ;
    html+= "<br><b>STEP 2 :</b> If the Subset is having the given Sum == "+sum+" then print the subset as Solution <br> " ;
    if(prev_sum+output[k]!=sum){
        html+= prev_sum+" + "+output[k] +" == "+sum+" NO<br>"
    }
    
    if(prev_sum+output[k]==sum)
    {
        
         html+= prev_sum+" + "+output[k] +" == "+sum+" YES<br><br>"
 
        html+= "<span style='background-color:white ;color:black ;width:50%;margin:20px ;padding:10px ;'>SUBSET FOUND<br><br> { " ;
        for(var i=0;i<=k;i++){
            if(fraction[i]==1)
                html+=output[i]+" , " ;
            
        }
        html+="}</span><br><br> " ;
        
    }
    
    else if(prev_sum+output[k]+output[k+1] <=sum)
        {   
            
           html+="<b>STEP 3 : </b> If the Sum of Subset "+Number(prev_sum)+output[k]+" + "+output[k+1] +" <= "+sum+" Then add the next elements<br></p>" ;
           subset(prev_sum+output[k],k+1,r-output[k]) ;
    
           
        }
       
    if(prev_sum+r-output[k]>=sum && prev_sum+output[k]<=sum)
    {   
         
        html+= "<b>STEP 3 : </b>If the sum of subset "+Number(prev_sum)+output[k]+" + "+output[k+1] +" >= "+sum+" Then Backtrack through the subset</p>";
          fraction[k]=0 ;
        subset(prev_sum,k+1,r-output[k]) ;
    }
    
}


