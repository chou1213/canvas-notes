var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');

function drawText() {
  context.save();
  context.shadowColor = '';
  context.shadowOffsetX = 5;
  context.shadowOffsetY = 5;
  context.shadowBlur = 10;

  context.fillStyle = 'cornflowerblue';
  context.fillText('HTML5', 20, 250);
  context.strokeStyle = 'yellow';
  context.strokeText('HTML5', 20, 250);
  context.restore();
}

function setClippingRegion(radius) {
  context.beginPath();
  context.arc(canvas.width / 2, canvas.height / 2, radius, 0, Math.PI * 2, false);
  context.clip();
}

function fillCanvas(color) {
  context.fillStyle = color;
  context.fillRect(0, 0, canvas.width, canvas.height);
}

function endAnimation(loop) {
  clearInterval(loop);
  setTimeout(function (e) {
    context.clearRect(0, 0, canvas.width, canvas.height);
    drawText();
  }, 1000);
}

function drawAnimationFrame(radius) {
  setClippingRegion(radius);
  fillCanvas('lightgray');
  drawText();
}

function animation() {
  var radius = canvas.width / 2;
  var loop = window.setInterval(function () {
    radius -= canvas.width / 100;
    fillCanvas('charcoal');
    if (radius > 0) {
      context.save();
      drawAnimationFrame(radius);
      context.restore();
    } else {
      endAnimation(loop);
    }
  }, 16);
}

canvas.onmousedown = function (e) {
  animation();
}

context.lineWidth = 0.5;
context.font = '128pt Comic-sans';
drawText();