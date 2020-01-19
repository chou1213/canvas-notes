var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');
var fillCheckbox = document.getElementById('fillCheckbox');
var strokeCheckbox = document.getElementById('strokeCheckbox');
var shadowCheckbox = document.getElementById('shadowCheckbox');
var text = 'HTML5';

function draw() {
  context.clearRect(0, 0, canvas.width, canvas.height);

  if (shadowCheckbox.checked) {
    context.shadowColor = 'rgba(0, 0, 0, 0.8)';
    context.shadowOffsetX = 5;
    context.shadowOffsetY = 5;
    context.shadowBlur = 10;
  } else {
    context.shadowColor = undefined;
    context.shadowOffsetX = 0;
    context.shadowOffsetY = 0;
    context.shadowBlur = 0;
  }

  var text_x = 65;
  var text_y = canvas.height / 2 + 35;

  if (fillCheckbox.checked) {
    context.fillText(text, text_x, text_y);
  }

  if (strokeCheckbox.checked) {
    context.strokeText(text, text_x, text_y);
  }
}

fillCheckbox.onchange = draw;

strokeCheckbox.onchange = draw;

shadowCheckbox.onchange = draw;

context.font = '128px Pawlatino';
context.lineWidth = 1.0;
context.fillStyle = 'cornflowerblue';
context.strokeStyle = 'blue';
draw();

