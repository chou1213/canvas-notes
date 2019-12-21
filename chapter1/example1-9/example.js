var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');
var rubberbandDiv = document.getElementById('rubberbandDiv');
var resetButton = document.getElementById('resetButton');
var image = new Image();
var mousedown = {};
var rubberbandRectangle = {};
var dragging = false;

function rubberbandStart(x, y) {
  mousedown.x = x;
  mousedown.y = y;
}

function rubberbandStretch() { }

function rubberbandEnd() { }

function moveRubberbandDiv() { }

function resizeRubberbandDiv() { }

function showRubberbandDiv() { }

function hideRubberbandDiv() { }

function resetRubberbandRectangle() { }

canvas.onmousedown = function (e) {
  console.log('canvas', e);
}

window.onmousemove = function (e) {
  console.log('onmousemove', e);
}

window.onmouseup = function (e) {
  console.log('onmouseup', e);
}

// 监听图片加载完成
image.onload = function () {
  context.drawImage(image, 0, 0, canvas.width, canvas.height);
}

// 点击重置按钮
resetButton.onclick = function () {
  // 清空画布
  context.clearRect(0, 0, context.canvas.width, contet.canvas.height);
  // 重新绘制图片
  context.drawImage(image, 0, 0, canvas.width, canvas.height);
}

// 加载图片
image.src = './curved-road.png';