function updateElements() {
  document.getElementById('sbt').innerHTML = game.sbe ? '&lt;&lt;' : '&gt;&gt;';
  
  document.getElementById('tabb0').innerHTML = game.sbe ? 'Dimension' : 'Dim';
  document.getElementById('tabb1').innerHTML = game.sbe ? 'Options' : 'Opt';
  document.getElementById('tabb2').innerHTML = game.sbe ? 'Upgrades' : 'Upg';
  document.getElementById('tabb100').innerHTML = game.sbe ? 'Console' : 'Con';
}