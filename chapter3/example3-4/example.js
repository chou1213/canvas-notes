var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');
var fontHeight = 24;
var alignValues = ['start', 'center', 'end'];
var baselineValues = ['top', 'middle', 'bottom', 'alphabetic', 'ideographic', 'hanging'];
var x;
var y;

function drawTextMarker() {
  context.fillStyle = 'yellow';
  context.fillRect(x, y, 7, 7);
  context.strokeRect(x, y, 7, 7);
}

function drawText(text, textAlign, textBaseline) {
  if (textAlign) {
    context.textAlign = textAlign;
  }

  if (textBaseline) {
    context.textBaseline = textBaseline;
  }

  context.fillStyle = 'cornflowerblue';
  context.fillText(text, x, y);
}

function drawTextLine() {
  context.strokeStyle = 'gray';
  context.beginPath();
  context.moveTo(x, y);
  context.lineTo(x + 500, y);
  context.stroke();
}

context.font = 'oblique normal bold 24px palatino';

for (var align = 0; align < alignValues.length; ++align) {
  for (var baseline = 0; baseline < baselineValues.length; ++baseline) {
    x = 20 + align * fontHeight * 15;
    y = 20 + baseline * fontHeight * 3;
    drawText(alignValues[align] + '/' + baselineValues[baseline], alignValues[align], baselineValues[baseline]);
    drawTextMarker();
    drawTextLine();
  }
}

