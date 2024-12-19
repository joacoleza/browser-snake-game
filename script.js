const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
canvas.width = canvas.height = 300;

const tileCount = 15;
const tileSize = canvas.width / tileCount;

let snake;
let food;
let direction;
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
  for (let i = 0; i < snake.length; i++) {
    if (i === 0) {
      // Ensure the head always has a unique style
      ctx.fillStyle = "yellow";
    } else {
      ctx.fillStyle = "lime";
    }
    ctx.fillRect(
      snake[i].x * tileSize,
      snake[i].y * tileSize,
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
    placeFood();
  } else {
    snake.pop();
  }
}

function placeFood() {
  let isOnSnake;
  do {
    isOnSnake = false;
    food = {
      x: Math.floor(Math.random() * tileCount),
      y: Math.floor(Math.random() * tileCount),
    };
    // Check if food overlaps with any snake segment
    for (let segment of snake) {
      if (segment.x === food.x && segment.y === food.y) {
        isOnSnake = true;
        break;
      }
    }
  } while (isOnSnake);
}

// Check for collisions
function checkCollision() {
  const head = snake[0];

  // Check if the head is out of bounds or collides with the body
  const hitWall =
    head.x < 0 || head.y < 0 || head.x >= tileCount || head.y >= tileCount;
  const hitSelf = snake
    .slice(1)
    .some((segment) => segment.x === head.x && segment.y === head.y);

  if (hitWall || hitSelf) {
    clearInterval(gameInterval); // Stop the game loop

    // Draw a semi-transparent overlay over the entire canvas
    ctx.fillStyle = "rgba(0, 0, 0, 0.8)"; // Black with more transparency
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Display "Game Over" on the canvas
    ctx.fillStyle = "white";
    ctx.font = "30px Arial";
    ctx.textAlign = "center";
    ctx.fillText("Game Over", canvas.width / 2, canvas.height / 2);

    gameStarted = false; // Mark the game as not started
  }
}

// Reset the game state
function resetGame() {
  clearInterval(gameInterval);
  snake = [
    { x: 7, y: 7 },
    { x: 6, y: 7 },
    { x: 5, y: 7 },
  ]; // Snake starts with length 3
  direction = { x: 1, y: 0 }; // Set initial direction to move right
  placeFood();
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
