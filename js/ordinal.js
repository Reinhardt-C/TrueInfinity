class OrdinalHandler {
	constructor(location) {
		this.location = location;
		this.methods = {};
		this.nicks = {};
		this.init();
	}

	get ordinal() {
		return this.location.ord;
	}

	set ordinal(setTo) {
		this.location.ord = setTo;
	}

	addMethod(name, method, nick = "") {
		this.methods[name] = method;
		this.nicks[name] = nick;
	}

	runMethod(name) {
		this.ordinal = config.ordFuncs[name].method(this.ordinal);
		game.unfunitypoints = game.unfunitypoints.div(config.ordFuncs[name].requires);
	}

	async init() {
		for (let i in config.ordFuncs) {
			await game;
			let req = D(config.ordFuncs[i].requires);
			let div = $$("div");
			div.id = "ord" + i;
			div.className = "ordfunc";
			div.innerHTML = `
				<strong>${config.ordFuncs[i].name}</strong><br><br>
				<button id='${"ordb" + i}' class='sbb ${game.unfunitypoints.gte(req) ? "green" : "red"}'><strong>${
				config.ordFuncs[i].func
			}</strong></button><br><br>
				Costs (<strong>÷</strong>) ${f(req)} unfunity
			`;
			$("funcs").appendChild(div);
			$("ordb" + i).addEventListener("click", () => {
				game.tsli = 0;
				game.unfunitypoints.gte(req) ? this.runMethod(i) : null;
			});
		}
		for (let i in config.ordMilestones) {
			await game;
			let req = O(config.ordMilestones[i]);
			let div = $$("div");
			div.id = "ordms" + i;
			div.className = "ordms";
			div.style.backgroundColor = game.ord.cmp(req) > -1 ? "#B5DDA4" : "pink";
			div.style.borderColor = game.ord.cmp(req) > -1 ? "#85AD74" : "darkred";
			div.innerHTML = `Requires ${req.toHTML()}`;
			$("ms").appendChild(div);
			tippy("#" + div.id, {
				content: config.ordMsTooltips[i],
			});
		}
	}

	update() {
		for (let i in config.ordFuncs) {
			let req = D(config.ordFuncs[i].requires);
			$("ordb" + i).className = `sbb ${game.unfunitypoints.gte(req) ? "green" : "red"}`;
		}
		for (let i in config.ordMilestones) {
			let req = O(config.ordMilestones[i]);
			let el = $("ordms" + i);
			if (!el) continue;
			el.style.backgroundColor = game.ord.cmp(req) > -1 ? "#B5DDA4" : "pink";
			el.style.borderColor = game.ord.cmp(req) > -1 ? "#85AD74" : "darkred";
		}
	}
}
