var canvas = document.getElementById('canvas');
var readout = document.getElementById('readout');
var context = canvas.getContext('2d'); // canvas上下文
var spritesheet = new Image();  // 图片对象

function windowToCanvas(canvas, x, y) {
  var bbox = canvas.getBoundingClientRect();
  return {
    x: x - bbox.left * (canvas.width / bbox.width),
    y: y - bbox.top * (canvas.height / bbox.height)
  };
}

// 画线坐标线
function drawBackground() {
  var VERTICAL_LINE_SPACING = 12; // 每条线的间隔
  var i = context.canvas.height; // canvas的高度

  context.clearRect(0, 0, canvas.width, canvas.height);
  context.strokeStyle = "lightGray";  // 填充颜色
  context.lineWidth = 0.5;  // 绘制线的粗细

  while (i > VERTICAL_LINE_SPACING) {
    context.beginPath(); // 创建绘制路径
    context.moveTo(0, i); // 从左下角开始绘制
    context.lineTo(context.canvas.width, i); // 绘制水平横线
    context.stroke(); // 填充路径
    i -= VERTICAL_LINE_SPACING;
  }

}

// 绘制图片到画布
function drawSpritesheet() {
  context.drawImage(spritesheet, 0, 0);
}

// 根据当前坐标，绘制水平和垂直线
function drawGuidelines(x, y) {
  context.strokeStyle = "rgba(0,0,230,0.8)";
  context.lineWidth = 0.5;
  drawVerticalLine(x);
  drawHorizontalLine(y);
}

// 绘制水平线
function drawHorizontalLine(y) {
  context.beginPath();
  context.moveTo(0, 0.5 + y);
  context.lineTo(context.canvas.width, 0.5 + y);
  context.stroke();
}

// 绘制垂直线
function drawVerticalLine(x) {
  context.beginPath();
  context.moveTo(x + 0.5, 0);
  context.lineTo(x + 0.5, context.canvas.height)
  context.stroke();
}

// 打印坐标信息
function updateReadout(x, y) {
  readout.innerText = x.toFixed(0) + ',' + y.toFixed(0);
}

canvas.onmousemove = function (e) {
  var loc = windowToCanvas(canvas, e.clientX, e.clientY);

  drawBackground();
  drawSpritesheet();
  drawGuidelines(loc.x, loc.y);
  updateReadout(loc.x, loc.y);
}

spritesheet.src = "./running-sprite-sheet.png";
spritesheet.onload = function () {
  drawSpritesheet();
}

drawBackground();
