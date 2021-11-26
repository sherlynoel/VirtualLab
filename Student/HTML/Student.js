
class Student{
	
	 add(list){
		this.usn = list[0].value;
		this.name = list[1].value;
		this.branch = list[2].value;
		this.phone = list[3].value;
	}
	
	 display(){
		console.log(this.usn + " " + this.name + " " + this.branch + " " + this.phone)
	}
}
var studentDetails, n = -1, j = 0;
document.getElementById("size").addEventListener("keypress", function(e) {
	var key = e.which || e.keyCode;
	if (key === 13) {
		handleClick();
		e.preventDefault();
	}

}, false)

function handleClick(){
	n = parseInt(document.getElementById("size").value, 10);
	if(n > 0){
		document.getElementById("input-form").className = "container probState"
		var student = document.getElementById("student");
		student.classList.remove("hide");
		document.getElementsByClassName("array")[0].focus();
		studentDetails = new Array();
		student.scrollIntoView();
		} else{
			return;
		}
	
}

document.getElementById("stud").addEventListener("keypress", function(e) {
	var key = e.which || e.keyCode;
	if (key === 13) {
		add();
		e.preventDefault();
	}
}, false)
var show = document.getElementById("show")
var disp = document.getElementById("tableShow")
var butn = document.getElementById("butn")
var j = 0;
function add(){
	if(j < n){
		studentDetails[j] = new Student();
		var details = document.getElementsByClassName("array")
		studentDetails[j].add(details)
		show.innerHTML = "Student " + (j+1) + " added successfully"
		show.scrollIntoView();
		j++;
		if(j === n){
			disp.classList.remove("hide");
			disp.scrollIntoView();
			butn.focus();
		}
	} else{
		show.setAttribute("style","color:red;text-align:center")
		show.innerHTML = "Cannot add more students!!";
	}
	
}

butn.addEventListener("keypress",function(e){
	
	var key = e.which || e.keyCode;
	if (key === 13) {
		displayStudents();
	}
	
},false)

var displayStudents = function(){
	var head = document.getElementById("head")
	head.classList.remove("hide")
	head.scrollIntoView();
	var table = document.getElementById("studentList")
	var tableinner = "";
	for(var k = 0; k < n; k++){
		tableinner += "<tr id='" + k + "'>";
		tableinner += "<td>"+studentDetails[k].usn+"</td><td>"+studentDetails[k].name+"</td><td>"+studentDetails[k].branch+"</td><td>"+studentDetails[k].phone+"</td></tr>"
		
	}
	table.innerHTML = tableinner;
}

