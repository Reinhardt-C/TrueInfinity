class Achivement {
	constructor(name, isUnlocked, tooltip, img, tc = 'black') {
		this.name = name;
		this.isUnlocked = isUnlocked;
		this.tooltip = tooltip;
		this.img = img;
		this.tc = tc;
	}
	
	get unlocked() {
		if (this.isUnlocked()) {
			if (game.achievements[achievements.indexOf(this)] == false) {
				popup(this.name, 'yellow');
				game.achievements[achievements.indexOf(this)] = true;
			}
		} else game.achievements[achievements.indexOf(this)] = false;
		return game.achievements[achievements.indexOf(this)];
	}
}

function amgt(x) {
	return () => game.prestige[joa([0])].max_points.gt(x);
}

function lu(loc) {
	return () => cmpLayer(game.um, loc) >= 0;
}

let achievements = [
	new Achivement('Scientific Notation', amgt(1e6), 'Reach 1e6 Antimatter', 'sci_not'),
	new Achivement('Googol', amgt(1e100), 'Reach 1e100 antimatter', 'googol'),
	new Achivement('Infinity', amgt(1.79e308), 'Reach 1e308 antimatter', 'inf'),
	new Achivement('Prefix Milli- Doesn\'t Imply Smaller', amgt('e3003'), 'Reach 1e3003 antimatter', 'mill'),
	new Achivement('Totally Balanced', amgt('ee6'), 'Reach E6#2 antimatter', 'bal'),
	new Achivement('You Should Probably Use Hyper E Now', amgt('eeeee308'), 'Reach E308#5 antimatter', 'hype'),
	new Achivement('I\'m Confused as to Why You\'re Still Playing', amgt('eeeee10000'), 'Reach E10000#5 antimatter', 'confused'),
	new Achivement('Eternal Suffering', lu([2]), 'Unlock Eternity', 'eternal', 'white'),
	new Achivement('What Just Happened?', lu([7]), 'Unlock Identity', 'wjh'),
	new Achivement('This Makes Things Easier', lu([6]), 'Unlock Automation', 'auto'),
	new Achivement('Automation Inception', () => game.autoauto, 'Purchase Auto-Automation', 'aa'),
	new Achivement('Why Wasn\'t This in Infinite Layers?', lu([499]), 'Unlock Bulk Prestige', 'why'),
	new Achivement('Exponential Prestige', () => game.bulk_level >= 5, 'Reach Bulk Prestige Level 5', 'exp_prestige'),
]

function createAchievement(n) {
	let a = createDiv('achwrapper', 'ach' + n, 'ach lightgrey');
	if (achievements[n].img) a.style.background = 'url(assets/img/ach_img/' + achievements[n].img + '.png)';
	if (achievements[n].img) a.style.backgroundSize = '150px 150px';
	a.style.color = achievements[n].tc;
	a.innerHTML = achievements[n].name;
	a.dataset.tooltip = achievements[n].tooltip;
}

function createAchievements() {
	for (let i = 0; i < achievements.length; i++) {
		createAchievement(i);
	}
}