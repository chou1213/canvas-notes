var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');

function drawGrid(context, color, stepx, stepy) {
  context.save();
  context.strokeStyle = color;
  context.lineWidth = 0.5;
  for (var i = stepx + 0.5; i < context.canvas.width; i += stepx) {
    context.beginPath();
    context.moveTo(i, 0);
    context.lineTo(i, context.canvas.height);
    context.stroke();
  }

  for (var i = stepy + 0.5; i < context.canvas.height; i += stepy) {
    context.beginPath();
    context.moveTo(0, i);
    context.lineTo(context.canvas.width, i);
    context.stroke();
  }
  context.restore();
}

drawGrid(context, 'lightgray', 100, 100);

// 第一条圆弧
context.beginPath();
context.moveTo(200, 100);
context.arcTo(300, 100, 300, 300, 200);
context.stroke();

// 
context.beginPath();
context.moveTo(400, 100);
context.arcTo(500, 100, 500, 300, 50);
context.stroke();