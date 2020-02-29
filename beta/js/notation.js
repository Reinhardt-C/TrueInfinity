function f(num) {
  return N[game.notation](num);
}

let N = {};

// Credit Naruyoko
// From here -> https://docs.google.com/spreadsheets/d/1sxD7KZn3N9YdPFMOBrb26E7zud82CNxcEsenY6KtKnw/edit
N.EXPREFIXES = [];

N.EXPREFIXES[1] = {};
N.EXPREFIXES[1].LOWEST = ['K', 'M', 'B', 'T', 'Qa', 'Qi', 'Sx', 'Sp', 'Oc', 'No'];
N.EXPREFIXES[1].PRIMARY = ['', 'U', 'D', 'T', 'Qa', 'Qi', 'Sx', 'Sp', 'Oc', 'No'];
N.EXPREFIXES[1].SECONDARY = ['', 'Dc', 'Vg', 'Tg', 'Qd', 'Qn', 'Sg', 'St', 'Og', 'Ng'];
N.EXPREFIXES[1].TERTIARY = ['', 'Ce', 'Du', 'Tc', 'Qt', 'Qg', 'Sc', 'Sn', 'Ot', 'Nt'];
N.EXPREFIXES[1].ORDER = ['PRIMARY', 'SECONDARY', 'TERTIARY'];

N.EXPREFIXES[2] = {};
N.EXPREFIXES[2].LOWEST = ['', 'MI', 'MC', 'NA', 'PC', 'FM', 'AT', 'ZP', 'YC', 'XN', 'VE', 'ME', 'DE', 'TE', 'TC', 'PE', 'HE', 'HC', 'OE', 'EE'];
N.EXPREFIXES[2].PRIMARY = ['', 'Hn', 'Du', 'Tr', 'Te', 'P', 'Hx', 'Hp', 'Oo', 'En'];
N.EXPREFIXES[2].SECONDARY = ['', 'Ve', 'Ic', 'Tn', 'Tt', 'Pc', 'Hc', 'Ht', 'Oa', 'Ec'];
N.EXPREFIXES[2].TERTIARY = ['', 'H', 'Dh', 'Th', 'Ta', 'Ph', 'Hh', 'He', 'Oh', 'Eh'];
N.EXPREFIXES[2].ORDER = ['PRIMARY', 'SECONDARY', 'TERTIARY'];

N.EXPREFIXES[3] = {};
N.EXPREFIXES[3].LOWEST = ['', 'KI', 'MG', 'GG', 'TR', 'PT', 'EX', 'ZT', 'YT', 'XN', 'DA', 'HD', 'DK', 'TK', 'TE', 'PK', 'EK', 'ZK', 'YK', 'NK', 'IK', 'IN', 'ID', 'IT', 'IR', 'IP', 'IE', 'IZ', 'IY', 'IX'];
N.EXPREFIXES[3].PRIMARY = ['', 'En', 'Od', 'T', 'Tr', 'Pt', 'Et', 'Zt', 'Yt', 'Xn'];
N.EXPREFIXES[3].SECONDARY = ['', 'Da', 'Ik', 'Ta', 'Te', 'Pk', 'Ek', 'Zk', 'Yk', 'Nk'];
N.EXPREFIXES[3].TERTIARY = ['', 'Ho', 'Bo', 'Tt', 'To', 'Po', 'Eo', 'Zo', 'Yo', 'No'];
N.EXPREFIXES[3].ORDER = ['TERTIARY', 'SECONDARY', 'PRIMARY'];

N.EXPREFIXES[4] = {};
N.EXPREFIXES[4].LOWEST = ['', 'KL', 'DL', 'TR', 'TA', 'PL', 'EL', 'ZL', 'YL', 'NL', 'DK', 'HK', 'DO', 'TK', 'TE', 'PK', 'EK', 'ZK', 'YK', 'NK', 'IK'];
N.EXPREFIXES[4].PRIMARY = ['', 'Kl', 'Dl', 'Tr', 'Ta', 'Pl', 'El', 'Zl', 'Yl', 'Nl', 'Dk'];
N.EXPREFIXES[4].SECONDARY = ['', 'Kl', 'Mj', 'Gj', 'As', 'Ln', 'Fm', 'Jv', 'Sl', 'Bt', 'Ht', 'Gc', 'Gx', 'Sp', 'Vs', 'Mt', 'Me', 'Xe', 'Hy', 'Mv', 'Gv', 'Tv', 'Pv', 'Ev', 'Zv', 'Yv', 'Xv'];

