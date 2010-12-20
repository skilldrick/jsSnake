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

  function drawEnd(body, end) {

  }

  function drawMain(prev, curr, next) {
    if (prev[0] === curr[0] && curr[0] === next[0]) {
      //horizontal
      ctx.fillRect(JS_SNAKE.blockSize * curr[0] + 1, JS_SNAKE.blockSize * curr[1],
        8, JS_SNAKE.blockSize);
    }
    else if (prev[1] === curr[1] && curr[1] === next[1]) {
      //vertical
      ctx.fillRect(JS_SNAKE.blockSize * curr[0], JS_SNAKE.blockSize * curr[1] + 3,
        JS_SNAKE.blockSize, 3);
    }
    else {
      //other
    }
  }

  //previous, current and next positions
  function drawSection(prev, curr, next) {
    if (prev === undefined) {
      drawEnd(curr, next);
    }
    else if (next === undefined) {
      drawEnd(curr, prev);
    }
    else {
      drawMain(prev, curr, next);
    }
  }

  function draw() {
    for(var i = 0; i < posArray.length; i++) {
      drawSection(posArray[i - 1], posArray[i], posArray[i + 1]);
    }

  }

  return {
    init: init,
    draw: draw
  };
})();
