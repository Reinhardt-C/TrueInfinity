"use strict";

class VNClass {
	/**
	 * Set the type of this instance
	 * @param type - The type to set to
	 */
	setType(type) {
		Object.setPrototypeOf(this, type.prototype);
	}

	static MAX_TERMS = 200;

	static clone(input) {
		if (input instanceof VNClass) return input.clone();
		if (input instanceof Array) {
			let c = [];
			for (let i in input) {
				if (i == "clone") continue;
				c[i] = input[i] instanceof Object ? VNClass.clone(input[i]) : input[i];
			}
			return c;
		}
		if (input instanceof Object) {
			let c = {};
			for (let i in input) {
				if (i == "clone") continue;
				c[i] = input[i] instanceof Object ? VNClass.clone(input[i]) : input[i];
			}
			return c;
		}
	}

	clone() {
		let obj = new CloneTemplate();
		for (let i in this) {
			if (this[i] instanceof Object) obj[i] = VNClass.clone(this[i]);
			else obj[i] = this[i];
		}
		obj.setType(this.__proto__.constructor);
		if (!obj instanceof Atom) obj.standardize();
		return obj;
	}

	add(other) {
		return new Sum(this, other);
	}

	isEpsilon() {
		return this instanceof Phi && this.args.length >= 2;
	}

	isZeta() {
		return (
			this instanceof Phi &&
			(this.args.length >= 3 || (this.args.length == 2 && new Atom(2).cmp(this.args[0]) < 1))
		);
	}

	isEta() {
		return (
			this instanceof Phi &&
			(this.args.length >= 3 || (this.args.length == 2 && new Atom(3).cmp(this.args[0]) < 1))
		);
	}

	isGamma() {
		return this instanceof Phi && this.args.length >= 3;
	}

	static add(a, b) {
		if (!(a instanceof VNClass)) {
			if (typeof a == "number") a = new Atom(a);
			else a = new VebleNum(a);
		}
		if (!(b instanceof VNClass)) {
			if (typeof b == "number") b = new Atom(b);
			else b = new VebleNum(b);
		}
		return a.add(b);
	}
	static mul(a, b) {
		if (!(a instanceof VNClass)) {
			if (typeof a == "number") a = new Atom(a);
			else a = new VebleNum(a);
		}
		if (!(b instanceof VNClass)) {
			if (typeof b == "number") b = new Atom(b);
			else b = new VebleNum(b);
		}
		return a.mul(b);
	}
	static pow(a, b) {
		if (!(a instanceof VNClass)) {
			if (typeof a == "number") a = new Atom(a);
			else a = new VebleNum(a);
		}
		if (!(b instanceof VNClass)) {
			if (typeof b == "number") b = new Atom(b);
			else b = new VebleNum(b);
		}
		return a.pow(b);
	}

	static epsilon(n) {
		if (!(n instanceof VNClass)) {
			if (typeof n == "number") n = new Atom(n);
			else n = new VebleNum(n);
		}
		return new Phi(1, n);
	}
	static zeta(n) {
		if (!(n instanceof VNClass)) {
			if (typeof n == "number") n = new Atom(n);
			else n = new VebleNum(n);
		}
		return new Phi(2, n);
	}
	static eta(n) {
		if (!(n instanceof VNClass)) {
			if (typeof n == "number") n = new Atom(n);
			else n = new VebleNum(n);
		}
		return new Phi(3, n);
	}
	static Gamma(n) {
		if (!(n instanceof VNClass)) {
			if (typeof n == "number") n = new Atom(n);
			else n = new VebleNum(n);
		}
		return new Phi(1, 0, n);
	}
}

class CloneTemplate extends VNClass {}

class Atom extends VNClass {
	/**
	 * Class to handle storing independent numbers
	 * @param {Number} value - The value of the atom
	 */
	constructor(value) {
		super();
		this.value = value.value !== undefined ? value.value : value;
	}

