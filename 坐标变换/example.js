var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');

var rectangle_width = 100;
var rectangle_height = 100;

// 绘制在画布的中间
// context.strokeRect(canvas.width / 2 - rectangle_width / 2, canvas.height / 2 - rectangle_height / 2, rectangle_width, rectangle_height);

// 修改画布的中心点
context.translate(canvas.width / 2 - rectangle_width / 2, canvas.height / 2 - rectangle_height / 2);
context.strokeRect(0, 0, rectangle_width, rectangle_height);
