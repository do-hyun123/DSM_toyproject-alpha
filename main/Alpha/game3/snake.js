const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const box = 20; // Snake body and food size
let snake = [];
snake[0] = { x: 9 * box, y: 10 * box }; // Snake initial position

let food = {
  x: Math.floor(Math.random() * (canvas.width / box)) * box,
  y: Math.floor(Math.random() * (canvas.height / box)) * box,
};

let score = 0;
let d;

// Control the snake
document.addEventListener("keydown", direction);

function direction(event) {
  if (event.keyCode === 37 && d !== "RIGHT") {
    d = "LEFT";
  } else if (event.keyCode === 38 && d !== "DOWN") {
    d = "UP";
  } else if (event.keyCode === 39 && d !== "LEFT") {
    d = "RIGHT";
  } else if (event.keyCode === 40 && d !== "UP") {
    d = "DOWN";
  }
}

// Check collision function
function collision(newHead, snake) {
  for (let i = 0; i < snake.length; i++) {
    if (newHead.x === snake[i].x && newHead.y === snake[i].y) {
      return true;
    }
  }
  return false;
}

// Draw everything to the canvas
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < snake.length; i++) {
    ctx.fillStyle = i === 0 ? "green" : "white";
    ctx.fillRect(snake[i].x, snake[i].y, box, box);

    ctx.strokeStyle = "red";
    ctx.strokeRect(snake[i].x, snake[i].y, box, box);
  }

  ctx.fillStyle = "red";
  ctx.fillRect(food.x, food.y, box, box);

  // Old head position
  let snakeX = snake[0].x;
  let snakeY = snake[0].y;

  // Which direction
  if (d === "LEFT") snakeX -= box;
  if (d === "UP") snakeY -= box;
  if (d === "RIGHT") snakeX += box;
  if (d === "DOWN") snakeY += box;

  // If the snake eats the food
  if (snakeX === food.x && snakeY === food.y) {
    score++;
    food = {
      x: Math.floor(Math.random() * (canvas.width / box)) * box,
      y: Math.floor(Math.random() * (canvas.height / box)) * box,
    };
  } else {
    // Remove the tail
    snake.pop();
  }

  // Add new head
  const newHead = { x: snakeX, y: snakeY };

  // Game over
  if (
    snakeX < 0 ||
    snakeX >= canvas.width ||
    snakeY < 0 ||
    snakeY >= canvas.height ||
    collision(newHead, snake)
  ) {
    clearInterval(game);
    document.getElementById("gameOver").style.display = "block";
    return;
  }

  snake.unshift(newHead);

  ctx.fillStyle = "black";
  ctx.font = "20px Arial";
  ctx.fillText("Score: " + score, 10, canvas.height - 10);
}

function restartGame() {
  document.location.reload();
}

let game = setInterval(draw, 100);
