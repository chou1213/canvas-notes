var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');
var repeatRadio = document.getElementById('repeatRadio');
var repeatXRadio = document.getElementById('repeatXRadio');
var repeatYRadio = document.getElementById('repeatYRadio');
var norepeatRadio = document.getElementById('norepeatRadio');
var image = new Image();

function fillCanvasWithPattern(repeatString) {
  var pattern = context.createPattern(image, repeatString);
  console.log(pattern)
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.fillStyle = pattern;
  context.fillRect(0, 0, canvas.width, canvas.height);
}

repeatRadio.onclick = function (e) {
  fillCanvasWithPattern('repeat');
}

repeatXRadio.onclick = function (e) {
  fillCanvasWithPattern('repeat-x');
}

repeatYRadio.onclick = function (e) {
  fillCanvasWithPattern('repeat-y');
}

norepeatRadio.onclick = function (e) {
  fillCanvasWithPattern('no-repeat');
}

image.src = "./redball.png";
image.onload = function () {
  fillCanvasWithPattern('repeat');
}