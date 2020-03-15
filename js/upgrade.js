class Upgrade {
  constructor(id = 'red', loc = 'upgrades') {
    this.id = id;
    this.loc = loc;
    // name, baseCost, costScale, CSI, desc, levelCap, addr, onBuy, vfunc
    for (let i in config[loc][this.id]) this[i] = config[loc][this.id][i];
    let temp = this.blankUpgrade
    for (let property in temp) {
      this[property] = this[property] || temp[property]
    }
    if (!(this.id in game.upgradesBought)) game.upgradesBought[this.id] = D(0);
    this.domCreate();
  }
  
  get blankUpgrade() {
    return {
      name: 'Blank',
      baseCost: D(1/0),
      costScale: D(1),
      CSI: D(1),
      desc: 'Blank',
      levelCap: D(1),
      addr: ['prestige', jea([0]), 'points'],
      onBuy: [],
      currencyName: "antimatter",
      vfunc: () => true
    }
  }
  
  get level() {
    return game[this.loc == 'upgrades' ? 'upgradesBought' : 'unfunityUpgBought'][this.id]
  }
  
  get currency() {
    return _.get(game, this.addr);
  }
  
  get afford() {
    return this.currency.gte(this.cost) && (this.levelCap.eq(0) || this.level.lt(this.levelCap))
  }
  
  get cost() {
    return this.baseCost.times(D.pow(this.costScale,this.level)).times(D.pow(this.CSI, D.sumArithmeticSeries(this.level, D(1), D(1), D(0))))
  }
  
  domCreate() {
    let div = newElem('div');
    div.id = 'upg' + this.id;
    div.className = 'upg';
    div.innerText = this.name;
    div.dataset.tooltip = this.desc;
    
    let button = newElem('button');
    button.id = 'buyupg' + this.id;
    button.addEventListener('click', () => this.buy());
    button.innerText = 'Buy for ' + f(this.cost);
    button.className = 'upgbutton sbb height norm green';
    div.appendChild(button);
    
    let text = newElem('p');
    text.id = 'tupg' + this.id;
    div.appendChild(text);
    
    if (this.loc == 'upgrades') document.getElementById('upgrades1').appendChild(div);
    else if (this.loc == 'unfunityUpgrades') document.getElementById('unfunUpg').appendChild(div);
  }
  
  domUpdate() {

    dd(`upg${this.id}`, this.vfunc(), 'inline-block')
    document.getElementById('buyupg' + this.id).innerText = this.level.eq(this.levelCap)?"MAXED":`Buy for ${f(this.cost)+" "+this.currencyName}`
    document.getElementById('tupg' + this.id).innerText = `
      Level: ${this.level}
    `
    if (this.afford) document.getElementById('buyupg'+this.id).className = document.getElementById('buyupg'+this.id).className.replace('red', 'green');
    else document.getElementById('buyupg'+this.id).className = document.getElementById('buyupg'+this.id).className.replace('green', 'red');
  }
  
  buy() {
    if (!this.afford) return false;
    this.currency.subBy(this.cost);
    this.level.addBy(1)
    onBuyTriggers(this.onBuy)
    return true
  }
}

function setupUpgrades() {
  for (let i in config.upgrades) game.upgrades[i] = new Upgrade(i);
  for (let i in config.unfunityUpgrades) game.unfunityUpgrades[i] = new Upgrade(i, 'unfunityUpgrades');
}

function onBuyTriggers(code) {
    for (let i=0;i<code.length;i++) {
      let trigger = code[i]
      switch (trigger) {
        case "resetLayer": // Reset dims
          game.prestige[code[++i]].clear()
          break;
        case "resetDimCache": // Force certain dim cache to refresh
          for (let layer in game.prestige) {
            for (let dim in game.prestige[layer].dims) {
              game.prestige[layer].dims[dim].doCache[code[++i]] = false
            }
          }
          break;
        case "resetUpg":
          game.upgradesBought[code[++i]] = D(0)
          break;
      }
    }
}