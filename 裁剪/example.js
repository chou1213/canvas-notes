var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');


context.beginPath();
context.arc(canvas.width / 2, canvas.height / 2, 100, 0, Math.PI * 2, false);
context.stroke();
context.clip();

context.beginPath();
context.rect(canvas.width / 2 - 100, canvas.height / 2 - 100, 55, 55);
context.fill();
