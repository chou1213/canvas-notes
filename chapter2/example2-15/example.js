var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');
var eraseAllButton = document.getElementById('eraseAllButton');
var strokeStyleSelect = document.getElementById('strokeStyleSelect');
var guidewireCheckbox = document.getElementById('guidewireCheckbox');
var drawingSurfaceImageData;
var mousedown = {};
var rubberbandRect = {};
var dragging = false;
var guidewires = guidewireCheckbox.checked;

// 绘制网格线
function drawGrid(context, color, stepx, stepy) {
  context.strokeStyle = color;
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
}

// window坐标转换成canvas坐标
function windowToCanvas(x, y) {
  var bbox = canvas.getBoundingClientRect();
  // console.log(bbox);
  return {
    x: x - bbox.left * (canvas.width / bbox.width),
    y: y - bbox.top * (canvas.height / bbox.height)
  };
}
// windowToCanvas();


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
}

// 绘制对角线，传入当前坐标
function drawRubberbbandShape(loc) {
  context.beginPath();
  context.moveTo(mousedown.x, mousedown.y);
  context.lineTo(loc.x, loc.y);
  context.stroke();
}

function updateRubberband(loc) {
  updateRubberbandRectangle(loc);
  drawRubberbbandShape(loc);
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

// 
function drawGuideires(x, y) {
  context.save();
  context.strokeStyle = 'rgba(0,0,230,0.4)';
  context.lineWidth = 0.5;
  drawVerticalLine(x);
  drawHorizontallLine(y);
  context.restore();
}

canvas.onmousedown = function (e) {
  var loc = windowToCanvas(e.clientX, e.clientY);
  e.preventDefault();
  saveDrawingSurface();
  mousedown.x = loc.x;
  mousedown.y = loc.y;
  dragging = true;  // 记录拖拽的状态
}

canvas.onmousemove = function (e) {
  var loc;
  if (dragging) {
    e.preventDefault();
    loc = windowToCanvas(e.clientX, e.clientY);
    restoreDrawingSurface();
    updateRubberband(loc);
    if (guidewires) {
      drawGuideires(loc.x, loc.y);
    }
  }
}

canvas.onmouseup = function (e) {
  var loc = windowToCanvas(e.clientX, e.clientY);
  restoreDrawingSurface();
  updateRubberband(loc);
  dragging = false; // 记录拖拽的状态
}

// 清空画布
eraseAllButton.onclick = function () {
  context.clearRect(0, 0, canvas.width, canvas.height);
  drawGrid(context, 'lightgray', 10, 10); // 重新绘制网格
  saveDrawingSurface(); // 记录空画布的图片像素
}

// 选择描边的颜色
strokeStyleSelect.onchange = function (e) {
  context.strokeStyle = e.value;
}

// 监听复选框
guidewireCheckbox.onchange = function () {
  guidewires = guidewireCheckbox.checked;
}

context.strokeStyle = strokeStyleSelect.value;

drawGrid(context, 'lightgray', 10, 10);