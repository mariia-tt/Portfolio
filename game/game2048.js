let grid = [];
let score = 0;

function startGame() {
  grid = [];
  score = 0;
  for (let i = 0; i < 4; i++) {
    grid[i] = [];
    for (let j = 0; j < 4; j++) {
      grid[i][j] = 0;
    }
  }
  addTile();
  addTile();
  updateGrid();
}

function addTile() {
  let emptyCells = [];
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      if (grid[i][j] == 0) {
        emptyCells.push({ x: i, y: j });
      }
    }
  }
  let randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
  grid[randomCell.x][randomCell.y] = Math.random() < 0.5 ? 2 : 4;
}

function updateGrid() {
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      let cell = document.getElementById(`cell-${i}-${j}`);
      cell.textContent = grid[i][j] == 0 ? "" : grid[i][j];
      cell.style.background = getBackground(grid[i][j]);
    }
  }
  document.getElementById("score").textContent = `Score: ${score}`;
}

function getBackground(value) {
  switch (value) {
    case 2:
      return "#eee";
    case 4:
      return "#ddd";
    case 8:
      return "#ccc";
    case 16:
      return "#bbb";
    case 32:
      return "#aaa";
    case 64:
      return "#999";
    case 128:
      return "#888";
    case 256:
      return "#777";
    case 512:
      return "#666";
    case 1024:
      return "#555";
    case 2048:
      return "#444";
    default:
      return "#fff";
  }
}

function moveUp() {
  for (let j = 0; j < 4; j++) {
    let temp = [];
    for (let i = 0; i < 4; i++) {
      temp.push(grid[i][j]);
    }
    temp = merge(temp);
    for (let i = 0; i < 4; i++) {
      grid[i][j] = temp[i];
    }
  }
  addTile();
  updateGrid();
}

function moveDown() {
  for (let j = 0; j < 4; j++) {
    let temp = [];
    for (let i = 3; i >= 0; i--) {
      temp.push(grid[i][j]);
    }
    temp = merge(temp);
    for (let i = 3; i >= 0; i--) {
      grid[i][j] = temp[3 - i];
    }
  }
  addTile();
  updateGrid();
}

function moveLeft() {
  for (let i = 0; i < 4; i++) {
    let temp = [];
    for (let j = 0; j < 4; j++) {
      temp.push(grid[i][j]);
    }
    temp = merge(temp);
    for (let j = 0; j < 4; j++) {
      grid[i][j] = temp[j];
    }
  }
  addTile();
  updateGrid();
}

function moveRight() {
  for (let i = 0; i < 4; i++) {
    let temp = [];
    for (let j = 3; j >= 0; j--) {
      temp.push(grid[i][j]);
    }
    temp = merge(temp);
    for (let j = 3; j >= 0; j--) {
      grid[i][j] = temp[3 - j];
    }
  }
  addTile();
  updateGrid();
}

function merge(temp) {
  for (let i = 0; i < 3; i++) {
    if (temp[i] == temp[i + 1] && temp[i] != 0) {
      temp[i] *= 2;
      score += temp[i];
      temp[i + 1] = 0;
    }
  }
  let result = [];
  for (let i = 0; i < 4; i++) {
    if (temp[i] != 0) {
      result.push(temp[i]);
    }
  }
  while (result.length < 4) {
    result.push(0);
  }
  return result;
}

document.addEventListener("keydown", function (event) {
  switch (event.keyCode) {
    case 38:
      moveUp();
      break;
    case 40:
      moveDown();
      break;
    case 37:
      moveLeft();
      break;
    case 39:
      moveRight();
      break;
  }
});

document.getElementById("new-game").addEventListener("click", startGame);

startGame();
