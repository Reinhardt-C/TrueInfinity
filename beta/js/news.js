let news = {};

news.begin = function() {
	news.message();
}

news.message = function() {
	let rand = Math.floor(Math.random() * news.news.length);
	let msg = news.news[rand];
	let e = document.getElementById('news');
	e.innerHTML = msg;
	let textWidth = e.clientWidth;
	let parentWidth = e.parentElement.clientWidth;
	e.style.transition = '';
	e.style.transform = 'translateX(' + (parentWidth + 10) + 'px)';;
	let dist = parentWidth + e.clientWidth
	let rate = 100;
	let transformDuration = dist / rate;

	e.style.transition = 'transform ' + transformDuration + 's linear';
	e.style.transform = 'translateX(-' + (textWidth) + 'px)';
	
	setTimeout(news.message, Math.ceil(transformDuration) * 1000);
}

news.news = [
	'The code for this news ticker is totally not stolen from Antimatter Dimensions',
	'This game won\'t be released soon',
	'This news is false',
	'Join the Discord, we have cookies',
	'i FoUnD a BuG - everybody when they spam the side bar button',
	'<a style=\color:black\' href=\'https://reinhardt-c.github.io/FalseInfinity\'>World\'s Best Game</a>',
	'This game isn\'t unbalanced, it\'s just not balanced very well',
	'This game isn\'t unbalanced, you\'re just playing too fast',
	'This game isn\'t unbalanced, you\'re just used to more balanced games',
	'This game isn\'t unbalanced, all the other games are just overbalanced',
	'<marquee><marquee>This:</marquee><marquee>is confusing</marquee></marquee>',
	'Wow, this person just used my rediculous library. That\'s kinda awesome. Maybe my self-esteem is too low as somebody\'s said.-Naruyoko',
	'Why did someone request tie dye theme, and why did Reinhardt implement it?',
	'Every odd number, when written out, has an e in it',
	'Having trouble with FPS? Try switching to Hyper E notation!',
	// Credit Messages
	'Credit to Reinhardt, for making this game',
	'Credit to SuperSpruce, for the inspiration to make this game',
	'Credit to dan-simon, for the prestige gain calculations',
	'Credit to Hevipelle, for the achievement tooltip CSS and newsticker JS',
	'Credit to Naruyoko, for the numeric library this game is build on top of and some notations'
]