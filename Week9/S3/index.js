var i = 0;
var result = "";
var xh1, xh2, xh3, xh4, xh5;

$(document).ready(function() {
	$("#button").hover(function() {
		$(".apb").click(function() {
			if (xh1) xh1.abort();
			if (xh2) xh2.abort();
			if (xh3) xh3.abort();
			if (xh4) xh4.abort();
			if (xh5) xh5.abort();
			clear();
			result = "";
			i = 0;
			setNum();
		});
	});
	$("#button").mouseleave(function() {
		if (xh1) xh1.abort();
		if (xh2) xh2.abort();
		if (xh3) xh3.abort();
		if (xh4) xh4.abort();
		if (xh5) xh5.abort();
		i = 0;
		result = "";
		clear();
	});
});

function setNum() {
	i = 0;
	result = "";
	// $(".button").each(function() {
	// 	getRandomNum($(this));
	// });
	var span1 = $("<span></span>").addClass("unread");
	$(".button").eq(0).append(span1);
	span1.text("...");
	afterChoose($(".button").eq(0));
	xh1 = $.get("http://localhost:3000/", function(data, err) {
		result += data + "+";
		span1.text(data);
		afterRandom($(".button").eq(0));
	});
	var span2 = $("<span></span>").addClass("unread");
	$(".button").eq(1).append(span2);
	span2.text("...");
	afterChoose($(".button").eq(1));
	xh2 = $.get("http://localhost:3000/", function(data, err) {
		result += data + "+";
		span2.text(data);
		afterRandom($(".button").eq(1));
	});
	var span3 = $("<span></span>").addClass("unread");
	$(".button").eq(2).append(span3);
	span3.text("...");
	afterChoose($(".button").eq(2));
	xh3 = $.get("http://localhost:3000/", function(data, err) {
		result += data + "+";
		span3.text(data);
		afterRandom($(".button").eq(2));
	});
	var span4 = $("<span></span>").addClass("unread");
	$(".button").eq(3).append(span4);
	span4.text("...");
	afterChoose($(".button").eq(3));
	xh4 = $.get("http://localhost:3000/", function(data, err) {
		result += data + "+";
		span4.text(data);
		afterRandom($(".button").eq(3));
	});
	var span5 = $("<span></span>").addClass("unread");
	$(".button").eq(4).append(span5);
	span5.text("...");
	afterChoose($(".button").eq(4));
	xh5 = $.get("http://localhost:3000/", function(data, err) {
		result += data;
		span5.text(data);
		afterRandom($(".button").eq(4));
		getResult();
	});
}

// function getRandomNum(that) {
// 	var span = $("<span></span>").addClass("unread");
// 	that.append(span);
// 	span.text("...");
// 	afterChoose(that);
// 	xhr[i] = $.get("http://localhost:3000/", function(data, err) {
// 		result += data;
// 		span.text(data);
// 		afterRandom(that);
// 		if (++i != 5) result += "+";
// 		else getResult();
// 	});
// }

function afterChoose(that) {
	that.addClass("chosen");
	$(".button").each(function() {
		if ($(this) != that) {
			$(this).css("background-color", "#7E7E7E");
			$(".mark").css("color", "white");
		}
	});
}

function afterRandom(that) {
	$(".button").attr("isClick", "false");
	$(".chosen").attr("isClick", "true");
	$(".button").css("background-color", "#303F9F");
	$(".chosen").css("background-color", "#7E7E7E");
	$(".mark").css("color", "#65BBB7");
	$(".chosen").children(".mark").css("color", "white");
	if (i == 4) $("#info-bar").css("background-color", "#303F9F");
}

function getResult() {
	var output = $("<span></span>").addClass("result");
	$("#info-bar").append(output);
	output.text(eval(result));
	$("#info-bar").css("background-color", "#7E7E7E");
}

function clear() {
	i = 0;
	result = "";
	$(".result").remove();
	$(".unread").remove();
	$(".button").css("background-color", "#303F9F");
	$(".mark").css("color", "#65BBB7");
	$(".button").each(function() {
		$(this).removeClass("chosen");
	});
}