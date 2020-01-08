var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');
var lineArr = [
  { moveTo: [100, 100], lineTo: [200, 100], lineCap: 'butt' },
  { moveTo: [100, 120], lineTo: [200, 120], lineCap: 'round' },
  { moveTo: [100, 140], lineTo: [200, 140], lineCap: 'square' }
];

context.lineWidth = 10;

for (var i = 0; i < lineArr.length; i++) {
  context.beginPath();
  context.save();
  context.lineCap = lineArr[i].lineCap;
  context.moveTo(lineArr[i].moveTo[0], lineArr[i].moveTo[1]);
  context.lineTo(lineArr[i].lineTo[0], lineArr[i].lineTo[1]);
  context.stroke();
  context.restore();
}

context.beginPath();
context.save();
context.lineJoin = 'miter';
context.miterLimit = 1; // 值太小就会用bevel模式了
context.moveTo(300, 100);
context.lineTo(400, 100);
context.lineTo(400, 200);
context.stroke();
context.restore();