	add(other) {
		if (typeof other == "number") return new Atom(this.value + other);
		if (other instanceof Atom) return new Atom(this.value + other.value);
		return other;
	}

	mul(other) {
		if (typeof other == "number") return new Atom(this.value * other);
		if (other instanceof Atom) return new Atom(this.value * other.value);
		if (this.value == 1) return other.clone();
		if (this.value == 0) return new Atom(0);
		return other.clone();
	}

	pow(other) {
		if (other instanceof Sum) {
			let p = new Atom(1);
			for (let i of other.addends) p = p.mul(this.pow(i));
			return p;
		}
		if (other instanceof Product) return this.pow(other.ord).pow(other.mult);
		if (other instanceof Phi && other.args.length == 1 && new Atom(1).cmp(other.args[0]) == -1) {
			if (new Phi(1).cmp(other.args[0]) < 1) return new Phi(other.clone());
			let o = other.clone();
			if (o.args[0] instanceof Atom) o.args[0] = o.args[0].value;
			o.args[0]--;
			return new Phi(o);
		}
		if (typeof other == "number") return new Atom(this.value ** other);
		if (other instanceof Atom) return new Atom(this.value ** other.value);
		if (this.value == 1) return new Atom(1);
		if (this.value == 0) return new Atom(0);
		return other.clone();
	}

	cmp(other) {
		if (typeof other == "number") return this.value > other ? 1 : this.value < other ? -1 : 0;
		if (other instanceof Atom)
			return this.value > other.value ? 1 : this.value < other.value ? -1 : 0;
		return -1;
	}

	toString() {
		return this.value.toString();
	}
	toMixed() {
		return this.value.toString();
	}
	toHTML() {
		return this.value.toString();
	}
}

class Sum extends VNClass {
	/**
	 * Class to handle sums of terms, terms are either Product or Phi
	 * @param {...Product|Phi}
	 */
	constructor() {
		super();
		this.addends = [...arguments];

		this.standardize();
	}

	standardize() {
		for (let i in this.addends) {
			if (this.addends[i] instanceof VNClass && !(this.addends[i] instanceof Atom))
				this.addends[i].standardize();
			// Flatten sums into the array
			if (this.addends[i] instanceof Sum) {
				this.addends[i] = this.addends[i].addends;
				this.addends = this.addends.flat();
			}
			// Turn Atoms into numbers
			if (this.addends[i] instanceof Atom) this.addends[i] = this.addends[i].value;
		}

		// Merge final numbers
		while (
			this.terms >= 2 &&
			typeof this.addends[this.terms - 1] == "number" &&
			typeof this.addends[this.terms - 2] == "number"
		)
			this.addends[this.terms - 2] += this.addends.pop();

		// Convert to an Atom when necessary
		if (this.addends.length == 1 && typeof this.addends[0] == "number") {
			this.value = this.addends[0];
			delete this.addends;
			this.setType(Atom);
		}

		// Remove redundant terms
		for (let i = 0; i < this.terms - 1; i++) {
			if (typeof this.addends[i] == "number") {
				this.addends.splice(i--, 1);
				continue;
			}
			if (this.addends[i].cmp(this.addends[i + 1]) == -1) {
				if (this.addends[i] instanceof Product) {
					if (this.addends[i + 1] instanceof Product) {
						if (this.addends[i].ord.cmp(this.addends[i + 1].ord) == 0) continue;
						this.addends.splice(i--, 1);
						continue;
					}
					if (this.addends[i].ord.cmp(this.addends[i + 1]) == 0) continue;
					this.addends.splice(i--, 1);
					continue;
				}
				if (this.addends[i + 1] instanceof Product) {
					if (this.addends[i].cmp(this.addends[i + 1].ord) == 0) continue;
					this.addends.splice(i--, 1);
					continue;
				}
				if (this.addends[i].cmp(this.addends[i + 1]) == 0) continue;
				this.addends.splice(i--, 1);
				continue;
			}
		}

		// Collect like terms
		for (let i = 0; i < this.terms - 1; i++) {
			// If they're equal just merge into a Product
			if (this.addends[i].cmp(this.addends[i + 1]) == 0) {
				this.addends[i + 1] = new Product(this.addends[i + 1], 2);
				this.addends.splice(i--, 1);
				continue;
			}
			// If the current one is a Product...
			if (this.addends[i] instanceof Product) {
				// ...and the next one is a Product...
				if (this.addends[i + 1] instanceof Product) {
					// ...if they're Products of the same ordinal then merge
					if (this.addends[i].ord.cmp(this.addends[i + 1].ord) == 0) {
						this.addends[i + 1] = new Product(
							this.addends[i + 1].ord,
							this.addends[i].mult + this.addends[i + 1].mult
						);
						this.addends.splice(i--, 1);
					}
					continue;
				}
				// ...and the next one is not but they are like terms then merge
				if (this.addends[i].ord.cmp(this.addends[i + 1]) == 0) {
					this.addends[i + 1] = new Product(this.addends[i + 1], this.addends[i].mult + 1);
					this.addends.splice(i--, 1);
				}
				continue;
			}
			// If the current one isn't a Product...
			if (this.addends[i + 1] instanceof Product) {
				// ...if they're like terms then merge
				if (this.addends[i].cmp(this.addends[i + 1].ord) == 0) {
					this.addends[i + 1] = new Product(this.addends[i + 1].ord, 1 + this.addends[i + 1].mult);
					this.addends.splice(i--, 1);
				}
			}
		}

		// Remove outer Sum to simplify single term
		if (this.terms == 1) {
			let e = this.addends[0];
			delete this.addends;
			for (let i in e) this[i] = e[i];
			this.setType(e.__proto__.constructor);
		}
	}