//From here -> https://docs.google.com/spreadsheets/d/1nODVT6bbdsCjBcy5mm5T-ruWbSCcPPTI81TsPL2kkQU/edit

N.EXEXPREFIXES = [];

N.EXEXPREFIXES[0] = {};
N.EXEXPREFIXES[0].LOWEST = ['', '', '', 'k', 'My', 'Lk', 'M', 'Cr', 'Aw'];

N.EXEXPREFIXES[1] = {};
N.EXEXPREFIXES[1].SPECIAL = {0:'k', 1:'M', 2:'B'};
N.EXEXPREFIXES[1].PRIMARY = ['', 'U', 'D', 'T', 'Qa', 'Qi', 'Sx', 'Sp', 'O', 'N'];
N.EXEXPREFIXES[1].SECONDARY = ['', 'Dc', 'Vg', 'Tg', 'Qag', 'Qig', 'Sxg', 'Spg', 'Ocg', 'Nog'];
N.EXEXPREFIXES[1].TERTIARY = ['', 'Cn', 'Dcn', 'Tcn', 'Qac', 'Qic', 'Sxc', 'Spc', 'Ocn', 'Ncn'];
N.EXEXPREFIXES[1].ORDER = ['PRIMARY', 'SECONDARY', 'TERTIARY'];

N.EXEXPREFIXES[2] = {};
N.EXEXPREFIXES[2].SPECIAL = {};
N.EXEXPREFIXES[2].PRIMARY = ['', 'Mi', 'Di', 'Tr', 'Tt', 'Pt', 'Hx', 'Hp', 'Od', 'En'];
N.EXEXPREFIXES[2].SECONDARY = ['', 'Dk', 'Ic', 'Trc', 'Ttc', 'Ptc', 'Hxc', 'Hpc', 'Otc', 'Enc'];
N.EXEXPREFIXES[2].TERTIARY = ['', 'Hc', 'Dhc', 'Thc', 'Tth', 'Pth', 'Hxh', 'Hph', 'Och', 'Enh'];
N.EXEXPREFIXES[2].ORDER = ['PRIMARY', 'SECONDARY', 'TERTIARY'];
N.EXEXPREFIXES[2].SMALL = 'T-S';
N.EXEXPREFIXES[2].COEFF = 'CT';

N.EXEXPREFIXES[3] = {};
N.EXEXPREFIXES[3].SPECIAL = {};
N.EXEXPREFIXES[3].PRIMARY = ['', 'Ki', 'Mg', 'Gg', 'Te', 'Pe', 'Ex', 'Zt', 'Yt', 'Xn'];
N.EXEXPREFIXES[3].SECONDARY = ['', 'Wc', 'Wg', 'We', 'Wr', 'Wt', 'Wx', 'Et', 'Wt', 'Wn'];
N.EXEXPREFIXES[3].TERTIARY = ['', 'Xz', 'Xg', 'Xi', 'Xr', 'Xe', 'Xx', 'Xt', 'Xo', 'Xl'];
N.EXEXPREFIXES[3].ORDER = ['PRIMARY', 'SECONDARY', 'TERTIARY'];
N.EXEXPREFIXES[3].SMALL = 'ST';
N.EXEXPREFIXES[3].COEFF = 'C`T';

N.EXEXPREFIXES[4] = {};
N.EXEXPREFIXES[4].SPECIAL = {};
N.EXEXPREFIXES[4].PRIMARY = ['', '\u03b1', '\u03b2', '\u03b3', '\u03b4', '\u03b5', '\u03db', '\u03b6', '\u03b7', '\u03b8'];
N.EXEXPREFIXES[4].SECONDARY = ['', '\u03b9', '\u03ba', '\u03bb', '\u03bc', '\u03bd', '\u03be', '\u03bf', '\u03c0', '\u03d9'];
N.EXEXPREFIXES[4].TERTIARY = ['', '\u03c1', '\u03c2', '\u03c4', '\u03c5', '\u03c6', '\u03c7', '\u03c8', '\u03c9', '\u03e1'];
N.EXEXPREFIXES[4].ORDER = ['PRIMARY', 'SECONDARY', 'TERTIARY'];
N.EXEXPREFIXES[4].SMALL = 'ST';
N.EXEXPREFIXES[4].COEFF = 'C`T';

