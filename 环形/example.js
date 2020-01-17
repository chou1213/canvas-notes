var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');

function draw(r, lineWidth, percent, canvas, context) {
  const width = r * 2 + lineWidth * 2;
  const height = r * 2 + lineWidth * 2;
  const startAngel = -Math.PI / 2;
  const endAngel = startAngel + (Math.PI / 50) * percent;
  canvas.width = width;
  canvas.height = height;

  context.lineWidth = lineWidth;
  context.beginPath();
  context.arc(width / 2, height / 2, r, 0, Math.PI * 2, false);
  context.strokeStyle = '#F3F3F3';
  context.stroke();

  context.beginPath();
  context.arc(width / 2, height / 2, r, startAngel, endAngel, false);
  context.strokeStyle = '#FF2474';
  context.stroke();
}

draw(100, 5, 50, canvas, context);