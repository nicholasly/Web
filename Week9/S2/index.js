var xhr;

(function() {
	$(function() { new Calculator(); });

	var Calculator = function() {
		var that = this;
		$("#button").hover(function() {
			$(".apb").bind('click', function() {
				that.clear();
				that.setNum();
			});
		});
		$("#button").mouseleave(function() {
			$(".apb").unbind('click');
			xhr.abort();
			that.clear();
		});
	}

	var c = Calculator.prototype;

	c.setNum = function() {
		c.i = 0;
		c.result = "";
		c.getRandomNum($(".button").eq(c.i));
	}

	c.getRandomNum = function(that) {
		var string = "...";
		var span = $("<span></span>").addClass("unread");
		that.append(span);
		span.text("...");
		xhr = $.get("http://localhost:3000/", function(data, err) {
			c.afterChoose(that);
			span.text(data);
			c.afterRandom(that);
			c.result += data;
			if (c.i != 4) {
				c.result += "+";
				c.getRandomNum($(".button").eq(++c.i));
			} else {
				c.getResult();
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
		if (c.i == 4) $("#info-bar").css("background-color", "#303F9F");
    }

    c.afterChoose = function(that) {
		that.addClass("chosen");
		$(".button").each(function() {
			if ($(this) != that) {
				$(this).css("background-color", "#7E7E7E");
				$(".mark").css("color", "white");
			}
		});
	}

	c.getResult = function() {
		var output = $("<span></span>").addClass("result");
		$("#info-bar").append(output);
		output.text(eval(c.result));
		$("#info-bar").css("background-color", "#7E7E7E");
	}

	c.clear = function() {
		c.i = 0;
		c.result = "";
		$(".result").remove();
    	$(".unread").remove();
    	$(".button").css("background-color", "#303F9F");
		$(".mark").css("color", "#65BBB7");
		$(".button").each(function() {
			$(this).removeClass("chosen");
		});
    }


})();

