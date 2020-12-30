let config = {
	upgrades: {
		dimComp: {
			name: "Dimensional Compression",
			baseCost: D(1e10),
			costScale: D(1e15),
			CSI: D(1e6),
			desc:
				"Mult per dims is increased by log2(level+1)/1.5 and then raised to the power of log3(level/2)+1, but dim cost scale is raised to the power of log2(level/2)+1, and your antimatter dimensions are reset. This is reset on prestige.", // Sorry Aarex
			levelCap: D(10),
			onBuy: ["resetLayer", jea([0])],
		},
		dimStab: {
			name: "Dimension Stabilizer",
			baseCost: D(1e30),
			costScale: D(1e10),
			desc:
				"Slowdown effect is multiplied by 1-(0.09*level), capped at 10 levels. This resets on prestige.",
			levelCap: D(10),
			onBuy: ["resetDimCache", "slowdown"],
		},
		dimJump: {
			name: "Dimensional Jump",
			baseCost: D(1e256),
			costScale: D(1e64),
			desc:
				"Offset dimension prices, so dimension 2 costs as much as dimension 1 etc, this resets your antimatter dimensions. This resets on prestige.",
			levelCap: D(5),
			onBuy: ["resetLayer", jea([0])],
			vfunc: () => _.get(game, ["upgradesBought", "dimComp"]).gt(4),
		},
		dimColl: {
			name: "Dimensional Collapse",
			baseCost: D(1e256),
			costScale: D(1),
			desc: "Dimensions 'collapse' after dimension 10 increasing production",
			levelCap: D(1),
			onBuy: [],
			vfunc: () => _.get(game, ["upgradesBought", "dimComp"]).gt(4),
		},
	},
	unfunityUpgrades: {
		doubleUnfun: {
			name: "Double Unfun",
			baseCost: D(3),
			costScale: D(3),
			levelCap: D(Infinity),
			desc: "Doubles the amount of unfunity points you gain",
			addr: ["unfunitypoints"],
			currencyName: "unfunity points",
		},
		superUnfun: {
			name: "Super Unfun",
			baseCost: D(10),
			costScale: D(10),
			levelCap: D(Infinity),
			desc: "Increases the potency of your unfunity, making it more powerful.",
			addr: ["unfunitypoints"],
			currencyName: "unfunity points",
		},
		onlineUnfun: {
			name: "Online Unfun",
			baseCost: D(13),
			costScale: D(13),
			levelCap: D(Infinity),
			desc: "Increases the online production of unfunity.",
			addr: ["unfunitypoints"],
			currencyName: "unfunity points",
		},
	},
	ordFuncs: {
		inc: {
			name: "Increment Ordinal",
			func: "λα.α+1",
			method: ord => ord.add(1),
			requires: "1e4",
		},
		omega: {
			name: "Add Omega",
			func: "λα.α+ω",
			method: ord => ord.add(VebleNum.w),
			requires: "1e6",
		},
		sqomega: {
			name: "Add Omega Squared",
			func: "λα.α+ω<sup>2</sup>",
			method: ord => ord.add(O("w^2")),
			requires: "1e8",
		},
	},
	ordMilestones: ["1", "50", "w", "w*5", "w^2"],
	ordMsTooltips: [
		"Multiply unfunity gain by 10",
		"Increase the limit of dimensional stabilizer to 20",
		"Unlock eternity automation tier",
		"Dimensional compression no longer resets antimatter dimensions",
		"Axioms no longer reset on reality",
	],
	automators: [
		{
			name: "Upgrade Automation",
			func: () => {
				for (let i in game.upgrades) game.upgrades[i].buy(true);
			},
			price: D(10000),
		},
		{
			name: "Antimatter Dimension Automation",
			func: () => {
				game.prestige[jea([0])] ? game.prestige[jea([0])].maxAll(true) : null;
			},
			price: D(75000),
		},
		{
			name: "Infinity Dimension Automation",
			func: () => {
				game.prestige[jea([1])] ? game.prestige[jea([1])].maxAll(true) : null;
			},
			price: D(200000),
		},
		{
			name: "Infinity Automation",
			func: min => {
				game.prestige[jea([0])] ? game.prestige[jea([0])].prestige(true, min) : null;
			},
			price: D(1e12),
			parameters: {
				"Minimum Time": D(0),
			},
			paramOrder: ["Minimum Time"],
			vreq: () => game.milestoneUnlocked(2),
		},
		{
			name: "Eternity Dimension Automation",
			func: () => {
				game.prestige[jea([2])] ? game.prestige[jea([2])].maxAll(true) : null;
			},
			price: D(1e20),
			vreq: () => game.milestoneUnlocked(2),
		},
		{
			name: "Unfunity Upgrade Automation",
			func: () => {
				for (let i in game.unfunityUpgrades) game.unfunityUpgrades[i].buy(true);
			},
			price: D(1e100),
			vreq: () => game.milestoneUnlocked(2),
		},
	],
};
