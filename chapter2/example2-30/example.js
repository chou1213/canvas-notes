var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');
var strokeStyleSelect = document.getElementById('strokeStyleSelect');
var guidewireCheckbox = document.getElementById('guidewireCheckbox');
var eraseAllButton = document.getElementById('eraseAllButton');
var instructions = document.getElementById('instructions');
var instructionsOkayButton = document.getElementById('instructionsOkayButton');
var instructionsNoMoreButton = document.getElementById('instructionsNoMoreButton');
var guidewires = guidewireCheckbox.checked;
var rubberbandRect = {}; // 保存由对角线形成的矩形框
var drawingSurfaceImageData; // 记录空白画布的图像像素
var dragging = false; // 标识鼠标点击的状态
var editing = false; // 是否编辑模式
var mousedown = {};
var endPoints = []; // 结束点
var controlPoints = []; // 控制点
var CONTROL_POINT_STROKE_STYLE = 'blue';
var CONTROL_POINT_FILL_STYLE = 'rgba(255,255,0,0.5)';
var END_POINT_STROKE_STYLE = 'navy';
var END_POINT_FILL_STYLE = 'rgba(0,255,0,0.5)';
var POINT_RADIUS = 5;
var draggingPoint = null;
var showInstructions = false;

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

// window坐标转换成canvas坐标
function windowToCavnas(x, y) {
  var bbox = canvas.getBoundingClientRect();
  return {
    x: x - bbox.left * (canvas.width / bbox.width),
    y: y - bbox.top * (canvas.height / bbox.height)
  };
}

// 获取canvas图像像素，放回imageData对象
function saveDrawingSurface() {
  drawingSurfaceImageData = context.getImageData(0, 0, canvas.width, canvas.height);
}

// 把图像像素绘制到画布
function restoreDrawingSurface() {
  context.putImageData(drawingSurfaceImageData, 0, 0);
}

// 更新橡皮筋矩形框
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
  console.log(rubberbandRect);
}

// 绘制三次贝塞尔曲线
function drawBezierCurve() {
  context.beginPath();
  context.moveTo(endPoints[0].x, endPoints[0].y);
  context.bezierCurveTo(controlPoints[0].x, controlPoints[0].y, controlPoints[1].x, controlPoints[1].y, endPoints[1].x, endPoints[1].y);
  context.stroke();
}

// 把橡皮筋矩形坐标转为结束点和控制点
function updateEndAndControlPoints() {
  endPoints = [
    { x: rubberbandRect.left, y: rubberbandRect.top },
    { x: rubberbandRect.left + rubberbandRect.width, y: rubberbandRect.top + rubberbandRect.height }
  ];

  controlPoints = [
    { x: rubberbandRect.left, y: rubberbandRect.top + rubberbandRect.height },
    { x: rubberbandRect.left + rubberbandRect.width, y: rubberbandRect.top }
  ];

}

// 把橡皮筋矩形坐标转为结束点和控制点,然后绘制贝塞尔曲线
function drawRubberbandShape(loc) {
  updateEndAndControlPoints();
  drawBezierCurve();
}

// 绘制橡皮筋矩形，以及绘制贝塞尔曲线
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

// 创建控制点的路径
function drawControlPoint(index) {
  context.beginPath();
  context.arc(controlPoints[index].x, controlPoints[index].y, POINT_RADIUS, 0, Math.PI * 2, false);
  context.stroke();
  context.fill();
}

// 绘制控制点
function drawControlPoints() {
  context.save();
  context.strokeStyle = END_POINT_STROKE_STYLE;
  context.fillStyle = END_POINT_FILL_STYLE;
  drawControlPoint(0);
  drawControlPoint(1);
  context.stroke();
  context.fill();
  context.restore();
}

// 创建结束点的路径
function drawEndPoint(index) {
  context.beginPath();
  context.arc(endPoints[index].x, endPoints[index].y, POINT_RADIUS, 0, Math.PI * 2, false);
  context.stroke();
  context.fill();
}

// 绘制结束点
function drawEndPoints() {
  context.save();
  context.strokeStyle = CONTROL_POINT_STROKE_STYLE;
  context.fillStyle = CONTROL_POINT_FILL_STYLE;
  drawEndPoint(0);
  drawEndPoint(1);
  context.stroke();
  context.fill();
  context.restore();

}

// 绘制控制点和结束点
function drawControlAndEndPoints() {
  drawControlPoints();
  drawEndPoints();
}

// 判断鼠标是否在结束点路径中
function cursorInEndPoint(loc) {
  var pt;
  endPoints.forEach(function (points) {
    context.beginPath();
    context.arc(points.x, points.y, POINT_RADIUS, 0, Math.PI * 2, false);
    if (context.isPointInPath(loc.x, loc.y)) {
      pt = points;
    }
  })
  return pt;
}

// 判断鼠标是否在控制点路径中
function cursorInControlPoint(loc) {
  var pt;
  controlPoints.forEach(function (points) {
    context.beginPath();
    context.arc(points.x, points.y, POINT_RADIUS, 0, Math.PI * 2, false);
    if (context.isPointInPath(loc.x, loc.y)) {
      pt = points;
    }
  })
  return pt;
}

function updateDraggingPoint(loc) {
  draggingPoint.x = loc.x;
  draggingPoint.y = loc.y;
}

canvas.onmousedown = function (e) {
  var loc = windowToCavnas(e.clientX, e.clientY);
  e.preventDefault();

  if (!editing) {
    saveDrawingSurface();
    mousedown.x = loc.x;
    mousedown.y = loc.y;
    updateRubberbandRectangle(loc);
    dragging = true;
  } else {
    draggingPoint = cursorInControlPoint(loc);
    if (!draggingPoint) {
      draggingPoint = cursorInEndPoint(loc)
    }
  }
}

canvas.onmousemove = function (e) {
  var loc = windowToCavnas(e.clientX, e.clientY);
  e.preventDefault();
  if (dragging || draggingPoint) {
    restoreDrawingSurface();
    if (guidewires) {
      drawGuidewires(loc.x, loc.y);
    }
  }

  if (dragging) {
    updateRubberband(loc);
    drawControlAndEndPoints();
  } else if (draggingPoint) {
    updateDraggingPoint(loc);
    drawControlAndEndPoints();
    drawBezierCurve();
  }
}

canvas.onmouseup = function (e) {
  var loc = windowToCavnas(e.clientX, e.clientY);
  e.preventDefault();
  restoreDrawingSurface();
  console.log(endPoints, controlPoints);
  if (!editing) {
    updateRubberband(loc);
    drawControlAndEndPoints();
    dragging = false;
    editing = true;
    if (showInstructions) {
      instructions.style.display = 'inline';
    }
  } else {
    if (draggingPoint) {
      drawControlAndEndPoints();
    } else {
      editing = false;
      drawBezierCurve();
      draggingPoint = null;
    }
  }
}

eraseAllButton.onclick = function () {
  context.clearRect(0, 0, canvas.width, canvas.height);
  drawGrid('lightgray', 10, 10);
  saveDrawingSurface();
  editing = false;
  dragging = false;
  draggingPoint = null;
}

strokeStyleSelect.onchange = function (e) {
  context.strokeStyle = strokeStyleSelect.value;
}

guidewireCheckbox.onchange = function (e) {
  guidewires = guidewireCheckbox.checked;
}

instructionsOkayButton.onclick = function () {
  instructions.style.display = 'none';
}

instructionsNoMoreButton.onclick = function () {
  instructions.style.display = 'none';
  showInstructions = false;
}

context.strokeStyle = strokeStyleSelect.value;
drawGrid('lightgray', 10, 10);
