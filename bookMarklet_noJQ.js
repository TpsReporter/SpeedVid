javascript:(function(){

if(window.speedVidHighlander) {
	log("SpeedVid already loaded.");
	return;
}

 /* code from test page */

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

function log(msg){
  /*var out = document.getElementById("out");
  out.innerText = msg;*/
  console.log(msg);
}

const speedStep = 1.1;

function onPlus() {
  vid().playbackRate *= speedStep;
  log(vid().playbackRate);
}

function onMinus() {
  vid().playbackRate /= speedStep;
  log(vid().playbackRate);
}

function onZero() {
  vid().playbackRate = 1;
  log(vid().playbackRate);
}

function onLeftBracket() {
  vid().currentTime -= 5;
  log(vid().currentTime);
}

function onRightBracket() {
  vid().currentTime += 5;
  log(vid().currentTime);
}

function onPause() {
  vid().pause();
  log(vid().currentTime);
}

function onPlay() {
  vid().play();
  log(vid().currentTime);
}

/* code from test page */

document.addEventListener("keydown", keyDownForVideo, false);
window.speedVidHighlander = true;
log("Speed vid loaded...")

})();