N.EXEXPREFIXES[5] = {};
N.EXEXPREFIXES[5].SPECIAL = {11:'Elv', 12:'Twl'};
N.EXEXPREFIXES[5].PRIMARY = ['', 'On', 'Tw', 'Th', 'Sv', 'Fv', 'Si', 'Sv', 'Eg', 'Nn'];
N.EXEXPREFIXES[5].SECONDARY = ['', 'Tn', 'Twn', 'Thr', 'Frr', 'Fft', 'Sxt', 'Svn', 'Egt', 'Nnt'];
N.EXEXPREFIXES[5].TERTIARY = ['', 'Hd', 'Twh', 'Trh', 'Foh', 'Fvh', 'Sxh', 'Svh', 'Egh', 'Nnh'];
N.EXEXPREFIXES[5].ORDER = ['PRIMARY', 'SECONDARY', 'TERTIARY'];
N.EXEXPREFIXES[5].SMALL = 'ST';
N.EXEXPREFIXES[5].COEFF = 'C`T';

N.EXEXPREFIXES[6] = {};
N.EXEXPREFIXES[6].SPECIAL = {};
N.EXEXPREFIXES[6].PRIMARY = ['', 'Gog', 'Gra', 'Gre', 'Gig', 'Gor', 'Gul', 'Gsp', 'Gin', 'Gar'];
N.EXEXPREFIXES[6].SECONDARY = ['', 'Gld', 'Gdu', 'Gth', 'Gts', 'Gpt', 'Ghx', 'Ghp', 'Goc', 'Gen'];
N.EXEXPREFIXES[6].TERTIARY = ['', 'Uog', 'Dog', 'Tog', 'Ttg', 'Ptg', 'Hxg', 'Epg', 'Ogg', 'Eng'];
N.EXEXPREFIXES[6].ORDER = ['PRIMARY', 'SECONDARY', 'TERTIARY'];
N.EXEXPREFIXES[6].SMALL = 'ST';
N.EXEXPREFIXES[6].COEFF = 'C`T';

N.EXEXPREFIXES[7] = {};
N.EXEXPREFIXES[7].SPECIAL = {};
N.EXEXPREFIXES[7].PRIMARY = ['', 'Mix', 'Dix', 'Tix', 'Ttx', 'Ptx', 'Etx', 'Epx', 'Otx', 'Nix'];
N.EXEXPREFIXES[7].SECONDARY = ['', 'Dkx', 'Bkx', 'Tex', 'Tkx', 'Pkx', 'Ekx', 'Eix', 'Ogx', 'Enx'];
N.EXEXPREFIXES[7].TERTIARY = ['', 'Hix', 'Dux', 'Trx', 'Txt', 'Pex', 'Ext', 'Hpx', 'Ocx', 'Nnx'];
N.EXEXPREFIXES[7].ORDER = ['PRIMARY', 'SECONDARY', 'TERTIARY'];
N.EXEXPREFIXES[7].SMALL = 'ST';
N.EXEXPREFIXES[7].COEFF = 'C`T';

N.EXEXPREFIXES[8] = {};
N.EXEXPREFIXES[8].SPECIAL = {};
N.EXEXPREFIXES[8].PRIMARY = ['', '\u05d0', '\u05d1', '\u05d2', '\u05d3', '\u05d4', '\u05d7', '\u05d8', '\u05d9', '\u05db'];
N.EXEXPREFIXES[8].SECONDARY = ['', '\u05dc', '\u05de', '\u05e0', '\u05e1', '\u05e2', '\u05e6', '\u05e4', '\u05e7', '\u05e8'];
N.EXEXPREFIXES[8].TERTIARY = ['', '\u05e9\u05c1', '\u05ea', '\u05d3\u05b8\u05bc', '\u05d1\u05bd', '\u05e9\u05b0\u05c1', '\u05d5', '\u05f3', '\u05d6', '\u05e2\u05b4'];
N.EXEXPREFIXES[8].ORDER = ['TERTIARY', 'SECONDARY', 'PRIMARY'];
N.EXEXPREFIXES[8].SMALL = 'ST';
N.EXEXPREFIXES[8].COEFF = 'C`T';

