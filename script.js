// Constants
const BOARD_SIZE = 4;

// Initialize the game board
let board = [];
let score = 0;

// Function to start the game
function startGame() {
    // Initialize the board with zeros
    board = Array.from({ length: BOARD_SIZE }, () => Array(BOARD_SIZE).fill(0));
    score = 0;
    renderBoard();
    generateRandomTile();
    generateRandomTile();
}

// Function to render the game board
function renderBoard() {
    const gameBoard = document.getElementById('game-board');
    gameBoard.innerHTML = ''; // Clear the board

    for (let i = 0; i < BOARD_SIZE; i++) {
        for (let j = 0; j < BOARD_SIZE; j++) {
            const tileValue = board[i][j];
            const tileDiv = document.createElement('div');
            tileDiv.classList.add('tile');
            if (tileValue !== 0) {
                tileDiv.textContent = tileValue;
                tileDiv.classList.add(`tile-${tileValue}`);
            }
            gameBoard.appendChild(tileDiv);
        }
    }
}

// Function to generate a random tile (either 2 or 4)
function generateRandomTile() {
    const availablePositions = [];
    for (let i = 0; i < BOARD_SIZE; i++) {
        for (let j = 0; j < BOARD_SIZE; j++) {
            if (board[i][j] === 0) {
                availablePositions.push({ x: i, y: j });
            }
        }
    }

    if (availablePositions.length > 0) {
        const { x, y } = availablePositions[Math.floor(Math.random() * availablePositions.length)];
        board[x][y] = Math.random() < 0.9 ? 2 : 4;
    }
}

// Function to handle key presses
function handleKeyPress(event) {
    switch (event.key) {
        case 'ArrowUp':
            moveTiles(-1, 0);
            break;
        case 'ArrowDown':
            moveTiles(1, 0);
            break;
        case 'ArrowLeft':
            moveTiles(0, -1);
            break;
        case 'ArrowRight':
            moveTiles(0, 1);
            break;
    }
}

// Function to move tiles in a given direction
function moveTiles(dx, dy) {
    let moved = false;
    for (let i = 0; i < BOARD_SIZE; i++) {
        for (let j = 0; j < BOARD_SIZE; j++) {
            let x = i + dx;
            let y = j + dy;

            while (x >= 0 && x < BOARD_SIZE && y >= 0 && y < BOARD_SIZE) {
                if (board[x][y] === 0) {
                    board[x][y] = board[x - dx][y - dy];
                    board[x - dx][y - dy] = 0;
                    moved = true;
                } else if (board[x][y] === board[i][j]) {
                    board[x][y] *= 2;
                    score += board[x][y];
                    board[i][j] = 0;
                    moved = true;
                    break;
                } else {
                    break;
                }
                x += dx;
                y += dy;
            }
        }
    }

    if (moved) {
        generateRandomTile();
        renderBoard();
        if (isGameOver()) {
            alert('Game Over! Your score: ' + score);
        }
    }
}

// Function to check if the game is over
function isGameOver() {
    for (let i = 0; i < BOARD_SIZE; i++) {
        for (let j = 0; j < BOARD_SIZE; j++) {
            if (board[i][j] === 0) {
                return false;
            }
            if (i > 0 && board[i][j] === board[i - 1][j]) {
                return false;
            }
            if (j > 0 && board[i][j] === board[i][j - 1]) {
                return false;
            }
        }
    }
    return true;
}

// Event listener for key presses
document.addEventListener('keydown', handleKeyPress);

// Start the game when the page loads
startGame();
