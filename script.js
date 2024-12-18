const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
canvas.width = canvas.height = 300;

const tileCount = 15;
const tileSize = canvas.width / tileCount;
let snake = [{ x: 7, y: 7 }];
let food = {
  x: Math.floor(Math.random() * tileCount),
  y: Math.floor(Math.random() * tileCount),
};
let direction = { x: 0, y: 0 };
let gameInterval;

function drawGame() {
  clearCanvas();
  drawSnake();
  drawFood();
  moveSnake();
  checkCollision();
}

function clearCanvas() {
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function drawSnake() {
  ctx.fillStyle = "lime";
  for (let segment of snake) {
    ctx.fillRect(
      segment.x * tileSize,
      segment.y * tileSize,
      tileSize,
      tileSize
    );
  }
}

function drawFood() {
  ctx.fillStyle = "red";
  ctx.fillRect(food.x * tileSize, food.y * tileSize, tileSize, tileSize);
}

function moveSnake() {
  const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };
  snake.unshift(head);
  if (head.x === food.x && head.y === food.y) {
    food = {
      x: Math.floor(Math.random() * tileCount),
      y: Math.floor(Math.random() * tileCount),
    };
  } else {
    snake.pop();
  }
}

function checkCollision() {
  const head = snake[0];
  if (
    head.x < 0 ||
    head.y < 0 ||
    head.x >= tileCount ||
    head.y >= tileCount ||
    snake
      .slice(1)
      .some((segment) => segment.x === head.x && segment.y === head.y)
  ) {
    clearInterval(gameInterval);
    alert("Game Over!");
    resetGame();
  }
}

function resetGame() {
  snake = [{ x: 7, y: 7 }];
  direction = { x: 1, y: 0 }; // Set initial direction to move right
  food = {
    x: Math.floor(Math.random() * tileCount),
    y: Math.floor(Math.random() * tileCount),
  };
  clearInterval(gameInterval);
  gameInterval = setInterval(drawGame, 100);
}

function changeDirection(newDirection) {
  if (newDirection.x !== -direction.x && newDirection.y !== -direction.y) {
    direction = newDirection;
  }
}

document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowUp") changeDirection({ x: 0, y: -1 });
  if (e.key === "ArrowDown") changeDirection({ x: 0, y: 1 });
  if (e.key === "ArrowLeft") changeDirection({ x: -1, y: 0 });
  if (e.key === "ArrowRight") changeDirection({ x: 1, y: 0 });
});

document
  .getElementById("up")
  .addEventListener("click", () => changeDirection({ x: 0, y: -1 }));
document
  .getElementById("down")
  .addEventListener("click", () => changeDirection({ x: 0, y: 1 }));
document
  .getElementById("left")
  .addEventListener("click", () => changeDirection({ x: -1, y: 0 }));
document
  .getElementById("right")
  .addEventListener("click", () => changeDirection({ x: 1, y: 0 }));

resetGame();
