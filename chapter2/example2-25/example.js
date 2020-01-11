var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');
var sidesSelect = document.getElementById('sidesSelect');
var startAngleSelect = document.getElementById('startAngleSelect');
var fillCheckbox = document.getElementById('fillCheckbox');
var eraseAllButton = document.getElementById('eraseAllButton');
var mousedown = {};
var rubberbandRect = {};
var Point = function (x, y) {
  this.x = x;
  this.y = y;
}

// window坐标转换成canvas坐标
function windowToCanvas(x, y) {
  var bbox = canvas.getBoundingClientRect();
  return {
    x: x - bbox.left * (canvas.width / bbox.width),
    y: y - bbox.top * (canvas.height / bbox.height)
  };
}

function getPolygonPoints(centerX, centerY, radius, sides, startAngle) {
  var points = [];
  var angle = startAngle || 0;
  for (var i = 0; i < sides; i++) {
    console.log(centerX + radius * Math.cos(angle), centerY - radius * Math.sin(angle));
    points.push(new Point(centerX + radius * Math.cos(angle), centerY - radius * Math.sin(angle)));
    angle += 2 * Math.PI / sides;
  }
  return points;
}

function createPolgonPath(centerX, centerY, radius, sides, startAngle) {
  var points = getPolygonPoints(centerX, centerY, radius, sides, startAngle);
  context.beginPath();
  context.moveTo(points[0].x, points[0].y);
  for (var i = 1; i < points.length; i++) {
    context.lineTo(points[i].x, points[i].y);
  }
  context.closePath();
}

function drawRubberbandShap() {
  createPolgonPath(mousedown.x, mousedown.y, 50, parseInt(sidesSelect.value), (Math.PI / 180) * parseInt(startAngleSelect.value));
  context.stroke();
  if (fillCheckbox.checked) {
    context.fill();
  }
}

// 清空画布
eraseAllButton.onclick = function () {
  context.clearRect(0, 0, canvas.width, canvas.height);
}

// 点击处理程序
canvas.onmousedown = function (e) {
  var loc = windowToCanvas(e.clientX, e.clientY);
  mousedown = {
    x: loc.x,
    y: loc.y
  };
  e.preventDefault();
  drawRubberbandShap();
}


