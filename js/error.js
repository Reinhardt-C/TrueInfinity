var errorPopped = false
function errorTest(){
   notexist();
}
window.addEventListener("error",function(event){
  errorPopped = true
  if (document.getElementById("errC").childNodes.length>=5) return;
  var n=document.createElement("div");
  var idnum=Math.random()*56800235584;
  var id="";
  for (var i=0;i<6;i++,idnum/=62) id+="0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"[idnum%62];
  n.id="err_"+id;
  n.className="errorblock";
  var m=document.createElement("textarea");
  m.id="err_"+id+"_c";
  m.style.display="none";
  m.value=event.message;
  if (event.fileName) m.value+="\nat "+event.fileName;
  if (event.lineno) m.value+=":"+event.lineno;
  if (event.colno) m.value+=":"+event.colno;
  if (event.error){
    m.value+="\n==Details==";
    m.value+="\nMessage: "+event.error.message;
    m.value+="\nName: "+event.error.name;
    if (event.error.stack) m.value+="\nStack trace: \n"+event.error.stack;
  }else{
    m.value+="\nError object was not fed";
  }
  n.appendChild(m);
  m=document.createElement("div");
  m.innerHTML=event.message.split(":")[1]+"<br/>Click to copy details";
  m.style.width="160px";
  m.style.overflow="hidden";
  m.style.float="left";
  m.onclick=new Function("var e=document.getElementById(\"err_"+id+"_c\");e.style.display=\"\";e.select();e.setSelectionRange(0,99999);document.execCommand(\"copy\");e.style.display=\"none\";e=null;");
  n.appendChild(m);
  m=document.createElement("button");
  m.innerHTML="✕";
  m.style.width="5px";
  m.style.height="5px";
  m.style.float="right";
  m.style.marginRight='10px';
  m.style.border='0px';
  m.style.backgroundColor='#f33';
  m.onclick=new Function("document.getElementById(\"errC\").removeChild(document.getElementById(\"err_"+id+"\"));if (document.getElementById(\"errC\").childNodes.length===0) document.getElementById(\"err\").style.display=\"none\";");
  n.appendChild(m);
  m=document.getElementById("errC");
  m.style.display="flex";
  m.style.flexDirection="column";
  m.prepend(n);
  m=n=null;
});