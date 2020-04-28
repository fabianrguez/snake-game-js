
const board = document.querySelector('#board');
const boardCtx = board.getContext('2d');
const pointsDiv = document.querySelector('.point');
const maxPointsDiv = document.querySelector('.max-points');
const frames =  8;
const gridSize = 20;
let nextX = 0;
let nextY = 0;
const Snake = {
    defaultTailSize: 3,
    tailSize: 3,
    body: [],
    positionX: 10, 
    positionY: 10
}
const Apple = {
    positionX: randomNumber(gridSize),
    positionY: randomNumber(gridSize)
}
let points = 0;
let maxPoints = 0;

boardCtx.canvas.height = 400;
boardCtx.canvas.width = 400;

function keyDownEvent(e) {
    switch(e.keyCode) {
        case 40:
        case 83: {
            nextY = 1;
            nextX = 0;
            break;
        }
        case 38:
        case 87: {
            nextY = -1;
            nextX = 0;
            break;
        } 
        case 39:
        case 68: {
            nextY = 0;
            nextX = 1;
            break;
        } 
        case 37:
        case 65: {
            nextY = 0;
            nextX = -1;
            break;
        } 
    }
}

function randomNumber(limit) {
    return Math.floor(Math.random() * limit);
}

function repaintBoard() {
    boardCtx.clearRect(0, 0, board.width, board.height);
}

function paintSnake() {
    boardCtx.fillStyle = 'green';
    Snake.body.forEach(tail => {
        boardCtx.fillRect(tail.x * gridSize, tail.y * gridSize, gridSize, gridSize);
        if (tail.x === Snake.positionX && tail.y === Snake.positionY) {
            Snake.tailSize = Snake.defaultTailSize;
            points = 0;
        }
    });
}

function checkLimits() {
    if (Snake.positionX < 0) {
        Snake.positionX = gridSize - 1;
    }
    if (Snake.positionX > gridSize - 1) {
        Snake.positionX = 0;
    } 
    if (Snake.positionY < 0) {
        Snake.positionY = gridSize - 1;
    } 
    if (Snake.positionY > gridSize - 1) {
        Snake.positionY = 0;
    }
}

function paintApple() {
    boardCtx.fillStyle = 'red';
    boardCtx.fillRect(Apple.positionX * gridSize, Apple.positionY * gridSize, gridSize, gridSize);
}

function isSnakeHittingAppleXPosition() {
    return Apple.positionX === Snake.positionX;
}

function isSnakeHittingAppleYPosition() {
    return Apple.positionY === Snake.positionY;
}

function checkEatApple() {
    if (isSnakeHittingAppleXPosition() && isSnakeHittingAppleYPosition()) {
        Snake.tailSize++;
        points++;
        Apple.positionX = randomNumber(gridSize);
        Apple.positionY = randomNumber(gridSize);

        if (points > maxPoints) {
            maxPoints = points;
        }
    }
}

function setSnakeBody() {
    Snake.body.push({x: Snake.positionX, y: Snake.positionY});
    while (Snake.body.length > Snake.tailSize) {
        Snake.body.shift();
    }
}

function setPoints() {
    pointsDiv.textContent = points;
    maxPointsDiv.textContent = maxPoints;
}

function draw() {
    Snake.positionY += nextY;
    Snake.positionX += nextX;

    checkLimits();
    checkEatApple();
    repaintBoard();
    paintApple();
    paintSnake();
    setSnakeBody();
    setPoints();
}

document.addEventListener('keydown', keyDownEvent);
setInterval(draw, 1000 / frames);
