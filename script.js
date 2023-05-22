document.addEventListener('DOMContentLoaded', () => {
    const gameBoard = document.getElementById('game-board');
    let snake = [{x: 200, y: 200}];
    let food = {x: 100, y: 100};
    let dx = 0;
    let dy = 0;

    function drawSnake() {
        gameBoard.innerHTML = '';
        snake.forEach(segment => {
            const snakeElement = document.createElement('div');
            snakeElement.style.left = segment.x + 'px';
            snakeElement.style.top = segment.y + 'px';
            snakeElement.classList.add('snake');
            gameBoard.appendChild(snakeElement);
        });
    }

    function drawFood() {
        const foodElement = document.createElement('div');
        foodElement.style.left = food.x + 'px';
        foodElement.style.top = food.y + 'px';
        foodElement.classList.add('food');
        gameBoard.appendChild(foodElement);
    }

    function moveSnake() {
        const head = {x: snake[0].x + dx, y: snake[0].y + dy};
        snake.unshift(head);
        if (head.x === food.x && head.y === food.y) {
            food = {
                x: Math.floor(Math.random() * 20) * 20,
                y: Math.floor(Math.random() * 20) * 20
            };
        } else {
            snake.pop();
        }
    }

    function changeDirection(event) {
        const LEFT_KEY = 37;
        const RIGHT_KEY = 39;
        const UP_KEY = 38;
        const DOWN_KEY = 40;

        const keyPressed = event.keyCode;
        const goingUp = dy === -20;
        const goingDown = dy === 20;
        const goingLeft = dx === -20;
        const goingRight = dx === 20;

        if (keyPressed === LEFT_KEY && !goingRight) {
            dx = -20;
            dy = 0;
        }

        if (keyPressed === UP_KEY && !goingDown) {
            dx = 0;
            dy = -20;
        }

        if (keyPressed === RIGHT_KEY && !goingLeft) {
            dx = 20;
            dy = 0;
        }

        if (keyPressed === DOWN_KEY && !goingUp) {
            dx = 0;
            dy = 20;
        }
    }

    function isCollision() {
        const head = snake[0];
        for (let i = 1; i < snake.length; i++) {
            if (snake[i].x === head.x && snake[i].y === head.y) {
                return true;
            }
        }
        return (head.x < 0 || head.x >= gameBoard.clientWidth || head.y < 0 || head.y >= gameBoard.clientHeight);
    }

    document.addEventListener('keydown', changeDirection);
    const gameInterval = setInterval(gameLoop, 200);

    function gameLoop() {
        drawSnake();
        drawFood();
        moveSnake();

        if (isCollision()) {
            clearInterval(gameInterval);
            alert('Game over!');
        }
    }
});
