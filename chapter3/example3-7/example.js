
var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');
var horizontal_axis_margin = 50; // 水平边距
var vertical_axis_margin = 50; // 垂直边距
var axis_origin = {            // 起点坐标
  x: horizontal_axis_margin,
  y: canvas.height - horizontal_axis_margin
};
var axis_top = vertical_axis_margin;
var axis_right = canvas.width - horizontal_axis_margin;
var horizontal_tick_spacing = 10;// 水平每个刻度间隙
var vertical_tick_spacing = 10;// 垂直每个刻度间隙
var axis_width = axis_right - axis_origin.x; // x轴的长度
var axis_height = axis_origin.y - axis_top; // y轴的长度
var num_vertical_ticks = axis_height / vertical_tick_spacing; // 获取y轴有多少刻度
var num_horizontal_ticks = axis_width / horizontal_tick_spacing; // 获取x轴有多少刻度
var tick_width = 10;
var space_between_labels_and_axis = 20;

// 绘制网格
function drawGrid(color, stepx, stepy) {
  context.save();
  context.strokeStyle = color;
  for (var i = stepy + 0.5; i < canvas.height; i += stepy) {
    context.beginPath();
    context.moveTo(0, i);
    context.lineTo(canvas.width, i);
    context.stroke();
  }
  for (var i = stepx + 0.5; i < canvas.width; i += stepx) {
    context.beginPath();
    context.moveTo(i, 0);
    context.lineTo(i, canvas.height);
    context.stroke();
  }
  context.restore();
}


// 绘制x轴
function drawHorizontalAxis() {
  context.beginPath();
  context.moveTo(axis_origin.x, axis_origin.y);
  context.lineTo(axis_right, axis_origin.y);
  context.stroke();
}

// 绘制y轴
function drawVerticalAxis() {
  context.beginPath();
  context.moveTo(axis_origin.x, axis_origin.y);
  context.lineTo(axis_origin.x, axis_top);
  context.stroke();
}

// 绘制y轴刻度
function drawVerticalAxisTicks() {
  for (var i = 1; i < num_vertical_ticks; i++) {
    context.beginPath();
    var deltaX;
    if (i % 5 === 0) {
      deltaX = tick_width;
    } else {
      deltaX = tick_width / 2;
    }
    context.moveTo(axis_origin.x - deltaX, axis_origin.y - i * vertical_tick_spacing);
    context.lineTo(axis_origin.x + deltaX, axis_origin.y - i * vertical_tick_spacing);
    context.stroke();
  }
}

// 绘制x轴刻度
function drawHorizontalAxisTicks() {
  for (var i = 1; i < num_horizontal_ticks; i++) {
    context.beginPath();
    var deltaY;
    if (i % 5 === 0) {
      deltaY = tick_width;
    } else {
      deltaY = tick_width / 2;
    }
    context.moveTo(axis_origin.x + i * vertical_tick_spacing, axis_origin.y + deltaY);
    context.lineTo(axis_origin.x + i * vertical_tick_spacing, axis_origin.y - deltaY);
    context.stroke();
  }
}

// 绘制坐标轴,和刻度
function drawAxes() {
  context.save();
  context.lineWidth = 1;
  context.fillStyle = 'rgba(100,140,230,0.8)';
  context.strokeStyle = 'navy';

  drawHorizontalAxis();
  drawVerticalAxis();

  context.lineWidth = 0.5;
  context.strokeStyle = 'darkred';
  drawVerticalAxisTicks();
  drawHorizontalAxisTicks();
  context.restore();
}

// 绘制x轴刻度文字
function drawHorizontalAxisLabels() {
  context.textAlign = 'center';
  context.textBaseline = 'top';
  for (var i = 0; i < num_horizontal_ticks; ++i) {
    if (i % 5 === 0) {
      context.save();
      context.fllStyle = 'rgba(0,0,0,.5)';
      context.fillRect(axis_origin.x + i * horizontal_tick_spacing - 2, axis_origin.y + space_between_labels_and_axis - 2, 4, 4);
      context.restore();
      context.fillText(i, axis_origin.x + i * horizontal_tick_spacing, axis_origin.y + space_between_labels_and_axis);
    }
  }
}

// 绘制y轴刻度文字
function drawVerticalAxisLabels() {
  context.textAlign = 'right';
  context.textBaseline = 'middle';
  for (var i = 0; i <= num_vertical_ticks; ++i) {
    if (i % 5 === 0) {
      context.save();
      context.fllStyle = 'rgba(0,0,0,.5)';
      context.fillRect(axis_origin.x - space_between_labels_and_axis - 2, axis_origin.y - i * vertical_tick_spacing - 2, 4, 4);
      context.restore();
      context.fillText(i, axis_origin.x - space_between_labels_and_axis, axis_origin.y - i * vertical_tick_spacing);
    }
  }
}

// 绘制坐标轴刻度
function drawAxisLabels() {
  context.fillStyle = 'blue';
  drawHorizontalAxisLabels();
  drawVerticalAxisLabels();
}


// 初始化
drawGrid('lightgray', 10, 10);

context.font = '13px Arial';
context.shadowColor = 'rgba(100,140,230,0.8)';
context.shadowOffsetX = 3;
context.shadowOffsetY = 3;
context.shadowBlur = 5;

drawAxes();
drawAxisLabels();

