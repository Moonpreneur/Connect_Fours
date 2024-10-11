// Variables and DOM Elements
var buttons = document.getElementsByClassName("btn");
var resetGameBtn = document.getElementById("reset-game-btn");
var playerType = document.getElementById("player-type");
var howToPlayBtn = document.getElementById("how-to-play-btn");
var startGameBtn = document.getElementById("start-game-btn");

var firstPage = document.getElementById("first-page");
var gamePage = document.getElementById("game-page");
var howToPlayPage = document.getElementById("how-to-play-page");

var celebrationGif = document.getElementById("celebration-gif");
var gameoverContainer = document.getElementById("gameover-container");
var gameoverMessage = document.getElementById("gameover-message");

var playerNumber = 1; 
var filledGrid = [];
var filledCells = 0;

var greenCheckerSound = new Audio('green.mp3');
var redCheckerSound = new Audio('tap.mp3');
var celebrationSound = new Audio('celebration.mp3');

// Initialize grid
for (var i = 0; i < 6; i++) {
    var arr = [-1, -1, -1, -1, -1, -1, -1]; 
    filledGrid.push(arr);
}

howToPlayBtn.addEventListener("click", function() {
    firstPage.style.display = "none";
    howToPlayPage.style.display = "block";
});

startGameBtn.addEventListener("click", function() {
    howToPlayPage.style.display = "none";
    gamePage.style.display = "block";
    resetGameBtn.style.display = "block";
});

resetGameBtn.addEventListener("click", function() {
    gamePage.style.display = "none";
    firstPage.style.display = "block";

    resetBoard();  // Reset the game board
    resetGameBtn.style.display = "none"; 
});

for (var i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("click", function() {
        var buttonNo = this.classList[1];
        makeMove(this, buttonNo.slice(4));
    });
}

function makeMove(button, buttonNo) {
    var row = buttonNo % 7 === 0 ? Math.floor(buttonNo / 7) - 1 : Math.floor(buttonNo / 7);
    var col = buttonNo % 7 === 0 ? 6 : (buttonNo % 7) - 1;

    if (filledGrid[row][col] === -1) {
        if (playerNumber === 1) {
            button.classList.add("btn-player-1");
            filledGrid[row][col] = 1;
            greenCheckerSound.play();

            if (playerWon(row, col, 1)) {
                setTimeout(function() {
                    showGameoverMessage("😊😊😊Red Wins!😊😊😊");
                    celebrationSound.play();
                    showCelebrationGif();
                }, 200);
                return;  // Stop further moves after win
            }
            playerNumber = 2;
            playerType.textContent = "Player - 2";
        } else {
            button.classList.add("btn-player-2");
            filledGrid[row][col] = 2;
            redCheckerSound.play();

            if (playerWon(row, col, 2)) {
                setTimeout(function() {
                    showGameoverMessage("😊😊😊Yellow Wins!😊😊😊");
                    celebrationSound.play();
                    showCelebrationGif();
                }, 200);
                return;  // Stop further moves after win
            }
            playerNumber = 1;
            playerType.textContent = "Player - 1";
        }
    }

    filledCells++;
    if (filledCells === 42) {
        setTimeout(function() {
            showGameoverMessage("Game Draw");
            celebrationSound.play();  // Play celebration sound on draw too
        }, 200);
    }

    setTimeout(function() {
        button.disabled = true;
    }, 10);
}

function playerWon(row, col, player) {
    // Check horizontally, vertically, and diagonally for winning condition
    return checkHorizontal(row, player) || checkVertical(col, player) || checkDiagonals(row, col, player);
}

function checkHorizontal(row, player) {
    var count = 0;
    for (var i = 0; i < 7; i++) {
        if (filledGrid[row][i] === player) {
            count++;
            if (count === 4) return true;
        } else {
            count = 0;
        }
    }
    return false;
}

function checkVertical(col, player) {
    var count = 0;
    for (var i = 0; i < 6; i++) {
        if (filledGrid[i][col] === player) {
            count++;
            if (count === 4) return true;
        } else {
            count = 0;
        }
    }
    return false;
}

function checkDiagonals(row, col, player) {
    return checkDiagonal1(row, col, player) || checkDiagonal2(row, col, player);
}

function checkDiagonal1(row, col, player) {
    var count = 0;
    var startRow = row;
    var startCol = col;

    // Go to the top-leftmost point of the diagonal
    while (startRow > 0 && startCol > 0) {
        startRow--;
        startCol--;
    }

    while (startRow < 6 && startCol < 7) {
        if (filledGrid[startRow][startCol] === player) {
            count++;
            if (count === 4) return true;
        } else {
            count = 0;
        }
        startRow++;
        startCol++;
    }
    return false;
}

function checkDiagonal2(row, col, player) {
    var count = 0;
    var startRow = row;
    var startCol = col;

    // Go to the top-rightmost point of the diagonal
    while (startRow > 0 && startCol < 6) {
        startRow--;
        startCol++;
    }

    while (startRow < 6 && startCol >= 0) {
        if (filledGrid[startRow][startCol] === player) {
            count++;
            if (count === 4) return true;
        } else {
            count = 0;
        }
        startRow++;
        startCol--;
    }
    return false;
}

// Updated showGameoverMessage to auto-hide after 3 seconds
function showGameoverMessage(message) {
    gameoverMessage.textContent = message;
    gameoverContainer.style.display = "block";
    // Auto-hide after 3 seconds
    setTimeout(function() {
        hideGameoverContainer();
        resetBoard(); // Reset the board automatically for the next game
    }, 3000);
}

function hideGameoverContainer() {
    gameoverContainer.style.display = "none";
}

function showCelebrationGif() {
    celebrationGif.style.display = "block";
}

function hideCelebrationGif() {
    celebrationGif.style.display = "none";
}

function resetBoard() {
    for (var i = 0; i < buttons.length; i++) {
        buttons[i].disabled = false;
        buttons[i].classList.remove("btn-player-1");
        buttons[i].classList.remove("btn-player-2");
    }

    playerNumber = 1;
    playerType.textContent = "Player - 1";
    filledCells = 0;

    for (var i = 0; i < 6; i++) {
        for (var j = 0; j < 7; j++) {
            filledGrid[i][j] = -1;
        }
    }

    hideCelebrationGif();
    hideGameoverContainer();
}
















