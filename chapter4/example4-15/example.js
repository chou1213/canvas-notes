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

  imagedata = context.getImageData(0, 0, canvas.width, canvas.height);
  data = imagedata.data;
  width = imagedata.width;
  length = data.length;

  console.log(imagedata);

  for (var i = 0; i < length; i++) {
    if (i <= length - width * 4) {
      // 如果是rgb值
      if ((i + 1) % 4 !== 0) {

        if ((i + 4) % (width * 4) === 0) {
          data[i] = data[i - 4];
          data[i + 1] = data[i - 3];
          data[i + 2] = data[i - 2];
          data[i + 3] = data[i - 1];
          i += 4;
        } else {
          data[i] = 255 / 2 + 2 * data[i] - data[i + 4] - data[i + width * 4];
        }
      }
    } else {
      if ((i + 1) % 4 === 0) {
        data[i] = data[i - width * 4];
      }
    }
  }
  context.putImageData(imagedata, 0, 0);
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