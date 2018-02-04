javascript:(function(){

if(window.speedVidHighlander) {
	log("SpeedVid already loaded.");
	return;
}
  var s = document.createElement("script");
  s.src = "https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js";
  s = document.createElement("script");
  s.src = "https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/toastr.min.js";
  s = document.createElement("script");
  s.src = "https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.20.1/moment.min.js";

 /* code from test page */



var reqs = [
  "https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/toastr.min.js",
  "https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.20.1/moment.min.js",
  "https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js"
];

function keyDownForVideo(e) {
 
  if(!(e.shiftKey && e.ctrlKey)){
    return;
  }
  
  switch(e.key) {
    case "+":
    case "=":
      onPlus();
      break;
      
    case "-":
    case "_":
      onMinus();
      break;

    case ")":
    case "0":
      onZero();
      break;


    case "}":
    case "]":
      onRightBracket();
      break;


    case "{":
    case "[":
      onLeftBracket();
      break;

    case "p":
    case "P":
      onPause();
      break;

    case "o":
    case "O":
      onPlay();
      break;

  }
  
}

function vid() {
  return document.getElementsByTagName("video")[0] || {};
}

function precision(n, p) {
  p = p || 0;
  return Math.round(n * Math.pow(10, p)) / Math.pow(10, p);
}

function timeStr(seconds) {
  var d = moment.duration(seconds, "seconds");
  return moment.utc(d.asMilliseconds()).format("H:mm:ss.SS");
}

function log(msg, subTitle){
  /*var out = document.getElementById("out");
  out.innerText = msg;*/
  console.log(msg);
  toastr.remove();
  toastr.options.closeDuration = 100;
  toastr.options.timeOut = 300; 
  toastr.options.extendedTimeOut = 1000; 
  toastr.info(msg, "Speed Vid" + (subTitle ? " - " + subTitle : ""));
}

const speedStep = 1.1;
const valuePrecision = 2;

function onPlus() {
  vid().playbackRate *= speedStep;
  vid().playbackRate = precision(vid().playbackRate, valuePrecision);
  log(vid().playbackRate, "speed");
}

function onMinus() {
  vid().playbackRate /= speedStep;
  vid().playbackRate = precision(vid().playbackRate, valuePrecision);
  log(vid().playbackRate, "speed");
}

function onZero() {
  vid().playbackRate = 1;
  log(vid().playbackRate, "speed");
}

function onLeftBracket() {
  vid().currentTime -= 5;
  log(timeStr(vid().currentTime), "time");
}

function onRightBracket() {
  vid().currentTime += 5;
  log(timeStr(vid().currentTime), "time");
}

function onPause() {
  vid().pause();
  log(timeStr(vid().currentTime), "paused at");
}

function onPlay() {
  vid().play();
  log(timeStr(vid().currentTime), "resumed at");
}

function loadSpeedVid() {
  var l = document.createElement("link");
  l.href="https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/toastr.min.css";
  l.rel="stylesheet";
  document.body.appendChild(l);

  loadReqs();
}

function loadReqs() {
  if(reqs.length) {
    var req = reqs.pop();
    var s = document.createElement("script");
    s.src = req;

    if (s.addEventListener) {
        s.addEventListener("load", loadReqs, false);
    } else if (s.readyState) {
        s.onreadystatechange = loadReqs;
    }
    document.body.appendChild(s);
  } else {
    loadMain();
  }
}

function loadMain() {
  document.addEventListener("keydown", keyDownForVideo, false);
  log("Speed Vid - loaded");
  window.speedVidHighlander = true;
}

/* code from test page */

loadSpeedVid();

})();