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
let gameStarted = false; // Flag to track the game state

// Draw the game
function drawGame() {
  clearCanvas();
  drawSnake();
  drawFood();
  moveSnake();
  checkCollision();
}

// Clear the canvas
function clearCanvas() {
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

// Draw the snake
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

// Draw the food
function drawFood() {
  ctx.fillStyle = "red";
  ctx.fillRect(food.x * tileSize, food.y * tileSize, tileSize, tileSize);
}

// Move the snake
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

// Check for collisions
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
    // Immediately stop the game loop
    clearInterval(gameInterval);

    // Set snake's position to the border before showing the alert
    if (head.x < 0) head.x = 0;
    if (head.y < 0) head.y = 0;
    if (head.x >= tileCount) head.x = tileCount - 1;
    if (head.y >= tileCount) head.y = tileCount - 1;

    // Now, draw the snake in its final position
    drawSnake();
    drawFood();

    // Show the alert after the snake touches the border
    alert("Game Over!");

    // Reset game state and prepare for next start
    gameStarted = false;
  }
}

// Reset the game state
function resetGame() {
  snake = [
    { x: 7, y: 7 },
    { x: 6, y: 7 },
    { x: 5, y: 7 },
  ]; // Snake starts with length 3
  direction = { x: 1, y: 0 }; // Set initial direction to move right
  food = {
    x: Math.floor(Math.random() * tileCount),
    y: Math.floor(Math.random() * tileCount),
  };
  clearInterval(gameInterval);
  gameInterval = setInterval(drawGame, 100);
}

// Change the direction of the snake
function changeDirection(newDirection) {
  if (newDirection.x !== -direction.x && newDirection.y !== -direction.y) {
    direction = newDirection;
  }
}

// Keyboard controls for both arrow keys and WASD keys
document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowUp" || e.key === "w") changeDirection({ x: 0, y: -1 });
  if (e.key === "ArrowDown" || e.key === "s") changeDirection({ x: 0, y: 1 });
  if (e.key === "ArrowLeft" || e.key === "a") changeDirection({ x: -1, y: 0 });
  if (e.key === "ArrowRight" || e.key === "d") changeDirection({ x: 1, y: 0 });
});

// Button controls for mobile and PC
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

// Start the game when the "Start Game" button is clicked
document.getElementById("startGameButton").addEventListener("click", () => {
  if (!gameStarted) {
    resetGame(); // Start the game when clicked
    gameStarted = true; // Mark the game as started
  }
});
