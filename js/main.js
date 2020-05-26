var game;
var diffMultiplier = 1;
var gameLoopIntervalId = 0;
var diff = 0;
var breakPoint = false;
let framerates = [];

function updateDisplay() {
	updateElements();
	for (let i in game.upgrades) game.upgrades[i].domUpdate();
	for (let i in game.unfunityUpgrades) game.unfunityUpgrades[i].domUpdate();
}

function gameLoop(diff) {
	if (breakPoint && !diff) return;
	// 1 diff = 0.001 seconds
	var thisUpdate = new Date().getTime();
	diff = (diff || Math.min(thisUpdate - game.lastUpdate, 21600000)) * diffMultiplier;
	let fr = Math.floor(1000 / diff);
	framerates.push(fr);
	if (framerates.length > 25) framerates.shift();
	let frames = Math.floor(framerates.reduce((a, b) => a + b) / framerates.length);
	document.getElementById("frames").innerText = frames;
	//if (diffMultiplier > 1) console.log("SHAME")
	//else if (diffMultiplier < 1) console.log("SLOWMOTION")

	game.onlineUnfun = D(1);
	if (game.axioms[0]) game.onlineUnfun.timesBy(2);
	if (game.axioms[2]) game.unfunityUpgrades.superUnfun.costScale = D(6);
	if (game.axioms[4]) game.upgrades.dimStab.levelCap = D(15);
	else if (game.upgradesBought.dimStab.gt(game.upgrades.dimStab.levelCap)) game.upgradesBought.dimStab = game.upgrades.dimStab.levelCap;
	else game.upgrades.dimStab.levelCap = D(10);

	game.ufph = D.pow(2, game.unfunityUpgBought.doubleUnfun).mul(game.onlineUnfun);

	let hours = diff / 3.6e6;
	game.unfunitypoints = game.unfunitypoints.add(D.pow(2, game.unfunityUpgBought.doubleUnfun).mul(hours).mul(game.onlineUnfun));
	for (let i in game.prestige) game.prestige[i].update(diff);
	updateDisplay();
	game.lastUpdate = thisUpdate;
}

function startGame() {
	document.getElementById("title").dataset.tooltip = "By Reinhardt, Nyan Cat, Naruyoko";
	if (!nyanLoad()) newGame();
	for (let i in game.axioms) document.querySelector(`#axioms`).children[i].children[0].dataset.tooltip = atooltips[i];
	tab(0);
	Mousetrap.bind("m", () => {
		game.maxAllLayers();
	});
	var thisUpdate = new Date().getTime();
	diff = (thisUpdate - game.lastUpdate) * diffMultiplier;
	document.getElementById("timeoffline").innerText = getDisplayTime(diff);
	if (diff) {
		let hours = diff / 3.6e6;
		game.unfunitypoints = game.unfunitypoints.add(D.pow(2, game.unfunityUpgBought.doubleUnfun).mul(hours).mul(game.offlineUnfun));
		document.getElementById("unfungain").innerText = f(D.pow(2, game.unfunityUpgBought.doubleUnfun).mul(hours).mul(game.offlineUnfun));
		document.getElementById("gainspan").style.display = "block";
	} else {
		document.getElementById("gainspan").style.display = "none";
	}
	setInterval(function () {
		if (!errorPopped) nyanSave();
	}, 1000);
	startInterval();
}

function startInterval() {
	gameLoopIntervalId = setInterval(gameLoop, 33);
}
