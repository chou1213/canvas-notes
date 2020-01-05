var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');
var FONT_HEIGHT = 15; // 字体大小
var MARGIN = 35; // 表盘距离画布边缘距离
var HAND_TRUNCATION = canvas.width / 25;
var HOUR_HAND_TRUNCATION = canvas.width / 10;
var NUMERAL_SPACING = 20; // 表盘与刻度的距离
var RADIUS = canvas.width / 2 - MARGIN; // 表盘的半径
var HAND_RADIUS = RADIUS + NUMERAL_SPACING; // 刻度半径
var snapshotImageElement = document.getElementById('snapshotImageElement');// img节点


context.font = FONT_HEIGHT + 'px Arial';

//绘制表盘的路径
function drawCircle() {
  context.beginPath();
  context.arc(canvas.width / 2, canvas.height / 2, RADIUS, 0, Math.PI * 2, true);
  context.stroke();
}

//绘制刻度
function drawNumberals() {
  var numerals = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  var angle = 0;
  var numeralWidth = 0;

  numerals.forEach(function (numeral, index) {
    angle = Math.PI * 2 / 12 * (2 - index);
    numeralWidth = context.measureText(numeral).width; // 度量文本的宽度
    context.fillText(numeral, canvas.width / 2 + Math.cos(angle) * HAND_RADIUS - numeralWidth / 2, canvas.height / 2 - Math.sin(angle) * HAND_RADIUS + FONT_HEIGHT / 3);
  })
}

//绘制中心点的路径
function drawCenter() {
  context.beginPath();
  context.arc(canvas.width / 2, canvas.height / 2, 5, 0, Math.PI * 2, true);
  context.stroke();
}

//绘制线段
function drawHand(loc, radius) {
  var angle = (Math.PI * 2 / 60) * loc - Math.PI / 2;
  context.moveTo(canvas.width / 2, canvas.height / 2);
  context.lineTo(canvas.width / 2 + Math.cos(angle) * radius, canvas.height / 2 + Math.sin(angle) * radius);
  context.stroke()
}

//绘制时分秒
function drawHands() {
  var date = new Date();
  var hour = date.getHours(); //24小时制
  var min = date.getMinutes(); //0-59
  var sec = date.getSeconds();//0-59

  hour = hour <= 12 ? hour : hour - 12;

  drawHand(hour * 5 + (min / 60) * 5, RADIUS - HAND_TRUNCATION - HOUR_HAND_TRUNCATION);
  drawHand(min, RADIUS - HAND_TRUNCATION);
  drawHand(sec, RADIUS - HAND_TRUNCATION);
}

function drawClock() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  drawCircle();
  drawNumberals();
  drawCenter();
  drawHands();
  updateClockImage();
}

setInterval(drawClock, 1000);

// 获取数据元地址赋值给Image，src属性
function updateClockImage() {
  snapshotImageElement.src = canvas.toDataURL();
}