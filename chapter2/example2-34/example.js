var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');
var strokeStyleSelect = document.getElementById('strokeStyleSelect');
var fillStyleSelect = document.getElementById('fillStyleSelect');
var drawRadio = document.getElementById('drawRadio');
var eraserRadio = document.getElementById('eraserRadio');
var eraserShapeSelect = document.getElementById('eraserShapeSelect');
var eraserWidthSelect = document.getElementById('eraserWidthSelect');

var ERASER_LINE_WIDTH = 1;
var ERASER_SHADOW_COLOR = 'rgb(0,0,0)';
var ERASER_SHADOW_STYLE = 'blue';
var ERASER_STROKE_STYLE = 'rgb(0,0,255)';
var ERASER_SHADOW_OFFSET = -5;
var ERASER_SHADOW_BLUR = 20;

var GRID_HORIZONTAL_SPACING = 10;
var GRID_VERTICAL_SPACING = 10;
var GRID_LINE_COLOR = 'lightblue';
var drawingSurfaceImageData;
var lastX;
var lastY;
var mousedown = {};
var rubberbandRect = {};
var dragging = false;
var guidewires = true;

function drawGrid(color, stepx, stepy) {
  context.save();
  context.lineWidth = 0.5;
  context.strokeStyle = color;
  context.fillStyle = '#fff';
  context.fillRect(0, 0, context.canvas.width, context.canvas.height);

  for (var i = stepx + 0.5; i < canvas.width; i += stepx) {
    context.beginPath();
    context.moveTo(i, 0);
    context.lineTo(i, canvas.height);
    context.stroke();
  }

  for (var i = stepy + 0.5; i < canvas.height; i += stepy) {
    context.beginPath();
    context.moveTo(0, i);
    context.lineTo(canvas.width, i);
    context.stroke();
  }
  context.restore();
}

function windowToCanvas(x, y) {
  var bbox = canvas.getBoundingClientRect();
  return {
    x: x - bbox.left * (canvas.width / bbox.width),
    y: y - bbox.top * (canvas.height / bbox.height)
  };
}

function saveDrawingSurface() {
  drawingSurfaceImageData = context.getImageData(0, 0, canvas.width, canvas.height);
}

function restoreDrawingSurface() {
  context.putImageData(drawingSurfaceImageData, 0, 0);
}

function updateRubberbandRectangle(loc) {
  rubberbandRect.width = Math.abs(loc.x - mousedown.x);
  rubberbandRect.height = Math.abs(loc.y - mousedown.y);

  if (loc.x > mousedown.x) {
    rubberbandRect.left = mousedown.x;
  } else {
    rubberbandRect.left = loc.x;
  }

  if (loc.y > mousedown.y) {
    rubberbandRect.top = mousedown.y;
  } else {
    rubberbandRect.top = loc.y;
  }
  console.log(rubberbandRect);
}

function drawRubberbandShape() {
  var radius = Math.sqrt(Math.pow(rubberbandRect.height, 2) + Math.pow(rubberbandRect.width, 2));
  context.beginPath();
  context.arc(mousedown.x, mousedown.y, radius, 0, Math.PI * 2, false);
  context.stroke();
  context.fill();
}

function updateRubberband(loc) {
  updateRubberbandRectangle(loc);
  drawRubberbandShape(loc);
}

// 绘制水平线段
function drawHorizontallLine(y) {
  context.beginPath();
  context.moveTo(0, y + 0.5);
  context.lineTo(context.canvas.width, y + 0.5);
  context.stroke();
}

// 绘制垂直线段
function drawVerticalLine(x) {
  context.beginPath();
  context.moveTo(x + 0.5, 0);
  context.lineTo(x + 0.5, context.canvas.height);
  context.stroke();
}

// 聚合绘制垂直和水平辅助线的方法
function drawGuidewires(x, y) {
  context.save();
  context.strokeStyle = 'rgba(0,0,230,0.4)';
  context.lineWidth = 0.5;
  drawVerticalLine(x);
  drawHorizontallLine(y);
  context.restore();
}

