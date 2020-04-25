
const board = document.querySelector('#board');
const boardCtx = board.getContext('2d');
const frames =  8;
const gridSize = 20;
let nextX = 0;
let nextY = 0;
const Snake = {
    defaultTailSize: 3,
    tailSize: 3,
    snakeBody: [],
    positionX: 10, 
    positionY: 10
}
const Apple = {
    positionX: randomNumber(gridSize),
    positionY: randomNumber(gridSize)
}

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
    boardCtx.fillRect(Snake.positionX * gridSize, Snake.positionY * gridSize, gridSize, gridSize);
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

function checkHitApple() {
    if (isSnakeHittingAppleXPosition() && isSnakeHittingAppleYPosition()) {
        Snake.tailSize++;
        Apple.positionX = randomNumber(gridSize);
        Apple.positionY = randomNumber(gridSize);
    }
}

function draw() {
    Snake.positionY += nextY;
    Snake.positionX += nextX;

    checkLimits();
    checkHitApple();
    repaintBoard();
    paintApple();
    paintSnake();
}

document.addEventListener('keydown', keyDownEvent);
setInterval(draw, 1000 / frames);