	cmp(other) {
		// Standard Sums are always greater than Atoms
		if (typeof other == "number" || other instanceof Atom) return 1;

		// If other > first term then -1, if other == first term then 1, or other < first term then 1
		if (other instanceof Product || other instanceof Phi)
			return this.addends[0].cmp(other) == -1 ? -1 : 1;

		// Compare with other terms
		for (let i = 0; i < Math.min(this.terms, other.terms); i++) {
			if (typeof this.addends[i] == "number") {
				if (typeof other.addends[i] == "number")
					return this.addends[i] > other.addends[i]
						? 1
						: this.addends[i] < other.addends[i]
						? -1
						: 0;
				return -1;
			}
			if (typeof other.addends[i] == "number") return 1;
			let c = this.addends[i].cmp(other.addends[i]);
			if (c !== 0) return c;
		}
		if (this.terms > other.terms) return 1;
		if (this.terms < other.terms) return -1;
		return 0;
	}

	mul(other) {
		if (other == 1 || other.value == 1) return this.clone();
		if (other == 0 || other.value == 0) return new Atom(0);
		if (typeof other == "number") other = new Atom(other);
		if (other instanceof Sum) return new Sum(...other.addends.map(e => this.mul(e)));
		if (!(other instanceof Atom)) return this.addends[0].mul(other);
		let t = this.addends[0];
		if (typeof t == "number") t = new Atom(t);
		return new Sum(t.mul(other), ...this.addends.slice(1));
	}

	pow(other) {
		if (other instanceof Sum) {
			let p = new Atom(1);
			for (let i of other.addends) p = p.mul(this.pow(i));
			return p;
		}
		if (other instanceof Product) return this.pow(other.ord).pow(other.mult);
		if (other == 1 || other.value == 1) return this.clone();
		if (other == 0 || other.value == 0) return new Atom(1);
		if (typeof other == "number") other = new Atom(other);
		if (other instanceof Atom) {
			if (other.value > VNClass.MAX_TERMS - 1) throw "Too many terms, reduce exponent";
			let t = this.clone();
			for (let i = 0; i < other.value - 1; i++) t = t.mul(this);
			return t;
		}
		let t = this.addends[0];
		if (typeof t == "number") t = new Atom(t);
		return t.pow(other);
	}

