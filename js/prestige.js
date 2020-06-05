class Game {
	constructor(data) {
		this.lastUpdate = data ? data.lastUpdate || new Date().getTime() : new Date().getTime();
		this.sbe = false;
		this.tab = 0;

		this.prestige = {};
		this.upgradesBought = [];
		for (let i in config.upgrades) this.upgradesBought[i] = D(0);

		this.unfunitypoints = D(0);

		this.unfunityUpgBought = [];
		for (let i in config.unfunityUpgrades) this.unfunityUpgBought[i] = D(0);
		this.unfunityUpgrades = {};

		this.onlineUnfun = D(1);
		this.offlineUnfun = D(1);
		this.ufph = D(1);

		this.upgrades = {};

		this.notation = data ? data.notation || "sci" : "sci";

		if (data && data.prestige)
			for (let i in data.prestige) {
				this.prestige[i] = l(data.prestige[i]);
			}

		this.names = ["", "infinity", "eternity", "reality", "equality", "affinity", "celerity", "identity", "vitality", "immunity", "atrocity", "immensity", "severity", "fatality", "insanity", "calamity", "futility", "finality", "unity"];
		this.layersdone = [];

		// Extensionality, Regularity, Specification, Pairing, Union, Replacement, Infinity, Power Set, Choice
		// this.axioms = [true, false, true, false, true, false, false, false, false];
		this.axioms = new Array(9).fill(false);
	}

	maxAllLayers() {
		for (let layer in this.prestige) {
			this.prestige[layer].maxAll();
		}
	}
}

class Layer {
	constructor(loc, points, power, dims, tslp) {
		this.loc = ea(loc || [0]); // Location of the parent layer
		this.str_loc = j(this.loc);

		this.points = D(points || (this.str_loc == jea([0]) ? 1 : 0));
		this.power = D(power || 0);

		if (dims) {
			this.dims = [];
			for (let i = 0; i < dims.length; i++) {
				let dim = dims[i];
				this.dims.push(new Dimension(this.loc, dim.length < 3 ? i : dim[2], dim[0], dim[1]));
			}
		} else this.dims = [new Dimension(this.loc, 0)];

		this.state = game.upgradesBought.dimColl.gte(1);

		this.id = getFreeId();

		this.tslp = tslp || 0;

		this.timeout = 0;

		this.domCreate();
	}

	clear() {
		document.getElementById("g" + this.id).innerHTML = "";
		this.dims = [new Dimension(this.loc, 0)];
		this.dims[0].domCreate(this.id);
		this.points = D(this.str_loc == jea([0]) ? 1 : 0);
		this.power = D(0);
	}

	get canPrestige() {
		return this.points.gte("1.79e308");
	}

	get prestigeGain() {
		return prestigeGain(this.points);
	}

	prestige() {
		let a = [this.loc[0].add(1)];
		let gain = this.prestigeGain;
		for (let i in game.prestige) if (this.cmp(game.prestige[i]) > -1) game.prestige[i].clear();
		this.clear();
		if (game.prestige[j(a)]) {
			game.prestige[j(a)].points = game.prestige[j(a)].points.add(gain);
		} else {
			game.prestige[j(a)] = new Layer(a, gain);
		}
	}

	cmp(other) {
		if (this.loc.length > other.loc.length) return 1;
		if (this.loc.length < other.loc.length) return -1;
		if (this.loc[0] > other.loc[0]) return 1;
		if (this.loc[0] < other.loc[0]) return -1;
		//remember to do this when not lazy
		return 0;
	}

	update(diff) {
		if (this.timeout > 0) this.timeout--;
		if (!game.layersdone.includes(this.str_loc)) game.layersdone.push(this.str_loc);
		this.tslp += diff;
		this.state = game.upgradesBought.dimColl.gte(1) && this.dims[this.dims.length - 1].dim.gt(9);
		let sec = diff / 1000;
		this.domUpdate();

		while (this.state && this.dims.length > 4) {
			document.getElementById("g" + this.id).removeChild(document.getElementById("d" + this.dims[1].id));
			this.dims.splice(1, 1);
		}

		let dim;
		for (let i = 0; i < this.dims.length; i++) {
			dim = this.dims[i];
			if (dim) {
				if (dim.dim.eq(0)) (this.str_loc == jea([0]) ? this.points : this.power).addBy(dim.perSec.times(sec));
				else if (!this.state) this.dims[i - 1].amount.addBy(dim.perSec.times(sec));
				dim.update();
			}
		}
		if (this.state) {
			this.dims[0].amount.addBy(secretFormula(this.dims[1].amount, this.dims[1].dim, this.dims[1].mult));
			this.dims[1].amount.addBy(this.dims[2].perSec.times(sec));
		}
		if (this.dims[this.dims.length - 1] && this.dims[this.dims.length - 1].amount.gte(1)) {
			this.dims.push(new Dimension(this.loc, this.dims[this.dims.length - 1].dim.add(1)));
			this.dims[this.dims.length - 1].domCreate(this.id);
		}
		if (!this.points.isFinite || !this.power.isFinite) throw new fuckedNumError();
	}

