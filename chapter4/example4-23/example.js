var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');
var video = document.getElementById('video');
console.log(video);

function animate() {
  if (!video.ended) {
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    window.requestNextAnimationFrame(animate);
  }
}
console.log(video.onload);
video.onload = function () {
  console.log(1);
  video.play();
  window.requestAnimationFrame(animate);
}

video.addEventListener("canplaythrough", function () {
  //要执行的函数内容
  video.play();
});