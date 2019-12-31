var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');

function drawGrid(color, stepx, stepy) {

}

// 绘制两个圆，注意两个同心圆同时都是顺时针或者逆时针，以及一个逆时针一个顺时针的差异
function drawTwoArcs() {
  context.beginPath();
  context.arc(300, 190, 150, 0, Math.PI * 2, false);
  context.arc(300, 190, 100, 0, Math.PI * 2, true);

  context.fill();
}

function draw() {
  drawTwoArcs();
}

context.fillStyle = "rgba(100,140,230,0.5)";
context.strokeStyle = context.fillStyle;
draw();