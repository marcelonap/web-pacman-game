//declaring the variables that are going to be used in multiple places throughout the code
//such as ones to keep track of the score, number of pellets, the timeout time and etc.
let pieman = document.getElementById('pieman');
let scoreboard = document.getElementById('scoreboard')
const  windowWidth = window.innerWidth - 70;
const  windowHeight = window.innerHeight - 70;
let pelletCount = 0;
let moveBy = 30;
let container = document.getElementById('container');
let score = 0;
let timeout = 10000;
var ratio = .95;

//Sets up the game when window is first loaded
window.addEventListener('load', () =>{
	pieman.style.position = 'absolute';
	pieman.style.left = 0;
	pieman.style.top = 0;
	generatePellet(1);
	updateScore();
});



//Makes pieman move according to the arrow keys, not continuously as you said that wasn't necessary, the pieman will only move while the key is pressed down.
window.addEventListener('keydown', (e) => {
	switch(e.key){
		case 'ArrowLeft' :
			if(pieman.style.left >= 0 + 'px'){
			pieman.style.left =  parseInt(pieman.style.left) - moveBy + 'px';
			}
			pieman.style.transform = 'rotate(180deg)';
			check();
			break;
		case 'ArrowUp' :
			if(pieman.style.top >= 0 + 'px'){
			pieman.style.top = parseInt(pieman.style.top) - moveBy + 'px';
		}
			pieman.style.transform = 'rotate(270deg)';
			check();
			break;
		case 'ArrowRight' :
		if( parseInt(pieman.style.left) >= windowWidth) break;
			pieman.style.left = parseInt(pieman.style.left) + moveBy + 'px';
			pieman.style.transform = 'rotate(0deg)';
			console.log(parseInt(pieman.style.left));
			check();
			break;
		case 'ArrowDown' :
		if(parseInt(pieman.style.top) >= windowHeight) break;
			pieman.style.top = parseInt(pieman.style.top) + moveBy + 'px';
			pieman.style.transform = 'rotate(90deg)';
			check();
			break;
	}
});


//function to place "num" amount of pellets(coins) in random places in the browser window,
function generatePellet(num){

	for(var i = 0; i < num; i++){
		let pellet = document.createElement("div");
		container.appendChild(pellet);
		pellet.setAttribute('class','pellet');
		pellet.style.position = 'absolute';
		pellet.style.backgroundImage = " url('coin.gif')";
		pellet.style.backgroundSize = "cover";
		pellet.style.width = "50px";
		pellet.style.height = "50px";
		pellet.style.left = Math.random() * windowWidth + 'px';
		pellet.style.top = Math.random() * windowHeight + 'px';
		pelletCount++;
		setTimeout(function(){ removePellet(pellet); updateScore(); }, timeout);		
	}
}

//Fucntion to remove a specific pellet, also responsible for updating the number of pellets in the window
function removePellet(pellet){
	updateScore();
	if(pellet.getAttribute('class') == 'pellet'){
	container.removeChild(pellet);
	--pelletCount;
	}
}

//function to cheeck if pieman has eaten a pellet by comparing its coordinates to every pellet on the board by looping through an arrat of pellets,
// called everytime pieman moves
function check(){
	var pellet = document.getElementsByClassName('pellet');

	for(var i= 0; i < pellet.length; i++){
	var cell = pellet[i];
	var x = parseInt(cell.style.left);
	var y = parseInt(cell.style.top);
	var piex = parseInt(pieman.style.left);
	var piey = parseInt(pieman.style.top);
	 
	if( x - piex <= 25 && y - piey <= 25 && x - piex >= -25 && y - piey >= -25 ){
		++score;
		removePellet(cell);
		generatePellet(2);
		timeout = timeout * ratio;
		updateScore();
		return;
	}else continue;
}
 if(pelletCount> 0) updateScore();
}

//Function to keep track of the scoreboard and whether the game is over, in which case it creates a button
//that allows the user to start a new game. this button self destructs to clear the board for a new game.
function updateScore(){
	if(pelletCount > 0)
	scoreboard.innerHTML = "Coins eaten: " + score + "<br> Coins left: " + pelletCount;
	else if(pelletCount == 0){
		scoreboard.innerHTML = " Game Over ! You ate " + score + " coins";
		scoreboard.style.left = windowWidth/2  - 200 + 'px';
		scoreboard.style.top = windowHeight/2 + 'px';
		var btn = document.createElement("BUTTON");   
		container.appendChild(btn)
		btn.innerHTML = "Start new game";  
		btn.setAttribute('id','btn1');
		btn.setAttribute('onclick','resetGame()');  
		btn.style.position = 'absolute';
		btn.style.top =  windowHeight/2 + 100 + 'px';
		btn.style.left = windowWidth/2  - 200 + 'px';  		
	}
}

//Function that resets the game window and settings to default to start a new game.
function resetGame(){
	pieman.style.position = 'absolute';
	pieman.style.left = 0;
	pieman.style.top = 0;
	generatePellet(1);
	score = 0;
	timeout = 10000;
	scoreboard.style.left = 0;
	scoreboard.style.top = 0;
	btn = document.getElementById('btn1');
	btn.parentNode.removeChild(btn);
	updateScore();
}