function precise(n: number): boolean {
	return -9007199254740992 <= n && n <= 9007199254740992;
}

function factorize(n: number, negPrefix: string, powerFmt: (b: number, e: number) => string, times: string): string {
	if (n == 0) return "0";
	if (n == 1) return "1";
	let retarr: string[] = [];
	let prefix: string = "";
	let rt: number = Math.sqrt(n);
	if (n < 0) {
		prefix = negPrefix;
		n = -n;
	}
	if (n % 2 == 0) {
		let mul: number = 0;
		while (n % 2 == 0) { n /= 2; mul++; }
		rt = Math.sqrt(n);
		retarr.push(powerFmt(2, mul));
	}
	if (n % 3 == 0) {
		let mul: number = 0;
		while (n % 3 == 0) { n /= 3; mul++; }
		rt = Math.sqrt(n);
		retarr.push(powerFmt(3, mul));
	}
	let jump = 2;
	let i = 5;
	while (i <= rt) {
		if (n % i == 0) {
			let mul = 0;
			while (n % i == 0) {
				n /= i;
				mul++;
			}
			rt = Math.sqrt(n);
			retarr.push(powerFmt(i, mul));
		}
		i += jump;
		jump = 6 - jump;
	}
	if (n != 1) retarr.push(powerFmt(n, 1));
	return prefix + retarr.join(times);
}
function fancyPower(n: number, p: number): string {
	return "<strong>" + n + "</strong>" + (p == 1 ? "" : "<sup>" + p + "</sup>");
}

function simplePower(n: number, p: number): string {
	return "" + n + (p == 1 ? "" : "^" + p);
}

let empty = true;
function factorizeFormat(num: number, fancy: boolean): string {
	if (isNaN(num)) return "<em>not a number</em>";
	const powerFmt: ((n: number, p: number) => string) = fancy ? fancyPower : simplePower;
	const neg: string = fancy ? "&minus;" : "-";
	const times: string = fancy ? " <span class='times'>&times;</span> " : " * ";
	let result: string = num + " = " + factorize(num, neg, powerFmt, times);
	if (!precise(num)) {
		result = "<em>imprecise!</em> " + result;
	}
	return result;
}

function process(e: event): boolean {
	e.preventDefault();
	const text: string = document.getElementById("inp").value;
	const num: number = parseInt(text);
	const fancy: boolean = document.getElementById("fancy").checked;
	let result: string = factorizeFormat(num, fancy);
	if (document.getElementById("append").checked) {
		if (!empty) result = "<br/>" + result;
		document.getElementById("out").innerHTML += result;
	} else {
		document.getElementById("out").innerHTML = result;
	}
	empty = false;
	return false;
}

function updateLabel(): void {
	$(this).toggleClass('has-checked', $(this).find('input').prop('checked'));
}

$(document).ready(function () {
	$("#fform").submit(process);
	$("#inp").submit(process);
	$("#factorbutton").click(process);
	$(".main label").each(updateLabel);
	$(".checkable").click(function () {
		$(".checkable").each(updateLabel);
	});
});
