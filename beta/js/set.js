function setElems() {
 	for (let p2 in game.prestige) {
		let p = game.prestige[p2];
		if (p.str_loc != joa([0])) {
			setElem('r' + JSON.stringify(p.loc), `
				You have ${f(p.points)} ${getLayerName(p.loc)} points and ${f(p.power)} ${getLayerName(p.loc)} power
			`);
			setElem('r2' + JSON.stringify(p.loc), `
				You have ${f(p.points)} ${getLayerName(p.loc)} points and ${f(p.power)} ${getLayerName(p.loc)} power
			`);
		} else {
			setElem('r' + JSON.stringify(p.loc), `
				You have ${f(p.points)} antimatter
			`);
			setElem('r2' + JSON.stringify(p.loc), `
				You have ${f(p.points)} antimatter
			`);
		}
		if (getPrestigeGain(p.points).gt(0) || getPrestigeGain2(p.points, game.max_layer[0] - p.loc[0]).gt(0)) {
			setdisp('pb' + JSON.stringify(p.loc), 'inline-block');
		} else if (p.points.lt(1.79e308)) {
			hide('pb' + JSON.stringify(p.loc));
		}
		if (game.state == 0 || p.str_loc == JSON.stringify(game.max_layer)) {
			setElem('pb' + JSON.stringify(p.loc), `
				Prestige for: ${f(getPrestigeGain(p.points).mul(10))} ${getLayerName(p.next_loc)} points ${p.str_loc == JSON.stringify(game.max_layer) ? '[P]' : ''}
			`);
		} else if (game.state == 1){
			let diff = game.max_layer[0] - p.loc[0];
			setElem('pb' + JSON.stringify(p.loc), `
				Prestige for: ${f(getPrestigeGain2(p.points, diff).mul(10))} ${getLayerName(game.max_layer)} points
			`);
		}
		for (let g of p.dims) {
			if (p.str_loc != joa([0])) {
				setElem('t' + JSON.stringify(g.loc) + JSON.stringify(g.id), `
					${getLayerName(g.loc).replace(/(^|[\s-])\S/g, function (match) {return match.toUpperCase()})} Dimension ${f(g.dim.add(1))}<br>
					${f(g.amount)} x${f(g.mult)}<br>
					Cost: ${f(g.price)}
				`);
			} else {
				setElem('t' + JSON.stringify(g.loc) + JSON.stringify(g.id), `
				Dimension ${f(g.dim.add(1))}<br>
				${f(g.amount)} x${f(g.mult)}<br>
				Cost: ${f(g.price)}
			`);
			}
		}
	}
	// Autosave Stuff
	if (game.as) {
		document.getElementById('as').className = document.getElementById('as').className.replace('red', 'green');
		game.asintv = JSON.parse(document.getElementById('asintv').value);
		show('asintvp');
	} else {
		document.getElementById('as').className = document.getElementById('as').className.replace('green', 'red');
		hide('asintvp');
	}
	
	game.notation = document.getElementById('notation').value;
	if (document.getElementById('themes').value != game.theme) themeTo(document.getElementById('themes').value);
	
	// Statistics
	
	setElem('stats', `
		You have ${f(game.prestige[joa([0])].points)} antimatter<br>
		Your best prestige layer is ${JSON.stringify(game.max_layer) == joa([0]) ? '...oh, you haven\'t prestiged yet' : getLayerName(game.max_layer)}<br>
		You have played for ${game.disp_time}
	`);
	
	// Achievements
	
	for (let i = 0; i < achievements.length; i++) {
		if (game.achievements[i]) {
			document.getElementById('ach' + i).className = document.getElementById('ach' + i).className.replace('lightgrey', 'green');
		} else {
			document.getElementById('ach' + i).className = document.getElementById('ach' + i).className.replace('green', 'lightgrey');
		}
	}
	
	// Automation Unlock
	if (game.celerity_unlocked) {
		show('autodiv');
		hide('autolock');
		
		setdisp('autoauto', 'inline-block');
		
		if (cmpLayer(game.um, oa([499])) == 1) {
			if (game.bulk_enabled) show('autobulkdiv');
			setdisp('bt', 'inline-block');
			hide('autobulklock');
			setElem('buybulkauto', 'Increase Auto Prestige Level: ' + (game.bulk_level < 6 ? f(n(game.BULK_PRICES[game.bulk_level])) + ' antimatter' : 'N/A'));
			if (game.bulk_level >= 6) {
				document.getElementById('buybulkauto').className = document.getElementById('buybulkauto').className.replace('red', 'blue').replace('green', 'blue');
			} else {
				if (game.prestige[joa([0])].points.gte(game.BULK_PRICES[game.bulk_level])) {
					document.getElementById('buybulkauto').className = document.getElementById('buybulkauto').className.replace('red', 'green').replace('blue', 'green');
				} else {
					document.getElementById('buybulkauto').className = document.getElementById('buybulkauto').className.replace('green', 'red').replace('blue', 'red');
				}
			}
			for (let i = 0; i < 6; i++) {
				if (game.bulk_level > i) {
					document.getElementById('ll' + i).className = document.getElementById('ll' + i).className.replace('red', 'green');
				} else {
					document.getElementById('ll' + i).className = document.getElementById('ll' + i).className.replace('green', 'red');
				}
			}
		} else {
			hide('autobulkdiv');
			hide('bt');
			setdisp('autobulklock', 'inline-block');
		}
		
		setdisp('mt4', 'inline-block');
		hide('mt4alt');
	} else {
		hide('autodiv');
		hide('autobulkdiv');
		hide('bt');
		hide('autobulklock');
		hide('autoauto');
		setdisp('autolock', 'inline-block');
		
		hide('mt4');
		setdisp('mt4alt', 'inline-block');
	}
	
	if (game.pinf_unlocked) {
		hide('mt5alt');
		setdisp('mt5', 'inline-block');
		
		hide('laylock');
		show('metadiv');
	} else {
		hide('mt5');
		setdisp('mt5alt', 'inline-block');
		
		hide('metadiv');
		setdisp('laylock', 'inline-block');
	}
	
	if (game.autoauto) {
		document.getElementById('autoauto').className = document.getElementById('autoauto').className.replace('red', 'blue').replace('green', 'blue');
	} else {
		if (game.prestige[joa([0])].points.gt(game.AA_PRICE)) {
			document.getElementById('autoauto').className = document.getElementById('autoauto').className.replace('red', 'green').replace('blue', 'green');
		} else {
			document.getElementById('autoauto').className = document.getElementById('autoauto').className.replace('green', 'red').replace('blue', 'red');
		}
	}
	
	if (game.bulk_enabled) {
		document.getElementById('bt').className = document.getElementById('bt').className.replace('red', 'green');
		document.getElementById('bt').innerHTML = 'Bulk Prestige: Enabled';
		if (game.um[0].gte(499)) show('autobulkdiv');
		if (game.um[0].gte(499)) setdisp('bt', 'inline-block');
	} else {
		document.getElementById('bt').className = document.getElementById('bt').className.replace('green', 'red');
		document.getElementById('bt').innerHTML = 'Bulk Prestige: Disabled';
		hide('autobulkdiv');
		if (cmpLayer(game.um, oa([499])) < 1) hide('bt');
	}
	
	
	if (game.news) {
		document.getElementById('news').style.visibility = 'visible';
		document.getElementById('tn').className = document.getElementById('tn').className.replace('red', 'green');
	} else {
		document.getElementById('news').style.visibility = 'hidden';
		document.getElementById('tn').className = document.getElementById('tn').className.replace('green', 'red');
	}
	
	if (game.usePrestigeName) {
		document.getElementById('tpn').className = document.getElementById('tpn').className.replace('red', 'green');
	} else {
		document.getElementById('tpn').className = document.getElementById('tpn').className.replace('green', 'red');
	}
	
	for (let p2 in game.prestige) {
		let p = game.prestige[p2];
		setElem('ama' + JSON.stringify(p.loc), `
			Unlock Auto Max All<br>
			Cost: ${f(auto_max_cost(p.loc))} ${JSON.stringify(p.loc) == '[0]' ? 'Antimatter' : getLayerName(p.loc).replace(/(^|[\s-])\S/g, function (match) {return match.toUpperCase()}) + ' Points'}
		`);
		if (p.is_auto_max) {
			if (document.getElementById('ama' + JSON.stringify(p.loc))) {
				document.getElementById('ama' + JSON.stringify(p.loc)).className = document.getElementById('ama' + JSON.stringify(p.loc)).className.replace('red', 'blue').replace('green', 'blue');
			}
		} else {
			if (afford_auto_max(p.loc)) {
				if (document.getElementById('ama' + JSON.stringify(p.loc))) {
					document.getElementById('ama' + JSON.stringify(p.loc)).className = document.getElementById('ama' + JSON.stringify(p.loc)).className.replace('red', 'green').replace('blue', 'green');
				}
			} else {
				if (document.getElementById('ama' + JSON.stringify(p.loc))) {
					document.getElementById('ama' + JSON.stringify(p.loc)).className = document.getElementById('ama' + JSON.stringify(p.loc)).className.replace('green', 'red').replace('blue', 'red');;
				}
			}
		}
		
		setElem('autoauto', `Automate Purchasing of Automation: ${f(game.AA_PRICE)}`);
		
		setElem('ap' + JSON.stringify(p.loc), `
			Unlock Auto Prestige Gain<br>
			Cost: ${f(auto_prestige_cost(p.loc))} ${JSON.stringify(p.loc) == '[0]' ? 'Antimatter' : getLayerName(p.loc).replace(/(^|[\s-])\S/g, function (match) {return match.toUpperCase()}) + ' Points'}
		`);
		if (p.is_auto_prestige) {
			if (document.getElementById('ap' + JSON.stringify(p.loc))) {
				document.getElementById('ap' + JSON.stringify(p.loc)).className = document.getElementById('ap' + JSON.stringify(p.loc)).className.replace('red', 'blue').replace('green', 'blue');
			}
		} else {
			if (afford_auto_prestige(p.loc)) {
				if (document.getElementById('ap' + JSON.stringify(p.loc))) {
					document.getElementById('ap' + JSON.stringify(p.loc)).className = document.getElementById('ap' + JSON.stringify(p.loc)).className.replace('red', 'green').replace('blue', 'green');
				}
			} else {
				if (document.getElementById('ap' + JSON.stringify(p.loc))) {
					document.getElementById('ap' + JSON.stringify(p.loc)).className = document.getElementById('ap' + JSON.stringify(p.loc)).className.replace('green', 'red').replace('blue', 'red');
				}
			}
		}
	}
	setElem('metap', 'Meta-Infinity for ' + f(getGainFor([0, 1])) + ' points');
}