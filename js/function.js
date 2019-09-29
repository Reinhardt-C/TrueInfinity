function n(num) {
	return new OmegaNum(num.array ? num.array : num);
}

function d(str) {
	let obj;
	if (typeof str == 'string') {
		obj = JSON.parse(str);
	} else {
		obj = str;
	}
	return new Dimension(obj.dim, obj.loc, obj.amount, obj.bought);
}

function l(str) {
	let obj;
	if (typeof str == 'string') {
		obj = JSON.parse(str);
	} else {
		obj = str;
	}
	return new Layer(obj.loc, obj.points, obj.power, obj.dims, obj.tslp, [obj.is_auto_max, obj.is_auto_prestige]);
}

function secretFormula(tslp, dim, amount, mult) {
	let x = new OmegaNum(tslp).div(20).mul(dim).mul(mult).mul(amount).floor();
	let y = dim.floor();
	let z = OmegaNum.choose(x, y).pow(0.5);
	return z.gt(1e3) ? z : y.factorial();
}

function createDiv(parentId, thisId, classes = '') {
	return createElem(parentId, thisId, 'div', classes);
}

function createElem(parentId, thisId, type, classes = '') {
	let elem = document.createElement(type);
	elem.id = thisId;
	elem.className = classes;
	document.getElementById(parentId).appendChild(elem);
	return elem;
}

function removeElem(thisId) {
	document.getElementById(thisId).remove();
}

function toggleSB() {
	document.getElementById('sidebar').classList.toggle('expanded');
	document.getElementById('toggleSB').innerHTML = document.getElementById('toggleSB').innerHTML == '&gt;&gt;' ? '&lt;&lt;' : '&gt;&gt;';
	if (document.getElementById('mt0').innerHTML == 'Di') {
		setTimeout(() => document.getElementById('mt0').innerHTML = 'Dimensions', 300);
	} else {
		setTimeout(() => document.getElementById('mt0').innerHTML = 'Di', 200);
	}
	if (document.getElementById('mt1').innerHTML == 'Op') {
		setTimeout(() => document.getElementById('mt1').innerHTML = 'Options', 300);
	} else {
		setTimeout(() => document.getElementById('mt1').innerHTML = 'Op', 200);
	}
	if (document.getElementById('mt2').innerHTML == 'St') {
		setTimeout(() => document.getElementById('mt2').innerHTML = 'Statistics', 300);
	} else {
		setTimeout(() => document.getElementById('mt2').innerHTML = 'St', 200);
	}
	if (document.getElementById('mt3').innerHTML == 'Ac') {
		setTimeout(() => document.getElementById('mt3').innerHTML = 'Achievements', 300);
	} else {
		setTimeout(() => document.getElementById('mt3').innerHTML = 'Ac', 200);
	}
	if (document.getElementById('mt4').innerHTML == 'Au') {
		setTimeout(() => document.getElementById('mt4').innerHTML = 'Automation', 300);
	} else {
		setTimeout(() => document.getElementById('mt4').innerHTML = 'Au', 200);
	}
	if (document.getElementById('credit').innerHTML == '') {
		setTimeout(() => document.getElementById('credit').innerHTML = 'Lock icon made by <a href=\'https://www.flaticon.com/authors/smashicons\'>Smashicons</a> from <a href=\'https://www.flaticon.com\'>www.flaticon.com</a><br>Favicon made by <a href="https://www.flaticon.com/authors/freepik">Freepik</a> from <a href="https://www.flaticon.com/">www.flaticon.com</a>', 300);
	} else {
		setTimeout(() => document.getElementById('credit').innerHTML = '', 200);
	}
}

function mt(n) {
	let nl = document.querySelectorAll('.maintab');
	for (let i = 0; i < nl.length; i++) {
		let nd = nl[i];
		nd.style.display = 'none';
	}
	document.querySelector('#mtb' + n).style.display = 'block';
}

function show(id) {
	setdisp(id, 'block');
}

function hide(id) {
	setdisp(id, 'none');
}

function setdisp(id, val) {
	document.getElementById(id).style.display = val;
}

function setElem(id, v) {
	if (document.getElementById(id)) {
		if (document.getElementById(id).innerHTML != v) {
			document.getElementById(id).innerHTML = v;
		}
	}
}

function toggleas() {
	game.as = !game.as;
	save();
}

const THRESHOLD = OmegaNum(1.79e308);

function getPrestigeGain(num) {
  num = num.max(1e3);
  let steps = num.logBase(THRESHOLD) - 1;
  let gens = num.log10().logBase(2);
  let pow = 4 * steps / gens;
  return OmegaNum.floor(OmegaNum.pow(10, pow)) || n(1);
}

