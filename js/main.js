var game;
var diffMultiplier = 1
var gameLoopIntervalId = 0
var diff = 0
var breakPoint = false

function updateDisplay() {
  updateElements()
  for (let i in game.upgrades) game.upgrades[i].domUpdate();
}

function gameLoop(diff) {
  if (breakPoint && !diff) return
  // 1 diff = 0.001 seconds
  var thisUpdate = new Date().getTime()
  diff = (diff || Math.min(thisUpdate - game.lastUpdate, 21600000)) * diffMultiplier
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
  Mousetrap.bind("m", () => {game.maxAllLayers()})
  setInterval(function() {
    if (!errorPopped) nyanSave()
  }, 5000)
  startInterval()
}

function startInterval() {
  gameLoopIntervalId = setInterval(gameLoop, 33)
}