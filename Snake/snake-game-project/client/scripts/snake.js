const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const box = 20;
let snake = [
    { x: 8, y: 10 },
    { x: 7, y: 10 },
    { x: 6, y: 10 }
];

let direction = 'RIGHT';
let nextDirection = 'RIGHT';
let directionQueue = [];

let score = 0;
let gameOver = false;

function randomColor() {
    const r = Math.floor(Math.random() * 180) + 50;
    const g = Math.floor(Math.random() * 180) + 50;
    const b = Math.floor(Math.random() * 180) + 50;
    return `rgb(${r},${g},${b})`;
}
const snakeColorStart = randomColor();
const snakeColorEnd = randomColor();

function placeFood() {
    let valid = false;
    let newFood;
    while (!valid) {
        newFood = {
            x: Math.floor(Math.random() * (canvas.width / box)),
            y: Math.floor(Math.random() * (canvas.height / box))
        };
        valid = !snake.some(segment => segment.x === newFood.x && segment.y === newFood.y);
    }
    return newFood;
}
let food = placeFood();

function updateScorePanel() {
    document.getElementById('scoreDisplay').textContent = 'Score: ' + score;
    document.getElementById('highScoreDisplay').textContent = 'High score: ' + (parseInt(getCookie('snake_highscore')) || 0);
}

function drawSnake() {
    ctx.fillStyle = 'lightgreen';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.save();
    ctx.shadowColor = 'rgba(255,0,0,0.4)';
    ctx.shadowBlur = 12;
    ctx.fillStyle = 'red';
    ctx.fillRect(food.x * box, food.y * box, box, box);
    ctx.restore();

    for (let i = 0; i < snake.length; i++) {
        let t = i / (snake.length - 1 || 1);
        let color;
        if (snake.length === 1) {
            color = snakeColorStart;
        } else {
            color = fadeColor(snakeColorStart, snakeColorEnd, t);
        }
        ctx.fillStyle = (i === 0) ? '#fff176' : color;
        ctx.fillRect(snake[i].x * box, snake[i].y * box, box, box);
        ctx.strokeStyle = '#009688';
        ctx.strokeRect(snake[i].x * box, snake[i].y * box, box, box);
    }

    updateScorePanel();
}

function fadeColor(start, end, t) {
    const s = start.match(/\d+/g).map(Number);
    const e = end.match(/\d+/g).map(Number);
    const r = Math.round(s[0] + (e[0] - s[0]) * t);
    const g = Math.round(s[1] + (e[1] - s[1]) * t);
    const b = Math.round(s[2] + (e[2] - s[2]) * t);
    return `rgb(${r},${g},${b})`;
}

function drawGameOver() {
    ctx.fillStyle = 'rgba(0,0,0,0.5)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.font = '40px Arial';
    ctx.fillStyle = '#ff5252';
    ctx.textAlign = 'center';
    ctx.fillText('Game Over', canvas.width / 2, canvas.height / 2);
    ctx.font = '24px Arial';
    ctx.fillStyle = 'white';
    ctx.fillText('Score: ' + score, canvas.width / 2, canvas.height / 2 + 40);
    ctx.fillText('Press R to Restart', canvas.width / 2, canvas.height / 2 + 80);

    let highScore = parseInt(getCookie('snake_highscore')) || 0;
    if (score > highScore) {
        highScore = score;
        setCookie('snake_highscore', highScore, 365);
    }
    const msgDiv = document.getElementById('message');
    msgDiv.innerHTML = `<span style="color:#d32f2f;font-weight:bold;">High score: ${highScore}</span>`;
}

function drawWinScreen() {
    ctx.fillStyle = 'rgba(0,150,136,0.8)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.font = 'bold 40px Arial';
    ctx.fillStyle = '#fff176';
    ctx.textAlign = 'center';
    ctx.fillText('You Win!', canvas.width / 2, canvas.height / 2 - 10);
    ctx.font = '28px Arial';
    ctx.fillStyle = '#ffffff';
    ctx.fillText('Score: ' + score, canvas.width / 2, canvas.height / 2 + 40);
    ctx.fillText('Press R to Restart', canvas.width / 2, canvas.height / 2 + 80);

    let highScore = parseInt(getCookie('snake_highscore')) || 0;
    if (score > highScore) {
        highScore = score;
        setCookie('snake_highscore', highScore, 365);
    }
    const msgDiv = document.getElementById('message');
    msgDiv.innerHTML = `<span style="color:#ffd600;font-weight:bold;">High score: ${highScore}</span>`;

    launchConfetti();
}

