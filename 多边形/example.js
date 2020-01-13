var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');

var Point = function (x, y) { // 记录多边形每个点
  this.x = x;
  this.y = y;
}

var Polygon = function (centerX, centerY, sides, radius, startAngle, strokestyle, fillStyle) {
  this.centerX = centerX;
  this.centerY = centerY;
  this.radius = radius;
  this.sides = sides;
  this.startAngle = startAngle;
  this.strokestyle = strokestyle;
  this.fillStyle = fillStyle;
}

Polygon.prototype = {
  getPoints: function () {
    var points = [];
    var startAngle = this.startAngle || 0;
    for (var i = 0; i < this.sides; i++) {
      points.push(new Point(this.centerX + this.radius * Math.cos(startAngle), this.centerY - this.radius * Math.sin(startAngle)));
      startAngle += 2 * Math.PI / this.sides;
    }
    return points;
  },
  createPath: function (context) {
    var points = this.getPoints();
    context.beginPath();
    context.moveTo(points[0].x, points[0].y);
    for (var i = 0; i < this.sides; i++) {
      context.lineTo(points[i].x, points[i].y);
    }
    context.closePath();
  },
  stroke: function (context) {
    context.save();
    this.createPath(context);
    context.strokestyle = this.strokestyle;
    context.stroke();
    context.restore();
  },
  fill: function (context) {
    context.save();
    this.createPath(context);
    context.fillStyle = this.fillStyle;
    context.fill();
    context.restore();
  }
}

var polygons = new Polygon(100, 100, 3, 100, 10 * (Math.PI / 180), 'red', 'black');
polygons.fill(context);
polygons.stroke(context);