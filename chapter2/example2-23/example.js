var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');
var ARROW_MARGIN = 30;
var POINT_RADIUS = 7;
var points = [
  { x: canvas.width - ARROW_MARGIN, y: canvas.height - ARROW_MARGIN },
  { x: canvas.width - ARROW_MARGIN * 2, y: canvas.height - ARROW_MARGIN },
  { x: POINT_RADIUS, y: canvas.height / 2 },
  { x: ARROW_MARGIN, y: canvas.height / 2 - ARROW_MARGIN },
  { x: canvas.width - ARROW_MARGIN, y: ARROW_MARGIN },
  { x: canvas.width - ARROW_MARGIN, y: ARROW_MARGIN * 2 }
];

function drawPoint(x, y, strokeStyle, fillStyle) {
  context.beginPath();
  context.fillStyle = fillStyle;
  context.strokeStyle = strokeStyle;
  context.lineWidth = 0.5;
  context.arc(x, y, POINT_RADIUS, 0, Math.PI * 2, false);
  context.fill();
  context.stroke();
}

function drawBezierPoints() {
  var strokeStyle;
  var fillStyle;
  for (var i = 0; i < points.length; i++) {
    fillStyle = i % 2 === 0 ? 'white' : 'blue'; // 白色为控制点
    strokeStyle = i % 2 === 0 ? 'blue' : 'white';
    drawPoint(points[i].x, points[i].y, strokeStyle, fillStyle);
  }
}

function drawArrow() {
  context.strokeStyle = 'white';
  context.fillStyle = 'cornflowerblue';

  context.moveTo(canvas.width - ARROW_MARGIN, ARROW_MARGIN * 2);

  context.fill();
  context.stroke();
}

context.clearRect(0, 0, canvas.width, canvas.height);
drawArrow();
drawBezierPoints(); {

}