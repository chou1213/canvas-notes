var image = new Image();
var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');
var fadeButton = document.getElementById('fadeButton');
var imagedataOffscreen = null;
var interval = null;
var offscreenCanvas = document.createElement('canvas');
var offscreenContext = offscreenCanvas.getContext('2d');


function increaseTranaparency(imagedata, steps) {
  var alpha;
  var currentAlpha;
  var step;
  var length = imagedata.data.length;

  for (var i = 3; i < length; i += 4) {

    alpha = imagedataOffscreen.data[i];
    currentAlpha = imagedata.data[i];
    step = Math.ceil(alpha / steps);

    if (alpha > 0) {

      if (currentAlpha + step > alpha) {
        imagedata.data[i] = alpha;
      } else {
        imagedata.data[i] += step;
      }
    }
  }
}

function fadeIn(context, imagedata, x, y, steps, millsecondsPerStep) {
  var frame = 0;

  for (var i = 3; i < imagedata.data.length; i += 4) {
    imagedata.data[i] = 0;
  }

  interval = setInterval(function () {
    frame++;

    if (frame > steps) {
      clearInterval(interval); // 删除定时器
    } else {
      increaseTranaparency(imagedata, steps); // 修改透明值
      context.putImageData(imagedata, x, y); // 再绘制进画布
    }
  }, millsecondsPerStep);
}


// 重新绘制画布
function animationComplete() {
  setTimeout(function () {
    context.drawImage(image, 0, 0, canvas.width, canvas.height)
  }, 1000);
}

fadeButton.onclick = function () {
  imagedataOffscreen = offscreenContext.getImageData(0, 0, offscreenCanvas.width, offscreenCanvas.height);
  var imagedata = offscreenContext.getImageData(0, 0, offscreenCanvas.width, offscreenCanvas.height);
  fadeIn(context, imagedata, 0, 0, 50, 1000 / 60);
}

image.src = './curved-road.png';
image.onload = function () {
  offscreenCanvas.width = canvas.width;
  offscreenCanvas.height = canvas.height;
  offscreenContext.drawImage(image, 0, 0);
}