class Game {
	constructor(data) {
		this.prestige = {};
		
		if (data) {
			if (data.prestige) {
				for (let i in data.prestige) {
					this.prestige[i] = l(data.prestige[i]);
				}
			}
		}
			
		this.starttime = data ? (new Date(data.starttime) || new Date()) : new Date();
		this.currentframe = 0;
		this.asintv = data ? (JSON.parse(data.asintv) || 10) : 10;
		this.as = JSON.parse(data ? (JSON.stringify(data.as) || true) : true);
		
		this.notation = data ? (data.notation || 'sci') : 'sci';
		
		this.max_layer = data ? (oa(data.max_layer || [0])) : oa([0]);	
		this.um = data ? (oa(data.um || [0])) : oa([0]);	
		this.state = 0;
		
		this.automaxall = data ? (data.automaxall.map(e => oa(e)) || []) : [];
		this.autoprestige = data ? (data.autoprestige.map(e => oa(e)) || []) : [];
		this.autoauto = data ? (data.autoauto || false) : false;
		
		this.AA_PRICE = 'eee4';
		this.bulk_level = data ? (data.bulk_level || 0) : 0;
		this.BULK_PRICES = ['ee111111', 'ee850000', 'eee9', 'eee15', 'eee50', '10^^100001', 'Infinity'];
		this.bulk_cooldown = 0;
		this.bulk_enabled = data ? (data.bulk_enabled == false ? false : true) : true;
		
		this.news = data ? (data.news === undefined ? true : data.news) : true;
		this.usePrestigeName = data ? (data.usePrestigeName === undefined ? true : data.usePrestigeName) : true;
		
		this.theme = data ? (data.theme || 'css/default.css') : 'css/default.css';
		
		this.achievements = data ? (data.achievements || new Array(achievements.length).fill(false)) : new Array(achievements.length).fill(false);
	
		this.keys = [];
		
		this.treeLoc = [];
	}
	
	update() {
		this.currentframe++;
		if (cmpLayer(this.um, this.max_layer) < 0) {
			this.um = oa(this.max_layer);
		}
		for (let i in this.prestige) {
			this.prestige[i].update();
			if (!this.prestige[i].initiated) {
				this.prestige[i].init();
			}
		}
		if (cmpLayer(this.max_layer, oa([7])) >= 0) {
			let obj = [];
			for (let i in this.prestige) {
				if (this.prestige[i].loc.length == 1) {
					obj.push(this.prestige[i]);
				}
			}
			if (obj.length >= 2) {
				for (let i in obj) {
					let j = obj[i];
					if (j.str_loc != joa([0]) && cmpLayer(this.max_layer, j.loc) == 1) {
						delete this.prestige[j.str_loc];
					}
				}
			}
			this.state = 1;
		} else {
			this.state = 0;
		}
		for (let i of this.automaxall) {
			let str_loc = JSON.stringify(i);
			if (!game.prestige[str_loc]) {
				this.automaxall.splice(this.automaxall.indexOf(i), 1);
			}
		}
		for (let i of this.autoprestige) {
			let str_loc = JSON.stringify(i);
			if (!game.prestige[str_loc]) {
				this.autoprestige.splice(this.autoprestige.indexOf(i), 1);
			}
		}
	}
	
	treeAtLoc(loc) {
		let x = this.tree;
		for (let i of loc) {
			x = x[i];
		}
		return x;
	}
	
	get disp_time() {
		let time = new Date() - this.starttime;
		if (time < 60000) {
			return (Math.floor(time / 1000)).toString() + ' seconds';
		} else if (time < 3600000) {
			return (Math.floor(time / 60000)).toString() + ' minutes';
		} else if (time < 86400000) {
			return (Math.floor(time / 3600000)).toString() + ' hours';
		} else if (time < 604800000) {
			return (Math.floor(time / 86400000)).toString() + ' days';
		} else if (time < 2592000000) {
			return (Math.floor(time / 604800000)).toString() + ' weeks';
		} else if (time < 31536000000) {
			return (Math.floor(time / 2592000000)).toString() + ' months';
		} else {
			return (Math.floor(time / 31536000000)).toString() + ' years';
		}
	}
	
	get depth() {
		return this.um.length;
	}
	
