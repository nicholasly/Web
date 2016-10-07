var init = 0; // a variable recording the condition of initialization 
var cal = 0;  // a variable recording the condition of calculation
var error = 0;  // a variable recording error
var ope = 0;   // a variable in case of the duplication of operator 
var current = "0";  //  the expression put in the input screen
var pre;  //  the expression put in the last screen
var dot = 0;  //  a variable in case of the duplication of dot
var dnum = 1; //  a variable to make sure there is a num after the dot

function input1(value) {
	if (init == 0) {
		pre = "Ans = " + current;
		init = 1;
	}
	//  initialization
    if (current == "0" || current == "Error" || cal == 1) {
		if (current != "Error") {
			pre = "Ans = " + current;
		}
	    /* if the previous result is error, put the wrong
	    expression in the last screen */
		else {
			pre = "Ans = 0";
			error = 0;
		}
		// directly show "Ans = 0" on the last screen
		current = value;
		// directly input the number
		cal = 0;
	}
	else current = current + value;
	// when something was input before
	if (dot == 1) dnum = 1;
}
//  function to input the number
function input2(value) {
	if (init == 0) {
		pre = "Ans = 0";
		init = 1;
	}
	//  initialization  
	if (error == 1) {
		error = 0;
		current = "0 " + value + " ";
	/*  if the error occurs put a 0 on the input screen
	and the operator can be added  */
	} else if (dnum == 0) {
		alert("Please input a number after the dot!");
	} else {
		current = current + " " + value + " ";
	}
	cal = 0;
	ope = 1;
	dot = 0;
    /*  the dot and calculation is allowed
    but the operator cannot be dupliacte  */
}
//  function to input the operator
function input3(value) {
	if (current == "0" || dot == 0 || current.search(".") == -1) {
		current = current + value;
		dot = 1;
		dnum = 0;
	} else {
		alert("You cannot add a dot again!");
	}
	/* if the dot has not been input, the dot
	can be input; if the dot has been input, the
	dot cannot be input and the dot button has
	reaction. */
}
//  function to input the dot
function cancelChar() {
	current = document.getElementById("input").innerHTML;
	var temp = current;
	var s = temp.length;
	if (error == 0) {
		if (s == 1)
			current = "0";
		else {
			if (current[current.length - 1] == ".") {
				dot = 0;
			}
			current = temp.substring(0, s -1);
		}
		//  cancel the character one-by-one
	} else {
		current = "0";
		error = 0;
		/*  while there are no characters, put a 0
		on the input screen */ 
	}
}

function cancelString() {
	current = "0";
	//  directly make the expression disappear and set 0
}

function calculation() {
	if (current[current.length - 1] == ".") {
		alert("Please input a number after the dot!");
		return;
	}
	//  the calculation cannot go on if the lasr character is a dot
	var temp = current;
	if (error == 1) {
		pre = "";
		current = "0";
		error = 0;
		return;
	}
	//  when error occurs directly set 0
	try {
		var r = eval(temp);
		r = Math.round(r * 1000000000) / 1000000000;
		if (ope == 1) {
			if (r == "Infinity" || temp == "0 / 0") {
				error = 1;
				current = "Error";
				alert("The expression you input is ERROR!");
			    pre = temp;
			    ope = 0;
			    //  when the result is Infinity or NaN
			} else {
				current = r;
			    pre = temp;
			    ope = 0;
			}
			//  when the operator has been added
		} else {
			current = temp;
			pre = r;
			ope = 1;
		}
		//  when the operator has not been added
		cal = 1;
		//  the calculatio has been done
	}
	catch(e) {
		if (e instanceof SyntaxError) {
			pre = current;
			current = "Error";
			alert("The expression you input is ERROR!");
			error = 1;
			//  when error occurs launch the alert
        } else {
        	throw(e);
        }
	}
}

function click_in(e) { 
	var t = e.target;
	//  get the target of event
	if (t.className ===	"normal num") {
		input1(t.value);
		dnum = 1;
	} else if (t.className === "operator other") {
		input2(t.value);
	} else if (t.className === "normal dot") {
		input3(t.value);
	} else if (t.className === "cancelChar other") {
		cancelChar();
	} else if (t.className === "cancelString other") {
		cancelString();
	} else if (t.className === "equal") {
		calculation();
	} else if (t.className === "other num") {
		input1(t.value);
	}
	//  use different functions to deal with various situations
	if (current.length > 32) {
		alert("You cannot add any character!");
		return;
	}
	//  when the length of input exceeds launch the alert
	document.getElementById("input").innerHTML = current;
	document.getElementById("last").innerHTML = pre;
	//  put pre and current on the screen respectively
}

document.addEventListener('click', click_in);
//  the function click_in is on when the mouse clicks
