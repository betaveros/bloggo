const suitIndex = {
	"C": 0, "♣": 0,
	"D": 1, "♢": 1,
	"H": 2, "♡": 2,
	"S": 3, "♠": 3,
};

interface Dec {
	start: string;
	end: string;
	suit: [string, string][];
}

function replacer(dec: Dec) {
	return function(match, rank, suit, offset, string) {
		const si = suitIndex[suit];
		return dec.suit[si][0] + rank + "♣♢♡♠"[si] + dec.suit[si][1];
	};
}

function multireplacer(dec: Dec) {
	return function(match) {
		const cont = match.replace(/\b([A2-9TJQK]|10)([CDHS♣♢♡♠])/g, replacer(dec));
		return dec.start + cont + dec.end;
	};
}

function bbFlank(color?: string): [string, string] {
	return color ? ["[color=" + color + "]", "[/color]"] : ["", ""];
}

function bbCodeDec(size: string, colors: string[]): Dec {
	return {
		start: size ? "[size=" + size + "]" : "",
		end: size ? "[/size]" : "",
		suit: colors.map(bbFlank),
	}
}

function pokerReplace(dec, s: string): string {
	return s.replace(/\b([A2-9TJQK]|10)[CDHS♣♢♡♠]( ([A2-9TJQK]|10)[CDHS♣♢♡♠])*(?!\w)/g, multireplacer(dec));
}

function getColors() {
	switch ($('input:radio[name=colorgrp]:checked').val()) {
		case "2": return [null, "red", "red", null];
		case "4": return ["green", "blue", "red", null];
	}
}
const emptyDec: Dec = {
	start: "",
	end: "",
	suit: [["",""],["",""],["",""],["",""]],
};
function getDec(): Dec {
	switch ($('input:radio[name=fmtgrp]:checked').val()) {
		case "none":  return emptyDec;
		case "bb":    return bbCodeDec(null, getColors());
		case "bb150": return bbCodeDec("150", getColors());
	}
}

function process(e: event): boolean {
	e.preventDefault();
	const text = $("#inp").val();
	const dec = getDec();
	const result = pokerReplace(dec, text);
	$("#out").val(result);
	return false;
}

function updateLabel(): void {
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
})
