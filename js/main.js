var game;
var diffMultiplier = 1
var gameLoopIntervalId = 0
var diff = 0
var breakPoint = false

function updateDisplay() {
  updateElements()
  for (let i in game.upgrades) game.upgrades[i].domUpdate();
  for (let i in game.unfunityUpgrades) game.unfunityUpgrades[i].domUpdate();
}

function gameLoop(diff) {
  if (breakPoint && !diff) return
  // 1 diff = 0.001 seconds
  var thisUpdate = new Date().getTime()
  diff = (diff || Math.min(thisUpdate - game.lastUpdate,21600000)) * diffMultiplier;
  //if (diffMultiplier > 1) console.log("SHAME")
  //else if (diffMultiplier < 1) console.log("SLOWMOTION")
  for (let i in game.prestige) game.prestige[i].update(diff);
  updateDisplay()
  game.lastUpdate = thisUpdate;
}

function startGame() {  
  document.getElementById('title').dataset.tooltip = 'By Reinhardt, Nyan Cat, Naruyoko';
  if (!nyanLoad()) newGame()
  tab(0)
  Mousetrap.bind("m",() => { game.maxAllLayers() })
  var thisUpdate = new Date().getTime()
  diff = (thisUpdate - game.lastUpdate) * diffMultiplier;
  document.getElementById('timeoffline').innerText = getDisplayTime(diff);
  if (diff > 7.2e6) {
    let hours = Math.floor(diff / 3.6e6);
    game.unfunitypoints = game.unfunitypoints.add(D.pow(2,game.unfunityUpgBought.doubleUnfun).mul(hours));
    document.getElementById('unfungain').innerText = f(D.pow(2,game.unfunityUpgBought.doubleUnfun).mul(hours));
    document.getElementById('gainspan').style.display = 'block';
  } else {
    document.getElementById('gainspan').style.display = 'none';
  }
  setInterval(function() {
    if (!errorPopped) nyanSave()
  }, 1000)
  startInterval()
}

function startInterval() {
  gameLoopIntervalId = setInterval(gameLoop, 33)
}