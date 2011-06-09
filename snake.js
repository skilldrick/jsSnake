var JS_SNAKE = {};

$(document).ready(function () {
  JS_SNAKE.Game.init();
});

JS_SNAKE.Game = (function () {
  var canvas, ctx;
  var counter = 0;
  var frameLength = 100;
  JS_SNAKE.width = 200;
  JS_SNAKE.height = 200;
  JS_SNAKE.blockSize = 10;

  function gameLoop() {
    counter++;
    ctx.clearRect(0, 0, JS_SNAKE.width, JS_SNAKE.height);
    drawGrid();
    JS_SNAKE.Snake.draw();
    setTimeout(gameLoop, frameLength);
  }
  
  function drawGrid() {
    ctx.strokeStyle = 'gray';
    for (var x = 0.5; x < JS_SNAKE.width; x += JS_SNAKE.blockSize) {
      ctx.moveTo(x, 0);
      ctx.lineTo(x, JS_SNAKE.height);
    }
    for (var y = 0.5; y < JS_SNAKE.height; y += JS_SNAKE.blockSize) {
      ctx.moveTo(0, y);
      ctx.lineTo(JS_SNAKE.width, y);
    }
    ctx.stroke();
  }

  function init() {
    canvas = document.getElementById('canvas');
    canvas.width = JS_SNAKE.width;
    canvas.height = JS_SNAKE.height;
    ctx = canvas.getContext('2d');
    ctx.fillStyle = "black";
    JS_SNAKE.Snake.init(ctx);
    gameLoop();
  }

  return {
    init: init
  };
})();

JS_SNAKE.Snake = (function () {
  var posArray = [];
  var ctx;

  function init(context) {
    posArray.push([2, 3]);
    posArray.push([3, 3]);
    posArray.push([3, 4]);
    posArray.push([3, 5]);
    posArray.push([3, 6]);
    posArray.push([4, 6]);
    posArray.push([5, 6]);
    ctx = context;
  }

  //previous, current and next positions
  function drawSection(position) {
    ctx.fillRect(JS_SNAKE.blockSize * position[0], JS_SNAKE.blockSize * position[1],
      JS_SNAKE.blockSize, JS_SNAKE.blockSize);
  }

  function draw() {
    for(var i = 0; i < posArray.length; i++) {
      drawSection(posArray[i]);
    }
  }

  return {
    init: init,
    draw: draw
  };
})();
