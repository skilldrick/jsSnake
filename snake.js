var JS_SNAKE = {};

$(function () {
  JS_SNAKE.Game.init();
});

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

  function bindEvents() {
    $('body').keydown(function (event) {
      switch (event.which) {
      case 37:
        snake.setDirection('left');
        break;
      case 38:
        snake.setDirection('up');
        break;
      case 39:
        snake.setDirection('right');
        break;
      case 40:
        snake.setDirection('down');
        break;
      }
    });
  }

  function init() {
    $('body').append('<canvas>');
    var $canvas = $('canvas');
    $canvas.attr('width', JS_SNAKE.width);
    $canvas.attr('height', JS_SNAKE.height);
    canvas = $canvas[0];
    ctx = canvas.getContext('2d');
    ctx.fillStyle = "black";
    snake = JS_SNAKE.Snake;
    snake.init(ctx);
    bindEvents();
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
  var nextDirection;

  function init(context) {
    ctx = context;
    nextDirection = direction = 'right';
    posArray.push([4, 4]);
  }

  function setDirection(newDirection) {
    var allowedDirections;

    switch (direction) {
    case 'left':
    case 'right':
      allowedDirections = ['up', 'down'];
      break;
    case 'up':
    case 'down':
      allowedDirections = ['left', 'right'];
      break;
    default:
      throw('Invalid direction');
    }
    if (allowedDirections.indexOf(newDirection) > -1) {
      nextDirection = newDirection;
    }
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
    direction = nextDirection;
    switch (direction) {
    case 'left':
      nextPosition[0] -= 1;
      break;
    case 'up':
      nextPosition[1] -= 1;
      break;
    case 'right':
      nextPosition[0] += 1;
      break;
    case 'down':
      nextPosition[1] += 1;
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
    advance: advance,
    setDirection: setDirection
  };
})();


