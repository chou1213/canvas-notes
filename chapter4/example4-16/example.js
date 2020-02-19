var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');
var image = new Image();
var sunglassButton = document.getElementById('sunglassButton');
var sunglassOn = false;
var sunglassFilter = new Worker('sunglassFilter.js');

function putSunglassesOn() {
  sunglassFilter.postMessage(
    context.getImageData(0, 0, canvas.width, canvas.height)
  );
  sunglassFilter.onmessage = function (event) {
    context.putImageData(event.data, 0, 0);
  }
}

function drawOriginalImage() {
  context.drawImage(image, 0, 0, image.width, image.height, 0, 0, canvas.width, canvas.height);
}

sunglassButton.onclick = function () {
  if (sunglassOn) {
    sunglassButton.value = 'sunglasses';
    drawOriginalImage();
    sunglassOn = false;

  } else {
    sunglassButton.value = 'original picture';
    putSunglassesOn();
    sunglassOn = true;
  }
}

image.src = './curved-road.png';
image.onload = function () {
  drawOriginalImage();
}