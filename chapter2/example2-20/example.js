var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');

context.beginPath();
// 起始坐标100,100，半径10
context.moveTo(100 + 10, 100);
context.arcTo(100 + 100, 100, 100 + 100, 100 + 100, 10);

context.arcTo(100 + 100, 100 + 100, 100, 100 + 100, 10);

context.arcTo(100, 100 + 100, 100, 100, 10);

context.arcTo(100, 100, 100 + 100, 100, 10);
context.stroke();

/**
 * 绘制圆角矩形
 * @param {number} cornerX 起始x坐标
 * @param {number} cornerY 起始y坐标
 * @param {number} width 矩形的宽
 * @param {number} height 矩形的高
 * @param {number} cornerRadius 圆角大小
 */
function roundedRect(cornerX, cornerY, width, height, cornerRadius) {
  // 起点子路径
  if (width > 0) {
    context.moveTo(cornerX + cornerRadius, cornerY);
  } else {
    context.moveTo(cornerX - cornerRadius, cornerY);
  }

  // 绘制右上角
  context.arcTo(cornerX + width, cornerY, cornerX + width, cornerY + height, cornerRadius);
  // 绘制右下角
  context.arcTo(cornerX + width, cornerY + height, cornerX, cornerY + height, cornerRadius);
  // 绘制左下角
  context.arcTo(cornerX, cornerY + height, cornerX, cornerY, cornerRadius);

  // 绘制左上角
  if (width > 0) {
    context.arcTo(cornerX, cornerY, cornerX + cornerRadius, cornerY, cornerRadius);
  } else {
    context.arcTo(cornerX, cornerY, cornerX - cornerRadius, cornerY, cornerRadius);
  }
}

function drawRoundedRect(strokeStyle, fillStyle, cornerX, cornerY, width, height, cornerRadius) {
  context.beginPath();
  roundedRect(cornerX, cornerY, width, height, cornerRadius);
  context.strokeStyle = strokeStyle;
  context.fillStyle = fillStyle;
  context.stroke();
  context.fill();
}

drawRoundedRect('blue', 'yellow', 50, 40, 100, 100, 10);
drawRoundedRect('purple', 'green', 275, 40, -100, 100, 20);
drawRoundedRect('red', 'white', 300, 140, 100, -100, 30);
drawRoundedRect('white', 'blue', 525, 140, -100, -100, 40);