function auto() {
	game.automaxall.forEach(e => maxAll(e));
	game.autoprestige.forEach(e => autoPrestigeGain(e));
	
	if (game.autoauto) {
		for (let i in game.prestige) {
			let p = game.prestige[i];
			buy_auto_max(p.loc);
			buy_auto_prestige(p.loc);
		}
	}
	
	if (game.bulk_enabled) {
		if (game.bulk_level > 0) {
			if (game.bulk_cooldown <= 0) {
				bulkPrestige();
				game.bulk_cooldown = 20;
			} else {
				game.bulk_cooldown--;
			}
		}
	}
}