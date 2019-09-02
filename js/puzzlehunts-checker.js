// Checking the source code of JavaScript is fair game in most puzzlehunts, but
// for this simple puzzlehunt example all the answers are only lightly
// encrypted below. You'll just be spoiling yourself by looking!

document.getElementById("puzzlehunts").addEventListener("submit", function (event) {
	event.preventDefault();
	const rawGuess = document.getElementById("guess").value.toUpperCase();
	let displayGuess = "";
	let cryptedGuess = "";
	for (var i = 0; i < rawGuess.length; i++) {
		if (/[A-Z]/.test(rawGuess[i])) {
			displayGuess += rawGuess[i];
			cryptedGuess += String.fromCharCode(rawGuess.charCodeAt(i) - 32);
		}
	}
	let text, className = "incorrect";
	if ('%3#(%2' === cryptedGuess) {
		text = displayGuess + " is the answer to the metapuzzle! Congratulations!";
		className = "meta-correct";
	} else if (['"%%&','#!34,%3','$2!#/.)#','%!24(','&/5.$%2','\'/"%&/2%'].indexOf(cryptedGuess) !== -1) {
		text = displayGuess + " is one of the six embedded answers!";
		className = "correct";
	} else if ('&,/5.$%2' === cryptedGuess) {
		text = displayGuess + " is almost correct, but you want the seven-letter word before the insertion.";
	} else if ('#!34,%' === cryptedGuess) {
		text = displayGuess + " is almost correct. Did you miss a word at the end, perhaps?";
	} else if ([',//0','0334'].indexOf(cryptedGuess) !== -1) {
		text = "Sorry, " + displayGuess + " is not correct, but you're looking at a relevant part of the post.";
	} else if (['%8!-0,%',"!.!,/'9",'&/2%8!-0,%'].indexOf(cryptedGuess) !== -1) {
		text = "Sorry, " + displayGuess + " is not correct. All examples involving this word are only for illustrative purposes.";
	} else {
		text = "Sorry, " + displayGuess + " is not correct.";
	}

	const checkout = document.getElementById("checkout");
	checkout.textContent = text;
	checkout.className = className;
});
