var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');
// 放射渐变
var gradient = context.createRadialGradient(canvas.width / 2, canvas.height, 10, canvas.width / 2, 0, 100);

gradient.addColorStop(0, 'blue');
gradient.addColorStop(0.25, 'white');
gradient.addColorStop(0.5, 'purple');
gradient.addColorStop(0.75, 'red');
gradient.addColorStop(1, 'yellow');

context.fillStyle = gradient;
context.fillRect(0, 0, canvas.width, canvas.height);
