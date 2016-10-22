var isStart = false;  //  a variable recording the condition of start
var isWin = false;  //  a variable recording the condition of winning
var duplicate = false;  //  a variable in case of the duplication of the click on the start button
var blankX;
var blankY;
//  two variables recording the position of the blank puzzle

var puzzle = new Array(4);
for (var i = 0; i < 4; i++) {
	puzzle[i] = new Array(4);
}
//  the array reording the puzzle generated by div

window.onload = function () {
	Init();  //  Initialization
	document.getElementById("StartButton").addEventListener('click', start);
};

function Init() {
	var node = document.getElementById("imgContent");
	for (var i = 0; i < 4; i++) {
		for (var j = 0; j < 4; j++) {
			var block = document.createElement('div');
			var temp = i * 4 + j + 1;
			var row = i + 1;
			var column = j + 1;
			if (i * 4 + j != 15) {
				block.className = "block puzzle row" + row + " column" + column;
				var xPosition = -j * 88;
				var yPosition = -i * 88;
				block.style.backgroundPosition = xPosition + "px " + yPosition + "px";
			} else {
				block.className = "block row" + row + " column" + column;
			    block.id = "blank";
			}
			node.appendChild(block);
		}
	}
	//  Generate the original picture before the start
	isStart = false;
}

function start() {
	isStart = true;
	duplicate = true;
	generateRandomPuzzle();
}
// the start operation

function judgeSolve(a) {
	var sum = 0;
	for (var i = 0; i < 14; i++) {
		for (var j = i + 1; j < 15; j++) {
			if (a[i] < a[j]) sum++;
		}
	}
	return (sum % 2 == 0);
	/* if the sum of the inversion numbers is
	even then the puzzle can be solved */
}
// ensure the puzzle generated that can be solved

function generateRandomPuzzle() {
	var node = document.getElementById("imgContent");
	for (var i = 0; i < 16; i++) {
    	node.removeChild(node.childNodes[0]);
    }
	var a = [];
    for(var i = 0; i < 15; i++) {
    	a.push(i);
    }
    a.sort(function() {return 0.5 - Math.random()});
    a.length = 15;
    while (!judgeSolve(a)) {
    	var a = [];
    	for(var i = 0; i < 15; i++) {
    		a.push(i);
    	}
		a.sort(function() {return 0.5 - Math.random()});
    	a.length = 15;
    }
    //  generate a array contaion random number from 0 ~ 14
	for (var i = 0; i < 4; i++) {
		for (var j = 0; j < 4; j++) {
			var block = document.createElement('div');
			var temp = i * 4 + j + 1;
				var row = i + 1;
				var column = j + 1;
			if (i == 3 && j == 3) {
				block.className = "block row" + row + " column" + column;
			    block.id = "blank";
			    blankX = 3;
			    blankY = 3;
			} else {
				block.className = "block puzzle row" + row + " column" + column;
				var xPosition = -(a[i * 4 + j] % 4) * 88;
				var yPosition = -(parseInt(a[i * 4 + j] / 4)) * 88;
				block.style.backgroundPosition = xPosition + "px " + yPosition + "px";
			}
			node.appendChild(block);
			puzzle[i][j] = block;
		}
	}
	//  generate a random puzzle
	isStart = true;
	document.addEventListener('click', choose);
	if (isWin) {
		alert("You Win!");
		isWin = false;
		isStart = false;
		duplicate = false;
	}
	//  judge if wins
}

function choose(e) {
	var t = e.target;
	var find = false;
	for (var i = 0; i < 4; i++) {
		for (var j = 0; j < 4; j++) {
			if (puzzle[i][j].id === "blank") {
				blankX = i;
				blankY = j;
				find = true;
				break;
			}
			if (find == true) break;
		}
	}
	if (blankX != 0 && puzzle[blankX - 1][blankY] == t) {
		var row = blankX + 1;
		var column = blankY + 1;
		puzzle[blankX][blankY].style.backgroundPosition = puzzle[blankX - 1][blankY].style.backgroundPosition;
		puzzle[blankX][blankY].className = "block puzzle row" + row + " column" + column;
		puzzle[blankX][blankY].id = "";
		blankX--;
		row = blankX + 1;
		column = blankY + 1;
		puzzle[blankX][blankY].id = "blank";
		puzzle[blankX][blankY].className = "block row" + row + " column" + column;
	} else if (blankX != 3 && puzzle[blankX + 1][blankY] == t) {
		var row = blankX + 1;
		var column = blankY + 1;
		puzzle[blankX][blankY].style.backgroundPosition = puzzle[blankX + 1][blankY].style.backgroundPosition;
		puzzle[blankX][blankY].className = "block puzzle row" + row + " column" + column;
		puzzle[blankX][blankY].id = "";
		blankX++;
		row = blankX + 1;
		column = blankY + 1;
		puzzle[blankX][blankY].id = "blank";
		puzzle[blankX][blankY].className = "block row" + row + " column" + column;
	} else if (blankY != 3 && puzzle[blankX][blankY + 1] == t) {
		var row = blankX + 1;
		var column = blankY + 1;
		puzzle[blankX][blankY].style.backgroundPosition = puzzle[blankX][blankY + 1].style.backgroundPosition;
		puzzle[blankX][blankY].className = "block puzzle row" + row + " column" + column;
		puzzle[blankX][blankY].id = "";
		blankY++;
		row = blankX + 1;
		column = blankY + 1;
		puzzle[blankX][blankY].id = "blank";
		puzzle[blankX][blankY].className = "block row" + row + " column" + column;
	} else if (blankY != 0 && puzzle[blankX][blankY - 1] == t) {
		var row = blankX + 1;
		var column = blankY + 1;
		puzzle[blankX][blankY].style.backgroundPosition = puzzle[blankX][blankY - 1].style.backgroundPosition;
		puzzle[blankX][blankY].className = "block puzzle row" + row + " column" + column;
		puzzle[blankX][blankY].id = "";
		blankY--;
		row = blankX + 1;
		column = blankY + 1;
		puzzle[blankX][blankY].id = "blank";
		puzzle[blankX][blankY].className = "block row" + row + " column" + column;
	}
	//  move the puzzle
	if (isStart && !duplicate && check() && t.id != "blank") isWin = true;
}


function check() {
	for (var i = 0; i < 4; i++) {
		for (var j = 0; j < 4; j++) {
			var row = i + 1;
			var column = j + 1;
			if (i == 3 && j == 3) {
				if (puzzle[i][j].className != "block row" + row + " column" + column) return false;
			} else {
				if (puzzle[i][j].className != "block puzzle row" + row + " column" + column) return false;
			}
		}
	}
	return true;
}

//  check the puzzle is correct

