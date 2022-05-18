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
var currBallsNum;
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
var points50 = new Object();
var img50;
var interval50;
var eaten50;


var gameTime;
//ghosts
var ghostNum = 2;
var currGhost = 1;
var ghostArray;
//var shapeGhost1=new Object();
//var shapeGhostr2=new Object();
//var shapeGhost3=new Object();
//var shapeGhost4=new Object();
var imgGhost1;
var imgGhost2;
var imgGhost3;
var imgGhost4;
var intervalGhosts ;




var img_clock;
var intervalClock;
var ClockAppear;
var time_elapsed_clock;


var width_canvas;
var height_canvas;
var width_cell;
var height_cell;
//lives
var livesNum;
//var shapeLife = new Object();
var intervalLives;
var lifeAppear;
var time_elapsed_life;
var img_life;

//slowMotion
var intervalSlowMotion;
var slowMotionAppear;
var time_elapsed_slow_motion;
var img_slowMotion;
var start_slow_motion;
var isSlowMotion;
var food_remain; 

//music
var playSoundBoll = false;
var sound_play;
var music;

var currTimePause;

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
	//show("gameAll");
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
});

function updateBallsValue(){
	var sliderBalls = document.getElementById("lblNumOfBalls");
	var outputBalls = document.getElementById("ballsNum");
	outputBalls.innerHTML = sliderBalls.value;
	sliderBalls.oninput = function() {
		outputBalls.innerHTML = this.value;
	}
}
function updateGhostValue(){
	var sliderGhosts = document.getElementById("lblNumOfMonsters");
	var outputGhosts = document.getElementById("monstersNum");
	outputGhosts.innerHTML = sliderGhosts.value;
	sliderGhosts.oninput = function() {
		outputGhosts.innerHTML = this.value;
	}
}

function updateTime(){
	var textboxTime = document.getElementById("gameTime");
	textboxTime.value = Math.floor(Math.random() * (300 - 60 + 1) + 60);
}

$(document).keydown(function(event) { 
	if (event.keyCode == 27) { 
		document.getElementById("myModal").style.display = "none";
	}
});

function show(elementID){
	var e = document.getElementById(elementID);
	$('div.divstoHide').hide();
	e.style.display = 'block';
	if(elementID=="Settings"){
		updateBallsValue();
		updateGhostValue();
	}
	if (music== true){
		stopSound();
	}
	window.clearInterval(interval);
	window.clearInterval(interval50);
	window.clearInterval(intervalClock);
	window.clearInterval(intervalGhosts);
	window.clearInterval(intervalLives);
	window.clearInterval(intervalSlowMotion);
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

	//numberofGhosts
	ghostNum = document.getElementById("lblNumOfMonsters").value;
	currGhost = 1

	$(document).ready(function() {
		context = canvas.getContext("2d");
		width_canvas=canvas.width;
		height_canvas=canvas.height;
		width_cell=width_canvas/rows;
		height_cell=height_canvas/cols;
		if (document.getElementById("keyUp").value == ""){
			document.getElementById("keyUp").value = "ArrowUp";
		}
		if (document.getElementById("keyLeft").value == ""){
			document.getElementById("keyLeft").value = "ArrowLeft";
		}
		if (document.getElementById("keyRight").value == ""){
			document.getElementById("keyRight").value = "ArrowRight";
		}
		if (document.getElementById("keyDown").value == ""){
			document.getElementById("keyDown").value = "ArrowDown";
		}
		document.getElementById("lblUser").value = document.getElementsByName("usernameLogin")[0].value;
		document.getElementById("lblKeyUp").value =document.getElementById("keyUp").value;
		document.getElementById("lblKeyLeft").value =document.getElementById("keyLeft").value;
		document.getElementById("lblKeyRight").value =document.getElementById("keyRight").value;
		document.getElementById("lblKeyDown").value =document.getElementById("keyDown").value;
		document.getElementById("lblballsNum").value =document.getElementById("lblNumOfBalls").value;
		document.getElementById("lblColor1").value =document.getElementById("colorpicker1").value;
		document.getElementById("lblColor2").value =document.getElementById("colorpicker2").value;
		document.getElementById("lblColor3").value =document.getElementById("colorpicker3").value;
		document.getElementById("lblMonstersNum").value =document.getElementById("lblNumOfMonsters").value;
		show("gameAll");
		var form = document.getElementById("settingsForm");
		document.getElementById("lblNumOfMonsters").value= 2;
		document.getElementById("lblNumOfBalls").value =70;
		document.getElementById("keyUp").value = "";
		document.getElementById("keyLeft").value = "";
		document.getElementById("keyRight").value = "";
		document.getElementById("keyDown").value = "";
		form.reset();
		Start();
	});

	playSoundBoll=true;
	playSound();
	
}