	// Count the number of terms
	get terms() {
		return this.addends.length;
	}

	toString() {
		return this.addends.join("+");
	}
	toMixed() {
		return this.addends
			.map(e => {
				if (typeof e == "number") e = new Atom(e);
				return e.toMixed();
			})
			.join("+");
	}
	toHTML() {
		return this.addends
			.map(e => {
				if (typeof e == "number") e = new Atom(e);
				return e.toHTML();
			})
			.join("+");
	}

	[Symbol.iterator]() {
		return this.addends[Symbol.iterator]();
	}
}

class Product extends VNClass {
	/**
	 * Class to handle products of an ordinal and a finite value
	 * @param {Phi} ord - Ordinal being multiplied
	 * @param {Number} mult - Finite multiplier
	 */
	constructor(ord, mult) {
		super();
		this.ord = ord;
		this.mult = mult;

		this.standardize();
	}

	standardize() {
		// Turn Atoms into numbers
		if (this.ord instanceof Atom) this.ord = this.ord.value;
		if (this.mult instanceof Atom) this.mult = this.mult.value;

		// Convert to a single Atom where possible
		if (typeof this.ord == "number") {
			this.value = this.ord * this.mult;
			delete this.ord;
			delete this.mult;
			this.setType(Atom);
		}

		// Simply x0 and x1
		if (this.mult == 0) {
			this.value = 0;
			delete this.ord;
			delete this.mult;
			this.setType(Atom);
		}
		if (this.mult == 1) {
			let o = this.ord;
			delete this.ord;
			delete this.mult;
			for (let i in o) this[i] = o[i];
			this.setType(o.__proto__.constructor);
		}

		// Simplify nested products
		if (this.ord instanceof Product) {
			this.mult = this.mult * this.ord.mult;
			this.ord = this.ord.ord;
		}
	}

	cmp(other) {
		// All standard products are greater than finite Atoms
		if (typeof other == "number" || other instanceof Atom) return 1;
		// Inverted comparison for Sum
		if (other instanceof Sum) return -other.cmp(this);
		// If other > ord then -1, if other == ord then 1, or other < ord then 1
		if (other instanceof Phi) return this.ord.cmp(other) == -1 ? -1 : 1;
		// Handle comparison with other Products
		let oc = this.ord.cmp(other.ord);
		if (oc !== 0) return oc;
		return this.mult > other.mult ? 1 : this.mult < other.mult ? -1 : 0;
	}

	mul(other) {
		if (other == 1 || other.value == 1) return this.clone();
		if (other == 0 || other.value == 0) return new Atom(0);
		if (other instanceof Atom) other = other.value;
		if (other instanceof Sum) return new Sum(...other.addends.map(e => this.mul(e)));
		if (typeof other == "number") return new Product(this.ord.mul(other), this.mult);
		return this.ord.mul(other);
	}

	pow(other) {
		if (other instanceof Sum) {
			let p = new Atom(1);
			for (let i of other.addends) p = p.mul(this.pow(i));
			return p;
		}
		if (other instanceof Product) return this.pow(other.ord).pow(other.mult);
		if (other == 1 || other.value == 1) return this.clone();
		if (other == 0 || other.value == 0) return new Atom(1);
		if (typeof other == "number") other = new Atom(other);
		if (other instanceof Atom) return new Product(this.ord.pow(other), this.mult);
		return this.ord.pow(other);
	}

	toString() {
		return Parser.handleParens(this.ord.toString()) + "*" + this.mult.toString();
	}
	toMixed() {
		return Parser.handleParens(this.ord.toMixed()) + "*" + this.mult.toString();
	}
	toHTML() {
		return Parser.handleParens(this.ord.toMixed(), false, this.ord.toHTML()) + this.mult.toString();
	}
}

