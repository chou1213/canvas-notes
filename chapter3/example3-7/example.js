var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');
var horizontal_axis_margin = 50;
var vertical_axis_margin = 50;
var axis_origin = {
  x: horizontal_axis_margin,
  y: canvas.height - horizontal_axis_margin
};
var axis_top = vertical_axis_margin;
var axis_right = canvas.width - horizontal_axis_margin
var horizontal_tick_spacing = 10;
var vertical_tick_spacing = 10;
var axis_width = axis_right - axis_origin.x;
var axis_height = axis_origin.y - axis_top;
var num_vertical_ticks = axis_height / vertical_tick_spacing;
var num_horizontal_ticks = axis_width / horizontal_tick_spacing;
var tick_width = 10;
var space_between_labels_and_axis = 20;

function drawAxes() {
  context.save();
  context.lineWidth = 1;
  context.fillStyle = 'rgba(100,140,230,0.8)';
  context.strokeStyle = 'navy';

  drawHoriziontalAxis();
  drawVerticalAxis();

}

function drawAxisLabels() { }

function drawHoriziontalAxisLabels() {
  context.textAlign = 'center';
  context.textBaseline = 'middle';
  for (var i = 0; i < num_horizontal_ticks; ++i) {
    if (i % 5 === 0) {
      context.fillText(i, axis_origin.x + i * horizontal_tick_spacing, axis_origin.y + space_between_labels_and_axis);

    }
  }
}

function drawVerticalAxisLabels() {
  context.textAlign = 'right';
  context.textBaseline = 'middle';
  for (var i = 0; i <= num_vertical_ticks; ++i) {
    if (i % 5 === 0) {
      context.fillText(i, axis_origin.x - space_between_labels_and_axis, axis_origin.y - i * vertical_tick_spacing);
    }
  }
}

context.font = '13px Arial';
context.shadowColor = 'rgba(100,140,230,0.8)';
context.shadowOffsetX = 3;
context.shadowOffsetY = 3;
context.shadowBlur = 5;

drawAxes();
drawAxisLabels();

