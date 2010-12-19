var JS_SNAKE = {};

$(document).ready(function () {
  JS_SNAKE.Game.init();
});

JS_SNAKE.Game = (function () {
  var canvas, ctx;
  var width = 100;
  var height = 100;
  var counter = 0;
  var frameLength = 100;
  canvas.width = width;
  canvas.height = height;

  function gameLoop() {
    ctx.clearRect(0, 0, width, height);
    setTimeout(gameLoop, frameLength);
    counter++;
  }


  function init() {
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
    ctx.fillStyle = "black";
    gameLoop();
  }

  return {
    init: init
  };
})();

JS_SNAKE.Snake = (function () {

  return {};
})();