class Phi extends VNClass {
	/**
	 * Class to handle sums of terms, terms are either Sum, Product or Phi
	 * @param {...Sum|Product|Phi}
	 */
	constructor() {
		super();
		this.args = [...arguments];

		this.standardize();
	}

	static noStandard() {
		let t = new Phi();
		t.args = [...arguments];
		t.standardize(true);
		return t;
	}

	standardize(ns = false) {
		// Convert Atoms to numbers
		for (let i in this.args) if (this.args[i] instanceof Atom) this.args[i] = this.args[i].value;

		if (!ns) {
			// Remove redundant 0s
			while (this.args[0] == 0 && this.args.length > 1) this.args.shift();

			// Convert phi(0) to 1
			if (this.args[0] == 0) {
				this.value = 1;
				delete this.args;
				this.setType(Atom);
			}

			// Deal with fixed points
			for (let i in this.args) {
				if (!(this.args[i] instanceof Phi)) continue;
				let a = [...this.args];
				a[i] = "_";
				if (this.args[i].isFixedPoint(a)) this.args = this.args[i].args;
			}

			for (let i in this.args)
				if (this.args[i] instanceof VNClass && !(this.args[i] instanceof Atom))
					this.args[i].standardize();
		}
	}

	cmp(other) {
		// Standard Phis are always greater than Atoms
		if (typeof other == "number" || other instanceof Atom) return 1;
		// Inverted comparisons for Sum and Product
		if (other instanceof Sum || other instanceof Product) return -other.cmp(this);
		/**
		 * the basic comparison algorithm alone is just
		 * φ(X) > φ(Y) iff the sum of args in X is greater than φ(Y)
		 * or
		 * (X is lexicographically greater than Y and φ(X) is greater than the sum of args in Y)
		 */
		let sumthis = new Sum(...this.args);
		let sumother = new Sum(...other.args);
		if (
			sumthis.cmp(other) == 1 ||
			((sumother instanceof Atom || sumother.cmp(this) == -1) && this.lexcmp(other) == 1)
		)
			return 1;
		if (
			sumother.cmp(this) == 1 ||
			((sumthis instanceof Atom || sumthis.cmp(other) == -1) && other.lexcmp(this) == 1)
		)
			return -1;
		return 0;
	}

	isFixedPoint(a) {
		// Args like [1,0,0,'_',0] for fixed point of a -> phi(1,0,0,a,0)
		let index = a.indexOf("_");
		for (let i = index + 1; i < a.length; i++) if (a[i] !== 0) return false;
		if (a.length > this.args.length) return false;
		if (this.args.length > a.length) return true;
		for (let i in a) {
			if (a[i] == "_") break;
			let cmp;
			if (this.args[i] instanceof VNClass) {
				cmp = this.args[i].cmp(a[i] instanceof VNClass ? a[i] : new Atom(a[i]));
			} else {
				if (a[i] instanceof VNClass) {
					cmp = -a[i].cmp(this.args[i] instanceof VNClass ? this.args[i] : new Atom(this.args[i]));
				} else cmp = this.args[i] > a[i] ? 1 : this.args[i] < a[i] ? -1 : 0;
			}
			if (cmp == -1) return false;
			if (cmp == 1) return true;
		}
		return false;
	}

	lexcmp(other) {
		// In lexicographical comparison, longer = bigger
		if (this.args.length > other.args.length) return 1;
		if (this.args.length < other.args.length) return -1;
		// Iterate to check term by term
		for (let i = 0; i < this.args.length; i++) {
			// Compare numbers
			if (typeof this.args[i] == "number") {
				if (typeof other.args[i] == "number") {
					if (this.args[i] == other.args[i]) continue;
					return this.args[i] > other.args[i] ? 1 : this.args[i] < other.args[i] ? -1 : 0;
				}
				return -1;
			}
			if (typeof other.args[i] == "number") return 1;
			// Compare infinite terms
			let c = this.args[i].cmp(other.args[i]);
			if (c !== 0) return c;
		}
		// Return 0 if they're equal
		return 0;
	}

