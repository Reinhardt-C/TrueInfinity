function createLayer(loc) {
	let p = createDiv('layerswrapper', 'p' + JSON.stringify(loc), 'p');
	let r = createResBox(loc);
	let m = createElem('p' + JSON.stringify(loc), 'm' + JSON.stringify(loc), 'button', 'maxall sbb green');
	m.innerHTML = 'Max All [M]';
	m.onclick = () => {maxAll(loc)};
	let br = createElem('p' + JSON.stringify(loc), '', 'br');
	let pb = createElem('p' + JSON.stringify(loc), 'pb' + JSON.stringify(loc), 'button', 'pb sbb blue');
	pb.innerHTML = 'Prestige for: ';
	pb.onclick = () => {prestige(loc)};
	
	let auto = createDiv('autodiv', 'auto' + JSON.stringify(loc), 'auto');
	let r2 = createDiv('auto' + JSON.stringify(loc), 'r2' + JSON.stringify(loc), 'r');
	let ama = createElem('auto' + JSON.stringify(loc), 'ama' + JSON.stringify(loc), 'button', 'ama sbb green');
	ama.onclick = () => {buy_auto_max(loc)};
	let br2 = createElem('auto' + JSON.stringify(loc), '', 'br');
	let ap = createElem('auto' + JSON.stringify(loc), 'ap' + JSON.stringify(loc), 'button', 'ap sbb green');
	ap.onclick = () => {buy_auto_prestige(loc)};
	let br3 = createElem('auto' + JSON.stringify(loc), '', 'br');
	let para = createElem('auto' + JSON.stringify(loc), '', 'p', '');
}

function createResBox(loc) {
	let r = createDiv('p' + JSON.stringify(loc), 'r' + JSON.stringify(loc), 'r');
	return r;
}

function createGenerator(dim, loc, index) {
	let d = n(dim);
	let o = game.prestige[JSON.stringify(loc)].dims[index];
	
	let g = createDiv('p' + JSON.stringify(loc), 'g' + JSON.stringify(loc) + JSON.stringify(o.id), 'g');
	
	let t = createElem('g' + JSON.stringify(loc) + JSON.stringify(o.id), 't' + JSON.stringify(loc) + JSON.stringify(o.id), 'p', 'gt');
	
	let b = createElem('g' + JSON.stringify(loc) + JSON.stringify(o.id), 'b' + JSON.stringify(loc) + JSON.stringify(o.id), 'button', 'gb sbb green height half');
	b.innerHTML = 'Buy';
	let b2 = createElem('g' + JSON.stringify(loc) + JSON.stringify(o.id), 'b2' + JSON.stringify(loc) + JSON.stringify(o.id), 'button', 'gb sbb green height half');
	b2.innerHTML = 'Buy Max';
	hide(b.id);
	hide(b2.id);
	
	let h = createElem('g' + JSON.stringify(loc) + JSON.stringify(o.id), 'h' + JSON.stringify(loc) + JSON.stringify(o.id), 'hr');
	
	setTimeout(function() {
		if (document.getElementById('b' + JSON.stringify(loc) + JSON.stringify(o.id))) setdisp('b' + JSON.stringify(loc) + JSON.stringify(o.id), 'inline-block');
		if (document.getElementById('b2' + JSON.stringify(loc) + JSON.stringify(o.id))) setdisp('b2' + JSON.stringify(loc) + JSON.stringify(o.id), 'inline-block');
	}, 50);
	
	return g;
}

function updatePrestiges() {
	let ps = document.querySelectorAll('.p');
	for (let i = 0; i < ps.length; i++) {
		let p = ps[i]
		let id = p.id;
		let loc = id.replace('p', '');
		let rloc = JSON.parse(loc);
		if (p.innerHTML == '') {
			removeElem(id);
			removeElem(id.replace('p', 'auto'));
		} else if (typeof game.prestige[loc] == 'undefined') {
			removeElem(id);
			removeElem(id.replace('p', 'auto'));
		}
	}
	for (let i in game.prestige) {
		if (game.prestige[i].loc.length == 1) {
			let loc = JSON.stringify(game.prestige[i].loc);
			let rloc = oa(game.prestige[i].loc);
			if (document.getElementById('p' + loc) == null) {
				createLayer(rloc);
			}
			for (let j of game.prestige[i].dims) {
				let dim = j.id
				if (document.getElementById('g' + loc + dim) == null) {
					createGenerator(dim, rloc, game.prestige[i].dims.indexOf(j));
				}
				if (j.afford) {
					if (document.getElementById('b' + loc + dim)) {
						document.getElementById('b' + loc + dim).className = document.getElementById('b' + loc + dim).className.replace('red', 'green');
						document.getElementById('b2' + loc + dim).className = document.getElementById('b2' + loc + dim).className.replace('red', 'green');
					}
				} else { 
					if (document.getElementById('b' + loc + dim)) {
						document.getElementById('b' + loc + dim).className = document.getElementById('b' + loc + dim).className.replace('green', 'red');
						document.getElementById('b2' + loc + dim).className = document.getElementById('b2' + loc + dim).className.replace('green', 'red');
					}
				}
			}
			let p = document.getElementById('p' + loc);
			let gens = p.getElementsByClassName('g');
			for (let j = 0; j < gens.length; j++) {
				let n = gens[j];
				let id = n.id;
				let dim = id.replace('g', '').replace(loc, '');
				let del = true;
				for (let k of game.prestige[i].dims) {
					if (JSON.stringify(k.id) == dim) {
						del = false;
						break;
					}
				}
				if (del) {
					removeElem(id);
				}
			}
		}
	}
}