N.EXEXPREFIXES[9] = {};
N.EXEXPREFIXES[9].SPECIAL = {};
N.EXEXPREFIXES[9].PRIMARY = ['', '\u0431', '\u0432', '\u0433', '\u0434', '\u0452', '\u0453', '\u0435', '\u0451', '\u0450'];
N.EXEXPREFIXES[9].SECONDARY = ['', '\u0436', '\u0437', '\u0437\u0301', '\u0455', '\u0457', '\u0458', '\u043a', '\u043b', '\u0459'];
N.EXEXPREFIXES[9].TERTIARY = ['', '\u043c', '\u043d', '\u045a', '\u043f', '\u0440', '\u0441', '\u0441\u0301', '\u0442', '\u045b'];
N.EXEXPREFIXES[9].ORDER = ['PRIMARY', 'SECONDARY', 'TERTIARY'];
N.EXEXPREFIXES[9].SMALL = 'ST';
N.EXEXPREFIXES[9].COEFF = 'C`T';

N.EXEXPREFIXES[10] = {};
N.EXEXPREFIXES[10].SPECIAL = {};
N.EXEXPREFIXES[10].PRIMARY = ['', 'Fiz', 'Buz', 'Pop', 'Wha', 'Chp', 'Min', 'Moo', 'Bee', 'Boo'];
N.EXEXPREFIXES[10].SECONDARY = ['', 'She', 'Mew', 'Cow', 'Bam', 'Crs', 'Msh', 'Bip', 'Hit', 'Cln'];
N.EXEXPREFIXES[10].TERTIARY = ['', 'Din', 'Don', 'Cut', 'Squ', 'Dng', 'Lng', 'Fli', 'Flo', 'Trn'];
N.EXEXPREFIXES[10].ORDER = ['PRIMARY', 'SECONDARY', 'TERTIARY'];
N.EXEXPREFIXES[10].SMALL = 'ST';
N.EXEXPREFIXES[10].COEFF = 'C`T';

N.EXEXPREFIXES[11] = {};
N.EXEXPREFIXES[11].SPECIAL = {};
N.EXEXPREFIXES[11].PRIMARY = ['', 'Una', 'Dos', 'Tre', 'Cua', 'Cin', 'Sei', 'Sie', 'Och', 'Nue'];
N.EXEXPREFIXES[11].SECONDARY = ['', 'Diz', 'Vei', 'Tri', 'Cur', 'Cic', 'Ses', 'Set', 'Oce', 'Nvn'];
N.EXEXPREFIXES[11].TERTIARY = ['', 'Cnt', 'Dsc', 'Tsc', 'Ccn', 'Qni', 'Ssc', 'Stc', 'Ohc', 'Nvc'];
N.EXEXPREFIXES[11].ORDER = ['PRIMARY', 'SECONDARY', 'TERTIARY'];
N.EXEXPREFIXES[11].SMALL = 'ST';
N.EXEXPREFIXES[11].COEFF = 'C`T';

/*
  Notations:
    N.sci - Scientific Notation
    N.eng - Engineering Notation
    N.log - Logarithm Notation
    N.est - Naruyoko's Expanded Stanard Notation
    N.exs - Extended Standard Notation
    N.uar - Up Arrow Notation
    N.chn - Chain Arrow Notation
    N.ban - Bird's Array Notation
    N.hyp - Hyper E Notation
    N.inf - Infinity Notation
    N.tin - True Infinity Notation
*/

N.sci = function(num) {
  let x = new OmegaNum(num).floor();
  let a = x.array;
  let l = a.length;
  
  if (l == 1) {
    if (x.lt(1e6)) {
      return x.toString();
    } else {
      return x.toNumber().toExponential(0).toString().replace(/\+/, '');
    }
  } else if (l == 2 && a[1] < 14) {
    if (x.log10().lt(1e6)) {
      return Math.pow(10, a[0] % 1).toFixed(0).toString() + 'e' + x.log10().floor().toString()
    } else {
      return 'e' + N.sci(x.log10().floor());
    } 
  } else {
    return num.toString();
  }
}

N.eng = function(num) {
  let x = new OmegaNum(num).floor();
  let a = x.array;
  let l = a.length;
  if (x.eq(0)) {
    return '0';
  }
  let mod3e = x.log10().floor().mod(3);
    
  if (l == 1) {
    if (x.lt(1e6)) {
      return x.toString();
    } else {
      let exponent = x.log10().floor().sub(mod3e);
      let mantissa = x.div(OmegaNum.pow(10, exponent)).floor();
      return mantissa.toString() + 'e' + exponent.toString();
    }
  } else if (l == 2 && a[1] < 14) {
    if (x.log10().lt(1e6)) {
      return (Math.pow(10, a[0] % 1) * OmegaNum.pow(10, mod3e).toNumber()).toFixed(0).toString() + 'e' + x.log10().floor().sub(mod3e).toString();
    } else {
      return 'e' + N.eng(x.log10().floor());
    }
  } else {
    return num.toString();
  }
}