/* function setDrawPathForErase(loc) {
  var eraserWidth = parseFloat(eraserShapeSelect.value);
  context.beginPath();

  if (eraserShapeSelect.value === 'circle') {
    context.arc(loc.x, loc.y, eraserWidth / 2, 0, Math.PI * 2, false);
  } else {
    context.rect(loc.x - eraserWidth / 2, loc.y - eraserWidth / 2, eraserWidth, eraserWidth);
  }
  context.clip();
}

function setErasePathForEraser() {
  var eraserWidth = parseFloat(eraserShapeSelect.value);
  context.beginPath();

  if (eraserShapeSelect.value === 'circle') {
    context.arc(lastX, lastY, eraserWidth / 2, 0, Math.PI * 2, false);
  } else {
    context.rect(lastX, - eraserWidth / 2, lastY - eraserWidth / 2, eraserWidth, eraserWidth);
  }
  context.clip();
}

function setEraserAttributes() {
  context.lineWidth = ERASER_LINE_WIDTH;
  context.shadowColor = ERASER_SHADOW_STYLE;
  context.shadowOffsetX = ERASER_SHADOW_OFFSET;
  context.shadowOffsetY = ERASER_SHADOW_OFFSET;
  context.shadowBlur = ERASER_SHADOW_BLUR;
  context.strokeStyle = ERASER_STROKE_STYLE;
}

function eraseLast() {
  context.save();
  setErasePathForEraser();
  drawGrid(GRID_LINE_COLOR, GRID_HORIZONTAL_SPACING, GRID_VERTICAL_SPACING);
  context.restore();
}

function drawEraser(loc) {
  context.save();
  setEraserAttributes();
  setDrawPathForErase(loc);
  context.restore();
} */



function setDrawPathForEraser(loc) {
  var eraserWidth = parseFloat(eraserWidthSelect.value);

  context.beginPath();

  if (eraserShapeSelect.value === 'circle') {
    context.arc(loc.x, loc.y,
      eraserWidth / 2,
      0, Math.PI * 2, false);
  }
  else {
    context.rect(loc.x - eraserWidth / 2,
      loc.y - eraserWidth / 2,
      eraserWidth, eraserWidth);
  }
  context.clip();
}

function setErasePathForEraser() {
  var eraserWidth = parseFloat(eraserWidthSelect.value);

  context.beginPath();

  if (eraserShapeSelect.value === 'circle') {
    context.arc(lastX, lastY,
      eraserWidth / 2 + ERASER_LINE_WIDTH,
      0, Math.PI * 2, false);
  }
  else {
    context.rect(lastX - eraserWidth / 2 - ERASER_LINE_WIDTH,
      lastY - eraserWidth / 2 - ERASER_LINE_WIDTH,
      eraserWidth + ERASER_LINE_WIDTH * 2,
      eraserWidth + ERASER_LINE_WIDTH * 2);
  }
  context.clip();
}

function setEraserAttributes() {
  context.lineWidth = ERASER_LINE_WIDTH;
  context.shadowColor = ERASER_SHADOW_STYLE;
  context.shadowOffsetX = ERASER_SHADOW_OFFSET;
  context.shadowOffsetY = ERASER_SHADOW_OFFSET;
  context.shadowBlur = ERASER_SHADOW_BLUR;
  context.strokeStyle = ERASER_STROKE_STYLE;
}

function eraseLast() {
  context.save();

  setErasePathForEraser();
  drawGrid(GRID_LINE_COLOR,
    GRID_HORIZONTAL_SPACING,
    GRID_VERTICAL_SPACING);
  context.stroke()

  context.restore();
}

function drawEraser(loc) {
  context.save();

  setEraserAttributes();
  setDrawPathForEraser(loc);
  context.stroke();

  context.restore();
}

canvas.onmousedown = function (e) {
  var loc = windowToCanvas(e.clientX, e.clientY);
  e.preventDefault();
  if (drawRadio.checked) {
    saveDrawingSurface();
  }
  mousedown.x = loc.x;
  mousedown.y = loc.y;
  lastX = loc.x;
  lastY = loc.y;
  dragging = true;
}

canvas.onmousemove = function (e) {
  var loc = windowToCanvas(e.clientX, e.clientY);
  e.preventDefault();
  if (dragging) {
    if (drawRadio.checked) {
      restoreDrawingSurface();
      updateRubberband(loc);
      if (guidewires) {
        drawGuidewires(loc.x, loc.y);
      }
    } else {
      eraseLast();
      drawEraser(loc);
    }
    lastX = loc.x;
    lastY = loc.y;
  }
}

canvas.onmouseup = function (e) {
  var loc = windowToCanvas(e.clientX, e.clientY);
  e.preventDefault();
  if (drawRadio.checked) {
    restoreDrawingSurface();
    updateRubberband(loc);
  }

  if (eraserRadio.checked) {
    eraseLast();
  }

  dragging = false;
}



strokeStyleSelect.onchange = function (e) {
  context.strokeStyle = strokeStyleSelect.value;
}

fillStyleSelect.onchange = function (e) {
  context.fillStyle = fillStyleSelect.value;
}

context.strokeStyle = strokeStyleSelect.value;
context.fillStyle = fillStyleSelect.value;


drawGrid(GRID_LINE_COLOR, GRID_HORIZONTAL_SPACING, GRID_VERTICAL_SPACING);