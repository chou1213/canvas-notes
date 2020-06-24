var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');

// 球的半径
var RADIUS = 75;

var ball = new Sprite('ball',{
    paint:function(sprite, context){
        context.beginPath();
        context.arc(sprite.left + sprite.width/2, sprite.top + sprite.height/2, RADIUS, 0, Math.PI*2, false);
        context.clip();
        
        // 绘制阴影
        context.shadowColor = 'rgba(0,0,0)';
        context.shadowOffsetX = -4;
        context.shadowOffsetY = -4;
        context.shadowBlur = 8;
        context.lineWidth = 2;
        
        // 填充和描边
        context.strokeStyle = 'rgb(100,100,195)';
        context.fillStyle = 'rgba(30,144,255,0.15)';
        context.fill();
        context.stroke();
    }
});

// 绘制网格
function drawGrid(color, stepx, stepy) {
    context.strokeStyle = color;
    context.lineWidth = 0.5;
    for (var i = stepx + 0.5; i < context.canvas.width; i += stepx) {
      context.beginPath();
      context.moveTo(i, 0);
      context.lineTo(i, context.canvas.height);
      context.stroke();
    }
  
    for (var i = stepy + 0.5; i < context.canvas.height; i += stepy) {
      context.beginPath();
      context.moveTo(0, i);
      context.lineTo(context.canvas.width, i);
      context.stroke();
    }
}
drawGrid('lightGray',10,10);

// 设置小球实例的x，y坐标
ball.left = 320;
ball.top = 160;
// 绘制小球
ball.paint(context);