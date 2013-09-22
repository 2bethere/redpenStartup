var colorIndex;

var colorValues = [ 
    "FF0000", "00FF00", "0000FF", "FFFF00", "FF00FF", "00FFFF", 
    "800000", "008000", "000080", "808000", "800080", "008080", "808080", 
    "C00000", "00C000", "0000C0", "C0C000", "C000C0", "00C0C0", "C0C0C0", 
    "400000", "004000", "000040", "404000", "400040", "004040", "404040", 
    "200000", "002000", "000020", "202000", "200020", "002020", "202020", 
    "600000", "006000", "000060", "606000", "600060", "006060", "606060", 
    "A00000", "00A000", "0000A0", "A0A000", "A000A0", "00A0A0", "A0A0A0", 
    "E00000", "00E000", "0000E0", "E0E000", "E000E0", "00E0E0", "E0E0E0", 
    ];

if (!window.GrabText) {
    GrabText = {};
}

GrabText.Selector = {};

GrabText.Selector.getSelected = function () {
    var t = '';
    if (window.getSelection) {
        t = window.getSelection();
    } else if (document.getSelection) {
        t = document.getSelection();
    } else if (document.selection) {
        t = document.selection.createRange().text;
    }
    
    return t;
}

GrabText.Selector.mouseup = function () {
    var selection = GrabText.Selector.getSelected();

    if (selection != '') {
        var str = selection.toString();

        var element = $("span.highlighted");
        if (element.length) {
            element[0].style.backgroundColor = "";
            element[0].setAttribute("class", "");
        }
        /*
    if (element.length) {
            var originalstr = element[0].innerHTML;
            $("div.entry-content")[0].outerHTML = $("div.entry-content")[0].outerHTML.toString()
                .replace(element[0].outerHTML, originalstr);
        }
                */

        var span = document.createElement("span");
        span.textContent = str;

        span.setAttribute("class", "highlighted");

        span.style.whiteSpace = "pre";
        span.style.backgroundColor = "#" + colorValues[colorIndex];
        span.style.color = "black";

        var range = selection.getRangeAt(0);
        range.deleteContents();
        range.insertNode(span);

        var index = $("div.entry-content")[0].innerHTML.indexOf(str, 0);
        var end = index + str.length;
        $("#start_position").val(index.toString());
        $("#end_position").val(end.toString());
        $("#selection_color").val("#" + colorValues[colorIndex]);
	$("#selection_blob").val($("div.entry-content")[0].innerHTML);
	$("#respond").show();
    }
}

function replaceAt(s, n, t) {
    return s.substring(0, n) + t + s.substring(n + 1);
}

$(document).ready(function () {
    colorIndex = Math.floor(Math.random() * 20);

    $(document).bind("mouseup", GrabText.Selector.mouseup);
/*
    $("article.comment-body").mouseover(function () {
        $(this).addClass('hover');
    });
    
    $("article.comment-body").mouseout(function () {
        $(this).removeClass('hover');
    });
*/
    $("article.comment-body").click(function () {
        $("article.comment-body").removeClass('hover');
        $(this).addClass('hover');
        var color = $(this).find("[id^=color]")[0].title;
        var start = parseInt($(this).find("[id^=start]")[0].title, 10);
        var end = parseInt($(this).find("[id^=end]")[0].title, 10);
	var blob = $(this).find("[id^=blob]")[0].innerHTML;
	
        var str = $("div.entry-content")[0].innerHTML;
        var substr = str.substring(start, end);

        var span = document.createElement("span");
        span.textContent = substr;

        span.setAttribute("class", "highlighted");

        span.style.whiteSpace = "pre";
        span.style.backgroundColor = color;
        span.style.color = "black";

        //$("div.entry-content")[0].innerHTML = replaceAt(str, start, span.outerHTML);
	$("div.entry-content")[0].innerHTML = blob;
    });

    $("#goedit").click(function () {
        var highlight = $("span.highlighted");
        if (highlight.length) {
            $("p.edit").text("" + highlight[0].textContent);
            
            highlight[0].textContent = $("textarea.update").val();
            highlight[0].style.backgroundColor = "yellow";
            highlight[0].style.color = "black";
            highlight[0].setAttribute("class", "");

            $("textarea.update")[0].textContent = "";
        }
    });
});

