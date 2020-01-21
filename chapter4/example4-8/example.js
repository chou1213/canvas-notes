var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');
var image = new Image();
var scaleOutput = document.getElementById('scaleOutput');
var scaleSlider = document.getElementById('scaleSlider');
var scale = 1;
var max_scale = 3;
var min_scale = 1;
var offscreenCanvas = document.createElement('canvas');
var offscreenContext = offscreenCanvas.getContext('2d');
var imageRadio = document.getElementById('imageRadio');

var offScreenCanvasDom = document.getElementById('offScreenCanvasDom');
offScreenCanvasDom.appendChild(offscreenCanvas);


// 放大缩小图片
function drawScaled() {
  var w = canvas.width;
  var h = canvas.height;
  var sw = w * scale;
  var sh = h * scale;

  context.drawImage(offscreenCanvas, 0, 0, offscreenCanvas.width, offscreenCanvas.height, -sw / 2 + w / 2, -sh / 2 + h / 2, sw, sh);
}


// 设置滚动条的文本
function drawScaleText(value) {
  var text = parseFloat(value).toFixed(2);
  var percent = parseFloat(value - min_scale) / parseFloat(max_scale - min_scale);
  scaleOutput.innerText = text;
  percent = percent < 0.35 ? 0.35 : percent;
  scaleOutput.style.fontSize = percent * max_scale / 1.5 + 'em';
}

// 绘制水印
function drawWatermark(context) {
  var lineOne = 'Copyright';
  var lineTwo = 'Acme Inc.'
  var textMetrics;
  var font_height = 128;

  context.save();
  context.fillStyle = 'rgba(100,140,230,0.5)';
  context.strokeStyle = 'yellow';
  context.shadowColor = 'rgba(50,50,50,1)';
  context.shadowOffsetX = 5;
  context.shadowOffsetY = 5;
  context.shadowBlur = 10;

  context.font = font_height + 'px Arial';
  textMetrics = context.measureText(lineOne);
  context.translate(canvas.width / 2, canvas.height / 2 - font_height / 2);
  context.fillText(lineOne, -textMetrics.width / 2, 0);
  context.strokeText(lineOne, -textMetrics.width / 2, 0);

  textMetrics = context.measureText(lineTwo);
  context.fillText(lineTwo, -textMetrics.width / 2, font_height);
  context.strokeText(lineTwo, -textMetrics.width / 2, font_height);

  context.restore();
}

scaleSlider.onchange = function (e) {
  scale = e.target.value;
  if (scale < min_scale) {
    scale = min_scale;
  } else if (scale > max_scale) {
    scale = max_scale;
  }
  drawScaled();
  drawScaleText(scale);
}

offscreenCanvas.width = canvas.width;
offscreenCanvas.height = canvas.height;

image.src = './lonelybeach.png';
image.onload = function (e) {
  context.drawImage(image, 0, 0, canvas.width, canvas.height);
  offscreenContext.drawImage(image, 0, 0, canvas.width, canvas.height);

  drawWatermark(context);
  drawWatermark(offscreenContext);
  drawScaleText(scaleSlider.value);
}