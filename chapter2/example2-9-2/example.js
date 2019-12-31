var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');

context.beginPath();
context.rect(50, 50, 100, 100);
context.stroke();

// 通过beginPath清空当前子路径，再创建绘制一个矩形路径，再描边
// 如果注释beginPath，再创建一个矩形路径，执行描边，会导致当前路径包含两个子路径，同时被描边
// context.beginPath(); 
context.rect(200, 50, 100, 100);
context.stroke()