function f(num, digits = 0) {
	if (digits > 0) num = D(num).mul(Math.pow(10, digits)).floor().div(Math.pow(10, digits));
	else num = D(num).floor();
	return N[game.notation](num);
}

let N = {};

N.sci = function (num) {
	if (num.lt(1e6)) return num.toString();
	if (num.lt("ee6"))
		return (
			Math.pow(10, num.log10().toNumber() % 1)
				.toFixed(2)
				.replace(/([0-9]+(.[0-9]+[1-9])?)(.?0+$)/, "$1") +
			"e" +
			num.log10().floor().toString()
		);
	if (num.lt("eee6")) return "e" + N.sci(num.log10());
	return num.toString();
};
