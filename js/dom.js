function updateElements() {
	document.getElementById("sbt").innerHTML = game.sbe ? "&lt;&lt;" : "&gt;&gt;";

	document.getElementById("tabb0").innerText = game.sbe ? "Dimension" : "Dim";
	document.getElementById("tabb1").innerText = game.sbe ? "Options" : "Opt";
	document.getElementById("tabb2").innerText = game.sbe ? "Upgrades" : "Upg";
	document.getElementById("tabb3").innerText = game.sbe ? "Unfunity" : "Unf";
	document.getElementById("tabb4").innerText = game.sbe ? "Set Theory" : "Set";
	document.getElementById("tabb5").innerText = game.sbe ? "Ordinals" : "Ord";
	document.getElementById("tabb6").innerText = game.sbe ? "Automation" : "Aut";

	if (game.frameSkip) {
		$("fs").innerText = "On";
		$("fsb").className = $("fsb").className.replace("red", "green");
	} else {
		$("fs").innerText = "Off";
		$("fsb").className = $("fsb").className.replace("green", "red");
	}

	document.getElementById("unfunitypoints").innerHTML = `You have ${f(
		game.unfunitypoints
	)} unfunity points giving a ${f(
		D(1.01)
			.pow((game.unfunityUpgBought.superUnfun ? game.unfunityUpgBought.superUnfun : D(0)).add(1))
			.pow(game.unfunitypoints),
		4
	)}&times; boost to all production.
	<br>You are producing ${f(
		D.pow(game.axioms[4] ? 3 : 2, game.unfunityUpgBought.doubleUnfun)
	)} unfunity per hour ${
		game.onlineUnfun.neq(1)
			? `with a ${f(
					game.onlineUnfun
			  )}&times; online multiplier, and a 5&times; boost for being online, ${
					game.milestoneUnlocked(0) ? "and a 10&times; boost from the first ordinal milestone" : ""
			  } ${
					game.tsli > 99999 ? "but you're playing idly, so your punishment is" : "giving"
			  } total production of ${f(game.ufph, 2)} unfunity per hour`
			: `with a 5&times; boost for being online, ${
					game.milestoneUnlocked(0) ? "and a 10&times; boost from the first ordinal milestone" : ""
			  } ${
					game.tsli > 99999 ? "but you're playing idly, so your punishment is" : "giving"
			  } total production of ${f(game.ufph, 2)} unfunity per hour`
	}`;

	if (Object.keys(game.prestige).length > 1) {
		setdisp("tabb4", "inline-block");
		setdisp("tabb6", "inline-block");
	} else {
		hide("tabb4");
		hide("tabb6");
	}
	if (game.axioms[1]) {
		setdisp("tabb5", "inline-block");
		document.getElementById("ord").innerHTML = game.ord.toHTML();
	} else {
		hide("tabb5");
	}
	if (game.upgradesBought.dimComp.gt(0) || game.layersdone.length > 1)
		setdisp("tabb3", "inline-block");
	else hide("tabb3");
	if (game.aut) {
		$("unlockaut").style.display = "none";
		$("mainaut").style.display = "block";
	} else {
		if (game.layersdone.includes(jea([1])) && game.prestige[jea([1])].points.gte(10000))
			$("unlockaut").className = $("unlockaut").className.replace(/(blue|red)/, "green");
		else $("unlockaut").className = $("unlockaut").className.replace(/(green|blue)/, "red");
		$("mainaut").style.display = "none";
	}

	for (let i in game.upgrades) game.upgrades[i].domUpdate();

	for (let i in game.axioms) {
		document.querySelector(`.circle`).children[i].className =
			"segment" + (game.axioms[i] ? "" : " hidden");
		document.querySelector(`#axioms`).children[i].className = !blurfuncs[i]() ? "blur" : "";
		document.querySelector(`#axioms`).children[i].children[0].style.display = !blurfuncs[i]()
			? "none"
			: "";
		document.querySelector(`#axioms`).children[i].children[0].innerText =
			f(D(aprices[i][0])) +
			" " +
			(game.prestige[aprices[i][1]] || game.prestige[jea([0])]).name.replace(
				/^./,
				(game.prestige[aprices[i][1]] || game.prestige[jea([0])]).name.charAt(0).toUpperCase()
			) +
			" Point" +
			(aprices[i][0] == 1 ? "" : "s");
		if (game.axioms[i])
			document.querySelector(`#axioms`).children[i].children[0].className = document
				.querySelector(`#axioms`)
				.children[i].children[0].className.replace(/(red)|(green)/, "blue");
		else if (canBuyAxiom(i))
			document.querySelector(`#axioms`).children[i].children[0].className = document
				.querySelector(`#axioms`)
				.children[i].children[0].className.replace(/(red)|(blue)/, "green");
		else
			document.querySelector(`#axioms`).children[i].children[0].className = document
				.querySelector(`#axioms`)
				.children[i].children[0].className.replace(/(green)|(blue)/, "red");
	}
}

let blurfuncs = [
	() => {
		return game.layersdone.includes(jea([1]));
	},
	() => {
		return game.layersdone.includes(jea([2]));
	},
	() => {
		return game.layersdone.includes(jea([1]));
	},
	() => {
		return game.layersdone.includes(jea([2]));
	},
	() => {
		return game.layersdone.includes(jea([2]));
	},
	() => {
		return game.layersdone.includes(jea([1]));
	},
	() => {
		return game.layersdone.includes(jea([2]));
	},
	() => {
		return game.layersdone.includes(jea([1]));
	},
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
	[5000, jea([2])],
	[10, jea([1])],
	[250, jea([2])],
	[5, jea([2])],
	[1e30, jea([1])],
	[1000000, jea([2])],
	[50000, jea([1])],
	[Infinity, jea([0])],
];

let atooltips = [
	"∀x∀y[∀z(z∈x⇔z∈y)⇒x=y]\nDouble online production of unfunity",
	"∀x[∃a(a∈x)⇒∃y(y∈x∧¬∃z(z∈y∧z∈x))]\nUnlock ordinals",
	"∀z∀w₁∀w₂...∀wₙ∃y∀x[x∈y⇔((x∈z)∧φ)]\nReduces cost scaling for the Super Unfun upgrade",
	"∀x∀y∃z((x∈z)∧(y∈z))\nUnfunity upgrades don't consume unfunity points",
	"∀F∃A∀Y∀x[(x∈Y∧Y∈F)⇒x∈A]\nDouble unfun becomes triple unfun",
	"∀A∀w₁∀w₂...∀wₙ[∀x(x∈A⇒∃!y(φ))⇒∃B∀x(x∈A⇒∃y(y∈B∧φ))]\nDimensional Jump has a higher limit based on your infinity points, limited at 100",
	"∃I(ø∈I∧∀x∈I((x∪{x})∈I))\nUpgrades aren't reset on infinity",
	"∀x∃y∀z[∀a(a∈z⇒a∈x)⇒z∈y]\nYou start with Dimensional Jump at level 3",
	"∀X[¬∃a(a∈ø)∧∀b∀c((b∈X∧c∈b)⇒c∈U)∧¬∃d(d∈U∧¬∃e(e∈X∧d∈e))∧¬(ø∈X)⇒∃f:X→U∧∀A(A∈X⇒f(A)∈A)]",
];
