var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');

function roundedRect(cornerX, cornerY, width, height, cornerRadius) {
  if (width > 0) {
    context.moveTo(cornerX + cornerRadius, cornerY);
  } else {
    context.moveTo(cornerX - conrnerRadius, cornerY);
  }

  context.arcTo(cornerX + width, cornerY);

}

function drawRoundedRect() { }

drawRoundedRect('blue', 'yellow', 50, 40, 100, 100, 10);
drawRoundedRect('purple', 'green', 50, 40, 100, 100, 10);
drawRoundedRect('red', 'white', 50, 40, 100, 100, 10);
drawRoundedRect('white', 'blue', 50, 40, 100, 100, 10);