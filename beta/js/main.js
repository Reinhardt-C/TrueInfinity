// Chuck your data into the depths of the localStorage variable...
function save(src) {
	localStorage.setItem('infbetasave', btoa(JSON.stringify(game)));
	popup('Game Saved', 'lightblue');
	if (game.as) {
		if (src != 'man') setTimeout(save, game.asintv * 1000);
	}
}

// Clear the save file
function wipe(nc) {
	if (!nc) {
		if (confirm('Do you want to delete ALL of your progress?!?')) {
			clearAll();
			game = new Game();
			firstTime();
			save('man');
		}
	} else {
		clearAll();
		game = new Game();
		firstTime();
		save('man');
	}
}

// Retrieve your data from the depths of the localStorage variable...
function load() {
	if (localStorage.getItem('infbetasave') != undefined && localStorage.getItem('infbetasave') != 'undefined' && localStorage.getItem('infbetasave') != null) {
		clearAll();
		try {
			game = new Game(JSON.parse(atob(localStorage.getItem('infbetasave'))));
		} catch(e) {
			console.warn('Outdated save, updating');
			game = new Game(JSON.parse(localStorage.getItem('infbetasave')));
		}
		save();
		return true;
	} else {
		return false;
	}
}

// Export a save file
function exp() {
	// prompt('Exported Save: ', btoa(JSON.stringify(game)));
	let output = document.getElementById('expout');
	let parent = output.parentElement;
	parent.style.display = "";
	output.value = btoa(JSON.stringify(game));
	output.onblur = function() {
		parent.style.display = "none";
	}
	output.focus();
	output.select();
	try {
		document.execCommand('copy');
		output.blur();
		alert('Save copied to clipboard');
	} catch(e) {
		console.warn(e);
		alert('Failed to copy to clipboard');
	}
}

// Import a save file
function imp() {
	let b64 = prompt('Enter a save file: ');
	let c = true;
	if (b64 == null) {
		c = false;
	}
	let json;
	try {
		json = atob(b64);
	} catch(e) {
		c = false;
		alert(e);
	}
	if (c) {
		if (confirm('Are you sure? This will override your current progress!')) {
			clearAll();
			game = new Game(JSON.parse(json));
			save();
			return true;
		} else {
			return false;
		}
	}
}

let game;
let fpsOut;
let filterStrength = 20;
let frameTime = 0, lastLoop = new Date, thisLoop;

function init() {
	fpsOut = document.getElementById('fps');
	
	if (!load()) {
		wipe(true);
	}
	
	themeTo(game.theme);
	
	createAchievements();
	
	news.begin();
	
	document.getElementById('asintv').value = game.asintv;
	document.getElementById('notation').value = game.notation;
	document.getElementById('themes').value = game.theme;
	setInterval(loop, 42);
	setInterval(hotkeys, 200);
}

function firstTime() {
	game.prestige[joa([0])] = new Layer(oa([0]), 100);
}

function loop() {
	if (game.notation == "tin") game.notation = "hyp"
	game.update();
	setElems();
	updatePrestiges();
	for (let i = 0; i < achievements.length; i++) achievements[i].unlocked;
	auto();
	fps();
	updateTree();
}

function fps() {
	var thisFrameTime = (thisLoop = new Date) - lastLoop;
	frameTime += (thisFrameTime - frameTime) / filterStrength;
	lastLoop = thisLoop;
	fpsOut.innerHTML = (1000 / frameTime).toFixed(0);
}