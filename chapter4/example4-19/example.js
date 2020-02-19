var image = new Image();
var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');
var fadeButton = document.getElementById('fadeButton');
var originalImageData = null;
var interval = null;


function increaseTranaparency(imagedata, steps) {
  var alpha;
  var currentAlpha;
  var step;
  var length = imagedata.data.length;

  for (var i = 3; i < length; i += 4) {

    alpha = originalImageData.data[i];
    currentAlpha = imagedata.data[i];
    step = Math.ceil(alpha / steps);

    if (alpha > 0 && currentAlpha > 0) {


      if (currentAlpha - step > 0) {
        imagedata.data[i] -= step;
      } else {
        imagedata.data[i] = 0;
      }
    }
  }
}

function fadeOut(context, imagedata, x, y, steps, millsecondsPerStep) {
  var frame = 0;
  interval = setInterval(function () {
    frame++;
    if (frame > steps) {
      clearInterval(interval); // 删除定时器
      animationComplete(); // 重置画布
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
  var imagedata = context.getImageData(0, 0, canvas.width, canvas.height);
  fadeOut(context, imagedata, 0, 0, 20, 1000 / 60);
}

image.src = './curved-road.png';
image.onload = function () {
  context.drawImage(image, 0, 0, canvas.width, canvas.height);
  originalImageData = context.getImageData(0, 0, canvas.width, canvas.height);
}