N.log = function(num) {
  let x = new OmegaNum(num).floor();
  if (x.gt("10^^12")){
    return x.toString();
  } else if (x.gt(1e6)) {
    let flr = x.log10().mul(100).floor().div(100);
    if (flr.lt(1e6)) {
      return 'e' + flr.toString();
    } else {
      return 'e' + N.log(flr);
    }
  } else {
    return x.toString();
  }
}

//N.est
//Code by Naruyoko
//Uses scope to prevent contamination
N.est = (function (){
  'use strict';
  function P(tier,index,length=6,lowest=true){
    let x = Math.floor(index);
    let b = '';
    let m = 0;
    if (tier==3 && x>=1e3){
      let a = F(x,length);
      b = a[0];
      length = a[1];
      m = a[2];
      a = null;
      x = x%1e3;
      lowest = false;
    }
    let t = N.EXPREFIXES[tier];
    let r;
    let l;
    if (x<t.LOWEST.length&&lowest){
      r = length>=1 ? t.LOWEST[x] : '';
      l = !!r;
    }else{
      let p = {};
      p.PRIMARY = length>=3 ? t.PRIMARY[x%10] : '';
      p.SECONDARY = length>=2 ? t.SECONDARY[Math.floor(x/10)%10] : '';
      p.TERTIARY = length>=1 ? t.TERTIARY[Math.floor(x/100)%10] : '';
      let o = t.ORDER;
      r = p[o[0]] + p[o[1]] + p[o[2]];
      l = !!p.PRIMARY + !!p.SECONDARY + !!p.TERTIARY;
      p=o = null;
    }
    t = null;
    length -= l;
    r = b + r;
    l += m;
    return [r,length,l];
  }
  function F(index,length=6){
    let x = Math.floor(index/1e3)*1e3;
    let b = '';
    let t = N.EXPREFIXES[4];
    let g = N.EXPREFIXES[3];
    let l = 0;
    if (x<t.LOWEST.length*1e3){
      b = t.LOWEST[x/1e3];
      l++;
      length--;
      x = 0;
    }else{
      while (length>0 && x>=1e3){
        let m = 0;
        let d = Math.floor(Math.log10(x)/3);
        let z = Math.pow(1e3,d);
        let f = Math.floor(x/z);
        let a = B(d,length);
        let j = a[0];
        length = a[1];
        l += a[2];
        a = null;
        if (f>1){
          let p = {};
          let e = Math.floor(f/10)%10;
          p.PRIMARY = length>=3 ? t.PRIMARY[f%10] : '';
          p.SECONDARY = length>=2 ? e>1 ? g.SECONDARY[e] : e==1 ? t.PRIMARY[10] : '' : '';
          p.TERTIARY = length>=1 ? g.TERTIARY[Math.floor(f/100)%10] : '';
          let o = g.ORDER;
          j = p[o[0]] + p[o[1]] + p[o[2]] + j;
          m += !!p.PRIMARY + !!p.SECONDARY + !!p.TERTIARY;
          p=o = null;
        }
        b = b + j;
        l += m;
        length -= m;
        x -= f*z;
      }
    }
    t=g = null;
    return [b,length,l];
  }
  function B(x,length=6){
    let r;
    let m;
    let s = N.EXPREFIXES[4].SECONDARY;
    if (x===0){
      r = '';
      m = 0;
    }else if (x<s.length){
      r = "[" + s[x] + "]";
      length--;
      m = 1;
    }else{
      let a = L(x-(s.length-10),length,false,true);
      r = "[" + a[0] + "]";
      length = a[1];
      m = a[2];
      a = null;
    }
    return [r,length,m];
  }
  function L(x,length=6,lowest=true,nest=false){
    let e = nest ? OmegaNum(x) : x.log10().div(3).floor().sub(1);
    let r;
    let l;
    if (e.lt(1e3)){
      let a = P(1,Number(e),length,lowest);
      r = a[0];
      length = a[1];
      l = a[2];
      a = null;
    }else if (e.lt("e3000")){
      r = '';
      l = 0;
      let q = e.clone();
      while (length>0&&q.gt(0)){
        let j = '';
        let f = q.log10().div(3).floor().toNumber();
        let g = OmegaNum.pow(10,f*3);
        if (q.lt(g)){
          f--;
          g = OmegaNum.pow(10,f*3);
        }
        let z = q.div(g).floor().toNumber();
        let a = P(2,f,length);
        j = a[0];
        length = a[1];
        l += a[2];
        if (f>0){
          j += "-";
        }
        if (z>1 || f===0){
          a = P(1,z,length,f===0);
          j = a[0] + j;
          length = a[1];
          l += a[2];
        }
        a = null;
        r += j;
        q = q.sub(g.mul(z));
      }
      q = null;
    }else if (e.lt("ee3e81")){
      r = '';
      l = 0;
      let q = e.div(3).log10().floor();
      while (length>0&&q.gt(0)){
        let j = '';
        let f = q.log10().div(3).floor().toNumber();
        let g = OmegaNum.pow(10,f*3);
        if (q.lt(g)){
          f--;
          g = OmegaNum.pow(10,f*3);
        }
        let z = q.div(g).floor().toNumber();
        let a = P(3,f,length);
        j = a[0];
        length = a[1];
        l += a[2];
        if (f>0){
          j = "\"" + j + "\"";
        }
        if (z>1 || f===0){
          a = P(2,z,length,f===0);
          j = a[0] + j;
          length = a[1];
          l += a[2];
        }
        j += "-"
        a = null;
        r += j;
        q = q.sub(g.mul(z));
      }
      q = null;
    }else if (e.lt("ee3e"+(Number.MAX_SAFE_INTEGER+(N.EXPREFIXES[4].SECONDARY.length-10))*3)){
      r = '';
      l = 0;
      let q = e.log10().log10().div(3).floor();
      while (length>0&&q.gt(0)){
        let j = '';
        let f = q.log10().div(3).floor().toNumber();
        let g = OmegaNum.pow(10,f*3);
        if (q.lt(g)){
          f--;
          g = OmegaNum.pow(10,f*3);
        }
        let z = q.div(g).floor().toNumber();
        let a = B(f,length);
        j = a[0];
        length = a[1];
        l += a[2];
        if (f>0){
          j = "\"" + j + "\"";
        }
        if (z>1 || f===0){
          a = P(3,z,length,f===0);
          j = a[0] + j;
          length = a[1];
          l += a[2];
        }
        j += "-"
        a = null;
        r += j;
        q = q.sub(g.mul(z));
      }
      q = null;
    }else{//if (e.lt("ee3e"+(Number.MAX_SAFE_INTEGER*N.EXPREFIXES[4].SECONDARY.length))){
      let a = L(e.log10().log10().div(3).log10().div(3).floor(),length-1,false,true);
      let m = a instanceof Array ? a[0] : a;
      r = "[" + m + "]";
      a=m = null;
    }
    e = null;
    return nest ? [r,length,l] : r;
  }
  function M(num,length=6){
    let x = OmegaNum(num);
    let r;
    if (x.lt(1e6)){
      r = Number(x.toNumber().toFixed(2));
    }else if (x.lt("e"+Number.MAX_SAFE_INTEGER*3)){
      r = Number(x.div(OmegaNum.pow(10,x.log10().div(3).floor().mul(3))).toNumber().toFixed(2)) + L(x,length);
    }else if (x.lt("10^^20")){
      r = L(x,length);
    }else{
      r = N.log(x);
    }
    return r;
  }
  return M;
})();

