var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');
var strokeStyleSelect = document.getElementById('strokeStyleSelect'); // 选择边框的颜色
var fillStyleSelect = document.getElementById('fillStyleSelect'); // 选择填充的颜色
var sidesSelect = document.getElementById('sidesSelect'); // 选择边的数量
var startAngleSelect = document.getElementById('startAngleSelect'); // 选择初始角度
var fillCheckbox = document.getElementById('fillCheckbox'); // 是否填充路径的复选框
var eraseAllButton = document.getElementById('eraseAllButton'); // 清空画布的按钮
var guidewireCheckbox = document.getElementById('guidewireCheckbox'); // 是否需要辅助线的复选框
var mousedown = {}; // 记录点击的坐标
var rubberbandRect = {}; // 保存由对角线形成的矩形框
var drawingSurfaceImageData; // 记录空白画布的图像像素
var dragging = false; // 标识鼠标点击的状态
var guidewires = guidewireCheckbox.checked; // 是否需要辅助线
var Point = function (x, y) { // 记录多边形每个点
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

// 获取canvas图像像素，放回imageData对象
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

/**
 * 导出多边形的坐标
 * @param {Number} centerX  多边形中心点x坐标
 * @param {Number} centerY  多边形中心点y坐标
 * @param {Number} radius   半径
 * @param {Number} sides    变数
 * @param {Number} startAngle 初始角度
 */
function getPolygonPoints(centerX, centerY, radius, sides, startAngle) {
  var points = [];
  var angle = startAngle || 0;
  for (var i = 0; i < sides; i++) {
    // console.log(1, centerX + radius * Math.cos(angle), centerY - radius * Math.sin(angle));
    points.push(new Point(centerX + radius * Math.cos(angle), centerY - radius * Math.sin(angle)));
    angle += 2 * Math.PI / sides;
  }
  return points;
}

/**
 * 创建多边形的路径
 * @param {Number} centerX  多边形中心点x坐标
 * @param {Number} centerY  多边形中心点y坐标
 * @param {Number} radius   半径
 * @param {Number} sides    变数
 * @param {Number} startAngle 初始角度
 */
function createPolgonPath(centerX, centerY, radius, sides, startAngle) {
  var points = getPolygonPoints(centerX, centerY, radius, sides, startAngle);
  context.beginPath();
  context.moveTo(points[0].x, points[0].y);
  for (var i = 1; i < points.length; i++) {
    context.lineTo(points[i].x, points[i].y);
  }
  context.closePath();
}

// 给多边形路径描边和填充
function drawRubberbandShape() {
  // 中心点，用鼠标的起始点，半径用橡皮筋矩形的宽度，初始角度需要角度转弧度
  createPolgonPath(mousedown.x, mousedown.y, rubberbandRect.width, parseInt(sidesSelect.value), (Math.PI / 180) * parseInt(startAngleSelect.value));
  // 判断是否需要填充
  if (fillCheckbox.checked) {
    context.fill();
  }
  context.stroke();
}

// 聚合绘制对角线方法，绘制多边形的方法
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

// 选择填充的颜色
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

// 移动处理程序
canvas.onmousemove = function (e) {
  var loc;
  if (dragging) {
    e.preventDefault();
    loc = windowToCanvas(e.clientX, e.clientY);
    // 拖动鼠标绘制对角线，矩形框，辅助线前，用空白的图片像素恢复画布
    restoreDrawingSurface();
    // 绘制对角线，多边形
    updateRubberband(loc);
    // 判断是否需要辅助线
    if (guidewires) {
      drawGuideires(mousedown.x, mousedown.y);
    }
  }
}

// 弹起处理程序
canvas.onmouseup = function (e) {
  var loc = windowToCanvas(e.clientX, e.clientY);
  // 拖动鼠标绘制对角线，矩形框前，用空白的图片像素恢复画布
  restoreDrawingSurface();
  // 绘制对角线，多边形
  updateRubberband(loc);
  dragging = false; // 记录拖拽的状态
}

// 设置初始时边框的颜色，和填充的颜色
context.strokeStyle = strokeStyleSelect.value;
context.fillStyle = fillStyleSelect.value;

drawGrid(context, 'lightgray', 10, 10);

