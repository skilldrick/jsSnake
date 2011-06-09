var JS_SNAKE = {};


JS_SNAKE.Game = (function () {
  var canvas, ctx;
  var counter = 0;
  var frameLength = 1000;
  var snake;
  JS_SNAKE.width = 200;
  JS_SNAKE.height = 200;
  JS_SNAKE.blockSize = 10;

  function gameLoop() {
    counter++;
    ctx.clearRect(0, 0, JS_SNAKE.width, JS_SNAKE.height);
    drawGrid(); //delete this eventually
    snake.advance();
    snake.draw();
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
    //canvas = document.getElementById('canvas');
    canvas = document.createElement('canvas');
    document.body.appendChild(canvas);
    canvas.setAttribute('width', JS_SNAKE.width);
    canvas.setAttribute('height', JS_SNAKE.height);
    ctx = canvas.getContext('2d');
    ctx.fillStyle = "black";
    snake = JS_SNAKE.Snake;
    snake.init(ctx);
    gameLoop();
  }

  return {
    init: init
  };
})();

JS_SNAKE.Snake = (function () {
  var posArray = [];
  var ctx;
  var direction;

  function init(context) {
    ctx = context;
    direction = 'right';
    posArray.push([4, 4]);
  }

  function drawSection(position) {
    ctx.fillRect(JS_SNAKE.blockSize * position[0], JS_SNAKE.blockSize * position[1],
      JS_SNAKE.blockSize, JS_SNAKE.blockSize);
  }

  function draw() {
    for(var i = 0; i < posArray.length; i++) {
      drawSection(posArray[i]);
    }
  }

  function advance() {
    var nextPosition = posArray[0].slice(); //make a copy of the head of the snake
    switch (direction) {
    case 'up':
      nextPosition[1] -= 1; //y axis starts at top
      break;
    case 'right':
      nextPosition[0] += 1;
      break;
    case 'down':
      nextPosition[1] += 1;
      break;
    case 'left':
      nextPosition[0] -= 1;
      break;
    default:
      throw('Invalid direction');
    }

    posArray.unshift(nextPosition);
    posArray.pop();
  }

  return {
    init: init,
    draw: draw,
    advance: advance
  };
})();


JS_SNAKE.Game.init();
