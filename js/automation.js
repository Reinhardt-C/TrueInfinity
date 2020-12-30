class Automator {
	constructor(name, id, priority, func, purchased, price, params = {}, vreq = () => true) {
		this.name = name;
		this.id = id;
		this.priority = priority;
		this.func = func;
		this.purchased = purchased;
		this.price = price;
		this.params = params;
		this.on = false;
		this.vreq = vreq;
	}

	unbuy() {
		this.purchased = false;
		this.on = false;
	}

	get rawparams() {
		let rp = { ...this.params };
		for (let p in rp) rp[p] = rp[p].toString();
		return rp;
	}

	domCreate() {
		let aut = $$("div");
		aut.className = "autthing";
		aut.id = "aut" + this.id;
		aut.innerHTML = `
            <strong>${this.name}</strong><br>
			Priority: <input id="autp${this.id}" class="sbi aqua" value="${this.priority}"></input><br><br>
			<button id='autb${this.id}' class="sbb red" onclick="game.automators[${
			this.id
		}].buy()">Unlock for ${f(this.price)} ${game.ucname(
			Math.floor(this.id / 3) + 1
		)} Points</button><br><br>
			<div id="autparams${this.id}"></div>
		`;
		$("row" + Math.floor(this.id / 3)).appendChild(aut);
		for (let i in this.params)
			$(`autparams${this.id}`).innerHTML += `${i}: <input id="aut${this.pid(
				i
			)}" class="sbi aqua" value="${f(this.params[i])}" />`;
	}

	pid(str) {
		return str.toLowerCase().replace(/\s/g, "");
	}

	buy() {
		if (
			!this.purchased &&
			game.prestige[jea([Math.floor(this.id / 3) + 1])] &&
			game.prestige[jea([Math.floor(this.id / 3) + 1])].points.gte(this.price)
		) {
			game.prestige[jea([Math.floor(this.id / 3) + 1])].points.subBy(this.price);
			this.purchased = true;
		} else if (this.purchased) {
			this.on = !this.on;
		}
	}

	update() {
		if (!this.vreq()) $("aut" + this.id).style.display = "none";
		else $("aut" + this.id).style.display = "block";
		if (!isNaN($("autp" + this.id).value)) this.priority = parseFloat($("autp" + this.id).value);
		if (isNaN(this.priority)) this.priority = game.autPriorities[this.id];
		for (let i in this.params) {
			if (
				/^[-\+]*(Infinity|NaN|(J+|J\^\d+ )?(10(\^+|\{[1-9]\d*\})|\(10(\^+|\{[1-9]\d*\})\)\^[1-9]\d* )*((\d+(\.\d*)?|\d*\.\d+)?([Ee][-\+]*))*(0|\d+(\.\d*)?|\d*\.\d+))$/.test(
					$("aut" + this.pid(i)).value
				)
			)
				this.params[i] = D($("aut" + this.pid(i)).value);
			if (D.isNaN(this.params[i])) this.params[i] = config.automators[this.id].parameters[i];
		}

		if (this.purchased) {
			if (this.on) {
				if (config.automators[this.id].paramOrder)
					this.func(...config.automators[this.id].paramOrder.map(e => this.params[e]));
				else this.func();
				$(`autb${this.id}`).className = $(`autb${this.id}`).className.replace("red", "green");
				$(`autb${this.id}`).innerText = "ON";
			} else {
				$(`autb${this.id}`).className = $(`autb${this.id}`).className.replace("green", "red");
				$(`autb${this.id}`).innerText = "OFF";
			}
		} else {
			if (
				game.prestige[jea([Math.floor(this.id / 3) + 1])] &&
				game.prestige[jea([Math.floor(this.id / 3) + 1])].points.gte(this.price)
			)
				$(`autb${this.id}`).className = $(`autb${this.id}`).className.replace("red", "green");
			else $(`autb${this.id}`).className = $(`autb${this.id}`).className.replace("green", "red");
			$(`autb${this.id}`).innerText = `Unlock for ${f(this.price)} ${game.ucname(
				Math.floor(this.id / 3) + 1
			)} Points`;
		}
	}
}