function prestige(loc) {
	let str_loc = JSON.stringify(loc);
	let next_loc = JSON.parse(str_loc);
	next_loc[0]++;
	let next_str_loc = JSON.stringify(next_loc);
	let gain = getPrestigeGain(game.prestige[str_loc].points).mul(10);
	if (!gain.eq(0)) {
		if (game.prestige[next_str_loc]) {
			game.prestige[next_str_loc].incPoints(gain);
		} else {
			game.prestige[next_str_loc] = new Layer(next_loc, gain);
		}
		for (let i in game.prestige) {
			let p = game.prestige[i];
			if (cmpLayer(next_loc, p.loc) == 1) p.clear();
		}
		if (cmpLayer(game.max_layer, next_loc) == -1) game.max_layer = next_loc;
	}
}

function cmpLayer(loc1, loc2) {
	if (loc1.length > loc2.length) return 1;
	if (loc1.length < loc2.length) return -1;
	for (let i = loc1.length - 1; i >= 0; i--) {
		if (loc1[i] > loc2[i]) {
			return 1;
			break;
		}
		if (loc1[i] < loc2[i]) {
			return -1;
			break;
		}
	}
	return 0;
}

function getMult(loc) {
	let x = n(1);
	for (let i = loc[0] + 1; i < game.max_layer[0] + 1; i++) {
		let temp = [...loc];
		temp[0] = i;
		let temp2 = JSON.stringify(temp);
		if (!game.prestige[temp2].power.eq(0)) {
			x = OmegaNum.mul(game.prestige[temp2].power.pow(i - loc[0] == 1 ? i - loc[0] : (i - loc[0]) * 10), x);
		}
	}
	return x.eq(0) ? x.add(1) : x;
}

const NAMES = [
	'infinity',
	'eternity',
	'reality',
	'equality',
	'affinity',
	'celerity',
	'identity',
	'vitality',
	'immunity',
	'atrocity',
	'immensity',
	'severity',
	'fatality',
	'insanity',
	'calamity',
	'futility',
	'finality',
	'unity',
	'quantum',
	'etheral',
	'hadronize',
	'stellar',
	'universal',
	'fractalize',
	'abstraction',
	'cosmological',
	'beyond',
	'meta',
	'virtualize',
	'digitize',
	'infinitize',
	'timeless',
	'continuum',
	'omniscient',
	'spiritual',
	'enlighten'
];

function getLayerName(loc) {
	let str = '';
	if (loc.length = 1) {
		if (JSON.stringify(loc) != '[0]') {
			let floor = Math.floor(loc[0] / (NAMES.length + 1));
			if (floor != 0) {
				str = 'prestige ' + (loc[0] + 1)
			} else {
				str = NAMES[(loc[0] - 1) % NAMES.length];
			}
		}
	}
	return str;
}

function maxAll(loc) {
	game.prestige[JSON.stringify(loc)].maxAll();
}

function autoPrestigeGain(loc) {
	let gain = getPrestigeGain(game.prestige[JSON.stringify(loc)].points).div(1000000).floor();
	let arr = [...loc];
	arr[0]++;
	if (game.prestige[JSON.stringify(arr)]) game.prestige[JSON.stringify(arr)].incPoints(gain);
}

function auto_max_cost(loc) {
	let x = [...loc];
	x[0]++;
	x[0] *= 10;
	return new OmegaNum(x).tetr(2);
}

function afford_auto_max(loc) {
	return game.prestige[JSON.stringify(loc)].points.gte(auto_max_cost(loc));
}

function buy_auto_max(loc) {
	if (afford_auto_max(loc)) {
		game.automaxall.push(loc);
		game.prestige[JSON.stringify(loc)].subPoints(auto_max_cost(loc));
		game.prestige[JSON.stringify(loc)].is_auto_max = true;
	}
}

function auto_prestige_cost(loc) {
	let x = [...loc];
	x[0]++;
	x[0] *= 10;
	return new OmegaNum(x).tetr(3);
}

function afford_auto_prestige(loc) {
	return game.prestige[JSON.stringify(loc)].points.gte(auto_prestige_cost(loc));
}

function buy_auto_prestige(loc) {
	if (afford_auto_prestige(loc)) {
		game.autoprestige.push(loc);
		game.prestige[JSON.stringify(loc)].subPoints(auto_prestige_cost(loc));
		game.prestige[JSON.stringify(loc)].is_auto_prestige = true;
	}
}
