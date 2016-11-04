$(function() {
	addBackgroundColor();
});

$(document).on('click', 'th', function(){
    var table = $(this).parents('table').eq(0);
    var rows = table.find('tr:gt(0)').toArray().sort(comparer($(this).index()));
    this.asc = !this.asc;
    if (!this.asc) rows = rows.reverse();
    addDifferentColor(this, this.asc);
    table.children('tbody').empty().html(rows);
    addBackgroundColor();
});

function addDifferentColor(a, b) {
	$("th").removeClass("selected1");
	$("th").removeClass("selected2");
	if (b) $(a).addClass("selected1");
	else $(a).addClass("selected2");
}

function addBackgroundColor() {
    $("tr").removeClass("alternate");
    $("tr:even").addClass("alternate");
}

function comparer(index) {
    return function(a, b) {
        var valA = getCellValue(a, index), valB = getCellValue(b, index);
        return $.isNumeric(valA) && $.isNumeric(valB) ? valA - valB : valA.localeCompare(valB);
    };
}

function getCellValue(row, index) {
    return $(row).children('td').eq(index).text();
}

