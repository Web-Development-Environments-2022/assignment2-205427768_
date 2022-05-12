var context;
var shape = new Object();
var board;
var score;
var pac_color;
var start_time;
var time_elapsed;
var interval;
var rows=22;
var cols=22;

//pacman
var shapePacman = new Object();
var key_upCode=38;
var key_downCode=40;
var key_rightCode=39;
var key_leftCode=37;
var direction = 4;
var imgRight;
var imgLeft;
var imgDown;
var imgUp;

//Balls
var totalNumberOfBalls;
var ball5Amount;
var ball15Amount;
var ball25Amount;
var color5 = "#0000ff";
var color15 = "#00ff00";
var color25 = "#ff0000";
var food_remain_5;
var food_remain_15;
var food_remain_25; 



var gameTime;
//monsters
var monstersNum = 2;
var currMonster = 1;
var monsterArray;
var shapeMonster1=new Object();
var shapeMonster2=new Object();
var shapeMonster3=new Object();
var shapeMonster4=new Object();
var imgMonster1;
var imgMonster2;
var imgMonster3;
var imgMonster4;

var width_canvas;
var height_canvas;
var width_cell;
var height_cell;

var food_remain; 




window.onclick = function(event) {
	if (event.target == modal) {
	  modal.style.display = "none";
	}
  }