	mul(other) {
		if (other == 1 || other.value == 1) return this.clone();
		if (other == 0 || other.value == 0) return new Atom(0);
		if (other instanceof Atom) other = other.value;
		if (typeof other == "number") return new Product(new Phi(...this.args), other);
		if (other instanceof Sum) return new Sum(...other.addends.map(e => this.mul(e)));
		if (other instanceof Product) return new Product(this.mul(other.ord), other.mult);
		let t = this.clone();
		if (this.args.length > 1) t = Phi.noStandard(this);
		if (other.args.length > 1) other = Phi.noStandard(other);
		if (typeof t.args[0] == "number") t.args[0] = new Atom(t.args[0]);
		if (typeof other.args[0] == "number") other.args[0] = new Atom(other.args[0]);
		return new Phi(t.args[0].add(other.args[0]));
	}

	pow(other) {
		if (other instanceof Sum) {
			let p = new Atom(1);
			for (let i of other.addends) p = p.mul(this.pow(i));
			return p;
		}
		if (other instanceof Product) return this.pow(other.ord).pow(other.mult);
		if (other == 1 || other.value == 1) return this.clone();
		if (other == 0 || other.value == 0) return new Atom(1);
		if (other instanceof Atom) other = other.value;
		let t = this.clone();
		if (this.args.length > 1) t = Phi.noStandard(this.clone());
		if (typeof t.args[0] == "number") t.args[0] = new Atom(t.args[0]);
		t.args[0] = t.args[0].mul(other);
		t.standardize();
		return t;
	}

	toString() {
		return "phi(" + this.args.join(",") + ")";
	}

	toMixed() {
		let t = this.clone();
		for (let i in t.args) if (typeof t.args[i] == "number") t.args[i] = new Atom(t.args[i]);
		if (t.args.length == 1) {
			if (t.args[0] == 1) return "w";
			let s = Parser.handleParens(t.args[0].toMixed());
			return `w^${s}`;
		}
		if (t.args.length == 2 && t.args[0] == 1) {
			let s = Parser.handleParens(t.args[1].toMixed(), true);
			return `e${s}`;
		}
		if (t.args.length == 2 && t.args[0] == 2) {
			let s = Parser.handleParens(t.args[1].toMixed(), true);
			return `z${s}`;
		}
		if (t.args.length == 2 && t.args[0] == 3) {
			let s = Parser.handleParens(t.args[1].toMixed(), true);
			return `n${s}`;
		}
		if (t.args.length == 3 && t.args[0] == 1 && t.args[1] == 0) {
			let s = Parser.handleParens(t.args[2].toMixed(), true);
			return `G${s}`;
		}
		return "phi(" + t.args.map(e => e?.toMixed()) + ")";
	}

	toHTML() {
		let t = this.clone();
		for (let i in t.args) if (typeof t.args[i] == "number") t.args[i] = new Atom(t.args[i]);
		if (t.args.length == 1) {
			if (t.args[0] == 1) return "&omega;";
			let s = t.args[0].toHTML();
			return `&omega;<sup>${s}</sup>`;
		}
		if (t.args.length == 2 && t.args[0] == 1) {
			let s = t.args[1].toHTML();
			return `&epsilon;<sub>${s}</sub>`;
		}
		if (t.args.length == 2 && t.args[0] == 2) {
			let s = t.args[1].toHTML();
			return `&zeta;<sub>${s}</sub>`;
		}
		if (t.args.length == 2 && t.args[0] == 3) {
			let s = t.args[1].toHTML();
			return `&eta;<sub>${s}</sub>`;
		}
		if (t.args.length == 3 && t.args[0] == 1 && t.args[1] == 0) {
			let s = t.args[2].toHTML();
			return `&Gamma;<sub>${s}</sub>`;
		}
		return "&phi;(" + t.args.map(e => e?.toHTML()) + ")";
	}

	[Symbol.iterator]() {
		return this.addends[Symbol.iterator]();
	}
}

