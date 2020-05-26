let config = {
	upgrades: {
		dimComp: {
			name: "Dimensional Compression",
			baseCost: D(1e10),
			costScale: D(1e15),
			CSI: D(1e5),
			desc: "Mult per dims is increased by log2(level+1)/1.5 and then raised to the power of log3(level/2)+1, but dim cost scale is raised to the power of log2(level/2)+1, and your dimensions are reset.", // Sorry Aarex
			levelCap: D(5),
			onBuy: ["resetLayer", jea([0])],
		},
		dimStab: {
			name: "Dimension Stabilizer",
			baseCost: D(1e30),
			costScale: D(1e10),
			desc: "Slowdown effect is multiplied by 1-(0.09*level), capped at 10 levels",
			levelCap: D(10),
			onBuy: ["resetDimCache", "slowdown"],
		},
		dimColl: {
			name: "Dimensional Collapse",
			baseCost: D(1e125),
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
			desc: "Doubles the amount of unfunity points you gain with offline time",
			addr: ["unfunitypoints"],
			currencyName: "unfunity points",
		},
		superUnfun: {
			name: "Super Unfun",
			baseCost: D(10),
			costScale: D(10),
			levelCap: D(Infinity),
			desc: "Increases the potency of your unfunity, making it more powerful",
			addr: ["unfunitypoints"],
			currencyName: "unfunity points",
		},
	},
};
