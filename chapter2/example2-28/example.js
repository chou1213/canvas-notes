var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');
var strokeStyleSelect = document.getElementById('strokeStyleSelect'); // 选择边框的颜色
var fillStyleSelect = document.getElementById('fillStyleSelect'); // 选择填充的颜色
var sidesSelect = document.getElementById('sidesSelect'); // 选择边的数量
var startAngleSelect = document.getElementById('startAngleSelect'); // 选择初始角度
var fillCheckbox = document.getElementById('fillCheckbox'); // 是否填充路径的复选框
var eraseAllButton = document.getElementById('eraseAllButton'); // 清空画布的按钮
var guidewireCheckbox = document.getElementById('guidewireCheckbox'); // 是否需要辅助线的复选框
var editCheckbox = document.getElementById('editCheckbox'); // 是否开启编辑模式的复选框
var mousedown = {}; // 记录点击的坐标
var rubberbandRect = {}; // 保存由对角线形成的矩形框
var drawingSurfaceImageData; // 记录空白画布的图像像素
var dragging = false; // 标识鼠标点击的状态
var guidewires = guidewireCheckbox.checked; // 是否需要辅助线
var editing = false; // 是否编辑模式
var polygons = [];
var draggingOffsetX;
var draggingOffsetY;
var sides = sidesSelect.value;
var startAngle = startAngleSelect.value;
var Point = function (x, y) { // 记录多边形每个点
  this.x = x;
  this.y = y;
}

// 多边形构造函数
var Polygon = function (centerX, centerY, radius, sides, startAngle, strokeStyle, fillStyle, filled) {
  this.x = centerX;
  this.y = centerY;
  this.radius = radius;
  this.sides = sides;
  this.startAngle = startAngle;
  this.strokeStyle = strokeStyle;
  this.fillStyle = fillStyle;
  this.filled = filled;
}

Polygon.prototype = {
  getPoints: function () {
    var points = [];
    var angle = this.startAngle || 0;
    for (var i = 0; i < this.sides; i++) {
      points.push(new Point(this.x + this.radius * Math.cos(angle), this.y + this.radius * Math.sin(angle)));
      angle += 2 * Math.PI / this.sides;
    }
    return points;
  },
  createPath: function (context) {
    var points = this.getPoints();
    context.beginPath();
    context.moveTo(points[0].x, points[0].y);
    for (var i = 1; i < this.sides; i++) {
      context.lineTo(points[i].x, points[i].y);
    }
    context.closePath();
  },
  stroke: function (context) {
    context.save();
    this.createPath(context);
    context.strokeStyle = this.strokeStyle;
    context.stroke();
    context.restore();
  },
  fill: function (context) {
    context.save();
    context.fillStyle = this.fillStyle;
    context.fill();
    context.restore();
  },
  move: function (x, y) {
    this.x = x;
    this.y = y;
  }
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
function drawGrid(color, stepx, stepy) {
  context.save()
  context.strokeStyle = color;
  context.lineWidth = 0.5;
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

function drawPolygon(polygon) {
  context.beginPath();
  polygon.createPath(context);
  polygon.stroke(context);
  if (fillCheckbox.checked) {
    polygon.fill(context);
  }
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

function drawRubberbandShape() {
  var polygon = new Polygon(mousedown.x, mousedown.y, rubberbandRect.width, parseInt(sidesSelect.value), parseInt(startAngleSelect.value * (Math.PI / 180)), strokeStyleSelect.value, fillStyleSelect.value, fillCheckbox.checked);
  drawPolygon(polygon);
  if (!dragging) {
    polygons.push(polygon);
  }
}


// 聚合绘制对角线方法，绘制多边形的方法
function updateRubberband(loc) {
  updateRubberbandRectangle(loc);
  drawRubberbandShape();
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
function drawGuidewires(x, y) {
  context.save();
  context.strokeStyle = 'rgba(0,0,230,0.4)';
  context.lineWidth = 0.5;
  drawVerticalLine(x);
  drawHorizontallLine(y);
  context.restore();
}

function drawPolygons() {
  polygons.forEach(function (polygon) {
    drawPolygon(polygon);
  })
}


// 开始拖拽
function startDragging(loc) {
  saveDrawingSurface();
  mousedown = {
    x: loc.x,
    y: loc.y
  };
}

// 设置编辑状态
function startEditing() {
  canvas.style.cursor = 'pointer';
  editing = true;
}

// 取消编辑状态
function stopEditing() {
  canvas.style.cursor = 'crosshair';
  editing = false;
}

// 点击处理程序
canvas.onmousedown = function (e) {
  var loc = windowToCanvas(e.clientX, e.clientY);
  e.preventDefault();
  if (editing) {
    // 遍历多边形数组
    polygons.forEach(function (polygon) {
      polygon.createPath(context);
      // 判断当前鼠标的位置是否在路径中
      if (context.isPointInPath(loc.x, loc.y)) {
        // 设置拖拽状态
        startDragging(loc);
        // 记录被的多边形
        dragging = polygon;
        // 记录鼠标位置与多边形位置的偏移量
        draggingOffsetX = loc.x - polygon.x;
        draggingOffsetY = loc.y - polygon.y;
        return;
      }
    });
  } else {
    startDragging(loc);
    dragging = true;
  }
}
// 拖动鼠标的处理程序
canvas.onmousemove = function (e) {
  var loc = windowToCanvas(e.clientX, e.clientY);
  e.preventDefault();
  if (editing && dragging) {
    // 重置被拖拽多边形的坐标
    dragging.x = loc.x - draggingOffsetX;
    dragging.y = loc.y - draggingOffsetY;
    // 清空画布，重绘网格和所有多边形
    context.clearRect(0, 0, canvas.width, canvas.height);
    drawGrid('lightgray', 10, 10);
    drawPolygons();
  } else {
    if (dragging) {
      restoreDrawingSurface();
      updateRubberband(loc, sides, startAngle);

      if (guidewires) {
        drawGuidewires(mousedown.x, mousedown.y);
      }
    }
  }
}

// 鼠标离开屏幕的处理程序
canvas.onmouseup = function (e) {
  var loc = windowToCanvas(e.clientX, e.clientY);
  e.preventDefault();
  dragging = false;
  if (editing) {

  } else {
    restoreDrawingSurface();
    updateRubberband(loc);
  }
}


// 清空画布
eraseAllButton.onclick = function () {
  context.clearRect(0, 0, canvas.width, canvas.height);
  drawGrid('lightgray', 10, 10); // 重新绘制网格
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

// 是否开启编辑模式复选框
editCheckbox.onchange = function () {
  if (editCheckbox.checked) {
    startEditing();
  } else {
    stopEditing();
  }
}

//初始化
context.strokeStyle = strokeStyleSelect.value;
context.fillStyle = fillStyleSelect.value;

drawGrid('lightgray', 10, 10);