	domCreate() {
		let lBox = newElem("div");
		lBox.id = "l" + this.id;
		lBox.className = "l";

		let rBox = newElem("div");
		rBox.id = "r" + this.id;
		rBox.className = "r";
		let rText = newElem("div");
		rText.id = "rt" + this.id;
		rText.className = "rt";
		rBox.appendChild(rText);
		lBox.appendChild(rBox);

		let mButton = newElem("button");
		mButton.id = "ma" + this.id;
		mButton.className = "ma sbb green";
		mButton.innerText = "Max All (M)";
		mButton.addEventListener("click", () => {
			this.maxAll();
		});
		rBox.appendChild(mButton);

		let pButton = newElem("button");
		pButton.id = "pa" + this.id;
		pButton.className = "pa sbb blue";
		pButton.innerText = "Prestige";
		pButton.addEventListener("click", () => {
			this.prestige();
		});
		rBox.appendChild(pButton);

		let gBox = newElem("div");
		gBox.id = "g" + this.id;
		gBox.className = "g";
		lBox.appendChild(gBox);

		document.getElementById("layers").appendChild(lBox);

		for (let i of this.dims) i.domCreate(this.id);
	}

	domUpdate() {
		document.getElementById("pa" + this.id).style.display = this.canPrestige ? "inline-block" : "none";
		document.getElementById("pa" + this.id).innerText = `${this.next_name.substring(0, 1).toUpperCase() + this.next_name.substring(1)} for ${f(this.prestigeGain)} points`;
		if (this.str_loc != jea([0])) {
			document.getElementById("rt" + this.id).innerText = `
        You have ${f(this.points)} ${this.name} points and ${f(this.power)} ${this.name} power.
      `;
		} else {
			document.getElementById("rt" + this.id).innerText = `
        You have ${f(this.points)} antimatter.
      `;
		}
	}

	get name() {
		if (this.loc[0].lt(game.names.length)) return game.names[this.loc[0].toNumber()];
	}

	get next_name() {
		if (this.loc[0].add(1).lt(game.names.length)) return game.names[this.loc[0].add(1).toNumber()];
	}

	objectify() {
		return {
			loc: this.loc.map(x => x.toString()),
			points: this.points.toString(),
			power: this.power.toString(),
			dims: this.dims.map(x => x.array),
			tslp: this.tslp,
		};
	}

	maxAll() {
		if (this.timeout > 0) return;
		this.dims[0].buyMax();
		for (let i = this.dims.length - 1; i > 0; i--) this.dims[i].buyMax();
		this.timeout = 4;
	}
}

class Dimension extends hasCache {
	constructor(loc, dim, amount, bought) {
		super();
		this.dim = D(dim || 0);
		this.loc = ea(loc || [0]);
		this.str_loc = j(this.loc);

		this.amount = D(amount || 0);
		this.bought = D(bought || 0);

		this.id = getFreeId();

		this.baseCost = D.pow(10, D.pow(2, ExpantaNum.max(0, this.dim.sub(this.loc[0]))).sub(1));
		this.costScaleIncrease = D.pow(1.15, this.dim.plus(1));
	}

	update() {
		document.getElementById(`text${this.id}`).innerHTML = this.displayText;
		if (this.afford) {
			document.getElementById("b1" + this.id).className = document.getElementById("b1" + this.id).className.replace("red", "green");
			document.getElementById("b2" + this.id).className = document.getElementById("b1" + this.id).className.replace("red", "green");
		} else {
			document.getElementById("b1" + this.id).className = document.getElementById("b1" + this.id).className.replace("green", "red");
			document.getElementById("b2" + this.id).className = document.getElementById("b1" + this.id).className.replace("green", "red");
		}
	}

	get parentLayer() {
		return game.prestige[this.str_loc];
	}

	domCreate(id) {
		let dBox = newElem("div");
		dBox.id = "d" + this.id;
		dBox.className = "d";

		let t = newElem("div");
		t.id = "text" + this.id;
		t.innerHTML = this.displayText;
		dBox.appendChild(t);

		let b1 = newElem("button");
		b1.id = "b1" + this.id;
		b1.className = "sbb half height green";
		b1.innerText = "Buy";
		dBox.appendChild(b1);

		let b2 = newElem("button");
		b2.id = "b2" + this.id;
		b2.className = "sbb half height green";
		b2.innerText = "Buy Max";
		dBox.appendChild(b2);

		document.getElementById("g" + id).appendChild(dBox);

		document.getElementById("b1" + this.id).addEventListener("click", () => this.buy());
		document.getElementById("b2" + this.id).addEventListener("click", () => this.buyMax());
	}

	buy() {
		if (this.afford) {
			if (this.points.toNumber() < D.MAX_SAFE_INTEGER) this.points.subBy(this.cost);
			if (this.amount.toNumber() < D.MAX_SAFE_INTEGER) this.amount.addBy(1);
			this.bought.addBy(1);
			this.doCache.cost = false;
			this.doCache.multText = false;
			this.doCache.mult = false;
			this.doCache.initCostScale = false;
		}
	}

