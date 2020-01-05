var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');
var rubberbandDiv = document.getElementById('rubberbandDiv'); // 选取框的dom节点
var resetButton = document.getElementById('resetButton');
var image = new Image();
var mousedown = {}; // 记录鼠标的坐标
var rubberbandRectangle = {}; // 记录选取框的坐标
var dragging = false; // 记录是否拖拽

// 记录选取框初始信息
function rubberbandStart(x, y) {
  // 记录鼠标的x,y坐标
  mousedown.x = x;
  mousedown.y = y;
  // 记录选取框的坐标
  rubberbandRectangle.left = mousedown.x;
  rubberbandRectangle.top = mousedown.y;

  // 设置选取框dom的坐标
  moveRubberbandDiv();

  // 显示选取框dom
  showRubberbandDiv();

  //设置拖拽的状态
  dragging = true;
}

// 拖拽时设置选取框的信息
function rubberbandStretch(x, y) {
  // 如果鼠标往反方向拖动个鼠标，记录选取框的坐标为当前鼠标x,y值
  rubberbandRectangle.left = x < mousedown.x ? x : mousedown.x;
  rubberbandRectangle.top = y < mousedown.y ? y : mousedown.y;
  // 记录选取框的高宽
  rubberbandRectangle.width = Math.abs(x - mousedown.x);
  rubberbandRectangle.height = Math.abs(y - mousedown.y);
  // 设置选取框dom的坐标
  moveRubberbandDiv();
  // 设置选取框dom的高宽
  resizeRubberbandDiv();
}

function rubberbandEnd() {
  // 获取canvas边框信息
  var bbox = canvas.getBoundingClientRect();
  console.log(bbox);

  try {
    // 根据选取框的坐标，高宽，设置在画布放大的区域
    // img	规定要使用的图像、画布或视频。
    // sx	可选。开始剪切的 x 坐标位置。
    // sy	可选。开始剪切的 y 坐标位置。
    // swidth	可选。被剪切图像的宽度。
    // sheight	可选。被剪切图像的高度。
    // x	在画布上放置图像的 x 坐标位置。
    // y	在画布上放置图像的 y 坐标位置。
    // width	可选。要使用的图像的宽度。（伸展或缩小图像）
    // height	可选。要使用的图像的高度。（伸展或缩小图像）
    // rubberbandRectangle.left - bbox.left 计算当前鼠标的位置相对于canvas的x坐标
    // rubberbandRectangle.top - bbox.top   计算当前鼠标的位置相对于canvas的y坐标
    context.drawImage(canvas, rubberbandRectangle.left - bbox.left, rubberbandRectangle.top - bbox.top, rubberbandRectangle.width, rubberbandRectangle.height, 0, 0, canvas.width, canvas.height);
    // context.drawImage(canvas, rubberbandRectangle.left - bbox.left, rubberbandRectangle.top - bbox.top, rubberbandRectangle.width, rubberbandRectangle.height, 0, 0, rubberbandRectangle.width, rubberbandRectangle.height);
  } catch (e) {
    console.log(e);
  }
  // 重置记录选取信息
  resetRubberbandRectangle();
  // 设置选取框的高宽为0
  rubberbandDiv.style.width = 0;
  rubberbandDiv.style.height = 0;
  // 隐藏选取框dom
  hideRubberbandDiv();
  // 设置拖拽的状态
  dragging = false;
}

// 移动选取框dom的坐标
function moveRubberbandDiv() {
  rubberbandDiv.style.top = rubberbandRectangle.top + 'px';
  rubberbandDiv.style.left = rubberbandRectangle.left + 'px';
}

function resizeRubberbandDiv() {
  rubberbandDiv.style.width = rubberbandRectangle.width + 'px';
  rubberbandDiv.style.height = rubberbandRectangle.height + 'px';
}

// 显示选取框dom
function showRubberbandDiv() {
  rubberbandDiv.style.display = 'inline';
}

// 隐藏选取框dom
function hideRubberbandDiv() {
  rubberbandDiv.style.display = 'none';
}

// 重置选取框的x，y，width，height为0
function resetRubberbandRectangle() {
  rubberbandRectangle = { x: 0, y: 0, width: 0, height: 0 };
}

// 点击屏幕
canvas.onmousedown = function (e) {
  // console.log('canvas', e);

  // 获取鼠标点击的x，y坐标
  // 注意如果页面有滚动条，选取框的坐标应该算上滚去的高度
  var x = e.clientX;
  var y = e.clientY + document.documentElement.scrollTop;

  // 禁止canvas的默认行为
  e.preventDefault();

  // 设置选取框的的坐标
  rubberbandStart(x, y);
}

window.onmousemove = function (e) {
  // console.log('onmousemove', e);

  // 获取鼠标点击的x，y坐标
  // 注意如果页面有滚动条，选取框的坐标应该算上滚去的高度
  var x = e.clientX;
  var y = e.clientY + document.documentElement.scrollTop;

  // 禁止canvas的默认行为
  e.preventDefault();

  // 判断当前用户在拖拽的状态
  if (dragging) {
    // 绘制选取框矩形，传当前鼠标的x，y坐标
    rubberbandStretch(x, y);
  }
}

window.onmouseup = function (e) {
  // console.log('onmouseup', e);

  e.preventDefault();
  rubberbandEnd();
}

// 监听图片加载完成
image.onload = function () {
  context.drawImage(image, 0, 0, canvas.width, canvas.height);
}

// 点击重置按钮
resetButton.onclick = function () {
  // 清空画布
  context.clearRect(0, 0, context.canvas.width, context.canvas.height);
  // 重新绘制图片
  context.drawImage(image, 0, 0, canvas.width, canvas.height);
}

// 加载图片
image.src = './curved-road.png';