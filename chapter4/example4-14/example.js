var canvas = document.getElementById('canvas');
var colorToggleCheckbox = document.getElementById('colorToggleCheckbox');
var context = canvas.getContext('2d');
var image = new Image();

function backAndWhite() {
  var imageData = context.getImageData(0, 0, canvas.width, canvas.height);

  for (var i = 0; i < imageData.data.length - 4; i += 4) {
    var average = (imageData.data[i] + imageData.data[i + 1] + imageData.data[i + 2]) / 3;
    imageData.data[i] = average;
    imageData.data[i + 1] = average;
    imageData.data[i + 2] = average;
  }
  context.putImageData(imageData, 0, 0);
}

colorToggleCheckbox.onchange = function () {
  if (colorToggleCheckbox.checked) {
    backAndWhite()
  } else {
    context.drawImage(image, 0, 0, canvas.width, canvas.height);
  }
}

image.src = './canyon.png';

image.onload = function () {
  context.drawImage(image, 0, 0, canvas.width, canvas.height);
}