//N.ext
//Code by Naruyoko
//Uses scope to prevent contamination
N.exs = (function (){
  function P(tier,index,length=6,lowest=true){
    let x = Math.floor(index);
    let t = N.EXEXPREFIXES[tier];
    let r;
    let l;
    if (lowest&&t.SPECIAL.hasOwnProperty(x)){
      r = length>=1 ? t.SPECIAL[x] : '';
      l = !!r;
    }else{
      let p = {};
      p.PRIMARY = length>=3 ? t.PRIMARY[x%10] : '';
      p.SECONDARY = length>=2 ? t.SECONDARY[Math.floor(x/10)%10] : '';
      p.TERTIARY = length>=1 ? t.TERTIARY[Math.floor(x/100)%10] : '';
      let o = t.ORDER;
      r = p[o[0]] + p[o[1]] + p[o[2]];
      l = !!p.PRIMARY + !!p.SECONDARY + !!p.TERTIARY;
      p=o = null;
    }
    t = null;
    length -= l;
    return [r,length];
  }
  function L(tier,index,length=6){
    let x = index.floor();
    let r;
    if (tier===0){
      let a = L(1,x.log10().div(3).sub(1));
      r = a[0];
      length = a[1];
      a = null;
    }else{
      r = '';
      while (length>0 && x.gt(0)){
        let j = '';
        let f = x.log10().div(3).floor();
        let g = OmegaNum.pow(10,f.mul(3));
        if (x.lt(g)){
          f = f.sub(1);
          g = OmegaNum.pow(10,f.mul(3));
        }
        let z = x.div(g).floor().toNumber();
        if (f.gt(0)){
          let a = L(tier+1,f,length);
          j = a[0];
          length = a[1];
          a = null;
        }
        if (z>1||f.eq(0)){
          let a = P(tier,z,length,f.eq(0));
          let k = a[0];
          if (!j||!k){
            j = k + j;
          }else{
            j = N.EXEXPREFIXES[tier+1].COEFF.replace('T',j).replace('C',k);
          }
          length = a[1];
          a = null;
        }
        if (r){
          r = N.EXEXPREFIXES[tier+1].SMALL.replace('T',r).replace('S',j);
        }else{
          r += j;
        }
        x = x.sub(g.mul(z));
      }
    }
    return [r,length];
  }
  function M(num,length=6){
    let x = OmegaNum(num);
    let r;
    if (x.lt(1e3)){
      r = Number(x.toNumber().toFixed(2));
    }else if (x.lt(1e9)){
      let e = x.log10().floor();
      r = Number(x.div(OmegaNum.pow(10,e)).toNumber().toFixed(2)) + N.EXEXPREFIXES[0].LOWEST[e];
      e = null;
    }else if (x.lt("e"+Number.MAX_SAFE_INTEGER*3)){
      r = Number(x.div(OmegaNum.pow(10,x.log10().div(3).floor().mul(3))).toNumber().toFixed(2)) + L(0,x,length)[0];
    }else if (x.lt("E3000.4771212547195773368#11")){
      r = L(0,x,length)[0];
    }else{
      r = N.log(x);
    }
    return r;
  }
  return M;
})();

