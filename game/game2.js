const boardSize = 4;
let board;
let score = 0;

window.onload = () => {
    setupGame();
};

function setupGame() {
    board = Array(boardSize).fill().map(() => Array(boardSize).fill(0));
    addNewTile();
    addNewTile();
    drawBoard();
    document.addEventListener('keydown', handleKeyPress);
}

function drawBoard() {
    const boardContainer = document.getElementById('board');
    boardContainer.innerHTML = '';
    for (let row = 0; row < boardSize; row++) {
        for (let col = 0; col < boardSize; col++) {
            const tile = document.createElement('div');
            tile.classList.add('tile');
            if (board[row][col] !== 0) {
                tile.textContent = board[row][col];
                tile.classList.add(`tile-${board[row][col]}`);
            }
            boardContainer.appendChild(tile);
        }
    }
}

function addNewTile() {
    let added = false;
    while (!added) {
        const row = Math.floor(Math.random() * boardSize);
        const col = Math.floor(Math.random() * boardSize);
        if (board[row][col] === 0) {
            board[row][col] = Math.random() < 0.9 ? 2 : 4;
            added = true;
        }
    }
}

function handleKeyPress(event) {
    switch (event.key) {
        case 'ArrowUp':
            moveUp();
            break;
        case 'ArrowDown':
            moveDown();
            break;
        case 'ArrowLeft':
            moveLeft();
            break;
        case 'ArrowRight':
            moveRight();
            break;
    }
    addNewTile();
    drawBoard();
    if (isGameOver()) {
        alert("Game Over! Your score: " + score);
    }
}

function moveUp() {
    for (let col = 0; col < boardSize; col++) {
        let column = [];
        for (let row = 0; row < boardSize; row++) {
            column.push(board[row][col]);
        }
        column = slideAndCombine(column);
        for (let row = 0; row < boardSize; row++) {
            board[row][col] = column[row];
        }
    }
}

function moveDown() {
    for (let col = 0; col < boardSize; col++) {
        let column = [];
        for (let row = 0; row < boardSize; row++) {
            column.push(board[row][col]);
        }
        column.reverse();
        column = slideAndCombine(column);
        column.reverse();
        for (let row = 0; row < boardSize; row++) {
            board[row][col] = column[row];
        }
    }
}

function moveLeft() {
    for (let row = 0; row < boardSize; row++) {
        let line = board[row];
        line = slideAndCombine(line);
        board[row] = line;
    }
}

function moveRight() {
    for (let row = 0; row < boardSize; row++) {
        let line = board[row];
        line.reverse();
        line = slideAndCombine(line);
        line.reverse();
        board[row] = line;
    }
}

function slideAndCombine(line) {
    line = line.filter(val => val);
    for (let i = 0; i < line.length - 1; i++) {
        if (line[i] === line[i + 1]) {
            line[i] *= 2;
            score += line[i];
            line.splice(i + 1, 1);
        }
    }
    while (line.length < boardSize) {
        line.push(0);
    }
    return line;
}

function isGameOver() {
    for (let row = 0; row < boardSize; row++) {
        for (let col = 0; col < boardSize; col++) {
            if (board[row][col] === 0) return false;
            if (row !== boardSize - 1 && board[row][col] === board[row + 1][col]) return false;
            if (col !== boardSize - 1 && board[row][col] === board[row][col + 1]) return false;
        }
    }
    return true;
}
