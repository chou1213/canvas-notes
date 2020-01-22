var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');
var image = new Image();
var resetButton = document.getElementById('resetButton');
var imageData;
var mouseDown = {};
var rubberbandRectangle = {};
var dragging = false;

function windowToCanvas(canvas, x, y) {
  var canvasRectangle = canvas.getBoundingClientRect();
  return {
    x: x - canvasRectangle.left,
    y: y - canvasRectangle.top
  };
}

// 获取整个画布图形像素
function captureRubberbandPixels() {
  imageData = context.getImageData(0, 0, canvas.width, canvas.height);
  console.log(imageData);
}

// 根据橡皮筋的尺寸设置脏矩形，擦除画布
function restoreRubberbandPixels() {
  var deviceWidthOverCssPixels = imageData.width / canvas.width;
  var deviceHeightOverCssPixels = imageData.height / canvas.height;
  context.putImageData(imageData, 0, 0, rubberbandRectangle.left, rubberbandRectangle.top,
    rubberbandRectangle.width * deviceWidthOverCssPixels, rubberbandRectangle.height * deviceHeightOverCssPixels);
}

// 绘制橡皮筋
function drawRubberband() {
  context.strokeRect(rubberbandRectangle.left + context.lineWidth,
    rubberbandRectangle.top + context.lineWidth,
    rubberbandRectangle.width - 2 * context.lineWidth,
    rubberbandRectangle.height - 2 * context.lineWidth);
}

// 获取橡皮筋的尺寸
function setRubberbandRectangle(x, y) {
  rubberbandRectangle.left = Math.min(x, mouseDown.x);
  rubberbandRectangle.top = Math.min(y, mouseDown.y);
  rubberbandRectangle.width = Math.abs(x - mouseDown.x);
  rubberbandRectangle.height = Math.abs(y - mouseDown.y);
}

// 更新橡皮筋
function updateRubberband() {
  // captureRubberbandPixels();
  drawRubberband(rubberbandRectangle.left, rubberbandRectangle.top, rubberbandRectangle.width, rubberbandRectangle.height);
}

// 记录橡皮筋的坐标
function rubberbandStart(x, y) {
  mouseDown.x = x;
  mouseDown.y = y;
  dragging = true;
  rubberbandRectangle.left = mouseDown.x;
  rubberbandRectangle.top = mouseDown.y;
  captureRubberbandPixels();  // 只调用一次getImageData，提高性能
}

function rubberbandStretch(x, y) {
  if (rubberbandRectangle.width > 2 * context.lineWidth && rubberbandRectangle.height > 2 * context.lineWidth) {
    if (imageData !== undefined) {
      restoreRubberbandPixels();
    }
  }
  setRubberbandRectangle(x, y);

  if (rubberbandRectangle.width > 2 * context.lineWidth && rubberbandRectangle.height > 2 * context.lineWidth) {
    updateRubberband();
  }
}

function rubberbandEnd() {
  context.drawImage(canvas,
    rubberbandRectangle.left + context.lineWidth * 2,
    rubberbandRectangle.top + context.lineWidth * 2,
    rubberbandRectangle.width - 4 * context.lineWidth,
    rubberbandRectangle.height - 4 * context.lineWidth,
    0, 0, canvas.width, canvas.height);
  dragging = false;
  imageData = undefined;
}

canvas.onmousedown = function (e) {
  var loc = windowToCanvas(canvas, e.clientX, e.clientY);
  e.preventDefault();
  rubberbandStart(loc.x, loc.y);
}

canvas.onmousemove = function (e) {
  var loc = windowToCanvas(canvas, e.clientX, e.clientY);
  if (dragging) {
    rubberbandStretch(loc.x, loc.y);
  }
}

canvas.onmouseup = function (e) {
  rubberbandEnd();
}

image.src = './arch.png';

image.onload = function () {
  context.drawImage(image, 0, 0, canvas.width, canvas.height);
}

resetButton.onclick = function () {
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.drawImage(image, 0, 0, canvas.width, canvas.height);
}

context.strokeStyle = 'yellow';
context.lineWidth = 2;