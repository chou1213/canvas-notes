var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');

// 表盘的半径
var CLOCK_RADIUS = canvas.width / 2 - 15;
// 时针
var HOUR_HAND_TRUNCATION = 35;

// 绘制器对象
var ballPainter = {
    paint: function(sprite, context) {
        var x = sprite.left + sprite.width / 2; // 绘制的坐标x
        var y = sprite.top + sprite.height / 2; // 绘制的坐标y
        var width = sprite.width; // 绘制宽
        var height = sprite.height; // 绘制高
        var radius = sprite.width / 2; // 绘制的半径

        // 保存canvas当前的状态
        context.save();
        context.beginPath();
        context.arc(x, y, radius, 0, Math.PI * 2, false);
        context.clip();

        context.shadowColor = 'rgb(0,0,0)';
        context.shadowOffsetX = -4;
        context.shadowOffsetY = -4;
        context.shadowBlur = 8;

        context.fillStyle = 'rgba(218, 165, 32, 0.1)';
        context.fill();

        context.lineWidth = 2;
        context.strokeStyle = 'rgb(100,100,195)';
        context.stroke();

        context.restore();
    }
}

var ball = new Sprite('ball', ballPainter);

// 绘制网格
function drawGrid(color, stepx, stepy) {
    context.save();
    context.shadowBlur = 0;
    context.shadowOffsetX = 0;
    context.shadowOffsetY = 0;

    context.strokeStyle = color;
    context.fillStyle = '#ffffff';
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
    context.restore();
}

// 绘制针
function drawHand(loc, isHour) {
    var angle = (Math.PI * 2) * (loc / 60) - Math.PI / 2;
    var handRadius = isHour ? CLOCK_RADIUS - HOUR_HAND_TRUNCATION : CLOCK_RADIUS;
    // 计算针的终点坐标
    var lineEnd = {
        x: canvas.width / 2 +
            Math.cos(angle) * (handRadius - ball.width / 2),

        y: canvas.height / 2 +
            Math.sin(angle) * (handRadius - ball.width / 2)
    };

    context.beginPath();
    context.moveTo(canvas.width / 2, canvas.height / 2); // 起点：画布中心坐标
    context.lineTo(lineEnd.x, lineEnd.y); // 终点：
    context.stroke();

    // 计算小球坐标
    ball.left = canvas.width / 2 + Math.cos(angle) * handRadius - ball.width / 2;
    ball.top = canvas.height / 2 + Math.sin(angle) * handRadius - ball.height / 2;
    ball.paint(context);
}

// 绘制表
function drawClock() {
    drawClockFace();
    drawHands();
}

//时针，分针，秒针
function drawHands() {
    var date = new Date();
    var hour = date.getHours();

    // 秒针上的小球
    ball.width = 20;
    ball.height = 20;
    drawHand(date.getSeconds(), false);

    // 分针上的小球
    ball.width = 35;
    ball.height = 35;
    drawHand(date.getMinutes(), false);

    // 时针上的小球
    console.log(hour);
    hour = hour > 12 ? hour - 12 : hour; //12小时制
    ball.width = 50;
    ball.height - 50;
    drawHand(hour * 5 + (date.getMinutes() / 60) * 5, true);

    // 表盘中间的小球
    ball.width = 10;
    ball.height = 10;
    ball.left = canvas.width / 2 - ball.width / 2;
    ball.top = canvas.height / 2 - ball.height / 2;
    ball.paint(context);
}

// 绘制表盘圆
function drawClockFace() {
    context.beginPath();
    context.arc(canvas.width / 2, canvas.height / 2, CLOCK_RADIUS, 0, Math.PI * 2, false);
    context.save();
    context.strokeStyle = 'rgba(0,0,0,0.2)';
    context.stroke();
    context.restore();
}

// 循环动画
function animate() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    drawGrid('lightGray', 10, 10);
    drawClock();
    window.requestNextAnimationFrame(animate);
}

// 设置线宽
context.lineWidth = 0.5;
// 设置描边颜色
context.strokeStyle = 'rgba(0,0,0,0.2)';
// 判断useragent的类型，设置阴影颜色
if (navigator.userAgent.indexOf('Opera') === -1) {
    context.shadowColor = 'rgba(0,0,0,0.5)';
}
// 设置阴影参数
context.shadowOffsetX = 2;
context.shadowOffsetY = 2;
context.shadowBlur = 4;
context.stroke();

// 以上样式用于表盘的圆和线

window.requestNextAnimationFrame(animate);

drawGrid('lightGray', 10, 10);