$(document).ready(function() {
	//show("welcome")
	context = canvas.getContext("2d");
	width_canvas=canvas.width;
	height_canvas=canvas.height;
	width_cell=width_canvas/rows;
	height_cell=height_canvas/cols;
	//updateSetting();
	show("gameAll");
	Start();


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

function startNewGame(){
	show("gameAll");
	totalNumberOfBalls = document.getElementById("lblNumOfBalls").value;
	
	// number of each type of ball
	ball5Amount = Math.round(0.6*totalNumberOfBalls);
	ball15Amount = Math.round(0.3*totalNumberOfBalls);
	ball25Amount = Math.round(0.1*totalNumberOfBalls);
	//ballsColors
	color5 = document.getElementById("colorpicker1").value;
	color15 = document.getElementById("colorpicker2").value;
	color25 = document.getElementById("colorpicker3").value;
	
	//gameTime
	gameTime =  document.getElementById("gameTime").value;

	//numberofMonsters
	monstersNum = document.getElementById("lblNumOfMonsters").value;
	currMonster = 1

	$(document).ready(function() {
		context = canvas.getContext("2d");
		width_canvas=canvas.width;
		height_canvas=canvas.height;
		width_cell=width_canvas/rows;
		height_cell=height_canvas/cols;
		//updateSetting();
		show("gameAll");
		Start();
	});
	
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
/*
function Start() {
	board = new Array();
	score = 0;
	pac_color = "yellow";
	var cnt = rows*cols;
	var food_remain = 50;
	var pacman_remain = 1;
	start_time = new Date();
	for (var i = 0; i < rows; i++) {
		board[i] = new Array();
		//put obstacles in (i=3,j=3) and (i=3,j=4) and (i=3,j=5), (i=6,j=1) and (i=6,j=2)
		for (var j = 0; j < cols; j++) {
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
*/
function Start() {
	//window.focus();
	board = new Array();
	score = 0;
	pac_color = "yellow";
	var cnt = rows*cols;
	direction = 4;
	var food_remain = 50;
	food_remain_5 = ball5Amount;
	food_remain_15 = ball15Amount;
	food_remain_25 = ball25Amount;
	var pacman_remain = 1;
	start_time = new Date();
	currMonster = 1;
	/*board[0] =  [4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4]
	board[1] =  [4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4]
	board[2] =  [4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4]
	board[3] =  [4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4]
	board[4] =  [4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4]
	board[5] =  [4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4]
	board[6] =  [4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4]
	board[7] =  [4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4]
	board[8] =  [4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4]
	board[9] =  [4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4]
	board[10] = [4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4]
	board[11] = [4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4]
	board[12] = [4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4]
	board[13] = [4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4]
	board[15] = [4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4]
	board[16] = [4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4]
	board[17] = [4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4]
	board[18] = [4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4]
	board[19] = [4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4]
	board[20] = [4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4]
	board[21] = [4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4]*/
	for (var i = 0; i < rows; i++) {
		board[i] = new Array();

		
		for (var j = 0; j < cols; j++) {
			//board[i][j]=4;
			//put obstacles in (i=3,j=3) and (i=3,j=4) and (i=3,j=5), (i=6,j=1) and (i=6,j=2)
			if (i == 1 && j == 1 || i==1 && j==20 || i==20 && j==1 || i==20 && j==20){
				if(currMonster <= monstersNum)
				{
					eval("shapeMonster"+currMonster).j = j;
					eval("shapeMonster"+currMonster).i = i;
					currMonster++;
					board[i][j] = 2;
				} 
			}
			
			else if(i==0 || i==21){
				board[i][j]=4;
			}
			else if( j==0 ||j==21){
				board[i][j]=4;
			}
				
			else if(j==4 && i==2 || j==3&& i==2 || j==2&& i==2|| j==2&& i==3 || j==2&& i==4 || j==3 && i==4  || j==4 && i==4  || j==5 && i==4  || j==6 && i==4){
				board[i][j]=4;
			}
				
			
			else if(j==8 && i==2 || j==9 && i==2 || j==10&& i==2|| j==11&& i==2 || j==12&& i==2|| j==13 && i==2  ||j==8 && i==5 || j==9 && i==5 || j==10&& i==5|| j==11&& i==5 || j==12&& i==5|| i==3 && j==10 || i==4 && j==10 ){
				board[i][j]=4;
			}
					
			else if(j==17 && i==2 || j==18 && i==2 || j==19 && i==2|| j==19&& i==3 || j==19&& i==4|| j==19 && i==4 || j==18&& i==4|| j==17&& i==4 || j==16&& i==4|| i==4 && j==15 ){
				board[i][j]=4;
			}
					
			else if(j==1 && i==6 || j==2 && i==6 || j==3 && i==6|| j==4&& i==6 ){
				board[i][j]=4;
			}
					
			else if(j==17 && i==6 || j==18 && i==6 || j==19 && i==6|| j==20 && i==6 ){
				board[i][j]=4;
			}
			
			else if(j==2 && i==10 || j==3 && i==8 || j==3 && i==9||j==3 && i==10 ||j==3 && i==11||j==3 && i==12||j==3 && i==13 ||j==4 && i==11  ){
				board[i][j]=4;
			}
					
			else if( j==6 && i==8 || j==6 && i==9||j==6 && i==10 ||j==6 && i==11||j==6 && i==12||j==6 && i==13 ||j==7 && i==10 ){
				board[i][j]=4;
			}
				
			else if( j==9 && i==8 || j==9 && i==9||j==10 && i==8 ||j==11 && i==8||j==12 && i==8||j==12 && i==9 ) {
				board[i][j]=4;
			}
						
			else if( j==9 && i==12 || j==9 && i==13||j==10 && i==13 ||j==11 && i==13||j==12 && i==13||j==12 && i==12 ){
				board[i][j]=4;	
			}
					
			else if( j==15 && i==8 || j==15 && i==9||j==15 && i==10 ||j==15 && i==11||j==15 && i==12||j==15 && i==13 ||j==14 && i==10 ){
					board[i][j]=4;
			}
					
			else if(j==17 && i==11 || j==18 && i==8 || j==18 && i==9||j==18 && i==10 ||j==18 && i==11||j==18 && i==12||j==18 && i==13 ||j==19 && i==10  ){
				board[i][j]=4;		
			}
						
			else if(j==1 && i==15 || j==2 && i==15 || j==3 && i==15|| j==4&& i==15 ){
				board[i][j]=4;
			}
					
			else if(j==17 && i==15 || j==18 && i==15 || j==19 && i==15|| j==20 && i==15 ){
				board[i][j]=4;
			}
			
			else if(j==4 && i==19 || j==3&& i==19 || j==2&& i==19|| j==2&& i==18 || j==2&& i==17 || j==3 && i==17  || j==4 && i==17  || j==5 && i==17  || j==6 && i==17){
				board[i][j]=4;	
			}
					
			else if(j==8 && i==16 || j==9 && i==16 || j==10&& i==16|| j==11&& i==16 || j==12&& i==16|| j==13 && i==19  ||j==8 && i==19 || j==9 && i==19 || j==10 && i==19|| j==11&& i==19 || j==12&& i==19|| i==17 && j==10 || i==18 && j==10 ){
				board[i][j]=4;
			}
						
			else if(j==17 && i==19 || j==18 && i==19 || j==19 && i==19|| j==19&& i==18 || j==19&& i==17|| j==19 && i==17 || j==18&& i==17|| j==17&& i==17 || j==16&& i==17 || j==15&& i==17|| i==4 && j==17 ){
				board[i][j]=4;
			}
					




			else {
				board[i][j] = 0;
				/*var randomNum = Math.random();
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
				}*/
				cnt--;
			}
		}
	}
	var pacman=findRandomEmptyCell(board);
	shape.i = pacman[0];
	shape.j = pacman[1];
	board[pacman[0]][pacman[1]] = 2;
	while (food_remain_5 > 0) {
		var emptyCell = findRandomEmptyCell(board);
		board[emptyCell[0]][emptyCell[1]] = 5;
		food_remain_5--;
	}
	while (food_remain_15 > 0) {
		var emptyCell = findRandomEmptyCell(board);
		board[emptyCell[0]][emptyCell[1]] = 15;
		food_remain_15--;
	}
	while (food_remain_25 > 0) {
		var emptyCell = findRandomEmptyCell(board);
		board[emptyCell[0]][emptyCell[1]] = 25;
		food_remain_25--;
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
	interval = setInterval(UpdatePosition, 170);
}

function findRandomEmptyCell(board) {
	var i = Math.floor(Math.random() * (rows-1) + 1);
	var j = Math.floor(Math.random() * (cols-1)+ 1);
	while (board[i][j] != 0) {
		i = Math.floor(Math.random() * (rows-1) + 1);
		j = Math.floor(Math.random() * (cols-1) + 1);
	}
	return [i, j];
}

function KeyUpdate(e,dir){

	if(dir=="Up")
	{
		key_upCode = e.keyCode
		document.getElementById("keyUp").value = e.key
	}
	if(dir=="LEFT"){
		key_leftCode=e.keyCode
		document.getElementById("keyLeft").value = e.key
		}
	if(dir=="DOWN"){
		key_downCode=e.keyCode
		document.getElementById("keyDown").value = e.key
	}
	
	if(dir=="RIGHT"){
		key_rightCode=e.keyCode
		document.getElementById("keyRight").value = e.key
	} 
  }



function GetKeyPressed() {
	if (keysDown[key_upCode]) {
		return 1;
	}
	if (keysDown[key_downCode]) {
		return 2;
	}
	if (keysDown[key_leftCode]) {
		return 3;
	}
	if (keysDown[key_rightCode]) { 
		return 4;
	}
}

function Draw(direction) {
	canvas.width = canvas.width; //clean board
	lblScore.value = score;
	lblTime.value = time_elapsed;
	for (var i = 0; i < rows; i++) {
		for (var j = 0; j < cols; j++) {
			var center = new Object();
			center.x = i *width_cell+width_cell/2;
			center.y = j * height_cell+height_cell/2;
			//center.x = i * 60 + 30;
			//center.y = j * 60 + 30;
			if (board[i][j] == 2) {
				context.beginPath();
				if(direction== 1){ //up
					context.arc(center.x, center.y, height_cell/2, 1.65 * Math.PI, 3.35 * Math.PI); // half circle
				}
				if(direction== 2){ //down	
					context.arc(center.x, center.y, height_cell/2, 0.65 * Math.PI, 2.35 * Math.PI); // half circle
				}
				
				
				if(direction== 3){ //left
					context.arc(center.x, center.y, height_cell/2, 1.15 * Math.PI, 2.85 * Math.PI); // half circle
				}
				if(direction== 4){ //right
					context.arc(center.x, center.y, height_cell/2, 0.15 * Math.PI, 1.85 * Math.PI); // half circle
				}

				//context.arc(center.x, center.y, 30, 0.15 * Math.PI, 1.85 * Math.PI); // half circle
				context.lineTo(center.x, center.y);
				context.fillStyle = pac_color; //color
				context.fill();
				context.beginPath();
				if(direction== 1){ //up
					context.arc(center.x - width_cell/4, center.y - height_cell/12, 5, 0, 2 * Math.PI); // circle eye
				}
				if(direction== 2){ //down
					context.arc(center.x + width_cell/4, center.y + height_cell/12, 5, 0, 2 * Math.PI); // circle eye
				}
				if(direction== 3){ //left
					context.arc(center.x - width_cell/12, center.y - height_cell/4, 5, 0, 2 * Math.PI); // circle eye
				}
				if(direction== 4){ //right
					context.arc(center.x + width_cell/12, center.y - height_cell/4, 5, 0, 2 * Math.PI); // circle eye
				}
				context.fillStyle = "white"; //color
				context.fill();
			}
			else if (board[i][j] == 5) { //balls5
				context.beginPath();
				context.arc(center.x, center.y, width_cell/2, 0, 2 * Math.PI); // circle
				context.fillStyle = color5; //color
				context.fill();
				context.font = '15px Calibri';		
				context.fillStyle = 'white';
				context.textAlign = 'center';
				context.fillText("5", center.x  ,center.y+5);
			} 
			else if (board[i][j] == 15) { //balls15
				context.beginPath();
				context.arc(center.x, center.y, width_cell/2, 0, 2 * Math.PI); // circle
				context.fillStyle = color15; //color
				context.fill();
				context.font = '15px Calibri';		
				context.fillStyle = 'white';
				context.textAlign = 'center';
				context.fillText("15", center.x  ,center.y+5);
			} 
			else if (board[i][j] == 25) { //balls25
				context.beginPath();
				context.arc(center.x, center.y, width_cell/2, 0, 2 * Math.PI); // circle
				context.fillStyle = color25; //color
				context.fill();
				context.font = '15px Calibri';		
				context.fillStyle = 'white';
				context.textAlign = 'center';
				context.fillText("25", center.x  ,center.y+5);
			} else if (board[i][j] == 4) {
				context.beginPath();
				context.rect(center.x -width_cell/2, center.y - height_cell/2, width_cell, height_cell);
			//	context.rect(center.x -30, center.y - 30, 60, 60);
				context.fillStyle = "grey"; //color
				context.fill();
			}
		}
	}
	
}

function UpdatePosition() {
	board[shape.i][shape.j] = 0;
	var x = GetKeyPressed();
	if (typeof x != "undefined")
		direction = x
	if (x == 1) {
		if (shape.j > 0 && board[shape.i][shape.j - 1] != 4) {
			shape.j--;

		}
	}
	if (x == 2) {
		if (shape.j < rows-1 && board[shape.i][shape.j + 1] != 4) {
			shape.j++;
		}
	}
	if (x == 3) {
		if (shape.i > 0 && board[shape.i - 1][shape.j] != 4) {
			shape.i--;
		}
	}
	if (x == 4) {
		if (shape.i < cols-1 && board[shape.i + 1][shape.j] != 4) {
			shape.i++;
		}
	}
	if (board[shape.i][shape.j] == 5) {
		score+=5;
	}
	if (board[shape.i][shape.j] == 15) {
		score+=15;
	}
	if (board[shape.i][shape.j] == 25) {
		score+=25;
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
	} else 
	{
		Draw(direction);
	//	Draw();
	}
}

