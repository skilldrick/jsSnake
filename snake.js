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
    snake.advance();
    drawBorder();

    if (snake.checkCollision()) {
      snake.retreat(); //move snake back to previous position
      snake.draw();
      gameOver();
    }
    else {
      snake.draw();
      setTimeout(gameLoop, frameLength);
    }
  }

  function drawBorder() {
    ctx.strokeStyle = 'gray';
    ctx.lineWidth = 2;
    var corners = [[1, 1], [JS_SNAKE.width - 1, 1],
      [JS_SNAKE.width - 1, JS_SNAKE.height - 1], [1, JS_SNAKE.height - 1]];
    ctx.moveTo.apply(ctx, corners[3]);
    $.each(corners, function (index, corner) {
      ctx.lineTo.apply(ctx, corner);
    });
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
  var previousPosArray;
  var posArray = [];
  var ctx;
  var direction;
  var nextDirection;

  function init(context) {
    ctx = context;
    nextDirection = direction = 'right';
    posArray.push([5, 4]);
    posArray.push([4, 4]);
    posArray.push([3, 4]);
    posArray.push([2, 4]);
    posArray.push([1, 4]);
    posArray.push([0, 4]);
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

  function checkCollision() {
    var collision = false;
    var head = posArray[0];
    var snakeX = head[0];
    var snakeY = head[1];
    var widthInBlocks = JS_SNAKE.width / JS_SNAKE.blockSize;
    var heightInBlocks = JS_SNAKE.height / JS_SNAKE.blockSize;
    if (snakeX < 0 || snakeY < 0 || snakeX >= widthInBlocks || snakeY >= heightInBlocks) {
      collision = true;
    }
    $.each(posArray.slice(1), function (index, item) {
      console.log(item);
      console.log(snakeX, snakeY);
      if (snakeX === item[0] && snakeY === item[1]) {
        collision = true;
      }
    });
    return collision;
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

    previousPosArray = posArray.slice(); //save previous array
    posArray.unshift(nextPosition);
    posArray.pop();
  }

  function retreat() {
    posArray = previousPosArray;
  }

  return {
    init: init,
    draw: draw,
    advance: advance,
    retreat: retreat,
    setDirection: setDirection,
    checkCollision: checkCollision
  };
})();


