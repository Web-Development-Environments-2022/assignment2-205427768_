var context;
var shape = new Object();
var board;
var score;
var pac_color;
var start_time;
var time_elapsed;
var interval;



window.onclick = function(event) {
	if (event.target == modal) {
	  modal.style.display = "none";
	}
  }
$(document).ready(function() {
	//show("welcome")
	//context = canvas.getContext("2d");
	//Start();


	// Get the modal
	var modal = document.getElementById("myModal");

	// Get the button that opens the modal
	var btn = document.getElementById("myBtn");

	// Get the <span> element that closes the modal
	var span = document.getElementsByClassName("close")[0];

	// When the user clicks on the button, open the modal
	btn.onclick = function() {
		modal.style.display = "block";
	}

	// When the user clicks on <span> (x), close the modal
	span.onclick = function() {
	modal.style.display = "none";
	}

	// When the user clicks anywhere outside of the modal, close it
	window.onclick = function(event) {
		if (event.target == modal) {
			modal.style.display = "none";
		}
	}
	updateBallsValue();

	updateMonsterValue();
/*
	let colorButton1 = document.getElementById("colorpicker1");
	colorButton1.oninput = function() {
		colorDiv.style.color = colorButton.value;
	}
	let colorButton2 = document.getElementById("colorpicker1");
	colorButton2.oninput = function() {
		colorDiv.style.color = colorButton.value;
	}
	let colorButton3 = document.getElementById("colorpicker1");
	colorButton3.oninput = function() {
		colorDiv.style.color = colorButton.value;
	}
	*/

	




});
function updateBallsValue(){
	var sliderBalls = document.getElementById("lblNumOfBalls");
	var outputBalls = document.getElementById("ballsNum");
	outputBalls.innerHTML = sliderBalls.value;
	sliderBalls.oninput = function() {
		outputBalls.innerHTML = this.value;
	}
}
function updateMonsterValue(){
	var sliderMonsters = document.getElementById("lblNumOfMonsters");
	var outputMonsters = document.getElementById("monstersNum");
	outputMonsters.innerHTML = sliderMonsters.value;
	sliderMonsters.oninput = function() {
		outputMonsters.innerHTML = this.value;
	}
}


function updateTime(){
	var textboxTime = document.getElementById("gameTime");
	textboxTime.value = Math.floor(Math.random() * (600 - 60 + 1) + 60);
}


$(document).keydown(function(event) { 
	if (event.keyCode == 27) { 
		document.getElementById("myModal").style.display = "none";
	}
});
function show(elementID){

	var e = document.getElementById(elementID);
	$('div.divstoHide').hide();
	//var divsToHide = document.getElementsByClassName("divstoHide");
	//for(var i = 0; i < divsToHide.length; i++){
	//	divsToHide[i].style.visibility = "hidden";
	//}
	

	//var topMenu = document.getElementById("topMenu");
	//var header = document.getElementById("header");
	//header.style.display = 'block'
	//topMenu.style.display = 'block'
	e.style.display = 'block';





	//case1 : Welcome
	//if(par=="welcome"){
	//	document.getElementById("registerID").style.display ="none"
	//	document.getElementById("loginID").style.display ="none"
	//	document.getElementById("welcomeID").style.display ="block"
	//}
	//case2 : Register
	//if(par=="register"){
	//	document.getElementById("welcomeID").style.display ="none"
	//	document.getElementById("loginID").style.display ="none"
	//	document.getElementById("registerID").style.display ="block"
	//}
	//case2 : Login
//	if(par=="login"){
//		document.getElementById("welcomeID").style.display ="none"
//		document.getElementById("registerID").style.display ="none"
//		document.getElementById("loginID").style.display ="block"
//	}



} 
function generateRandomValues(){
	document.getElementById("keyUp").value = "ArrowUp"
	document.getElementById("keyLeft").value = "ArrowLeft"
	document.getElementById("keyRight").value = "ArrowRight"
	document.getElementById("keyDown").value = "ArrowDown"
	//numberOfBalls
	document.getElementById("lblNumOfBalls").value = Math.floor(Math.random() * (90 - 50 + 1) + 50)
	updateBallsValue();
	//numberOfMonsters
	document.getElementById("lblNumOfMonsters").value = Math.floor(Math.random() * (4 - 1 + 1) + 1)
	updateMonsterValue();
	updateTime();
	document.getElementById("colorpicker1").value = "#"+Math.floor(Math.random()*16777215).toString(16);
	document.getElementById("colorpicker2").value = "#"+Math.floor(Math.random()*16777215).toString(16);
	document.getElementById("colorpicker3").value = "#"+Math.floor(Math.random()*16777215).toString(16);
}


