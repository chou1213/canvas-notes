var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');
var left_column_fonts = [
  '2em palatino',
  'bolder 2em palatino',
  'lighter 2em palatino',
  'italic 2em palatino',
  'oblique small-caps 24px palatino',
  'bold 14px palatino',
  'xx-large palatino',
  'italic xx-large palatino'
];

var right_column_fonts = [
  'oblique 1.5em lucida console',
  'x-large fantasy',
  'italic 28px monaco',
  'italic large compperplate',
  '36px century',
  '28px tahoma',
  '28px impact',
  '1.7em verdana'
];

var left_column_x = 25;
var right_column_x = 425;
var delta_y = 50;
var top_y = 50;
var y = 0;

context.fillStyle = 'blue';
left_column_fonts.forEach(function (element) {
  context.font = element;
  context.fillText(element, left_column_x, y += delta_y);
});
y = 0;

right_column_fonts.forEach(function (element) {
  context.font = element;
  context.fillText(element, right_column_x, y += delta_y);
});