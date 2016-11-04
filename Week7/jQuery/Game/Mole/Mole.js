var Judge = {
	gameStart : false,  //  a variable showing if the game starts 
	score : 0,  //  a variable recording the score
	ticker : 0,  //  another variable for countdown timer
	timeInSecs : 0,  //  a variable for countdown timer
	r : 0  //  a variable recording generated random integer
};

$(document).ready(function() {
	Judge.score = 0;
	Judge.gameStart = false;
	start();
	clickMole();
});

function start() {
	$("#StopAndStop").click(function() {
		gamestart();
	});
}

function gamestart() {
	clearInterval(Judge.ticker);
	if (Judge.gameStart == false) {
		Judge.gameStart = true;
		$("#GameOver").html("Playing");
		$("#timeScreen").html("30");
		Judge.r = _.random(1, 60);
		update(Judge.r);
		countDown(30);
	}
	else gameover();
};

function tick() {
	if (Judge.gameStart == true) {
		var secs = Judge.timeInSecs;
		if (secs > 0) Judge.timeInSecs--;
		else gameover();
		$("#timeScreen").html(secs);
	}
	else clearInterval(Judge.ticker);
}

function countDown(secs) {
	Judge.timeInSecs = parseInt(secs) - 1;
	Judge.ticker = setInterval("tick()", 1000);
}  //  the countdown timer

function update(r) {
	var id = "#" + r;
	$(id).css("borderColor", "rgb(0, 0, 255)");
}
//  to generate a new radiobox to click

function gameover() {
	clearInterval(Judge.ticker);
	Judge.gameStart = false;
	$("#GameOver").html("GameOver");
	$("#timeScreen").html("0");
	var id = "#" + Judge.r;
	$(id).css("borderColor", "grey");
	alert("GameOver.\nYour score is "+Judge.score);
	Judge.score = 0;
	$("#scoreScreen").html(Judge.score);
}
//  when the game is over

function clickMole() {
		$(".button").each(function(i) {
        	var that = $(this);
        	$(this).click(function() {
        		if (Judge.gameStart == true && that.css("borderColor") == "rgb(0, 0, 255)") {
        			Judge.score++;
        			that.css("borderColor", "grey");
        			Judge.r = _.random(1, 60);
        			update(Judge.r);
        		} else Judge.score--;
        		$("#scoreScreen").html(Judge.score);
        	});
    	});
}