function Start() {
	board = new Array();
	score = 0;
	pac_color = "yellow";
	var cnt = 100;
	var food_remain = 50;
	var pacman_remain = 1;
	start_time = new Date();
	for (var i = 0; i < 10; i++) {
		board[i] = new Array();
		//put obstacles in (i=3,j=3) and (i=3,j=4) and (i=3,j=5), (i=6,j=1) and (i=6,j=2)
		for (var j = 0; j < 10; j++) {
			if (
				(i == 3 && j == 3) ||
				(i == 3 && j == 4) ||
				(i == 3 && j == 5) ||
				(i == 6 && j == 1) ||
				(i == 6 && j == 2)
			) {
				board[i][j] = 4;
			} else {
				var randomNum = Math.random();
				if (randomNum <= (1.0 * food_remain) / cnt) {
					food_remain--;
					board[i][j] = 1;
				} else if (randomNum < (1.0 * (pacman_remain + food_remain)) / cnt) {
					shape.i = i;
					shape.j = j;
					pacman_remain--;
					board[i][j] = 2;
				} else {
					board[i][j] = 0;
				}
				cnt--;
			}
		}
	}
	while (food_remain > 0) {
		var emptyCell = findRandomEmptyCell(board);
		board[emptyCell[0]][emptyCell[1]] = 1;
		food_remain--;
	}
	keysDown = {};
	addEventListener(
		"keydown",
		function(e) {
			keysDown[e.keyCode] = true;
		},
		false
	);
	addEventListener(
		"keyup",
		function(e) {
			keysDown[e.keyCode] = false;
		},
		false
	);
	interval = setInterval(UpdatePosition, 250);
}

function findRandomEmptyCell(board) {
	var i = Math.floor(Math.random() * 9 + 1);
	var j = Math.floor(Math.random() * 9 + 1);
	while (board[i][j] != 0) {
		i = Math.floor(Math.random() * 9 + 1);
		j = Math.floor(Math.random() * 9 + 1);
	}
	return [i, j];
}

function KeyUpdate(e,direction){

	if(direction=="Up")
	{
		document.getElementById("keyUp").value = e.key
	}
	if(direction=="LEFT"){
		document.getElementById("keyLeft").value = e.key
		}
	if(direction=="DOWN"){
		document.getElementById("keyDown").value = e.key
	}
	
	if(direction=="RIGHT"){
		document.getElementById("keyRight").value = e.key
	} 
  }



function GetKeyPressed() {
	if (keysDown[38]) {
		return 1;
	}
	if (keysDown[40]) {
		return 2;
	}
	if (keysDown[37]) {
		return 3;
	}
	if (keysDown[39]) {
		return 4;
	}
}

function Draw() {
	canvas.width = canvas.width; //clean board
	lblScore.value = score;
	lblTime.value = time_elapsed;
	for (var i = 0; i < 10; i++) {
		for (var j = 0; j < 10; j++) {
			var center = new Object();
			center.x = i * 60 + 30;
			center.y = j * 60 + 30;
			if (board[i][j] == 2) {
				context.beginPath();
				context.arc(center.x, center.y, 30, 0.15 * Math.PI, 1.85 * Math.PI); // half circle
				context.lineTo(center.x, center.y);
				context.fillStyle = pac_color; //color
				context.fill();
				context.beginPath();
				context.arc(center.x + 5, center.y - 15, 5, 0, 2 * Math.PI); // circle
				context.fillStyle = "white"; //color
				context.fill();
			} else if (board[i][j] == 1) {
				context.beginPath();
				context.arc(center.x, center.y, 15, 0, 2 * Math.PI); // circle
				context.fillStyle = "white"; //color
				context.fill();
			} else if (board[i][j] == 4) {
				context.beginPath();
				context.rect(center.x - 30, center.y - 30, 60, 60);
				context.fillStyle = "grey"; //color
				context.fill();
			}
		}
	}
}

function UpdatePosition() {
	board[shape.i][shape.j] = 0;
	var x = GetKeyPressed();
	if (x == 1) {
		if (shape.j > 0 && board[shape.i][shape.j - 1] != 4) {
			shape.j--;
		}
	}
	if (x == 2) {
		if (shape.j < 9 && board[shape.i][shape.j + 1] != 4) {
			shape.j++;
		}
	}
	if (x == 3) {
		if (shape.i > 0 && board[shape.i - 1][shape.j] != 4) {
			shape.i--;
		}
	}
	if (x == 4) {
		if (shape.i < 9 && board[shape.i + 1][shape.j] != 4) {
			shape.i++;
		}
	}
	if (board[shape.i][shape.j] == 1) {
		score++;
	}
	board[shape.i][shape.j] = 2;
	var currentTime = new Date();
	time_elapsed = (currentTime - start_time) / 1000;
	if (score >= 20 && time_elapsed <= 10) {
		pac_color = "green";
	}
	if (score == 50) {
		window.clearInterval(interval);
		window.alert("Game completed");
	} else {
		Draw();
	}
}