N.msc = function(num) {
  let x = new OmegaNum(num);
  if (x.lt(1e15)) {
    return N.exs(x);
  } else {
    return N.sci(x);
  }
}

N.men = function(num) {
  let x = new OmegaNum(num);
  if (x.lt(1e15)) {
    return N.exs(x);
  } else {
    return N.eng(x);
  }
}

N.mlg = function(num) {
  let x = new OmegaNum(num);
  if (x.lt(1e15)) {
    return N.exs(x);
  } else {
    return N.log(x);
  }
}

N.uar = function(num) {
  let x = new OmegaNum(num).floor();
  let a = x.array;
  let l = a.length;
  
  if (l == 1) {
    if (x.lt(1e6)) {
      return x.toString();
    } else {
      let exponent = x.log10().floor();
      let mantissa = x.div(OmegaNum.pow(10, exponent)).floor();
      return (mantissa.toString() == '1' ? '' : (mantissa.toString() + '&times;')) + '10&uarr;' + exponent.toString();
    }
  } else if (l == 2) {
    if (x.log10().lt(1e6)) {
      let exponent = x.log10().floor();
      let mantissa = x.div(OmegaNum.pow(10, exponent)).floor();
      return (mantissa.toString() == '1' ? '' : (mantissa.toString() + '&times;')) + '10&uarr;' + exponent.toString();
    } else {
      if (a[1] < 4) {
        if (N.uar(x.log10().floor()).search('&times;') != -1) {
          return '10&uarr;' + N.uar(x.log10().floor()).replace(/^\d/, '').replace('&times;', '');
        }
        return '10&uarr;' + N.uar(x.log10().floor());
      } else {
        if (((a[1] + 1) < 1e6 ? (a[1] + 1).toString() : N.uar(a[1] + 1)).search('&times;') != -1) {
          return '10&uarr;&uarr;' + ((a[1] + 1) < 1e6 ? (a[1] + 1) : N.uar(a[1] + 1)).replace(/^\d/, '').replace('&times;', '');
        }
        return '10&uarr;&uarr;' + ((a[1] + 1) < 1e6 ? (a[1] + 1) : N.uar(a[1] + 1));
      }
    }
  } else {
    return num.toString();
  }
}

