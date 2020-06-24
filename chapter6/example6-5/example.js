var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');
var bomb = new Sprite('bomb', new ImagePainter('../../shared/images/bomb.png'));
var BOMB_LEFT = 220;
var BOMB_TOP = 80;
var BOMB_WIDTH = 180;
var BOMB_HEIGHT = 130;

function animate() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    bomb.paint(context);
    window.requestNextAnimationFrame(animate);
}
bomb.left = BOMB_LEFT;
bomb.top = BOMB_TOP;
bomb.width = BOMB_WIDTH;
bomb.height = BOMB_HEIGHT;

window.requestNextAnimationFrame(animate);