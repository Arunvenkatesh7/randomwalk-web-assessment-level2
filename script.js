let xScore = 0;
let oScore = 0;



document.getElementById('closeWelcomeBoard').addEventListener('click', function() {
    document.getElementById('welcomeBoard').style.display = 'none';
    document.getElementById('gameSection').style.display = 'block';
});




const statusDisplay = document.querySelector('#game-status');
const resultDisplay = document.querySelector('#result-status');
let currentPlayer = 'X';
let gameActive = true;
let board = ["", "", "", "", "", "", "", "", ""];


const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// Update the game status display to show the current player's turn
function updateGameStatus() {
    statusDisplay.innerHTML = `${currentPlayer}`;
}

// Check if there is a winner or if the game is a draw
function checkResult() {
    let roundWon = false;  
    for (let i = 0; i < winningConditions.length; i++) {
        const winCondition = winningConditions[i];
        let a = board[winCondition[0]];
        let b = board[winCondition[1]];
        let c = board[winCondition[2]];
        if (a === '' || b === '' || c === '') {
            continue;
        }
        if (a === b && b === c) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        if(currentPlayer == 'X'){
            xScore++;
        }
        else{
            oScore++;
        }
        resultDisplay.innerHTML = `${currentPlayer} wins!`; // Show win result
        resultDisplay.classList.add('show');
        updateScores();
        gameActive = false;
        return;
    }

    // Check for a draw (no empty cells and no winner)
    if (!board.includes('')) {
        resultDisplay.innerHTML = `It's a draw!`; 
        resultDisplay.classList.add('show');
        gameActive = false;
        return;
    }

    // Switch players
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    updateGameStatus(); // Update the status display for the next player's turn
}

// Handle cell click event
function handleCellClick(clickedCell, index) {
    if (board[index] !== '' || !gameActive) {
        return;
    }
    
    board[index] = currentPlayer;
    clickedCell.innerHTML = currentPlayer;
    
    checkResult();
}




// Initialize the game board
function initializeGameBoard() {
    const gameBoard = document.getElementById('game-board');
    gameBoard.innerHTML = ''; // Clear the board

    // Create 9 cells dynamically
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.setAttribute('id', `cell-${i}`);
        cell.addEventListener('click', () => handleCellClick(cell, i));
        gameBoard.appendChild(cell);
    }

    // Reset board data
    board = ["", "", "", "", "", "", "", "", ""];
    gameActive = true;
    currentPlayer = 'X'; 
    resultDisplay.innerHTML = ''; 
    updateGameStatus(); // Show the initial game status
}


// Function to update the displayed scores
function updateScores() {
    document.querySelector('#x-score').innerHTML = `X: ${xScore}`;
    document.querySelector('#o-score').innerHTML = `O: ${oScore}`;
}

// Call this function at the start to initialize scores on the front page
updateScores();



document.getElementById('reset-btn').addEventListener('click', initializeGameBoard);

// Start the game on page load
initializeGameBoard();
