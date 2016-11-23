// var result = "";

// $(document).ready(function() {
// 	getRandomNum();
// 	getResult();
// });

// function getRandomNum() {
// 	var i = 0;
// 	$(".button").each(function() {
// 		var that = $(this);
// 		that.click(function() {
// 			var string = "...";
// 			var span = $("<span></span>").addClass("unread");
// 			that.append(span);
// 			span.text("...");
//             var xmlhttp = new XMLHttpRequest();
//             xmlhttp.onreadystatechange = function(){
//                 if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
//                     string = xmlhttp.responseText;
//                     span.text(string);
//                 }
//             };
//             xmlhttp.open("GET","http://localhost:3000/", true);
//             xmlhttp.send();
// 		});
// 	});
// }

// function getResult() {
// 	var output = $("<span></span>").addClass("result");
// 	$("#info-bar").append(output);
// 	$("#info-bar").click(function() {
// 		output.text(eval(result));
// 	});
// }

// previous code

(function() {
	$(function() { new Calculator(); });

	var Calculator = function() {
		var that = this;
		$("#button").hover(function() {
			$(".result").remove();
			$("#info-bar").attr("canClick", "false");
			that.getRandomNum();
			that.getResult();
			that.clear();
		});
	}

	var c = Calculator.prototype;

	c.getRandomNum = function() {
		c.i = 0;
		c.result = "";
		$(".button").each(function() {
			var that = $(this);
			$(this).attr("isClick", "false");
			$(this).click(function() {
				if (that.attr("isClick") == "false") {
					c.afterClick(that);
					c.i++;
					if (c.i == 5) $("#info-bar").attr("canClick", "true");
				}
			});
		});
	}

	c.getResult = function() {
		var output = $("<span></span>").addClass("result");
		$("#info-bar").append(output);
		$("#info-bar").click(function() {
			if ($("#info-bar").attr("canClick") == "true") {
				output.text(eval(c.result));
				$("#info-bar").css("background-color", "#7E7E7E");
			}
		});
	}

	c.afterClick = function(that) {
		var string = "...";
		var span = $("<span></span>").addClass("unread");
		that.append(span);
		span.text("...");
		c.afterChoose(that);
		$.get("http://localhost:3000/", function(data, err) {
			span.text(data);
			c.afterRandom(that);
			c.result += data;
			if (c.i != 5) c.result += "+";
		});
		that.attr("isClick", "true");
	}

	c.afterChoose = function(that) {
		that.addClass("chosen");
		$(".button").each(function() {
			if ($(this) != that) {
				$(this).attr("isClick", "true");
				$(this).css("background-color", "#7E7E7E");
				$(".mark").css("color", "white");
			}
		});
	}

    c.afterRandom = function(that) {
		$(".button").attr("isClick", "false");
		$(".chosen").attr("isClick", "true");
		$(".button").css("background-color", "#303F9F");
		$(".chosen").css("background-color", "#7E7E7E");
		$(".mark").css("color", "#65BBB7");
		$(".chosen").children(".mark").css("color", "white");
		if (c.i == 5) $("#info-bar").css("background-color", "#303F9F");
    }

    c.clear = function() {
    	$(".unread").remove();
    	$(".button").css("background-color", "#303F9F");
		$(".button").attr("isClick", "false");
		$(".mark").css("color", "#65BBB7");
		$(".button").each(function() {
			$(this).removeClass("chosen");
		});
    }

})();
