window.cnsl = {
  logs: [],
  run: function(input) {
    let x = eval(input);
    document.getElementById('log').innerText += input + '\n' + x + '\n';
    window.cnsl.logs.push(x);
    return x;
  }
}