	get list() {
		let layArray = [];
		for (let i in this.prestige) {
			layArray.push(game.prestige[i].loc);
		}
		return layArray;
	}
	
	get tree() {
		return order(this.list);
	}
	
	get celerity_unlocked() {
		return cmpLayer(this.um, [6]) >= 0;
	}
	
	get pinf_unlocked() {
		return cmpLayer(this.um, [1.79e308]) >= 0;
	}
}

class Layer {
	constructor(loc, points, power, dims, tslp, auto) {
		this.loc = oa(loc || [0]);
		this.str_loc = JSON.stringify(this.loc);
		
		this.points = n(points || 0);
		this.max_points = new OmegaNum(this.points);
		this.power = n(power || 0);
		
		this.dims = dims ? dims.map(x => d(x)) : [new Dimension(0, loc)];
		
		this.tslp = tslp || 0;
		this.initiated = false;
		this.mult = n(1);
		
		this.maxAllCooldown = 0;
		
		this.is_auto_max = auto ? (auto[0] || false) : false;
		this.is_auto_prestige = auto ? (auto[1] || false) : false;
	}
	
	init() {
		this.initiated = true;
		if (this.loc.length == 1) createLayer(this.loc);
	}
	
	get next_loc() {
		let next_loc = oa(this.loc);
		next_loc[0] = next_loc[0].add(1)
		return next_loc;
	}
	
	incPoints(n) {
		this.points = OmegaNum.add(n, this.points);
	}
	
	incPower(n) {
		this.power = OmegaNum.add(n, this.power);
	}
	
	subPoints(n) {
		if (this.points.eq(n) && n.gte(Math.pow(2, 63) - 1)) return
		this.points = OmegaNum.sub(this.points, n);
	}
	
	update() {
		if (this.points.gt(this.max_points)) this.max_points = new OmegaNum(this.points);
		if (this.str_loc != j(this.loc)) {
			this.loc = oa(JSON.parse(this.str_loc));
		}
		
		this.mult = getMult(this.loc);
		
		if (this.points.lt(0)) this.points = n(0);
		
		this.generate();
		
		this.maxAllCooldown > 0 ? this.maxAllCooldown-- : null;
		
		if (this.dims[this.dims.length - 1].amount.gt(0)) {
			this.dims.push(new Dimension(this.dims[this.dims.length - 1].dim.add(1), this.loc));
		}
		
		while (this.dims[this.dims.length - 1].dim.gte(10) && this.dims.length > 3) {
			if (document.getElementById('g' + this.str_loc + this.dims[1].id) != null) {
				removeElem('g' + this.str_loc + this.dims[1].id);
			}
			this.dims.splice(1, 1);
		}
		
		for (let i = 0; i < this.dims.length; i++) {
			if (document.getElementById('b' + this.str_loc + JSON.stringify(this.dims[i].id))) {
				document.getElementById('b' + this.str_loc + JSON.stringify(this.dims[i].id)).onclick = () => game.prestige[this.str_loc].dims[i].buy();
				document.getElementById('b2' + this.str_loc + JSON.stringify(this.dims[i].id)).onclick = () => game.prestige[this.str_loc].dims[i].buyMax();
			}
		}
		
		this.tslp++;
	}
	
	generate() {
		if (this.dims[this.dims.length - 1].dim.gte(10)) {
			this.dims[0].amount = this.dims[0].amount.add(secretFormula(this.tslp, this.dims[1].dim, this.dims[1].amount, this.dims[1].mult));
			let p = this.dims[0].mult.mul(this.dims[0].amount).div(28);
			this.str_loc == joa([0]) ? this.incPoints(p) : this.incPower(p);
		} else {
			for (let d of this.dims) {
				let p;
				if (game.state == 0 || this.dims[this.dims.length - 1].dim.lt(10)) {
					p = d.mult.mul(d.amount).div(28);
				} else {
					p = d.mult;
				}
				let dm = d.dim;
				if (dm.eq(0)) {
					this.str_loc == joa([0]) ? this.incPoints(p) : this.incPower(p);
				} else {
					this.dims[d.index - 1].amount = OmegaNum.add(p, this.dims[d.index - 1].amount);
				}
			}
		}
	}
	
