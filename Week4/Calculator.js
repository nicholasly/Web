var init = 0;
var cal = 0;
var error = 0;
var ope = 0;

function input1(id) {
	if (init == 0) {
		document.getElementById("last").innerHTML = "Ans = " + document.getElementById("input").innerHTML;
		init = 1;
	}
    if (document.getElementById("input").innerHTML == "0" || document.getElementById("input").innerHTML == "Error" || cal == 1) {
		if (document.getElementById("input").innerHTML != "Error") {
			document.getElementById("last").innerHTML = "Ans = " + document.getElementById("input").innerHTML;
		}
		else {
			document.getElementById("last").innerHTML = "Ans = 0";
			error = 0;
		}
		document.getElementById("input").innerHTML = id;
		cal = 0;
	}
	else document.getElementById("input").innerHTML = document.getElementById("input").innerHTML + id;
}

function input2(id) {
	if (init == 0) {
		document.getElementById("last").innerHTML = "Ans = 0";
		init = 1;
	}
	if (error == 1) {
		error = 0;
		document.getElementById("input").innerHTML = "0 " + id + " ";
	} else {
		document.getElementById("input").innerHTML = document.getElementById("input").innerHTML + " " + id + " ";
	}
	cal = 0;
	ope = 1;
}

function cancelChar() {
	var temp = document.getElementById("input").innerHTML;
	var s = temp.length;
	if (error == 0) {
		if (s == 1)
			document.getElementById("input").innerHTML = "0";
		else
			document.getElementById("input").innerHTML = temp.substring(0, s -1);
	} else {
			document.getElementById("input").innerHTML = "0";
			error = 0;
	}
}

function cancelString() {
	document.getElementById("input").innerHTML = "0";
}

function calculation() {
	var temp = document.getElementById("input").innerHTML;
	if (error == 1) {
		document.getElementById("last").innerHTML = "";
		document.getElementById("input").innerHTML = "0";
		error = 0;
		return;
	}
	try {
		var r = eval(temp);
		if (ope == 1) {
			if (r == "Infinity" || temp == "0 / 0") {
				error = 1;
				document.getElementById("input").innerHTML = "Error";
			    document.getElementById("last").innerHTML = temp;
			    ope = 0;
			} else {
				document.getElementById("input").innerHTML = r;
			    document.getElementById("last").innerHTML = temp;
			    ope = 0;
			}
		} else {
			document.getElementById("input").innerHTML = temp;
			document.getElementById("last").innerHTML = r;
			ope = 1;
		}
		cal = 1;
	}
	catch(e) {
		if (e instanceof SyntaxError) {
			document.getElementById("last").innerHTML = document.getElementById("input").innerHTML;
			document.getElementById("input").innerHTML = "Error";
			error = 1;
        } else {
        	throw(e);
        }
	}
}