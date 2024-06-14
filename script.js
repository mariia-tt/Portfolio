// Add event listener to each team member section
document.querySelectorAll('.team-member').forEach((member) => {
    member.addEventListener('mouseover', () => {
        member.style.backgroundColor = '#f7f7f7';
    });
    member.addEventListener('mouseout', () => {
        member.style.backgroundColor = '';
    });
});

document.querySelectorAll(".toggle-button").forEach((button) => {
  button.addEventListener("click", (event) => {
    const resume = event.target.parentNode;
    const extendedResume = resume.querySelector(".extended-resume");
    extendedResume.style.display =
      extendedResume.style.display === "block" ? "none" : "block";

    // Close other extended resumes
    document
      .querySelectorAll(".extended-resume")
      .forEach((otherExtendedResume) => {   
        if (otherExtendedResume !== extendedResume) {
          otherExtendedResume.style.display = "none";
        }
      });
  });
});

let score = 0;
let missed = 0;
let startTime;
let intervalId;
let circleTimeoutIds = [];
let createCircleIntervalId;
let catchTimes = [];

document.getElementById("start-game").addEventListener("click", startGame);
document.getElementById("game-over").addEventListener("click", gameOver);

function startGame() {
  score = 0;
  missed = 0;
  catchTimes = [];
  startTime = new Date().getTime();
  document.getElementById("score").textContent = `Score: ${score}`;
  document.getElementById("missed").textContent = `Missed: ${missed}`;

  createCircleIntervalId = setInterval(
    createCircle,
    Math.random() * 1000 + 1000
  );
  document.getElementById("start-game").disabled = true;
}

function createCircle() {
  const circle = document.createElement("div");
  circle.className = "circle";
  circle.style.top = `${Math.random() * 350}px`;
  circle.style.left = `${Math.random() * 350}px`;
  document.getElementById("game-area").appendChild(circle);
  circle.addEventListener("click", catchCircle);

  const appearTime = new Date().getTime();
  let isCaught = false;

  const timeoutId = setTimeout(() => {
    if (!isCaught) {
      circle.remove();
      missed++;
      document.getElementById("missed").textContent = `Missed: ${missed}`;
    }
  }, 2000);

  circleTimeoutIds.push(timeoutId);

  function catchCircle() {
    isCaught = true;
    const catchTime = new Date().getTime();
    const reactionTime = (catchTime - appearTime) / 1000;
    catchTimes.push(reactionTime);

    score++;
    document.getElementById("score").textContent = `Score: ${score}`;
    clearTimeout(timeoutId);
    this.remove();
  }
}

setInterval(() => {
  if (startTime) {
    const currentTime = new Date().getTime();
    const timeSpent = (currentTime - startTime) / 1000;
  }
}, 1000);

function gameOver() {
  clearInterval(createCircleIntervalId);
  circleTimeoutIds.forEach(clearTimeout);
  circleTimeoutIds = [];
  document.querySelectorAll(".circle").forEach((circle) => circle.remove());
  document.getElementById("start-game").disabled = false;

  const endTime = new Date().getTime();
  const timeSpent = (endTime - startTime) / 1000;
  const averageCatchTime = catchTimes.length
    ? (catchTimes.reduce((a, b) => a + b, 0) / catchTimes.length).toFixed(2)
    : 0;

  alert(
    `Game over! You caught ${score} circles and missed ${missed} circles. Your game time was ${timeSpent.toFixed(
      2
    )} seconds. Average catch time: ${averageCatchTime} seconds.`
  );

  // Reset scores and time
  score = 0;
  missed = 0;
  startTime = null;
  catchTimes = [];
  document.getElementById("score").textContent = `Score: ${score}`;
  document.getElementById("missed").textContent = `Missed: ${missed}`;
}
const canvas = document.getElementById("game");
const context = canvas.getContext("2d");

const box = 20;
const canvasSize = 20 * 20;

let snake = [];
snake[0] = { x: 10, y: 10 };

let food = {
  x: Math.floor((Math.random() * canvasSize) / box) * box,
  y: Math.floor((Math.random() * canvasSize) / box) * box,
};

let d;

document.addEventListener("keydown", direction);

function direction(event) {
  if (event.keyCode == 37 && d != "RIGHT") {
    d = "LEFT";
  } else if (event.keyCode == 38 && d != "DOWN") {
    d = "UP";
  } else if (event.keyCode == 39 && d != "LEFT") {
    d = "RIGHT";
  } else if (event.keyCode == 40 && d != "UP") {
    d = "DOWN";
  }
}

function draw() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < snake.length; i++) {
    context.fillStyle = i == 0 ? "green" : "white";
    context.fillRect(snake[i].x, snake[i].y, box, box);

    context.strokeStyle = "red";
    context.strokeRect(snake[i].x, snake[i].y, box, box);
  }

  context.fillStyle = "white";
  context.fillRect(food.x, food.y, box, box);

  let snakeX = snake[0].x;
  let snakeY = snake[0].y;

  if (d == "LEFT") snakeX -= box;
  if (d == "UP") snakeY -= box;
  if (d == "RIGHT") snakeX += box;
  if (d == "DOWN") snakeY += box;

  if (snakeX == food.x && snakeY == food.y) {
    score++;
    food = {
      x: Math.floor((Math.random() * canvasSize) / box) * box,
      y: Math.floor((Math.random() * canvasSize) / box) * box,
    };
  } else {
    snake.pop();
  }

  let newHead = {
    x: snakeX,
    y: snakeY,
  };

  if (
    snakeX < 0 ||
    snakeY < 0 ||
    snakeX > canvasSize ||
    snakeY > canvasSize ||
    collision(newHead, snake)
  ) {
    clearInterval(game);
  }

  snake.unshift(newHead);

  context.fillStyle = "white";
  context.font = "45px Changa one";
  context.fillText(score, 2 * box, 1.6 * box);
}

function collision(head, array) {
  for (let i = 0; i < array.length; i++) {
    if (head.x == array[i].x && head.y == array[i].y) {
      return true;
    }
  }
  return false;
}

function startGame() {
  game = setInterval(draw, 100);
}