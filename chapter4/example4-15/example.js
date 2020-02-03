var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');
var embossButton = document.getElementById('embossButton');
var embossed = false;
var image = new Image();

function emboss() {
  var imagedata;
  var data;
  var length;
  var width;
  var index;

  imagedata = canvas.getImageData(0, 0, canvas.width, canvas.height);
  data = imagedata.data;
  width = imagedata.width;
  length = data.length;

  for (var i = 0; i < length; i++) {
    if (i <= length - width * 4) {

    } else {

    }
  }
}

// 绘制图片
function drawOriginalImage() {
  context.drawImage(image, 0, 0, image.width, image.height, 0, 0, canvas.width, canvas.height);
}

embossButton.onclick = function () {
  if (embossed) {
    embossButton.value = 'emboss';
    drawOriginalImage();
    embossed = false;
  } else {
    embossButton.value = 'original image';
    emboss();
    embossed = true;
  }
}

image.src = './canyon.png';
image.onload = function () {
  drawOriginalImage();
}