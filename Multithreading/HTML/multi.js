var n, id = 0,ctx = [],time = [], canvas = [],color = [];

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
		document.getElementById("text").setAttribute("class","probState")
		for(var i = 0; i < n; i++){
			var div = document.createElement("canvas")
			var id = "canvas" + i.toString()
			div.setAttribute("id",id)
			p.appendChild(div)
		}
		p.scrollIntoView()
		createClock();
		
		}
	
}


const createClock = () =>{
	for(var i = 0; i < n; i++){
		var id = "canvas" + i.toString()
		canvas[i] = document.getElementById(id);
		ctx[i] = canvas[i].getContext("2d");
		var radius = canvas[i].height / 2;
		ctx[i].translate(radius, radius);
		radius = radius * 0.90
		time[i] = setInterval(drawClock, 1000, i,radius);
		}
}



function drawClock(i,radius) {
  drawFace(ctx[i], radius);
  drawNumbers(ctx[i], radius);
  drawTime(ctx[i], radius);
}

function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function drawFace(ctx, radius) {
  var grad;
  ctx.beginPath();
  ctx.arc(0, 0, radius, 0, 2*Math.PI);
  ctx.fillStyle = 'white';
  ctx.fill();
  grad = ctx.createRadialGradient(0,0,radius*0.95, 0,0,radius*1.05);
  var color = getRandomColor();
  grad.addColorStop(0, color);
  grad.addColorStop(0.5, 'white');
  grad.addColorStop(1, color);
  ctx.strokeStyle = grad;
  ctx.lineWidth = radius*0.1;
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(0, 0, radius*0.1, 0, 2*Math.PI);
  ctx.fillStyle = color;
  ctx.fill();
}

function drawNumbers(ctx, radius) {
  var ang;
  var num;
  ctx.font = radius*0.15 + "px arial";
  ctx.textBaseline="middle";
  ctx.textAlign="center";
  for(num = 1; num < 13; num++){
    ang = num * Math.PI / 6;
    ctx.rotate(ang);
    ctx.translate(0, -radius*0.85);
    ctx.rotate(-ang);
    ctx.fillText(num.toString(), 0, 0);
    ctx.rotate(ang);
    ctx.translate(0, radius*0.85);
    ctx.rotate(-ang);
  }
}

function drawTime(ctx, radius){
  var now = new Date();
  var hour = now.getHours();
  var minute = now.getMinutes();
  var second = now.getSeconds();
  //hour
  hour=hour%12;
  hour=(hour*Math.PI/6)+
  (minute*Math.PI/(6*60))+
  (second*Math.PI/(360*60));
  drawHand(ctx, hour, radius*0.5, radius*0.07);
  //minute
  minute=(minute*Math.PI/30)+(second*Math.PI/(30*60));
  drawHand(ctx, minute, radius*0.8, radius*0.07);
  // second
  second=(second*Math.PI/30);
  drawHand(ctx, second, radius*0.9, radius*0.02);
}

function drawHand(ctx, pos, length, width) {
  ctx.beginPath();
  ctx.lineWidth = width;
  ctx.lineCap = "round";
  ctx.moveTo(0,0);
  ctx.rotate(pos);
  ctx.lineTo(0, -length);
  ctx.stroke();
  ctx.rotate(-pos);
}