N.chn = function(num) {
  let x = new OmegaNum(num).floor();
  let a = x.array;
  let l = a.length;
  
  if (l == 1) {
    if (x.lt(1e6)) {
      return x.toString();
    } else {
      let exponent = x.log10().floor();
      let mantissa = x.div(OmegaNum.pow(10, exponent)).floor();
      return (mantissa.toString() == '1' ? '' : mantissa.toString() + '&times;') + '10&rarr;' + exponent.toString() + '';
    }
  } else if (l == 2) {
    if (x.log10().lt(1e6)) {
      let exponent = x.log10().floor();
      let mantissa = x.div(OmegaNum.pow(10, exponent)).floor();
      return (mantissa.toString() == '1' ? '' : mantissa.toString() + '&times;') + '10&rarr;' + exponent.toString() + '';
    } else {
      if (a[1] < 4) {
        if (N.chn(x.log10().floor()).search('&times;') != -1) {
          return '10&rarr;(' + N.chn(x.log10().floor()).replace(/^\d/, '').replace('&times;', '') + ')';
        }
        return '10&rarr;(' + N.chn(x.log10().floor()) + ')';
      } else {
        if (N.chn(a[1] + 1).search('&times;') != -1) {
          return '10&rarr;' + ((a[1] + 1) < 1e6 ? (a[1] + 1) : ('(' + N.chn(a[1] + 1).replace(/^\d/, '').replace('&times;', '') + ')')) + '&rarr;2';
        }
        return '10&rarr;' + ((a[1] + 1) < 1e6 ? (a[1] + 1) : ('(' + N.chn(a[1] + 1) + ')')) + '&rarr;2';
      }
    }
  } else {
    return num.toString();
  }
}

N.ban = function(num) {
  let x = new OmegaNum(num).floor();
  let a = x.array;
  let l = a.length;
  
  if (l == 1) {
    if (x.lt(1e6)) {
      return x.toString();
    } else {
      let exponent = x.log10().floor();
      let mantissa = x.div(OmegaNum.pow(10, exponent)).floor();
      return (mantissa.toString() == '1' ? '' : mantissa.toString() + '&times;') + '{10, ' + exponent.toString() + '}';
    }
  } else if (l == 2) {
    if (x.log10().lt(1e6)) {
      let exponent = x.log10().floor();
      let mantissa = x.div(OmegaNum.pow(10, exponent)).floor();
      return (mantissa.toString() == '1' ? '' : mantissa.toString() + '&times;') + '{10, ' + exponent.toString() + '}';
    } else {
      if (a[1] < 4) {
        return '{10, ' + N.ban(x.log10().floor()).replace(/^\d/, '').replace('&times;', '') + '}';
      } else {
        return '{10, ' + ((a[1] + 1) < 1e6 ? (a[1] + 1) : N.ban(a[1] + 1)) + ', 2}';
      }
    }
  } else {
    return num.toString();
  }
}

N.hyp = function(num) {
	let x = new OmegaNum(num).floor();
	let a = [...x.array];
	if (x.lt(1e6)) {
		return x.toString();
	}
	if (x.lt('ee6')) {
		if (a[1] == 1) {
			return 'E' + Math.floor(a[0]);
		} else {
			return 'E' + Math.floor(Math.log10(a[0]));
		}
	}
	let str = 'E';
	for (let i = 2; i < a.length; i++) {
		a[i]++;
	}
	if (a[0] < 1e6) {
		str += Math.floor(a[0]);
	} else {
		a[1]++;
		str += Math.floor(Math.log10(a[0]));
	}
	for (let i = 1; i < a.length; i++) {
		str += '#';
		if (a[i] < 1e6) {
			str += Math.floor(a[i]);
		} else {
			str += 'E' + Math.floor(Math.log10(a[i]));
		}
	}
	return str;
}

N.inf = function(num) {
  let x = new OmegaNum(num).floor();
  if (x.gt("10^^12")){
    return x.toString();
  } else if (x.gt(1e6)) {
    let flr = x.logBase(1.79e308).mul(1000).floor().div(1000);
    if (flr.lt(1e6)) {
      return flr.toNumber().toFixed(3) + '&infin;';
    } else {
      return N.inf(flr) + '&infin;';
    }
  } else {
    return N.sci(x);;
  }
}

N.tin = function(num) {
  let x = new OmegaNum(num).floor();
  if (x.gt("10^^24")){
    return x.toString();
  } else if (x.gt('ee310')) {
    let flr = x.logBase(1.79e308).logBase(1.79e308).mul(1000).floor().div(1000);
    if (flr.lt('ee311')) {
      return N.inf(flr) + '&Omega;';
    } else {
      return N.tin(flr) + '&Omega;';
    }
  } else {
    return N.inf(x);
  }
}