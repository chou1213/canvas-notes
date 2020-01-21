var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');
var image = new Image();
var scaleOutput = document.getElementById('scaleOutput');
var scaleSlider = document.getElementById('scaleSlider');
var scale = 1;
var max_scale = 3;
var min_scale = 1;

// 放大缩小图片
function drawScaled() {
  var w = canvas.width;
  var h = canvas.height;
  var sw = w * scale;
  var sh = h * scale;

  context.clearRect(0, 0, w, h);
  context.drawImage(image, 0, 0, w, h);

  drawWatermark();

  context.drawImage(canvas, 0, 0, w, h, -sw / 2 + w / 2, -sh / 2 + h / 2, sw, sh);
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
function drawWatermark() {
  var lineOne = 'Copyright';
  var lineTwo = 'Acme Inc.'
  var textMetrics;
  var font_height = 128;

  context.save();

  context.font = font_height + 'px Arial';
  textMetrics = context.measureText(lineOne);
  context.globalAlpha = 0.6;
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
  console.log(e.target)
  if (scale < min_scale) {
    scale = min_scale;
  } else if (scale > max_scale) {
    scale = max_scale;
  }
  drawScaled();
  drawScaleText(scale);
}

context.fillStyle = 'cornflowerblue';
context.strokeStyle = 'yellow';
context.shadowColor = 'rgba(50,50,50,1)';
context.shadowOffsetX = 5;
context.shadowOfssetY = 5;
context.shadowBlur = 10;

var glassSize = 150;
image.src = './lonelybeach.png';
image.onload = function () {
  context.drawImage(image, 0, 0, canvas.width, canvas.height);
  drawWatermark();
  drawScaleText(scale);
}