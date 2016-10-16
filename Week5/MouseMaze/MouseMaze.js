var process = 0;  //  a variable to record if you have passed all paths

document.addEventListener('mouseover', function(event) {   
    var t = event.target;
    if (t.id === "start") {
    	process = 1;
    	t.style.cursor = "pointer";
    } else if (t.id === "p1") {
    	if (process >= 1) {
    		process = 2;
    		t.style.cursor = "pointer";
    	}
        //  pass the first path
    } else if (t.id === "p2") {
    	if (process >= 2) {
    		process = 3;
    		t.style.cursor = "pointer";
    	}
        //  pass the second path
    } else if (t.id === "p3") {
    	if (process >= 3) {
    		process = 4;
    		t.style.cursor = "pointer";
    	}
        //  pass the third path
    } else if (t.id === "p4") {
    	if (process >= 4) {
    		process = 5;
    		t.style.cursor = "pointer";
    	}
        //  pass the fourth path
    } else if (t.id === "p5") {
    	if (process >= 5) {
    		process = 6;
    		t.style.cursor = "pointer";
    	}
        //  pass the fifth path
    } else if (t.id === "end") {
    	if (process == 6) {
    		t.style.cursor = "pointer";
    		document.getElementById("tip").innerText = "You Win";
    		process = 0;
            //  if you have passed all paths you win
    	} else {
    		document.getElementById("tip").innerText = 
    		"Don't cheat, you should start from the 'S' and move to the 'E' inside the maze!";
    	}
        //  if the process has not reach 6 it means that you cheat
    } else if (t.className === "wall") {
    	if (process >= 1) {
    		t.style.backgroundColor = "red";
    		document.getElementById("tip").innerText = "You Lose";
    	}
    	process = 0;
        //  when you hit the wall the game is over
    }
}, false);


document.addEventListener('mouseout', function(event) {
	var t = event.target;
	if (t.className === "wall") {
		t.style.backgroundColor = "#EEEEEE";
		document.getElementById("tip").innerText = "";
	} else if (t.id === "end") {
		document.getElementById("tip").innerText = "";
	}
    //  when the mouse is out the color of wall go back to normal
}, false);
