var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');
var strokeStyleSelect = document.getElementById('strokeStyleSelect');
var fillStyleSelect = document.getElementById('fillStyleSelect');
var sidesSelect = document.getElementById('sidesSelect');
var startAngleSelect = document.getElementById('startAngleSelect');
var fillCheckbox = document.getElementById('fillCheckbox');
var eraseAllButton = document.getElementById('eraseAllButton');
var guidewireCheckbox = document.getElementById('guidewireCheckbox'); // 是否需要辅助线的复选框
var mousedown = {};
var rubberbandRect = {};
var drawingSurfaceImageData;
var dragging = false; // 标识鼠标点击的状态
var guidewires = guidewireCheckbox.checked; // 是否需要辅助线
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

// 绘制网格线
function drawGrid(context, color, stepx, stepy) {
  context.save()
  context.strokeStyle = color;
  // 为什么+0.5，边界原理
  for (var i = stepx + 0.5; i < context.canvas.width; i += stepx) {
    context.beginPath();
    context.moveTo(i, 0);
    context.lineTo(i, context.canvas.height);
    context.stroke();
  }

  for (var i = stepy + 0.5; i < context.canvas.height; i += stepy) {
    context.beginPath();
    context.moveTo(0, i);
    context.lineTo(context.canvas.width, i)
    context.stroke();
  }
  context.restore();
}

function saveDrawingSurface() {
  drawingSurfaceImageData = context.getImageData(0, 0, canvas.width, canvas.height);
}


// 把图像像素绘制到画布
function restoreDrawingSurface() {
  // ImageData ，包含像素值的数组对象。
  // dx
  // 源图像数据在目标画布中的位置偏移量（x 轴方向的偏移量）。
  // dy
  // 源图像数据在目标画布中的位置偏移量（y 轴方向的偏移量）。
  // dirtyX 可选
  // 在源图像数据中，矩形区域左上角的位置。默认是整个图像数据的左上角（x 坐标）。
  // dirtyY 可选
  // 在源图像数据中，矩形区域左上角的位置。默认是整个图像数据的左上角（y 坐标）。
  // dirtyWidth 可选
  // 在源图像数据中，矩形区域的宽度。默认是图像数据的宽度。
  // dirtyHeight 可选
  // 在源图像数据中，矩形区域的高度。默认是图像数据的高度。
  context.putImageData(drawingSurfaceImageData, 0, 0);
}

// 绘制水平线段
function drawHorizontallLine(y) {
  context.beginPath();
  context.moveTo(0, y + 0.5);
  context.lineTo(context.canvas.width, y + 0.5);
  context.stroke();
}

// 绘制垂直线段
function drawVerticalLine(x) {
  context.beginPath();
  context.moveTo(x + 0.5, 0);
  context.lineTo(x + 0.5, context.canvas.height);
  context.stroke();
}

// 聚合绘制垂直和水平辅助线的方法
function drawGuideires(x, y) {
  context.save();
  context.strokeStyle = 'rgba(0,0,230,0.4)';
  context.lineWidth = 0.5;
  drawVerticalLine(x);
  drawHorizontallLine(y);
  context.restore();
}

// 更新矩形的属性
function updateRubberbandRectangle(loc) {
  rubberbandRect.width = Math.abs(loc.x - mousedown.x);
  rubberbandRect.height = Math.abs(loc.y - mousedown.y);

  if (loc.x > mousedown.x) {
    rubberbandRect.left = mousedown.x;
  } else {
    rubberbandRect.left = loc.x;
  }

  if (loc.y > mousedown.y) {
    rubberbandRect.top = mousedown.y;
  } else {
    rubberbandRect.top = loc.y;
  }

  // context.beginPath();
  // context.rect(rubberbandRect.left, rubberbandRect.top, rubberbandRect.width, rubberbandRect.height);
  // context.save();
  // context.strokeStyle = 'red';
  // context.lineWidth = 0.5;
  // context.stroke();
  // context.restore();
}

function getPolygonPoints(centerX, centerY, radius, sides, startAngle) {
  var points = [];
  var angle = startAngle || 0;
  for (var i = 0; i < sides; i++) {
    // console.log(centerX + radius * Math.cos(angle), centerY - radius * Math.sin(angle));
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

function drawRubberbandShape() {
  createPolgonPath(mousedown.x, mousedown.y, rubberbandRect.width / 2, parseInt(sidesSelect.value), (Math.PI / 180) * parseInt(startAngleSelect.value));
  if (fillCheckbox.checked) {
    context.fill();
  }
  context.stroke();
}

// 聚合绘制对角线方法，绘制矩形的方法
function updateRubberband(loc) {
  updateRubberbandRectangle(loc);
  drawRubberbandShape();
}

// 清空画布
eraseAllButton.onclick = function () {
  context.clearRect(0, 0, canvas.width, canvas.height);
  drawGrid(context, 'lightgray', 10, 10); // 重新绘制网格
  saveDrawingSurface(); // 记录空画布的图片像素
}

// 监听复选框
guidewireCheckbox.onchange = function () {
  guidewires = guidewireCheckbox.checked;
}

// 选择描边的颜色
strokeStyleSelect.onchange = function (e) {
  context.strokeStyle = strokeStyleSelect.value;
}

// 监听复选框
fillStyleSelect.onchange = function () {
  context.fillStyle = fillStyleSelect.value;
}

// 点击处理程序
canvas.onmousedown = function (e) {
  var loc = windowToCanvas(e.clientX, e.clientY);
  e.preventDefault();
  mousedown = {
    x: loc.x,
    y: loc.y
  };
  saveDrawingSurface();
  dragging = true;
}

canvas.onmousemove = function (e) {
  var loc;
  if (dragging) {
    e.preventDefault();
    loc = windowToCanvas(e.clientX, e.clientY);
    // 拖动鼠标绘制对角线，矩形框，辅助线前，用空白的图片像素恢复画布
    restoreDrawingSurface();
    // 绘制对角线，矩形框
    updateRubberband(loc);
    // 判断是否需要辅助线
    if (guidewires) {
      drawGuideires(mousedown.x, mousedown.y);
    }
  }
}

canvas.onmouseup = function (e) {
  var loc = windowToCanvas(e.clientX, e.clientY);
  // 拖动鼠标绘制对角线，矩形框前，用空白的图片像素恢复画布
  restoreDrawingSurface();
  // 绘制对角线，矩形框
  updateRubberband(loc);
  dragging = false; // 记录拖拽的状态
}

context.strokeStyle = strokeStyleSelect.value;
context.fillStyle = fillStyleSelect.value;

drawGrid(context, 'lightgray', 10, 10);

