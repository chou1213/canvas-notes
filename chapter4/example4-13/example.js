var canvas = document.getElementById('canvas');
var negativeButton = document.getElementById('negativeButton');
var context = canvas.getContext('2d');
var image = new Image();

function nagative() {
  var imageData = context.getImageData(0, 0, canvas.width, canvas.height);

  for (var i = 0; i < imageData.data.length - 4; i += 4) {
    imageData.data[i] = 255 - imageData.data[i];
    imageData.data[i + 1] = 255 - imageData.data[i + 1];
    imageData.data[i + 2] = 255 - imageData.data[i + 2];
  }
  context.putImageData(imageData, 0, 0);
}

negativeButton.onclick = function () {
  nagative();
}

image.src = './canyon.png';

image.onload = function () {
  context.drawImage(image, 0, 0, canvas.width, canvas.height);
}

