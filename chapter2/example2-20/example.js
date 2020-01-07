var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');

// 绘制圆角矩形
function roundedRect(cornerX, cornerY, width, height, cornerRadius) {
  if (width > 0) {
    context.moveTo(cornerX + cornerRadius, cornerY);
  } else {
    context.moveTo(cornerX - conrnerRadius, cornerY);
  }

  context.arcTo(cornerX + width, cornerY);

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
drawRoundedRect('purple', 'green', 50, 40, 100, 100, 10);
drawRoundedRect('red', 'white', 50, 40, 100, 100, 10);
drawRoundedRect('white', 'blue', 50, 40, 100, 100, 10);