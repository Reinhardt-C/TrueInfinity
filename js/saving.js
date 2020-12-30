// Nyan's Stuff

function newGame() {
	clearAll();
	game = new Game();
	setupUpgrades();
	game.prestige[jea([0])] = new Layer();
}

function nyanSave() {
	localStorage.setItem("tigsave", getFinalSaveString());
}

function nyanLoad(save, imp = false) {
	save = save || localStorage.getItem("tigsave");
	if (typeof save == "string") {
		try {
			save = atob(save);
			if (save.indexOf("NaN") != -1) {
				if (!confirm("Uh oh, there are NaNs here! Do you still wish to load the save?")) {
					if (confirm("Do you wish to export the savefile for debugging? (RECOMMENDED)")) {
						breakPoint = true;
						alert(
							"Now you can use export in options and then refresh and select no in previous question to continue playing."
						);
					} else throw "NaN in save";
				}
			}
			save = JSON.parse(save);
		} catch (err) {
			if (!imp) newGame();
			return false;
			g;
		}
		clearAll();
		game = new Game();
		if (save.version == game.version) {
			let temp = ["lastUpdate", "notation", "upgradesBought", "unfunityUpgBought", "axioms"];
			temp.forEach(function (name) {
				if (name in save) game[name] = save[name];
			});
			game.unfunitypoints = D(save.unfunitypoints);
			game.ord = O(save.ord);
			game.tsli = save.tsli;
			game.frameSkip = save.frameSkip;
			game.aut = save.aut;
			for (let i = 0; i < game.automators.length; i++) {
				game.automators[i].priority = save.autPriorities[i];
				game.automators[i].purchased = save.autPurchased[i];
				game.automators[i].on = save.autToggle[i];
				for (let j in game.automators[i].params)
					game.automators[i].params[j] = save.autParams[i][j] || game.automators[i].params[j];
				for (let j in game.automators[i].params)
					game.automators[i].params[j] = D(game.automators[i].params[j]);
			}
		}

		// Run some init stuff
		setupUpgrades();

		// upgradesBought
		for (let id in game.upgradesBought) {
			game.upgradesBought[id] = D(game.upgradesBought[id]);
		}

		// unfunityUpgrades
		for (let id in game.unfunityUpgBought) {
			game.unfunityUpgBought[id] = D(game.unfunityUpgBought[id]);
		}

		if (save.version == game.version) {
			// prestige
			for (let i = 0; i < save.prestige.length; i++) {
				layer = save.prestige[i];
				game.prestige[jea(layer.loc)] = new Layer(
					ea(layer.loc),
					D(layer.points),
					D(layer.power),
					layer.dims,
					layer.tslp
				);
			}
		} else {
			game.prestige[jea([0])] = new Layer();
		}

		return true;
	}
	return false;
}

function getFinalSaveString() {
	return btoa(getSaveString());
}

function getSaveString() {
	let save = getMinimalGameObj();
	return JSON.stringify(save);
}

function getMinimalGameObj() {
	let ret = {
		version: game.version,
		lastUpdate: game.lastUpdate,
		notation: game.notation,
		unfunitypoints: game.unfunitypoints.toString(),
		upgradesBought: {},
		unfunityUpgBought: {},
		prestige: Object.values(game.prestige).map(x => x.objectify()),
		axioms: game.axioms,
		ord: game.ord.toString(),
		tsli: game.tsli,
		frameSkip: game.frameSkip,
		aut: game.aut,
		autPriorities: game.automators.map(e => e.priority),
		autPurchased: game.automators.map(e => e.purchased),
		autToggle: game.automators.map(e => e.on),
		autParams: game.automators.map(e => e.rawparams),
	};
	for (let id in game.upgradesBought) {
		ret.upgradesBought[id] = game.upgradesBought[id].toString();
	}
	for (let id in game.unfunityUpgBought) {
		ret.unfunityUpgBought[id] = game.unfunityUpgBought[id].toString();
	}
	return ret;
}

function wipe() {
	newGame();
	nyanSave();
}
