var colorIndex;

var colorValues = [ 
    "FF8080", "80FF80","8080FF",
    "FFFF80", "FF80FF","80FFFF",
    "FF6060", "60FF60","6060FF",
    "FFFF60", "FF60FF","60FFFF"

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
        if (selection.getRangeAt(0).startContainer.parentNode.parentNode != '')
        {
            if (selection.getRangeAt(0).startContainer.parentNode.parentNode.className != 'entry-content')
                return;
        }
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
    colorIndex = Math.floor(Math.random() * 12);

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

