var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');
var compositingSelect = document.getElementById('compositingSelect');

function drawText() {
  context.save();
  context.shadowColor = 'rgba(100,100,150,0.8)';
  context.shadowOffsetX = 5;
  context.shadowOffsetY = 5;
  context.shadowBlur = 10;
  context.fillStyle = 'cornflowerblue';

  context.fillText('HTML5', 20, 250);
  context.strokeStyle = 'yellow';
  context.strokeText('HTML5', 20, 250);
  context.restore();
}

// window坐标转换成canvas坐标
function windowToCavnas(x, y) {
  var bbox = canvas.getBoundingClientRect();
  return {
    x: x - bbox.left * (canvas.width / bbox.width),
    y: y - bbox.top * (canvas.height / bbox.height)
  };
}

canvas.onmousemove = function (e) {
  var loc = windowToCavnas(e.clientX, e.clientY);
  context.clearRect(0, 0, canvas.width, canvas.height);
  drawText();
  context.save();
  context.globalCompositeOperation = compositingSelect.value;
  context.beginPath();
  context.arc(loc.x, loc.y, 100, 0, Math.PI * 2, false);
  context.fillStyle = 'orange';
  context.stroke();
  context.fill();
  context.restore();
}

// compositingSelect.selectedIndex = 3;
// context.lineWidth = 0.5;
context.font = '128pt Comic-sans';
drawText();