	maxAll() {
		if (this.maxAllCooldown == 0) {
			if (this.dims.length >= 3 && this.dims[this.dims.length - 1].dim.gte(10)) {
				let x = this.dims[2].dim;
				if (this.points.log10().lt(n(10).pow(x))&&n("ee10").gt(this.points.log10())) {
				let vals = [n(10).pow(x),x.pow(10), x.pow(2), x.pow(1.5), x.pow(1.1), x.mul(1.1), x.add(1000), x.add(100), x.add(10), x.add(1)]
				for (let i = 0; i <= vals.length; i++) {
					if (i == vals.length) {
						var rd = this.dims.slice(0).reverse();
						for (let d of rd) {
							d.buy();
							d.buyMax();
						}
					} else if (this.dims[1].dim.gt(15) && new Dimension(vals[i], this.loc, 0, 0).afford) {
						this.dims.push(new Dimension(vals[i], this.loc, 1, 1));
						i = vals.length;
					}
				}
				}
					this.dims.push(new Dimension(this.points.log10(), this.loc, 1, 1));
				} else {
				var rd = this.dims.slice(0).reverse();
				for (let d of rd) {
					d.buy();
					d.buyMax();
				}
			}
			this.maxAllCooldown = 3;
		}
	}
	
	clear() {
		if (this.str_loc == joa([0])) {
			this.points = n(10);
		} else {
			this.points = n(0);
		}
		this.power = n(0);
		this.tslp = 0;
		this.dims = [new Dimension(0, this.loc)];
	}
}

class Dimension {
	constructor(dim, loc, amount, bought) {
		this.dim = n(dim || 0).floor();
		
		this.loc = oa(loc || [0]);
		this.str_loc = joa(loc || [0]);
		
		this.amount = n(amount || 0).floor();
		this.bought = n(bought || 0).floor();
		
		this.price_start = OmegaNum.pow(10, this.dim.add(1));
		
		this.id = Math.floor(Math.random() * 10000000000);
	}
	
	get mult() {
		if (game.prestige[this.str_loc]) {
			return OmegaNum.pow(2, this.bought).mul(game.prestige[this.str_loc].mult);
		} else {
			return n(1);
		}
	}
	
	get index() {
		return game.prestige[this.str_loc].dims.indexOf(this);
	}
	
	get price() {
		if (game.state == 0) {
			return OmegaNum.pow(this.dim.floor().lt(25) ? 10 : this.dim.mul(0.9).floor(), this.dim.add(1).mul(this.bought.add(1)));
		} else {
			return OmegaNum.pow(10, this.dim.add(1).mul(this.bought.add(1)));
		}
	}
	
	get afford() {
		return game.prestige[this.str_loc].points.gte(this.price);
	}
	
	get next_str_loc() {
		let x = oa(JSON.parse(this.str_loc)[0]);
		x[0] = x[0].add(1);
		return JSON.stringify(x);
	}
	
	buy() {
		if (this.afford) {
			let pc = this.price;
			this.amount = this.amount.add(1);
			this.bought = this.bought.add(1);
			
			game.prestige[this.str_loc].subPoints(pc);
			
			return true;
		} else {
			return false;
		}
	}
	
	get max_afford() {
		if (this.dim.gt(100)) {
			return new OmegaNum(this.afford ? 1 : 0);
		}
		if (game.prestige[this.str_loc].points.isint() && this.price_start.isint() &&  this.bought.isint()){
			return OmegaNum.affordGeometricSeries(game.prestige[this.str_loc].points.floor(), this.price_start.floor(), OmegaNum.pow(this.dim.lt(25) ? 10 : this.dim.mul(0.9).floor(), this.dim.add(1)).floor(), this.bought.floor());
		}
		return n(0);
	}
	
	get max_price() {
		return OmegaNum.sumGeometricSeries(this.max_afford, this.price_start, OmegaNum.pow(this.dim.lt(25) ? 10 : this.dim.mul(0.9).floor(), this.dim.add(1)), this.bought);
	}
	
	buyMax() {
		if (this.afford) {
			let ma = this.max_afford || n(0);
			let mp = this.max_price || n(0);
			
				this.amount = this.amount.add(ma);
				this.bought = this.bought.add(ma);
				
				game.prestige[this.str_loc].subPoints(mp);
				
				return true;
		}
		return false;
	}
}
