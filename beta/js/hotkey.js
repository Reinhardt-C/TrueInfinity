document.onkeydown = function(e) {
	game.keys[e.keyCode] = true;
}

document.onkeyup = function(e) {
	game.keys[e.keyCode] = false;
}

function hotkeys() {
	if (game.keys[77]) H[77]();
	if (game.keys[80]) H[80]();
}

let H = [];

H[77] = function() {
	for (let i in game.prestige) game.prestige[i].maxAll();
}

H[80] = function() {
  var d=document.getElementById("pb"+JSON.stringify(game.max_layer));
	if (d) d.click();
}