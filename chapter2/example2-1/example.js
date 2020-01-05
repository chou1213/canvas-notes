var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');

context.lineJoin = 'round'; //两条线交汇的形状
context.lineWidth = 30;

context.font = '24px Helvetica';
context.fillText('click anywhere to erase', 174, 120);

context.strokeStyle = "golodenrod"; // 描边颜色
context.fillStyle = 'rgba(0,0,255,0.5)'; // 填充颜色

context.strokeRect(57, 50, 200, 200);
context.fillRect(375, 50, 200, 200);

canvas.onmousedown = function () {
  context.clearRect(0, 0, canvas.width, canvas.height);
}