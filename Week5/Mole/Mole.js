var gameStart;  //  a variable showing if the game starts 
var timeInSecs;  //  a variable for countdown timer
var ticker;  //  another variable for countdown timer
var score;   //  a variable recording the score
var r;  //  a variable recording generated random integer

window.onload = function() {
	score = 0;
	gameStart = false;
	document.addEventListener('click', clickMole);
	document.getElementById('StopAndStop').addEventListener('click', gamestart);
};

function gamestart() {
	clearInterval(ticker);
	if (gameStart == false) {
		gameStart = true;
		document.getElementById("GameOver").innerHTML = "Playing";
		document.getElementById("timeScreen").innerHTML = "30";
		r = random();
		update(r);
		countDown(30);
	} else {
		gameover();
	}
};
//  the operations on the start button 

function random() {
    var randomInt = 0;
    while (randomInt < 1 || randomInt > 60) {
    	randomInt = Math.floor(Math.random() * 10000) % 60;
    }
    return randomInt;
}
//  to generate a random integer between 1 and 60

function tick() {
	if (gameStart == true) {
		var secs = timeInSecs;
		if (secs > 0) {
			timeInSecs--;
		} else {
			gameover();
		}
		document.getElementById("timeScreen").innerHTML = secs;
	} else {
		clearInterval(ticker);
	}
}

function countDown(secs) {
	timeInSecs = parseInt(secs) - 1;
	ticker = setInterval("tick()", 1000);
}

//  the countdown timer

function update(r) {
	document.getElementById(r).style.borderColor = "blue";
}

//  to generate a new radiobox to click

function gameover() {
	clearInterval(ticker);
	gameStart = false;
	document.getElementById("GameOver").innerHTML = "GameOver";
	document.getElementById("timeScreen").innerHTML = "0";
	document.getElementById(r).style.borderColor = "grey";
	alert("GameOver.\nYour score is "+score);
	score = 0;
	document.getElementById("scoreScreen").innerHTML = score;
}
//  when the game is over

function clickMole(event) {
	var t = event.target;
	if (gameStart == true && t.className === "button") {
		if (t.style.borderColor == "blue") {
			score++;
			t.style.borderColor = "grey";
			r = random();
			update(r);
		} else {
			score--;
		}
		document.getElementById("scoreScreen").innerHTML = score;
	}
}
//  judge the click operation 
