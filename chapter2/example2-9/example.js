var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');

context.font = '48pt Helvetica';
context.strokeStyle = 'blue';
context.fillStyle = 'red';
context.lineWidth = '2';

// 给字体描边
context.strokeText('Stroke', 60, 100);

// 填充字体
context.fillText('Fill', 400, 110);

// 给字体同时描边+填充
context.strokeText('Stroke & Fill', 650, 110);
context.fillText('Stroke & Fill', 650, 110);

// 给矩形路径描边
context.lineWidth = '5';
context.beginPath();
context.rect(80, 150, 150, 100);
context.stroke();

// 给矩形路径填充
context.beginPath();
context.rect(400, 150, 150, 100);
context.fill();

// 给矩形路径同时描边+填充
context.beginPath();
context.rect(750, 150, 150, 100);
context.stroke();
context.fill();

// 给圆弧路径描边
context.beginPath();
context.arc(150, 370, 60, 0, Math.PI * 3 / 2);
context.stroke();

// 给圆弧路径填充
context.beginPath();
context.arc(475, 370, 60, 0, Math.PI * 3 / 2);
context.fill();

// 给圆弧路径同时描边+填充
context.beginPath();
context.arc(820, 370, 60, 0, Math.PI * 3 / 2);
context.stroke();
context.fill();

// 给圆弧路径添加封闭路并描边
context.beginPath();
context.arc(150, 550, 60, 0, Math.PI * 3 / 2);
context.closePath();
context.stroke();

// 给圆弧路径添加封闭路并填充
context.beginPath();
context.arc(475, 550, 60, 0, Math.PI * 3 / 2);
context.closePath();
context.fill();

// 给圆弧路径添加封闭路同时描边+填充
context.beginPath();
context.arc(820, 550, 60, 0, Math.PI * 3 / 2);
context.closePath();
context.stroke();
context.fill();