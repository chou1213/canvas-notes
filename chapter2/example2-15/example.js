var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');
var eraseAllButton = document.getElementById('eraseAllButton'); // 重置画布按钮
var strokeStyleSelect = document.getElementById('strokeStyleSelect'); // 下拉菜单
var guidewireCheckbox = document.getElementById('guidewireCheckbox'); // 是否需要辅助线的复选框
var drawingSurfaceImageData;
var mousedown = {}; // 保存鼠标点击的坐标 
var rubberbandRect = {}; // 保存由对角线形成的矩形框
var dragging = false; // 标识鼠标点击的状态
var guidewires = guidewireCheckbox.checked; // 是否需要辅助线

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

// window坐标转换成canvas坐标
function windowToCanvas(x, y) {
  var bbox = canvas.getBoundingClientRect();
  return {
    x: x - bbox.left * (canvas.width / bbox.width),
    y: y - bbox.top * (canvas.height / bbox.height)
  };
}

// 获取canvas图像像素，放回imageData对象
function saveDrawingSurface() {
  drawingSurfaceImageData = context.getImageData(0, 0, canvas.width, canvas.height);
  console.log(drawingSurfaceImageData);
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

// 绘制对角线，传入当前坐标
function drawRubberbandShape(loc) {
  context.beginPath();
  context.moveTo(mousedown.x, mousedown.y);
  context.lineTo(loc.x, loc.y);
  context.stroke();
}

// 聚合绘制对角线方法，绘制矩形的方法
function updateRubberband(loc) {
  updateRubberbandRectangle(loc);
  drawRubberbandShape(loc);
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

// 点击处理程序
canvas.onmousedown = function (e) {
  var loc = windowToCanvas(e.clientX, e.clientY);
  e.preventDefault();
  // 绘制前，记录空白的图片像素，正常是一张空白的画布
  saveDrawingSurface();
  // 记录点击是的坐标
  mousedown.x = loc.x;
  mousedown.y = loc.y;
  dragging = true;  // 记录拖拽的状态
}

// 拖动鼠标的处理程序
canvas.onmousemove = function (e) {
  var loc;
  // 当鼠标状态为允许点击时
  if (dragging) {
    e.preventDefault();
    loc = windowToCanvas(e.clientX, e.clientY);
    // 拖动鼠标绘制对角线，矩形框，辅助线前，用空白的图片像素恢复画布
    restoreDrawingSurface();
    // 绘制对角线，矩形框
    updateRubberband(loc);
    // 判断是否需要辅助线
    if (guidewires) {
      console.log('绘制辅助线');
      drawGuideires(loc.x, loc.y);
    }
  }
}

// 鼠标离开屏幕的处理程序
canvas.onmouseup = function (e) {
  var loc = windowToCanvas(e.clientX, e.clientY);
  // 拖动鼠标绘制对角线，矩形框前，用空白的图片像素恢复画布
  restoreDrawingSurface();
  // 绘制对角线，矩形框
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
  context.strokeStyle = strokeStyleSelect.value;
}

// 监听复选框
guidewireCheckbox.onchange = function () {
  guidewires = guidewireCheckbox.checked;
}

context.strokeStyle = strokeStyleSelect.value;

drawGrid(context, 'lightgray', 10, 10);
