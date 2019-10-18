var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');
var FONT_HEIGHT = 15;
var MARGIN = 35;
var HAND_TRUNCATION = canvas.width / 25;
var HOUR_HAND_TRUNCATION = canvas.width / 10;
var NUMERAL_SPACING = 20;
var RADIUS = canvas.width / 2 - MARGIN;
var HAND_RADIUS = RADIUS + NUMERAL_SPACING;


//绘制表盘的路径
function drawCircle() {
  context.beginPath();
  context.arc(canvas.width / 2, canvas.height / 2, RADIUS, 0, Math.PI * 2, true);
  context.stroke();
}

//绘制线段
function drawHand(angle, radius) {
  context.moveTo(canvas.width / 2, canvas.height / 2);
  context.lineTo(canvas.width / 2 + Math.cos(angle) * radius, canvas.height / 2 + Math.sin(angle) * radius);
  context.stroke()
}

drawCircle();
drawHand(0, RADIUS - HAND_TRUNCATION); // 0
drawHand(Math.PI * 2 / 60 * 3 - Math.PI / 2, RADIUS - HAND_TRUNCATION); //90