function generateRandomValues(){
	document.getElementById("keyUp").value = "ArrowUp"
	document.getElementById("keyLeft").value = "ArrowLeft"
	document.getElementById("keyRight").value = "ArrowRight"
	document.getElementById("keyDown").value = "ArrowDown"
	//numberOfBalls
	document.getElementById("lblNumOfBalls").value = Math.floor(Math.random() * (90 - 50 + 1) + 50)
	updateBallsValue();
	//numberOfGhosts
	document.getElementById("lblNumOfMonsters").value = Math.floor(Math.random() * (4 - 1 + 1) + 1)
	updateGhostValue();
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
	window.onkeydown = function (e) {
		if (e.key == 'ArrowUp' || e.key =='ArrowDown' || e.key == 'ArrowLeft' || e.key == 'ArrowRight') {
			e.view.event.preventDefault();
		}
	}
	
	board = new Array();
	score = 0;
	livesNum = 5;
	pac_color = "yellow";
	var cnt = rows*cols;
	direction = 4;
	var food_remain = 50;
	ghostArray = new Array();
	food_remain_5 = ball5Amount;
	food_remain_15 = ball15Amount;
	food_remain_25 = ball25Amount;
	currBallsNum = food_remain_5 + food_remain_15 + food_remain_25;
	var pacman_remain = 1;
	start_time = new Date();
	currGhost = 1;
	eaten50 = false;
	isSlowMotion = false;
	createImages();
	createSounds();

	for (var i = 0; i < rows; i++) {
		board[i] = new Array();

		for (var j = 0; j < cols; j++) {
			//board[i][j]=4;
			//put obstacles in (i=3,j=3) and (i=3,j=4) and (i=3,j=5), (i=6,j=1) and (i=6,j=2)
			if (i == 1 && j == 1 || i==1 && j==20 || i==20 && j==1 || i==20 && j==20){
				if(currGhost <= ghostNum) 
				{
				//	eval("shapeGhost"+currGhost).j = j; 
				//	eval("shapeGhost"+currGhost).i = i;
					ghostArray[currGhost] = new Object();
					ghostArray[currGhost].i = i;
					ghostArray[currGhost].j = j;
					currGhost++;
					//board[i][j] = 2;
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
					

			else if(j ==10 && i==10){
				points50.i = i;
				points50.j = j;
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
	interval50 = setInterval(UpdatePosition50, 700);
	intervalClock = setInterval(updatePositionClock, 30000);
	intervalGhosts = setInterval(UpdatePositionGhosts, 500);
	intervalLives = setInterval(UpdatePositionLife, 25000);
	intervalSlowMotion = setInterval(UpdatePositionSlowMotion ,20000);
	playSound();
	music = true;
}

function createImages(){

	img50 = new Image();
	img50.src = "img/50Points.png";

	img_clock = new Image();
	img_clock.src = "img/clock.png";

	img_wall=new Image();
	img_wall.src='img/wall.png';

	imgGhost1 = new Image();
	imgGhost1.src = "img/ghost1.png";

	imgGhost2 = new Image();
	imgGhost2.src = "img/ghost2.png";

	imgGhost3 = new Image();
	imgGhost3.src = "img/ghost3.png";

	imgGhost4 = new Image();
	imgGhost4.src = "img/ghost4.png";
	
	img_life = new Image();
	img_life.src = "img/lifeOne.png";

	img_slowMotion = new Image();
	img_slowMotion.src = "img/slowMotion.png";
}

function createSounds(){
	sound_play = new Audio('sounds/game_remex.mp3');
}


function stopSound(){
	sound_play.pause();
	playSoundBoll=false;
	$("#stopSound").hide();
	$("#playSound").show();
}
function playSound(){
	sound_play.play();
	playSoundBoll=true;
	$("#playSound").hide();
	$("#stopSound").show();

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
	lblTime.value = gameTime - time_elapsed; //????
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
				context.drawImage(img_wall, center.x-width_cell/2, center.y-height_cell/2,width_cell,height_cell);
			}
			var currentTime1 = new Date();
			time_elapsed_clock = (currentTime1 - ClockAppear)/1000 ;
			if(board[i][j] == 6)
			{
				if(time_elapsed_clock<12){
					context.drawImage(img_clock,center.x-width_cell/2, center.y-height_cell/2,width_cell,height_cell);
				}
				 	
				else{
					board[i][j] = 0;
				}	
			}	
			time_elapsed_life = (currentTime1 - lifeAppear)/1000;
			if(board[i][j] == 7){
				if(time_elapsed_life < 8){
					context.drawImage(img_life,center.x-width_cell/2, center.y-height_cell/2,width_cell,height_cell);
				}
				else{
					board[i][j] = 0;
				}	
			}
			time_elapsed_slow_motion = (currentTime1 - slowMotionAppear)/1000;
			if(board[i][j] == 8){
				if(time_elapsed_slow_motion < 9){
					context.drawImage(img_slowMotion,center.x-width_cell/2, center.y-height_cell/2,width_cell,height_cell);
				}
				else{
					board[i][j] = 0;
				}
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
		board[shape.i][shape.j] = 2;
		score+=5;
		currBallsNum--;
	}
	if (board[shape.i][shape.j] == 15) {
		board[shape.i][shape.j] = 2;
		score+=15;
		currBallsNum--;
	}
	if (board[shape.i][shape.j] == 25) {
		board[shape.i][shape.j] = 2;
		score+=25;
		currBallsNum--;
	}
	if (shape.i == points50.i && shape.j == points50.j){
		board[shape.i][shape.j] = 2;
		eaten50 = true;
		window.clearInterval(interval50);
		score+=50;
		points50.i = null;
		points50.j = null;
	}
	if (board[shape.i][shape.j] == 6) {
		board[shape.i][shape.j] == 2;
		gameTime=Number(gameTime)+Number(20);
		document.getElementById("lblTime").value = timeGame;
	}
	if (board[shape.i][shape.j] == 7) {
		board[shape.i][shape.j] == 2;
		livesNum++;
		$("#life"+livesNum).show();
	}
	if (board[shape.i][shape.j] == 8) {
		start_slow_motion = new Date();
		board[shape.i][shape.j] == 2;
		window.clearInterval(intervalGhosts);
		intervalGhosts = setInterval(UpdatePositionGhosts, 1500);
		isSlowMotion = true;
	}
	var currTime = new Date();
	if((currTime - start_slow_motion)/1000 > 11 && isSlowMotion){
		window.clearInterval(intervalGhosts);
		intervalGhosts = setInterval(UpdatePositionGhosts, 600);
		isSlowMotion = false;
	}
		
	for(var k = 1; k < ghostArray.length; k++){
		if(shape.i == ghostArray[k].i && shape.j==ghostArray[k].j){
			UpdateLifes();
			board[shape.i][shape.j] == 0;
		}
	}
	board[shape.i][shape.j] = 2;
	var currentTime = new Date();
	time_elapsed = (currentTime - start_time) / 1000;
	if(time_elapsed >= gameTime || currBallsNum==0){
		if(score< 100 ){
			alert("You are better than "+score+" points!");
			alert = function(){};
			show('Settings');		
		}
		else{
			
			alert("Winner!!!");
			alert = function(){};
			show('Settings');
		}
		stopSound();
		show('gameOver');
	}
	/*if (score >= 20 && time_elapsed <= 10) {
		pac_color = "green";
	}*/
	/*if (score == 50) {
		window.clearInterval(interval);
		window.alert("Game completed");
	} */
	else 
	{
		Draw(direction);
		DrawGhosts();
		if(!eaten50){
			context.drawImage(img50, points50.i*width_cell, points50.j*height_cell,width_cell,height_cell);
		}
	//	Draw();
	}
}

function UpdateLifes(){
	$("#life"+livesNum).hide();
	livesNum--;
	score = score-10;
	
	if(livesNum==0)
	{   
		alert("Looser!");
		show('gameOver');
	}
	else{
		currGhost = 1;
		while(currGhost <= ghostNum) 
		{
			if (currGhost == 1){
				ghostArray[currGhost].i = 1;
				ghostArray[currGhost].j = 1;
			}
			else if(currGhost == 2){
				ghostArray[currGhost].i = 1;
				ghostArray[currGhost].j = 20;
			}
			else if(currGhost == 3){
				ghostArray[currGhost].i = 20;
				ghostArray[currGhost].j = 1;
			}
			else{
				ghostArray[currGhost].i = 20;
				ghostArray[currGhost].j = 20;
			}
			currGhost++;
			//board[i][j] = 2;
		} 
		var pacman=findRandomEmptyCell(board);
		shape.i = pacman[0];
		shape.j = pacman[1];
		board[pacman[0]][pacman[1]] = 2;
	}
}

function DrawGhosts(){
	for (var k = 1; k <= ghostNum; k++) { 
		context.drawImage(eval("imgGhost"+k), ghostArray[k].i*width_cell, ghostArray[k].j*height_cell,width_cell,height_cell);
	}
}


function UpdatePosition50(){
	var moved50  = false;
	while(!moved50){
		var x = Math.floor(Math.random() * (4 - 1 + 1) + 1);
		if (x == 1) {
			if (points50.j > 0 && board[points50.i][points50.j - 1] != 4){ //&& board[points50.i][points50.j - 1] != 5 && board[points50.i][points50.j - 1] != 15 && board[points50.i][points50.j - 1] != 25) {
				points50.j--;
				moved50  = true;
			}
		}
		else if (x == 2) {
			if (points50.j < rows-1 && board[points50.i][points50.j + 1] != 4){// && board[points50.i][spoints50hape.j - 1] != 5 && board[points50.i][points50.j - 1] != 15 && board[points50.i][points50.j - 1] != 25) {
				points50.j++;
				moved50  = true;
			}
		}
		else if (x == 3) {
			if (points50.i > 0 && board[points50.i - 1][points50.j] != 4){//&& board[points50.i][points50.j - 1] != 5 && board[points50.i][points50.j - 1] != 15 && board[points50.i][points50.j - 1] != 25) {
				points50.i--;
				moved50  = true;
			}
		}
		else if (x == 4) {
			if (points50.i < cols-1 && board[points50.i + 1][points50.j] != 4){// && board[points50.i][points50.j - 1] != 5 && board[points50.i][points50.j - 1] != 15 && board[points50.i][points50.j - 1] != 25) {
				points50.i++;
				moved50  = true;
			}
		}
	}
}
function updatePositionClock()
{
	ClockAppear=new Date();
	var emptyCell = findRandomEmptyCell(board);
	board[emptyCell[0]][emptyCell[1]] = 6;
}
function UpdatePositionLife(){
	lifeAppear=new Date();
	var emptyCell = findRandomEmptyCell(board);
	if (livesNum < 7){
		board[emptyCell[0]][emptyCell[1]] = 7;
	}
	
}
function UpdatePositionSlowMotion(){
	slowMotionAppear = new Date();
	var emptyCell = findRandomEmptyCell(board);
	board[emptyCell[0]][emptyCell[1]] = 8;

}
function UpdatePositionGhosts(){
	for(var k = 1; k <= ghostNum ;k++){
		var opposite=shape.j-ghostArray[k].j;
		var adjacent=shape.i-ghostArray[k].i;
		
		var angle= Math.atan2(opposite,adjacent);
		
	

		var vx = Math.round( Math.cos(angle));
		var vy= Math.round( Math.sin(angle));
		if(vx==0 && vy==-1){
			if(board[ghostArray[k].i][ghostArray[k].j-1] !=4){	
				ghostArray[k].j=ghostArray[k].j-1;
			}
			else{
				findRandomGhostCell(ghostArray[k]);
			}
		}
		else if(vx==0 && vy==1)
		{	
			if(board[ghostArray[k].i][ghostArray[k].j+1] !=4){
				ghostArray[k].j=ghostArray[k].j+1;
			}
			else{
				findRandomGhostCell(ghostArray[k]);
			}
				
		}
		else if(vx==-1 && vy==0){
			if(board[ghostArray[k].i-1][ghostArray[k].j] !=4){
				ghostArray[k].i=ghostArray[k].i-1;
			}
			else{
				findRandomGhostCell(ghostArray[k]);
			}
			
		}	
		else if(vx==1 && vy==0){
			if(board[ghostArray[k].i+1][ghostArray[k].j] !=4){	
				ghostArray[k].i=ghostArray[k].i+1;
			}
			else{
				findRandomGhostCell(ghostArray[k]);
			}
		} 
		else if(vx==-1 && vy==-1){
			if(board[ghostArray[k].i-1][ghostArray[k].j] !=4){
				ghostArray[k].i=ghostArray[k].i-1;
			}
		
			else if(board[ghostArray[k].i][ghostArray[k].j-1] !=4){
				ghostArray[k].j=ghostArray[k].j-1;
			}
			else{
				findRandomGhostCell(ghostArray[k]);
			}
		}
		else if(vx==-1 && vy==1)
		{	
			if(board[ghostArray[k].i-1][ghostArray[k].j] !=4){	
				ghostArray[k].i = ghostArray[k].i-1;
			}
			else if(board[ghostArray[k].i][ghostArray[k].j+1] != 4){
				ghostArray[k].j = ghostArray[k].j+1;
			}
			else{
				findRandomGhostCell(ghostArray[k]);
			}

		}
		else if(vx==1 && vy==-1)
		{	
			if(board[ghostArray[k].i+1][ghostArray[k].j] !=4){	
				ghostArray[k].i=ghostArray[k].i+1;
			}
			else if(board[ghostArray[k].i][ghostArray[k].j-1] != 4){
				ghostArray[k].j=ghostArray[k].j-1;
			}
			else{
				findRandomGhostCell(ghostArray[k]);
			}
				
		}
		else if(vx==1 && vy==1)
		{	
			if(board[ghostArray[k].i+1][ghostArray[k].j] !=4){
				ghostArray[k].i = ghostArray[k].i+1;
			}
			else if(board[ghostArray[k].i][ghostArray[k].j+1] != 4){
				ghostArray[k].j = ghostArray[k].j+1;
			}
			else{
				findRandomGhostCell(ghostArray[k]);
			}
		}
		else
		{
			findRandomGhostCell(ghostArray[k]);
		}	
	}
}



function findRandomGhostCell(ghost){
	var movedGhost  = false;
	while(!movedGhost){
		var x = Math.floor(Math.random() * (4 - 1 + 1) + 1);
		if (x == 1) {
			if (ghost.j > 0 && board[ghost.i][ghost.j - 1] != 4){ //&& board[points50.i][points50.j - 1] != 5 && board[points50.i][points50.j - 1] != 15 && board[points50.i][points50.j - 1] != 25) {
				ghost.j--;
				movedGhost  = true;
			}
		}
		else if (x == 2) {
			if (ghost.j < rows-1 && board[ghost.i][ghost.j + 1] != 4){// && board[points50.i][spoints50hape.j - 1] != 5 && board[points50.i][points50.j - 1] != 15 && board[points50.i][points50.j - 1] != 25) {
				ghost.j++;
				movedGhost  = true;
			}
		}
		else if (x == 3) {
			if (ghost.i > 0 && board[ghost.i - 1][ghost.j] != 4){//&& board[points50.i][points50.j - 1] != 5 && board[points50.i][points50.j - 1] != 15 && board[points50.i][points50.j - 1] != 25) {
				ghost.i--;
				movedGhost  = true;
			}
		}
		else if (x == 4) {
			if (ghost.i < cols-1 && board[ghost.i + 1][ghost.j] != 4){// && board[points50.i][points50.j - 1] != 5 && board[points50.i][points50.j - 1] != 15 && board[points50.i][points50.j - 1] != 25) {
				ghost.i++;
				movedGhost  = true;
			}
		}
	}

}
function resumeGame(){
	$("#pauseGame").hide();
	$("#playGame").show();
	if (playSoundBoll==true){
		music = true;
		stopSound();
		$("#playSound").show();
	}
	else{
		music = false;
	}
	
	currTimePause = new Date();
	window.clearInterval(interval);
	window.clearInterval(interval50);
	window.clearInterval(intervalClock);
	window.clearInterval(intervalGhosts);
	window.clearInterval(intervalLives);
	window.clearInterval(intervalSlowMotion);
	document.getElementById("canvas").disabled = true;
	
}
function playGame(){
	$("#playGame").hide();
	$("#pauseGame").show();
	if (music== true){
		playSound();
		$("#stopSound").show();
	}
	
	var now = new Date();
	var elapsed = (now-currTimePause) / 1000;
	//gameTime = gameTime + elapsed;
	start_time.setSeconds(start_time.getSeconds() + elapsed) ;

	interval = setInterval(UpdatePosition, 170);
	interval50 = setInterval(UpdatePosition50, 700);
	intervalClock = setInterval(updatePositionClock, 30000);
	intervalGhosts = setInterval(UpdatePositionGhosts, 500);
	intervalLives = setInterval(UpdatePositionLife, 25000);
	intervalSlowMotion = setInterval(UpdatePositionSlowMotion,20000);
	document.getElementById("canvas").disabled = false;
}
	
