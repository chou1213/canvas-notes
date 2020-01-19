var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');

function drawGrid(color, stepx, stepy) {
  context.save()

  context.strokeStyle = color;
  context.fillStyle = '#ffffff';
  context.lineWidth = 0.5;
  context.fillRect(0, 0, context.canvas.width, context.canvas.height);

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
};


drawGrid('lightgray', 10, 10);

context.fillStyle = 'yellow';
context.strokeStyle = 'red';

context.font = '128px Helvetica';

context.textAlign = 'center';
context.textBaseline = 'middle';

context.fillText('HTML5', canvas.width / 2, canvas.height / 2);
context.strokeText('HTML5', canvas.width / 2, canvas.height / 2);