class Parser {
	static Token = class {
		constructor(type, value, args = 0) {
			this.type = type;
			this.value = value;
			this.args = args;
		}
	};

	static TYPES = {
		LITERAL: 0,
		IDENTIFIER: 1,
		OPERATOR: 2,
	};

	static isNumber(char) {
		return /[0-9w]/.test(char);
	}

	static isOperator(char) {
		return /[+*^(),]/.test(char);
	}

	static tokenize(str) {
		str.replace(/([-/])/, function (match, c1) {
			throw 'Unknown char: "' + c1 + '"';
		});
		let tokens = [];
		let numbuff = [];
		let idbuff = [];
		for (let i = 0; i < str.length; i++) {
			let char = str[i];
			let type = Parser.isNumber(char) ? 0 : Parser.isOperator(char) ? 2 : 1;
			if (numbuff.length > 0 && type !== 0) {
				tokens.push(new Parser.Token(Parser.TYPES.LITERAL, numbuff.join("")));
				numbuff = [];
			}
			if (idbuff.length > 0 && type !== 1) {
				tokens.push(new Parser.Token(Parser.TYPES.IDENTIFIER, idbuff.join("")));
				idbuff = [];
			}
			if (type == 0) numbuff.push(char);
			else if (type == 1) idbuff.push(char);
			else tokens.push(new Parser.Token(Parser.TYPES.OPERATOR, char));
		}
		if (numbuff.length > 0) tokens.push(new Parser.Token(Parser.TYPES.LITERAL, numbuff.join("")));
		if (idbuff.length > 0) tokens.push(new Parser.Token(Parser.TYPES.IDENTIFIER, idbuff.join("")));
		return tokens;
	}

	static ASSOC = {
		"+": "left",
		"*": "left",
		"^": "right",
	};

	static PREC = {
		"+": 2,
		"*": 3,
		"^": 4,
	};

	static parse(tokens) {
		let output = [];
		let stack = [];
		let were_values = [];
		let arg_count = [];
		while (tokens.length > 0) {
			let token = tokens.shift();
			if (token.type == Parser.TYPES.LITERAL) {
				output.push(token);
				if (were_values.length > 0) {
					were_values.pop();
					were_values.push(true);
				}
			} else if (token.type == Parser.TYPES.IDENTIFIER) {
				stack.push(token);
				arg_count.push(0);
				if (were_values.length > 0) {
					were_values.pop();
					were_values.push(true);
				}
				were_values.push(false);
			} else if (token.value == ",") {
				let mismatched = true;
				while (stack.length > 0) {
					if (stack[stack.length - 1].value !== "(") output.push(stack.pop());
					else {
						mismatched = false;
						break;
					}
				}
				if (mismatched) throw "Mismatched parens";
				if (were_values.pop()) {
					arg_count[arg_count.length - 1]++;
					were_values.push(false);
				}
			} else if (token.value == "(") stack.push(token);
			else if (token.value == ")") {
				let mismatched = true;
				while (stack.length > 0) {
					if (stack[stack.length - 1].value !== "(") output.push(stack.pop());
					else {
						mismatched = false;
						break;
					}
				}
				if (mismatched) throw "Mismatched parens";
				stack.pop();
				if (stack.length > 0 && stack[stack.length - 1].type == Parser.TYPES.IDENTIFIER) {
					let f = stack.pop();
					let a = arg_count.pop();
					if (were_values.pop()) a++;
					f.args = a;
					output.push(f);
				}
			} else if (token.type == Parser.TYPES.OPERATOR) {
				while (
					stack.length > 0 &&
					stack[stack.length - 1].type == Parser.TYPES.OPERATOR &&
					((Parser.ASSOC[token.value] == "left" &&
						Parser.PREC[token.value] <= Parser.PREC[stack[stack.length - 1].value]) ||
						(Parser.ASSOC[token.value] == "right" &&
							Parser.PREC[token.value] < Parser.PREC[stack[stack.length - 1].value]))
				)
					output.push(stack.pop());
				stack.push(token);
			}
		}
		while (stack.length > 0) {
			let op = stack.pop();
			if (/[()]/.test(op.type)) throw "Mismatched parens";
			output.push(op);
		}
		return output;
	}

