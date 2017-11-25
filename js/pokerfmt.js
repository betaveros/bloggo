var suitIndex = {
    "C": 0, "♣": 0,
    "D": 1, "♢": 1,
    "H": 2, "♡": 2,
    "S": 3, "♠": 3
};
function replacer(dec) {
    return function (match, rank, suit, offset, string) {
        var si = suitIndex[suit];
        return dec.suit[si][0] + rank + "♣♢♡♠"[si] + dec.suit[si][1];
    };
}
function multireplacer(dec) {
    return function (match) {
        var cont = match.replace(/\b([A2-9TJQK]|10)([CDHS♣♢♡♠])/g, replacer(dec));
        return dec.start + cont + dec.end;
    };
}
function bbFlank(color) {
    return color ? ["[color=" + color + "]", "[/color]"] : ["", ""];
}
function bbCodeDec(size, colors) {
    return {
        start: size ? "[size=" + size + "]" : "",
        end: size ? "[/size]" : "",
        suit: colors.map(bbFlank)
    };
}
function pokerReplace(dec, s) {
    return s.replace(/\b([A2-9TJQK]|10)[CDHS♣♢♡♠]( ([A2-9TJQK]|10)[CDHS♣♢♡♠])*(?!\w)/g, multireplacer(dec));
}
function getColors() {
    switch ($('input:radio[name=colorgrp]:checked').val()) {
        case "2": return [null, "red", "red", null];
        case "4": return ["green", "blue", "red", null];
    }
}
var emptyDec = {
    start: "",
    end: "",
    suit: [["", ""], ["", ""], ["", ""], ["", ""]]
};
function getDec() {
    switch ($('input:radio[name=fmtgrp]:checked').val()) {
        case "none": return emptyDec;
        case "bb": return bbCodeDec(null, getColors());
        case "bb150": return bbCodeDec("150", getColors());
    }
}
function process(e) {
    e.preventDefault();
    var text = $("#inp").val();
    var dec = getDec();
    var result = pokerReplace(dec, text);
    $("#out").val(result);
    return false;
}
function updateLabel() {
    $(this).toggleClass('has-checked', $(this).find('input').prop('checked'));
}
$(document).ready(function () {
    $("#pform").submit(process);
    $("#inp").submit(process);
    $("#out").submit(process);
    $("#fmtbutton").click(process);
    $(".main label").each(updateLabel);
    $(".checkable").click(function () {
        $(".checkable").each(updateLabel);
    });
});
