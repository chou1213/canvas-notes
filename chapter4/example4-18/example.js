var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');
var image = new Image();
var sunglassButton = document.getElementById('sunglassButton');
var sunglassOn = false;
var sunglassFilter = new Worker('sunglassFilter.js');

var offscreenCanvas = document.createElement('canvas'); // 离屏canvas
var offscreenContext = offscreenCanvas.getContext('2d');

var LENS_RADIUS = canvas.width / 5;


// 绘制镜片
function drawLenses(leftLensLocation, rightLensLocation) {
  context.save();
  context.beginPath();
  context.arc(leftLensLocation.x, leftLensLocation.y, LENS_RADIUS, 0, 2 * Math.PI, false);
  context.stroke();

  context.moveTo(rightLensLocation.x, rightLensLocation.y);
  context.arc(rightLensLocation.x, rightLensLocation.y, LENS_RADIUS, 0, 2 * Math.PI, false);
  context.stroke();

  context.clip();

  context.drawImage(offscreenCanvas, 0, 0, canvas.width, canvas.height);

  context.restore();
}

// 绘制境片连接线
function drawWire(center) {
  context.beginPath();

  context.moveTo(center.x - LENS_RADIUS / 4, center.y - LENS_RADIUS / 2)

  context.quadraticCurveTo(center.x, center.y - LENS_RADIUS + 20, center.x + LENS_RADIUS / 4, center.y - LENS_RADIUS / 2);

  context.stroke();
}

// 绘制连接点
function drawConnectors(center) {
  context.beginPath();

  context.fillStyle = 'silver';
  context.strokeStyle = 'rgba(0,0,0,0.4)';
  context.lineWidth = 2;

  context.arc(center.x - LENS_RADIUS / 4, center.y - LENS_RADIUS / 2, 4, 0, 2 * Math.PI, false);
  context.fill();
  context.stroke();

  context.beginPath();
  context.arc(center.x + LENS_RADIUS / 4, center.y - LENS_RADIUS / 2, 4, 0, 2 * Math.PI, false);
  context.fill();
  context.stroke();
}


function putSunglassesOn() {
  var imagedata;
  var center = {
    x: canvas.width / 2,
    y: canvas.height / 2
  };
  var leftLensLocation = {
    x: center.x - LENS_RADIUS - 10,
    y: center.y
  };
  var rightLensLocation = {
    x: center.x + LENS_RADIUS + 10,
    y: center.y
  };

  imagedata = context.getImageData(0, 0, canvas.width, canvas.height);

  sunglassFilter.postMessage(imagedata);

  sunglassFilter.onmessage = function (event) {
    offscreenContext.putImageData(event.data, 0, 0);
    drawLenses(leftLensLocation, rightLensLocation);
    drawWire(center);
    drawConnectors(center)
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

offscreenCanvas.width = canvas.width;
offscreenCanvas.height = canvas.height;

image.src = './curved-road.png';
image.onload = function () {
  drawOriginalImage();
}