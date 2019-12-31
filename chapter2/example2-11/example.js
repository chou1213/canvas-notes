var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');

function draw() {
  context.clearRect(0, 0, canvas.width, canvas.height);

  context.save();

  context.shadowColor = 'rgba(200,200,0,0.5)';
  context.shadowOffsetX = 12;
  context.shadowOffsetY = 12;
  context.shadowBlur = 15;

  drawCutouts();
  // strokeCutoutShapes();

  context.restore();
}

function drawCutouts() {
  context.beginPath();
  addOuterRectanglePath(); //绘制一个外层的矩形
  addCirclePath(); // 顺时针绘制矩形路径
  addRectanglePath(); // 逆时针绘制矩形路径
  addTrianglePath(); // 逆时针创建三角形路径
  context.fill(); // 填充

}

// 剪下形状
function strokeCutoutShapes() {
  context.save();

  context.strokeStyle = 'rgba(0,0,0,.7)';

  context.beginPath();
  addOuterRectanglePath();
  context.stroke();

  context.beginPath();
  addCirclePath();
  addTrianglePath();
  context.stroke();

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

// 顺时针绘制圆形路径
function addCirclePath() {
  context.arc(300, 300, 40, 0, Math.PI * 2, true);
}

// 逆时针绘制一个矩形路径
function addRectanglePath() {
  rect(310, 55, 70, 35, true);
}

//绘制一个三角形
function addTrianglePath() {
  context.moveTo(400, 200);
  context.lineTo(250, 115);
  context.lineTo(200, 200);
  context.closePath();
}

context.fillStyle = 'goldenrod';
draw();