function launchConfetti() {
    const confettiColors = ['#ff5252', '#ffd600', '#43ea4d', '#009688', '#fff176', '#ffffff'];
    const confettiCount = 80;
    const confetti = [];

    for (let i = 0; i < confettiCount; i++) {
        confetti.push({
            x: Math.random() * canvas.width,
            y: -10,
            r: Math.random() * 6 + 4,
            d: Math.random() * 2 + 2,
            color: confettiColors[Math.floor(Math.random() * confettiColors.length)],
            tilt: Math.random() * 10 - 5
        });
    }

    let frames = 0;
    function drawConfetti() {
        ctx.save();
        for (let i = 0; i < confetti.length; i++) {
            let c = confetti[i];
            ctx.beginPath();
            ctx.arc(c.x, c.y, c.r, 0, 2 * Math.PI);
            ctx.fillStyle = c.color;
            ctx.globalAlpha = 0.85;
            ctx.fill();
            ctx.closePath();
            c.y += c.d;
            c.x += Math.sin(frames / 10 + i) * 2;
            c.tilt += Math.random() - 0.5;
        }
        ctx.restore();
        frames++;
        if (frames < 80) {
            requestAnimationFrame(drawConfetti);
        }
    }
    drawConfetti();
}

function moveSnake() {
    if (gameOver) return;

    if (directionQueue.length > 0) {
        const candidate = directionQueue.shift();
        if (
            (candidate === 'UP' && direction !== 'DOWN') ||
            (candidate === 'DOWN' && direction !== 'UP') ||
            (candidate === 'LEFT' && direction !== 'RIGHT') ||
            (candidate === 'RIGHT' && direction !== 'LEFT')
        ) {
            nextDirection = candidate;
        }
    }
    direction = nextDirection;

    let head = { x: snake[0].x, y: snake[0].y };
    if (direction === 'RIGHT') head.x += 1;
    if (direction === 'LEFT') head.x -= 1;
    if (direction === 'UP') head.y -= 1;
    if (direction === 'DOWN') head.y += 1;

    if (
        head.x < 0 ||
        head.x >= canvas.width / box ||
        head.y < 0 ||
        head.y >= canvas.height / box
    ) {
        clearInterval(gameInterval); 
        gameOver = true;
        drawGameOver();
        return;
    }

    for (let i = 0; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            clearInterval(gameInterval);
            gameOver = true;
            drawGameOver();
            return;
        }
    }

    if (head.x === food.x && head.y === food.y) {
        snake.unshift(head);
        score += 1;
        if (snake.length === (canvas.width / box) * (canvas.height / box)) {
            clearInterval(gameInterval);
            gameOver = true;
            drawWinScreen();
            return;
        }
        food = placeFood();
    } else {
        snake.pop();
        snake.unshift(head);
    }

    drawSnake();
}

document.addEventListener('keydown', function(e) {
    if (gameOver && e.key.toLowerCase() === 'r') {
        restartGame();
        return;
    }
    if (directionQueue.length < 2) {
        if (e.key === 'ArrowUp' || e.key === 'w') directionQueue.push('UP');
        if (e.key === 'ArrowDown' || e.key === 's') directionQueue.push('DOWN');
        if (e.key === 'ArrowLeft' || e.key === 'a') directionQueue.push('LEFT');
        if (e.key === 'ArrowRight' || e.key === 'd') directionQueue.push('RIGHT');
    }
});

function restartGame() {
    snake = [
        { x: 8, y: 10 },
        { x: 7, y: 10 },
        { x: 6, y: 10 }
    ];
    direction = 'RIGHT';
    nextDirection = 'RIGHT';
    directionQueue = [];
    score = 0;
    food = placeFood();
    gameOver = false;
    document.getElementById('message').innerHTML = '';
    drawSnake();
    gameInterval = setInterval(moveSnake, 150);
}

let gameInterval = setInterval(moveSnake, 150); 

window.onload = drawSnake;

function setCookie(name, value, days) {
    let expires = "";
    if (days) {
        const date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}

function getCookie(name) {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for(let i=0;i < ca.length;i++) {
        let c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}

