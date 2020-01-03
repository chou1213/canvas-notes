var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');

function draw() {
  context.clearRect(0, 0, canvas.width, canvas.height);

  context.save();

  // 阴影样式
  // context.shadowColor = 'rgba(200,200,0,0.5)';
  // context.shadowOffsetX = 12;
  // context.shadowOffsetY = 12;
  // context.shadowBlur = 15;

  drawCutouts();
  strokeCutoutShapes();

  context.restore();
}

function drawCutouts() {
  context.beginPath();
  addOuterRectanglePath(); // 创建一个顺时针外层的矩形路径
  addCirclePath(); // 创建逆时针绘制矩形路径
  addRectanglePath(); // 创建逆时针绘制矩形路径
  addTrianglePath(); // 创建逆时针创建三角形路径
  context.fill(); // 填充

}

// 剪下形状
function strokeCutoutShapes() {
  context.save();

  context.strokeStyle = 'rgba(0,0,0,.7)';

  context.beginPath(); // 清除当前路径的子路径
  addOuterRectanglePath();// 创建一个属于顺时针外层的矩形路径
  context.stroke(); // 给外层矩形路径描边

  context.beginPath(); // 清除当前路径的子路径
  addCirclePath(); //创建一个逆时针的圆形路径
  addRectanglePath(); // 创建一个逆时针矩形路径
  addTrianglePath(); // 创建一个逆时针的三角形路径
  context.stroke(); // 给圆形，矩形，三角形路径描边

  context.restore();
}

// 根据矩形的坐标，高宽，通过线段绘制矩形
function rect(x, y, w, h, direction) {
  if (direction) {
    //  逆时针
    context.moveTo(x, y);
    context.lineTo(x, y + h);
    context.lineTo(x + w, y + h);
    context.lineTo(x + w, y)
    context.closePath();
  } else {
    // 顺时针
    context.moveTo(x, y);
    context.lineTo(x + w, y)
    context.lineTo(x + w, y + h);
    context.lineTo(x, y + h);
    context.closePath();
  }
}

// 顺时针绘制矩形路径
function addOuterRectanglePath() {
  context.rect(110, 25, 370, 335);
}

// 逆时针绘制圆形路径
function addCirclePath() {
  context.arc(300, 300, 40, 0, Math.PI * 2, true);
}

// 逆时针绘制一个矩形路径
function addRectanglePath() {
  rect(310, 55, 70, 35, true);
}

// 逆时针绘制一个三角形
function addTrianglePath() {
  context.moveTo(400, 200);
  context.lineTo(250, 115);
  context.lineTo(200, 200);
  context.closePath();
}

context.fillStyle = 'goldenrod';
draw();