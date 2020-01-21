var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');
var mousedown = {};
var rubberbandRectangle = {};
var dragging = false;
var imageData;

function windowToCanvas(x, y) {
  var box = canvas.getBoundingClientRect();
  return {
    x: x - box.left,
    y: y - box.top
  }
}

function saveImageData() {
  imageData = context.getImageData(0, 0, canvas.width, canvas.height);
}

function putImageData() {
  context.putImageData(imageData, 0, 0);
}

function setRubberbandRectangle(x, y) {
  rubberbandRectangle.left = Math.min(x, mousedown.x);
  rubberbandRectangle.top = Math.min(y, mousedown.y);
  rubberbandRectangle.width = Math.abs(x - mousedown.x);
  rubberbandRectangle.height = Math.abs(y - mousedown.y);
}

function drawRubberbandRectangle() {
  if (imageData) {
    putImageData(); // 绘制橡皮筋前，重置画布
  }
  saveImageData();
  context.strokeRect(rubberbandRectangle.left, rubberbandRectangle.top, rubberbandRectangle.width, rubberbandRectangle.height);
}

canvas.onmousedown = function (e) {
  var loc = windowToCanvas(e.clientX, e.clientY);
  e.preventDefault();
  mousedown.x = loc.x;
  mousedown.y = loc.y;
  dragging = true;
  // saveImageData();  點擊是，記錄畫布初始圖片像素
}

canvas.onmousemove = function (e) {
  var loc = windowToCanvas(e.clientX, e.clientY);
  e.preventDefault();
  if (dragging) {
    setRubberbandRectangle(loc.x, loc.y);
    drawRubberbandRectangle();
  }
}

canvas.onmouseup = function () {
  dragging = false;
}

context.strokeStyle = 'green';