var process = 0;  //  a variable to record if you have passed all paths

$(document).ready(function() {
    start();
    wallTurnRed();
    wallTurnWhite()
    walk();
    end();
    restart();
});

function start() {
    $("#start").mouseover(function() {
        process = 1;
        $("#start").css("cursor", "pointer");
    });
}

function walk() {
    $(".path").each(function(i) {
        var that = $(this);
        that.mouseover(function() {
            if (process >= i) {
                process = i + 1;
                that.css("cursor", "pointer");
            }
        });
    });
}

function end() {
    $("#end").mouseover(function() {
        if (process == 6) {
            $("#end").css("cursor", "pointer");
            $("#tip").text("You Win");
            process = 0;
        } else {
            $("#tip").text("Don't cheat, you should start from the 'S' and move to the 'E' inside the maze!");
        }
    });
}

function wallTurnRed() {
    $(".wall").each(function(i) {
        var that = $(this);
        that.mouseover(function() {
            if (process >= 1) {
                that.css("backgroundColor", "red");
                $("#tip").text("You Lose");
            }
            process = 0;
        });
    });
}

function wallTurnWhite() {
    $(".wall").each(function(i) {
        var that = $(this);
        that.mouseout(function() {
            that.css("backgroundColor", "#EEEEEE");
            $("#tip").text("");
        });
    });
}

function restart() {
    $("#end").mouseout(function() {
        $("#tip").text("");
    });
}

