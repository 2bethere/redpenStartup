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
        var element = $("span.highlighted");
        if (element.length) {
            element[0].style.backgroundColor = "";
            element[0].setAttribute("class", "");
        }

        var span = document.createElement("span");
        span.textContent = selection.toString();

        span.setAttribute("class", "highlighted");

        span.style.backgroundColor = "blue";
        span.style.color = "black";

        var range = selection.getRangeAt(0);
        range.deleteContents();
        range.insertNode(span);
    }
}

$(document).ready(function () {
    $(document).bind("mouseup", GrabText.Selector.mouseup);

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

