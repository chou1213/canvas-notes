function drawGrid(color, stepx, stepy, canvas, context) {
  context.save();
  context.lineWidth = 0.5;
  context.strokeStyle = color;
  for (var i = stepx + 0.5; i < canvas.width; i += stepx) {
    context.beginPath();
    context.moveTo(i, 0);
    context.lineTo(i, canvas.height);
    context.stroke();
  }

  for (var i = stepy + 0.5; i < canvas.height; i += stepy) {
    context.beginPath();
    context.moveTo(0, i);
    context.lineTo(canvas.width, i);
    context.stroke();
  }
  context.restore();
}