	static fixUnary(str) {
		while (/(e|z|n|G)((\w+\(.+\))|[^\+\*\^\(][^\+\*\^]*[^\+\*\^\)]?)/g.test(str))
			str = str.replace(
				/(e|z|n|G)((\w+\(.+\))|[^\+\*\^\(][^\+\*\^]*[^\+\*\^\)]?)/g,
				function (match, c1, c2) {
					return `${c1}(${c2})`;
				}
			);
		return str;
	}

	static fromString(str) {
		str = Parser.fixUnary(str);
		let tokens = Parser.tokenize(str);
		let rpn = Parser.parse(tokens);
		let args = [];
		while (rpn.length > 0) {
			let token = rpn.shift();
			if (token.type == Parser.TYPES.LITERAL) {
				if (token.value == "w") args.push(new Phi(1));
				else {
					let f = parseFloat(token.value);
					if (!isNaN(f)) args.push(new Atom(f));
					else throw "Unknown token:" + token.value;
				}
			} else if (token.type == Parser.TYPES.OPERATOR) {
				let a1 = args.pop();
				let a2 = args.pop();
				if (token.value == "+") args.push(a2.add(a1));
				else if (token.value == "*") args.push(a2.mul(a1));
				else if (token.value == "^") args.push(a2.pow(a1));
			} else if (token.type == Parser.TYPES.IDENTIFIER) {
				let a = [];
				for (let i = 0; i < token.args; i++) a.push(args.pop());
				if (token.value == "e") args.push(new Phi(1, a[0]));
				else if (token.value == "z") args.push(new Phi(2, a[0]));
				else if (token.value == "n") args.push(new Phi(3, a[0]));
				else if (token.value == "G") args.push(new Phi(1, 0, a[0]));
				else if (token.value == "phi" || token.value == "p") args.push(new Phi(...a.reverse()));
			}
		}
		return args[0];
	}

	static handleParens(str, sub = false, replace = false) {
		if (Parser.needsParens(str, sub)) return `(${replace !== false ? replace : str})`;
		return replace !== false ? replace : str;
	}

	static needsParens(str, sub = false) {
		let t = Parser.parse(Parser.tokenize(Parser.fixUnary(str)))
			.map(e => e.value)
			.join("");
		if (t.endsWith("+") || t.endsWith("*") || (sub && t.endsWith("^"))) return true;
		return false;
	}
}

class VebleNum extends VNClass {
	constructor(input) {
		super();
		if (typeof input == "number") return new Atom(input);
		if (input instanceof VNClass) return input.clone();
		let v = Parser.fromString(input.replace(/\s/g, ""));
		for (let i in v) this[i] = v[i];
		this.setType(v.__proto__.constructor);
	}

	static zero = new Atom(0);
	static one = new Atom(1);
	static w = new Phi(1);
	static omega = new Phi(1);
	static Least_Transfinite_Ordinal = new Phi(1);
	static e0 = new Phi(1, 0);
	static epsilon0 = new Phi(1, 0);
	static Small_Cantor_Ordinal = new Phi(1, 0);
	static z0 = new Phi(2, 0);
	static zeta0 = new Phi(2, 0);
	static Cantor_Ordinal = new Phi(2, 0);
	static n0 = new Phi(3, 0);
	static eta0 = new Phi(3, 0);
	static G0 = new Phi(1, 0, 0);
	static Gamma0 = new Phi(1, 0, 0);
	static Feferman_Schutte_Ordinal = new Phi(1, 0, 0);
	static Ackermann = new Phi(1, 0, 0, 0);
}

const Ordinal = VebleNum;
const O = function () {
	return new Ordinal(...arguments);
};
