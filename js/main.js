var game;
var diffMultiplier = 1;
var gameLoopIntervalId = 0;
var diff = 0;
var breakPoint = false;
let framerates = [];

let $ = id => document.getElementById(id);
let $$ = id => document.createElement(id);

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
	game.tsli += diff;
	let fr = Math.floor(1000 / diff);
	framerates.push(fr);
	if (framerates.length > 25) framerates.shift();
	let frames = Math.floor(framerates.reduce((a, b) => a + b) / framerates.length);
	document.getElementById("frames").innerText = frames;
	//if (diffMultiplier > 1) console.log("SHAME")
	//else if (diffMultiplier < 1) console.log("SLOWMOTION")

	game.onlineUnfun = D(1);
	game.onlineUnfun.timesBy(game.unfunityUpgBought.onlineUnfun.add(1));
	if (game.axioms[0]) game.onlineUnfun.timesBy(2);
	if (game.axioms[2]) game.unfunityUpgrades.superUnfun.costScale = D(6);
	if (game.axioms[4]) game.unfunityUpgrades.doubleUnfun.costScale = D(4);
	if (game.axioms[5])
		game.upgrades.dimJump.levelCap = D.max(
			5,
			D.min(D.floor(D.log10(game.prestige[jea([1])].points).div(3)), 100)
		);

	game.ufph = D.pow(game.axioms[4] ? 3 : 2, game.unfunityUpgBought.doubleUnfun)
		.mul(game.onlineUnfun)
		.mul(5)
		.mul(Math.min(100000 / game.tsli, 1));
	if (game.milestoneUnlocked(0)) game.ufph.timesBy(10);
	if (game.milestoneUnlocked(1)) game.upgrades.dimStab.levelCap = D(20);
	else game.upgrades.dimStab.levelCap = D(10);

	let hours = diff / 3.6e6;
	game.unfunitypoints = game.unfunitypoints.add(game.ufph.mul(hours));
	for (let i in game.prestige) game.prestige[i].update(diff);
	for (let i of [...game.automators].sort((a, b) => a.priority - b.priority)) i.update();
	updateDisplay();
	game.ordinalHandler.update();
	game.lastUpdate = thisUpdate;
	if (game.frameSkip) game.updateNextFrame = ++game.updateNextFrame % 3;
}

function setLoad(text) {
	$("loadingdat").innerText = text;
}

function promise(method) {
	return new Promise(resolve => {
		let x = method();
		setTimeout(() => resolve(x), Math.random() * 300);
	});
}

async function startGame() {
	setLoad("Initialising title tooltip");
	await promise(() => {
		document.getElementById("title").dataset.tooltip = "By Reinhardt, Nyan Cat, Naruyoko";
	});
	setLoad("Attempting to load data");
	await promise(() => {
		if (!nyanLoad()) newGame();
	});
	setLoad("Creating axioms");
	await promise(() => {
		for (let i in game.axioms)
			document.querySelector(`#axioms`).children[i].children[0].dataset.tooltip = atooltips[i];
	});
	setLoad("Creating automators");
	await promise(() => {
		for (let i of game.automators) i.domCreate();
	});
	setLoad("Switching to first tab");
	await promise(() => {
		tab(0);
	});
	setLoad("Initialising M hotkey");
	await promise(() => {
		Mousetrap.bind("m", () => {
			game.maxAllLayers();
		});
	});
	setLoad("Getting current time");
	var thisUpdate = await promise(() => new Date().getTime());
	setLoad("Calculating offline time");
	await promise(() => {
		diff = (thisUpdate - game.lastUpdate) * diffMultiplier;
	});
	setLoad("Setting offline time text");
	await promise(() => {
		document.getElementById("timeoffline").innerText = getDisplayTime(diff);
	});
	if (diff) {
		setLoad("Calculating offline hours");
		let hours = await promise(() => diff / 3.6e6);
		setLoad("Calculating unfunity");
		await promise(() => {
			game.unfunitypoints = game.unfunitypoints.add(
				D.pow(game.axioms[4] ? 3 : 2, game.unfunityUpgBought.doubleUnfun)
					.mul(hours)
					.mul(game.offlineUnfun)
					.mul(Math.min(200000 / diff, 1))
			);
		});
		setLoad("Setting unfunity text");
		await promise(() => {
			document.getElementById("unfungain").innerText = f(
				D.pow(game.axioms[4] ? 3 : 2, game.unfunityUpgBought.doubleUnfun)
					.mul(hours)
					.mul(game.offlineUnfun)
					.mul(Math.min(200000 / diff, 1))
			);
		});
		setLoad("Setting unfunity text display");
		await promise(() => {
			document.getElementById("gainspan").style.display = "block";
		});
	} else {
		setLoad("Setting unfunity text display");
		await promise(() => {
			document.getElementById("gainspan").style.display = "none";
		});
	}
	setLoad("Starting news");
	await promise(() => {
		news.begin();
	});
	setLoad("Starting save loop");
	await promise(() => {
		setInterval(function () {
			if (!errorPopped) nyanSave();
		}, 1000);
	});
	setLoad("Starting game loop");
	await promise(() => {
		startInterval();
	});
	document.body.removeChild($("loading"));
}

function startInterval() {
	gameLoopIntervalId = setInterval(gameLoop, 33);
}
