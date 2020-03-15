function updateElements() {
  document.getElementById('sbt').innerHTML = game.sbe ? '&lt;&lt;' : '&gt;&gt;';
  
  document.getElementById('tabb0').innerText = game.sbe ? 'Dimension' : 'Dim';
  document.getElementById('tabb1').innerText = game.sbe ? 'Options' : 'Opt';
  document.getElementById('tabb2').innerText = game.sbe ? 'Upgrades' : 'Upg';
  document.getElementById('tabb100').innerText = game.sbe ? 'Unfunity' : 'Unf';

  document.getElementById('unfunitypoints').innerHTML = `You have ${game.unfunitypoints} unfunity points giving a ${f(D(1.01).pow((game.unfunityUpgBought.superUnfun ? game.unfunityUpgBought.superUnfun : D(0)).add(1)).pow(game.unfunitypoints),4)}&times; boost to all production.`;
}