
var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');
var radius1 = 190;
var radius2 = radius1 - 20;
var radius3 = radius2 - 10;
var radius4 = radius3 - 10;
var centerx = canvas.width / 2;
var centery = canvas.height / 2;
var num = 12;
var angle = 360 / num;
var tick_width = 10;
var labels_num = 36;
var per_labels_angle = 360 / labels_num;

// 绘制网格
function drawGrid(color, stepx, stepy) {
  context.save();
  context.strokeStyle = color;
  for (var i = stepy + 0.5; i < canvas.height; i += stepy) {
    context.beginPath();
    context.moveTo(0, i);
    context.lineTo(canvas.width, i);
    context.stroke();
  }
  for (var i = stepx + 0.5; i < canvas.width; i += stepx) {
    context.beginPath();
    context.moveTo(i, 0);
    context.lineTo(i, canvas.height);
    context.stroke();
  }
  context.restore();
}

function drawOuterCircle() {
  context.beginPath();
  context.save();

  context.lineWidth = 1;
  context.fillStyle = 'rgba(100, 140, 230, 0.2)';
  context.strokeStyle = 'lightgray';

  context.arc(centerx, centery, radius1, 0, Math.PI * 2, true);
  context.arc(centerx, centery, radius2, 0, Math.PI * 2);
  context.fill();

  context.arc(centerx, centery, radius3, 0, Math.PI * 2);
  context.stroke();

  context.restore();
}

function drawLabels() {
  context.save();
  context.lineWidth = 0.5;
  context.strokeStyle = 'black';
  for (var i = 0; i <= labels_num; i++) {
    context.beginPath();
    var radius;
    if (i % 3 === 0) {
      radius = radius2 - tick_width;
    } else {
      radius = radius2 - tick_width / 2;
    }
    var x1 = centerx + radius2 * Math.cos(i * per_labels_angle * Math.PI / 180);
    var y1 = centery + radius2 * Math.sin(i * per_labels_angle * Math.PI / 180);
    var x2 = centerx + radius * Math.cos(i * per_labels_angle * Math.PI / 180);
    var y2 = centery + radius * Math.sin(i * per_labels_angle * Math.PI / 180);
    context.moveTo(x1, y1);
    context.lineTo(x2, y2);
    context.stroke();
  }
  context.restore();
}

function drawText() {
  context.save();
  context.fillStyle = 'blue';
  for (var i = 0; i < num; i++) {
    var x = centerx + radius4 * Math.cos(i * angle * Math.PI / 180);
    var y = centery + radius4 * Math.sin(i * angle * Math.PI / 180);
    // context.save();
    // context.fillStyle = 'rgba(0,0,0,0.5)';
    // context.fillRect(x - 2, y - 2, 4, 4);
    // context.restore();
    context.textAlign = 'center';
    context.textBaseline = 'middle';

    context.fillText(i * angle, x, y);

  }
  context.restore();
}

drawGrid('lightgray', 10, 10);

drawOuterCircle();
drawLabels();
drawText();