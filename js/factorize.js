function precise(n) {
    return -9007199254740992 <= n && n <= 9007199254740992;
}
function factorize(n, negPrefix, powerFmt, times) {
    if (n == 0)
        return "0";
    if (n == 1)
        return "1";
    var retarr = [];
    var prefix = "";
    var rt = Math.sqrt(n);
    if (n < 0) {
        prefix = negPrefix;
        n = -n;
    }
    if (n % 2 == 0) {
        var mul = 0;
        while (n % 2 == 0) {
            n /= 2;
            mul++;
        }
        rt = Math.sqrt(n);
        retarr.push(powerFmt(2, mul));
    }
    if (n % 3 == 0) {
        var mul = 0;
        while (n % 3 == 0) {
            n /= 3;
            mul++;
        }
        rt = Math.sqrt(n);
        retarr.push(powerFmt(3, mul));
    }
    var jump = 2;
    var i = 5;
    while (i <= rt) {
        if (n % i == 0) {
            var mul = 0;
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
    if (n != 1)
        retarr.push(powerFmt(n, 1));
    return prefix + retarr.join(times);
}
function fancyPower(n, p) {
    return "<strong>" + n + "</strong>" + (p == 1 ? "" : "<sup>" + p + "</sup>");
}
function simplePower(n, p) {
    return "" + n + (p == 1 ? "" : "^" + p);
}
var empty = true;
function factorizeFormat(num, fancy) {
    if (isNaN(num))
        return "<em>not a number</em>";
    var powerFmt = fancy ? fancyPower : simplePower;
    var neg = fancy ? "&minus;" : "-";
    var times = fancy ? " <span class='times'>&times;</span> " : " * ";
    var result = num + " = " + factorize(num, neg, powerFmt, times);
    if (!precise(num)) {
        result = "<em>imprecise!</em> " + result;
    }
    return result;
}
function process(e) {
    e.preventDefault();
    var text = document.getElementById("inp").value;
    var num = parseInt(text);
    var fancy = document.getElementById("fancy").checked;
    var result = factorizeFormat(num, fancy);
    if (document.getElementById("append").checked) {
        if (!empty)
            result = "<br/>" + result;
        document.getElementById("out").innerHTML += result;
    }
    else {
        document.getElementById("out").innerHTML = result;
    }
    empty = false;
    return false;
}
function updateLabel() {
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
