var JS_SNAKE = {};

$(function () {
  JS_SNAKE.Game.init();
});

JS_SNAKE.equalCoordinates = function (coord1, coord2) {
  return coord1[0] === coord2[0] && coord1[1] === coord2[1];
}

JS_SNAKE.checkCoordinateInArray = function (coord, arr) {
  var isInArray = false;
  $.each(arr, function (index, item) {
    if (JS_SNAKE.equalCoordinates(coord, item)) {
      isInArray = true;
    }
  });
  return isInArray;
};

JS_SNAKE.Game = (function () {
  var canvas, ctx;
  var counter = 0;
  var frameLength = 1000;
  var snake;
  var apple;
  JS_SNAKE.width = 200;
  JS_SNAKE.height = 200;
  JS_SNAKE.blockSize = 10;

  function gameLoop() {
    counter++;
    ctx.clearRect(0, 0, JS_SNAKE.width, JS_SNAKE.height);
    snake.advance(apple);
    draw();

    if (snake.checkCollision()) {
      snake.retreat(); //move snake back to previous position
      draw();
      gameOver();
    }
    else {
      setTimeout(gameLoop, frameLength);
    }
  }

  function draw() {
    snake.draw();
    apple.draw();
    drawBorder();
  }

  function drawBorder() {
    ctx.save();
    ctx.strokeStyle = 'gray';
    ctx.lineWidth = 2;
    var corners = [
      [1, 1],
      [JS_SNAKE.width - 1, 1],
      [JS_SNAKE.width - 1, JS_SNAKE.height - 1],
      [1, JS_SNAKE.height - 1]
    ];
    ctx.moveTo.apply(ctx, corners[3]);
    $.each(corners, function (index, corner) {
      ctx.lineTo.apply(ctx, corner);
    });
    ctx.stroke();
    ctx.restore();
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
    apple = JS_SNAKE.Apple;
    apple.init(ctx);
    bindEvents();
    gameLoop();
  }

  return {
    init: init
  };
})();

JS_SNAKE.Apple = (function () {
  var position;
  var ctx;

  function init(context) {
    ctx = context;
    position = [10, 10];
  }

  function draw() {
    ctx.save();
    ctx.fillStyle = '0a0';
    ctx.fillRect(JS_SNAKE.blockSize * position[0], JS_SNAKE.blockSize * position[1],
      JS_SNAKE.blockSize, JS_SNAKE.blockSize);
    ctx.restore();
  }


  function setNewPosition(snakeArray) {

  }

  function getPosition() {
    return position;
  }

  return {
    init: init,
    draw: draw,
    setNewPosition: setNewPosition,
    getPosition: getPosition
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
    var wallCollision = false;
    var snakeCollision = false;
    var head = posArray[0];
    var snakeX = head[0];
    var snakeY = head[1];
    var widthInBlocks = JS_SNAKE.width / JS_SNAKE.blockSize;
    var heightInBlocks = JS_SNAKE.height / JS_SNAKE.blockSize;
    if (snakeX < 0 || snakeY < 0 || snakeX >= widthInBlocks || snakeY >= heightInBlocks) {
      wallCollision = true;
    }
    //check if the snake head coords overlap the rest of the snake
    snakeCollision = JS_SNAKE.checkCoordinateInArray(head, posArray.slice(1));
    return wallCollision || snakeCollision;
  }

  function advance(apple) {
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
    if (JS_SNAKE.equalCoordinates(posArray[0], apple.getPosition())) {
      apple.setNewPosition(posArray);
    }
    else {
      posArray.pop();
    }
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


