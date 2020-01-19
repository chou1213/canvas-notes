var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');
var image = new Image();
var gradient = context.createLinearGradient(0, 0, canvas.width, canvas.height);
var parent;
var text = 'HTML5';

function drawGradientText() {
  context.fillStyle = gradient;
  context.fillText(text, 65, 200);
  context.strokeText(text, 65, 200);
}

function drawPatternText() {
  context.fillStyle = parent;
  context.fillText(text, 65, 350);
  context.strokeText(text, 65, 350);
}

image.onload = function () {
  parent = context.createPattern(image, 'repeat');
  drawPatternText();
}

image.src = 'redball.png';

context.font = '128px palatino';
context.strokeStyle = 'cornflowerblue';

context.shadowColor = 'rgba(100,100,150,0.8)';
context.shadowOffsetX = 5;
context.shadowOffsetY = 5;
context.shadowBlur = 10;

gradient.addColorStop(0, 'blue');
gradient.addColorStop(0.25, 'blue');
gradient.addColorStop(0.5, 'white');
gradient.addColorStop(0.75, 'red');
gradient.addColorStop(1, 'yellow');

drawGradientText();
drawPatternText();