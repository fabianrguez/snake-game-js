
const board = document.querySelector('#board');
const boardCtx = board.getContext('2d');
const frames =  60;
const gridSize = 15;
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
    positionX: randomNumber(board.width),
    positionY: randomNumber(board.height)
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
    return Math.ceil(Math.random() * limit);
}

function repaintBoard() {
    boardCtx.clearRect(0, 0, board.width, board.height);
}

function paintSnake() {
    boardCtx.fillStyle = 'green';
    boardCtx.fillRect(Snake.positionX, Snake.positionY, gridSize, gridSize);
}

function checkLimits() {
    if (Snake.positionX < 0) {
        Snake.positionX = board.width - 1;
    } else if (Snake.positionX === board.width - 1) {
        Snake.positionX = 0;
    } else if (Snake.positionY < 0) {
        Snake.positionY = board.height - 1;
    } else if (Snake.positionY === board.height - 1) {
        Snake.positionY = 0;
    }
}

function paintApple() {
    boardCtx.fillStyle = 'red';
    boardCtx.fillRect(Apple.positionX, Apple.positionY, gridSize, gridSize);
}

function isSnakeHittingAppleXPosition() {
    return ((Apple.positionX - gridSize) <= Snake.positionX) && ((Apple.positionX + gridSize) >= Snake.positionX);
}

function isSnakeHittingAppleYPosition() {
    return (((Apple.positionY - gridSize) <= Snake.positionY)) && ((Apple.positionY + gridSize) >= Snake.positionY);
}

function checkHitApple() {
    if (isSnakeHittingAppleXPosition() && isSnakeHittingAppleYPosition()) {
        Snake.tailSize++;
        Apple.positionX = randomNumber(board.width);
        Apple.positionY = randomNumber(board.height);
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
