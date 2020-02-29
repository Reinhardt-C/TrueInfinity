let D = ExpantaNum;
let Decimal = ExpantaNum;
let ExpandtaNum = ExpantaNum;

let elmCounter = 0
function getFreeId() {
  if (elmCounter > ExpandtaNum.MSI) throw "Ran out of ids! Please tell the dev & refresh"
  return ++elmCounter;
}

let j = JSON.stringify;

function ea(arr) {
  return arr.map(e => D(e));
}

function jea(arr) {
  return j(ea(arr));
}

function toggleSidebar() {
  document.getElementById('sidebar').classList.toggle('expanded');
  game.sbe = !game.sbe;
}

function setdisp(id, disp) {
  document.getElementById(id).style.display = disp;
}

function hide(id) {
  setdisp(id, 'none');
}

function show(id) {
  setdisp(id, 'block');
}

function dd(id, bool, type="block") { // Decide display
  setdisp(id, bool?type:"none")
}

function tab(t) {
  let tabs = document.querySelectorAll('.mt');
  for (let i of tabs) {
    hide(i.id);
  }
  show('tab' + t);
  game.tab = t;
}

function d(data) {
  if (!data) return new Dimension();
  return new Dimension(data.loc || [0], data.dim || 0, data.amount || 0, data.bought || 0);
}

function l(data) {
  if (!data) return new Layer();
  return new Layer(data.loc || [0], data.points || 0, data.power || 0, data.dims || [new Dimension()])
}

function newElem(type) {
  return document.createElement(type);
}

function breakPoint() {
  breakPoint = true
}

function clearAll() {
  document.getElementById('layers').innerHTML = '';
  document.getElementById('upgrades1').innerHTML = '';
}

function secretFormula(amount, dim) {
  amount = D(amount)
  dim = D(dim);
  let result = D.choose(dim.pow(amount.mul(dim)), amount.mul(dim)).pow(2.5);
  
  return result;
}

function fuckedNumError() {
  this.message = "NaN or Infinity detected! Saving is now disabled for safety."
  this.toString = () => "NaN or Infinity detected! Saving is now disabled for safety."
}

function triangularNumber(n) {
  n = D(n)
  return n.times(n.plus(1)).div(2)
}

function triangularNumberSum(n) {
  n = D(n)
  return n.times(n.plus(1)).times(n.plus(2)).div(6)
}

function testy() {
      let correct=[0,1,21,821]
      let oldPoint = D(game.prestige[jea([0])].points.toString())
      for (let i=0;i<4;i++) {
        game.prestige[jea([0])].points = D(correct[i])
        if (game.prestige[jea([0])].dims[0].maxCost.neq(game.prestige[jea([0])].points)) {
          alert("@Nyan cat your buy max broke at test case "+i+"!")
          i=4
        }
        this.cache={}
      }
      game.prestige[jea([0])].points = oldPoint
}

class hasCache {
  constructor() {
    this.cache = {} 
    this.doCache = {}
  }
  
  freshCache(name) {
    if (!(name in Object.keys(this.doCache))) this.doCache[name] = false
    return !this.doCache[name]
  }
  
  callCache(name, getFunc) {
    if (this.freshCache(name)) this.cache[name] = getFunc.call(this)
    this.doCache[name] = true
    return this.cache[name]
  }
}