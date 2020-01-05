var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');
// 线性渐变
// var gradient = context.createLinearGradient(0, 0, canvas.width, 0);
// var gradient = context.createLinearGradient(0, 0, canvas.width, canvas.height);
var gradient = context.createLinearGradient(0, 0, 0, canvas.height / 2);

gradient.addColorStop(0, 'blue');
gradient.addColorStop(0.25, 'white');
gradient.addColorStop(0.5, 'purple');
gradient.addColorStop(0.75, 'red');
gradient.addColorStop(1, 'yellow');

context.fillStyle = gradient;
context.fillRect(0, 0, canvas.width, canvas.height);