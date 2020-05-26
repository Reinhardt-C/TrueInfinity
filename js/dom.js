function updateElements() {
	document.getElementById("sbt").innerHTML = game.sbe ? "&lt;&lt;" : "&gt;&gt;";

	document.getElementById("tabb0").innerText = game.sbe ? "Dimension" : "Dim";
	document.getElementById("tabb1").innerText = game.sbe ? "Options" : "Opt";
	document.getElementById("tabb2").innerText = game.sbe ? "Upgrades" : "Upg";
	document.getElementById("tabb3").innerText = game.sbe ? "Ordinals" : "Ord";
	document.getElementById("tabb100").innerText = game.sbe ? "Unfunity" : "Unf";

	document.getElementById("unfunitypoints").innerHTML = `You have ${f(game.unfunitypoints)} unfunity points giving a ${f(
		D(1.01)
			.pow((game.unfunityUpgBought.superUnfun ? game.unfunityUpgBought.superUnfun : D(0)).add(1))
			.pow(game.unfunitypoints),
		4
	)}&times; boost to all production.
	<br>You are producing ${f(D.pow(2, game.unfunityUpgBought.doubleUnfun))} unfunity per hour ${game.onlineUnfun.neq(1) ? `with a ${f(game.onlineUnfun)}&times; online multiplier, giving total production of ${f(game.ufph)} unfunity per hour` : ""}`;

	if (Object.keys(game.prestige).length > 1) setdisp("tabb3", "inline-block");
	else hide("tabb3");

	for (let i in game.axioms) {
		document.querySelector(`.circle`).children[i].className = "segment" + (game.axioms[i] ? "" : " hidden");
		document.querySelector(`#axioms`).children[i].className = !blurfuncs[i]() ? "blur" : "";
		document.querySelector(`#axioms`).children[i].children[0].style.display = !blurfuncs[i]() ? "none" : "";
		document.querySelector(`#axioms`).children[i].children[0].innerText = aprices[i][0] + " " + (game.prestige[aprices[i][1]] || game.prestige[jea([0])]).name.replace(/^./, (game.prestige[aprices[i][1]] || game.prestige[jea([0])]).name.charAt(0).toUpperCase()) + " Point" + (aprices[i][0] == 1 ? "" : "s");
		if (game.axioms[i]) document.querySelector(`#axioms`).children[i].children[0].className = document.querySelector(`#axioms`).children[i].children[0].className.replace(/(red)|(green)/, "blue");
		else if (canBuyAxiom(i)) document.querySelector(`#axioms`).children[i].children[0].className = document.querySelector(`#axioms`).children[i].children[0].className.replace(/(red)|(blue)/, "green");
		else document.querySelector(`#axioms`).children[i].children[0].className = document.querySelector(`#axioms`).children[i].children[0].className.replace(/(green)|(blue)/, "red");
	}
}

let blurfuncs = [
	() => {
		return game.layersdone.includes(jea([1]));
	},
	() => false,
	() => {
		return game.layersdone.includes(jea([1]));
	},
	() => false,
	() => {
		return game.layersdone.includes(jea([2]));
	},
	() => false,
	() => false,
	() => false,
	() => false,
];

function canBuyAxiom(i) {
	let layer = game.prestige[aprices[i][1]];
	return layer ? layer.points.gte(aprices[i][0]) : false;
}

function buyAxiom(i) {
	if (game.axioms[i] || !canBuyAxiom(i)) return false;
	let layer = game.prestige[aprices[i][1]];
	layer.points.subBy(aprices[i][0]);
	game.axioms[i] = true;
}

let aprices = [
	[1, jea([1])],
	[Infinity, jea([0])],
	[10, jea([1])],
	[Infinity, jea([0])],
	[25, jea([2])],
	[Infinity, jea([0])],
	[Infinity, jea([0])],
	[Infinity, jea([0])],
	[Infinity, jea([0])],
];

let atooltips = ["∀x∀y[∀z(z∈x⇔z∈y)⇒x=y]\nDouble online production of unfunity", "∀x[∃a(a∈x)⇒∃y(y∈x∧¬∃z(z∈y∧z∈x))]", "∀z∀w₁∀w₂...∀wₙ∃y∀x[x∈y⇔((x∈z)∧φ)]\nReduces cost scaling for the Super Unfun upgrade", "∀x∀y∃z((x∈z)∧(y∈z))", "∀F∃A∀Y∀x[(x∈Y∧Y∈F)⇒x∈A]\nIncrease the cap of Dimensional Stabilizer to 15 levels", "∀A∀w₁∀w₂...∀wₙ[∀x(x∈A⇒∃!y(φ))⇒∃B∀x(x∈A⇒∃y(y∈B∧φ))]", "∃X[¬∃a(a∈ø)∧ø∈X∧∀y(y∈X⇒(∃!s(∀b(b∈y⇒b∈S∧y∈S∧¬∃c(c∈s∧¬(c∈y∨∀d(d∈y⇔d∈c))))⇒s∈X)))]", "∀x∃y∀z[∀a(a∈z⇒a∈x)⇒z∈y]", "∀X[¬∃a(a∈ø)∧∀b∀c((b∈X∧c∈b)⇒c∈U)∧¬∃d(d∈U∧¬∃e(e∈X∧d∈e))∧¬(ø∈X)⇒∃f:X→U∧∀A(A∈X⇒f(A)∈A)]"];