	buyMax() {
		if (!this.afford) return;
		// let p = this.points.logBase(2).mul(2).sqrt().floor();
		let p = this.points.logBase(2).sqrt().div(2).ceil();
		if (p.gt(1)) {
			// this.points.subBy(D.pow(2, p.pow(2).div(2)));
			if (this.amount.toNumber() < D.MAX_SAFE_INTEGER) this.amount.addBy(p);
			this.bought.addBy(p.add(2));
			return;
		}
		this.buy();
		return;
		/*
    if (this.maxBuy.gt(0)) {
      let spent = this.maxCost
      this.amount.addBy(this.maxBuy)
      this.bought.addBy(this.maxBuy)
      this.points.minusBy(spent);
      this.doCache.cost = false
      this.doCache.multText = false
      this.doCache.mult = false
      this.doCache.costScale = false
      return true
    }
    return false
    */
	}
	freshCache(name) {
		return !(name in Object.keys(this.cache)) || !this.doCache[name];
	}

	get slowdown() {
		return this.callCache("slowdown", function () {
			let powBase = D.max(D(2), this.dim.minus(1));
			let ret = D.pow(powBase, this.dim.plus(1));
			ret = ret.times(D(1).sub(game.upgradesBought["dimStab"].times(0.09)));
			return ret;
		});
	}

	applySlowdown(val) {
		if (this.slowdown.lt(0)) return val.times(this.slowdown.abs());
		else if (this.slowdown.gt(0)) return val.div(this.slowdown.abs());
		return val;
	}

	get maxBuy() {
		// This is not implemented!
		return D(0);
	}

	get maxCost() {
		let sum = D(0);
		let costTemp = D(this.cost.toString());
		for (let i = 0; i < this.maxBuy; i++) {
			sum.addBy(costTemp);
			costTemp.timesBy(D.pow(this.costScaleIncrease, i + 1));
			costTemp.timesBy(this.initCostScale);
		}
		return sum;
	}

	get points() {
		return game.prestige[this.str_loc].points;
	}

	get perSec() {
		return this.applySlowdown(this.amount.times(this.mult));
	}

	get multPerBought() {
		return this.callCache("multPerBought", function () {
			return D.pow(D(2).plus(D.log(game.upgradesBought["dimComp"].plus(1), 1.5).div(2)), D.log(game.upgradesBought["dimComp"].plus(1), 3).div(2).plus(1));
		});
	}

	get mult() {
		return this.callCache("mult", function () {
			let ret = D.pow(this.multPerBought, this.bought)
				.mul(
					D(1.015)
						.pow((game.unfunityUpgBought.superUnfun ? game.unfunityUpgBought.superUnfun : D(0)).add(1))
						.pow(game.unfunitypoints)
				)
				.iteratedlog(10, this.loc[0]);
			if (ret.eq(0) || ret.isNaN()) ret = D(1);
			let a = [this.loc[0].add(1)];
			let p = game.prestige[j(a)] !== undefined;
			return p
				? ret
						.mul(ExpandtaNum.max(1, game.prestige[j(a)].power))
						.mul(ExpandtaNum.max(1, game.prestige[j(a)].points))
						.pow(4.1)
				: ret;
		});
	}

	get cost() {
		return this.callCache("cost", function () {
			let ret = this.baseCost.times(D.pow(this.initCostScale, this.bought)); // Basic cost
			if (this.bought.gt(0)) ret.timesBy(D.pow(this.costScaleIncrease, D.mul(this.bought, this.bought.toNumber() + 1).div(2)));
			// if (this.bought.gt(0)) ret.timesBy(D.pow(this.costScaleIncrease, D.sumArithmeticSeries(this.bought, D(1), D(1), D(0))));
			return ret;
		});
	}

	get afford() {
		return game.prestige[this.str_loc].points.gte(this.cost);
	}

	get costScale() {
		return this.callCache("costScale", function () {
			let ret = this.initCostScale;
			ret.timesBy(D.pow(this.costScaleIncrease, this.bought)); // costScaleIncrease
			return ret;
		});
	}

	get initCostScale() {
		return this.callCache("initCostScale", function () {
			let ret = D.pow(10, this.dim.plus(1).mul(D.log(game.upgradesBought["dimComp"].plus(1), 2).div(2).plus(1))); // dimComp
			return ret;
		});
	}

	get multText() {
		return this.callCache("mulText", function () {
			let temp = this.applySlowdown(this.mult);
			return temp.gte(1) ? `&times;${f(temp)}` : `&divide;${f(this.slowdown.div(this.mult))}`;
		});
	}

	get displayText() {
		return `Dimension ${f(this.dim.add(1))}<br>
      ${f(this.amount)} ${this.multText}<br>
      Cost: ${f(this.cost)}<br>`;
	}

	get array() {
		return [this.amount.toString(), this.bought.toString(), this.dim.toString()];
	}
}

// Empty line inserted to make mobile coding easier