function clearAll() {
	let node = document.querySelector('#layerswrapper');
	while (node.hasChildNodes()) {
		node.removeChild(node.lastChild);
	}
	node = document.querySelector('#autodiv');
	while (node.hasChildNodes()) {
		node.removeChild(node.lastChild);
	}
}

function updateTree() {	
	if (game.pinf_unlocked && mtn == 5) {
		if (document.getElementById('backTree') == null) {
			let t = createElem('tree', 'backTree', 'button');
			t.style.margin = '5px';
		}
		if (document.getElementById('thr') == null) {
			let t = createElem('tree', 'thr', 'hr');
			t.style.margin = '5px';
			t.style.marginBottom = '15px';
		}
		let x = [...game.treeLoc];
		x.pop();
		document.getElementById('backTree').innerHTML = 'back to ' + getNode(x);
		document.getElementById('backTree').onmousedown = () => goToLoc(x);
		game.treeLoc.length == 0 ? hide('backTree') : setdisp('backTree', 'inline-block');
		game.treeLoc.length == 0 ? hide('thr') : setdisp('thr', 'block');
		
		let nd = document.querySelectorAll('.tn');
		for (let i = 0; i < nd.length; i++) {
			let lc = nd[i].id.replace('tn', '');
			if (game.treeAtLoc(JSON.parse(lc)) == undefined) removeElem(nd[i].id);
		}
		
		function updateSubtreeAt(loc) {
			let d;
			let b, b2;
			let h;
			if (game.treeAtLoc(loc)[0] instanceof Array) {
				if (document.getElementById('tn' + j(loc)) == null) {
					let x = [...loc];
					x.pop();
					d = createDiv(loc.length == 0 ? 'tree' : 'tn' + j(x), 'tn' + j(loc), 'tn');
					if (loc.length > 0) {
						if (document.getElementById('tnb' + j(loc))) removeElem('tnb' + j(loc));
						b = createElem('tn' + j(x), 'tnb' + j(loc), 'button', 'tnb');
						b.innerHTML = getNode(loc);
						b.onmousedown = () => {goToLoc(loc)};
					}
				} else if (loc.length > 0) {
					let x = [...loc];
					x.pop();
					d = document.getElementById('tn' + j(loc));
					b = document.getElementById('tnb' + j(loc));
					b.innerHTML = getNode(loc);
					b.onmousedown = () => {goToLoc(loc)};
					d.innerHTML = '';
				}
				for (let i = 0; i < game.treeAtLoc(loc).length; i++) {
					let x = [...loc];
					x.push(i);
					updateSubtreeAt(x);
				}
			} else {
				let temp = [...loc];
				temp.pop();
				let tndiv = document.getElementById('tn' + j(temp));
				
				if (j(game.treeLoc) == j(temp)) {
					let ly = game.prestige[j(standardiseArray(game.treeAtLoc(loc).map(JSON.parse)))]
					let r = createDiv(tndiv.id, 'lr' + JSON.stringify(temp), 'r');
					r.innerHTML = ly.str_loc == joa([0]) ? `You have ${f(ly.points)} antimatter<br>` : `You have ${f(ly.points)} ${getNode(temp)} points and ${f(ly.power)} ${getNode(temp)} power<br>`;
					
					let ma = createElem('lr' + JSON.stringify(temp), 'lma' + JSON.stringify(temp), 'button');
					ma.innerHTML = 'Max All [M]';
					ma.onmousedown = () => ly.maxAll();
					
					let d = createDiv(tndiv.id, 'ld' + j(temp), 'ld');
					for (let i of ly.dims) {
						let g = createDiv('ld' + j(temp), 'lg' + j(temp) + j(i.id), 'lg');
						g.style.margin = '10px';
						g.style.padding = '10px';
						if (ly.str_loc == joa([0])) {
							g.innerHTML = `Dimension ${f(i.dim.add(1))}<br>
											${f(i.amount)} x${f(i.mult)}<br>
											Cost: ${f(i.price)}<br>`;
						} else {
							g.innerHTML = `${getNode(temp).replace(/(^|[\s-])\S/g, function (match) {return match.toUpperCase()})} Dimension ${f(i.dim.add(1))}<br>
											${f(i.amount)} x${f(i.mult)}<br>
											Cost: ${f(i.price)}<br>`;
						}
						let b1 = createElem(g.id, 'lb1' + j(temp) + j(i.id), 'button', 'lb1');
						b1.innerHTML = 'Buy';
						b1.onmousedown = () => i.buy();
						let b2 = createElem(g.id, 'lb2' + j(temp) + j(i.id), 'button', 'lb2');
						b2.innerHTML = 'Buy Max';
						b2.onmousedown = () => i.buyMax();
					}
				} else {
					tndiv.innerHTML = '';
				}
			}
			// let okthen = [...loc];
			// okthen.pop();
			// let okboomer = getNodeLoc(loc);
			// let nou;
			// if (okboomer.length == 0) {
				// nou = new Array(game.depth + 1).fill(0);
				// nou[nou.length - 1] = 1;
				// console.log(nou);
			// } else {
				// okboomer[
				// console.log(getLayerName(okboomer));
			// }
		}
		updateSubtreeAt([]);
		
		let nodes = document.querySelectorAll('.tnb');
		for (let i = 0; i < nodes.length; i++) hide(nodes[i].id);
		
		let children = document.getElementById('tn' + j(game.treeLoc)).children;
		for (let i = 0; i < children.length; i++) setdisp(children[i].id.replace('tn', 'tnb'), 'inline-block');
	}
}