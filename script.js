const X_CLASS = 'x';
const O_CLASS = 'o';
const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];
const myImage = document.getElementById("myP");
          myImage.style.visibility = (myImage.style.visibility === "hidden") ? '' : "hidden";
          document.getElementById("myP").style.display = "none";
const board = document.getElementById('board');
const message = document.getElementById('message');
const cells = document.querySelectorAll('.cell');
const player1Input = document.getElementById('player1');
const player2Input = document.getElementById('player2');
const player1Score = document.getElementById('player1-score').querySelector('p');
const player2Score = document.getElementById('player2-score').querySelector('p');
let currentPlayer = X_CLASS;
let gameActive = false;
let player1Name = '';
let player2Name = '';
let player1Wins = 0;
let player2Wins = 0;
function startGame() {
  player1Name = player1Input.value.trim();
  player2Name = player2Input.value.trim();
  if (!player1Name || !player2Name) {
    alert('Please enter both player names!');
    return;
  }
  currentPlayer = X_CLASS;
  cells.forEach(cell => {
    cell.textContent = '';
    cell.removeEventListener('click', handleClick);
    cell.addEventListener('click', handleClick, { once: true });
  });
  setMessage(`${player1Name}'s turn`);
  document.getElementById('player1-name').textContent = player1Name; 
  document.getElementById('player2-name').textContent = player2Name;
  gameActive = true;
}

function handleClick(event) {
  const cell = event.target;
  const currentClass = currentPlayer === X_CLASS ? X_CLASS : O_CLASS;
  placeMark(cell, currentClass);
  if (checkWin(currentClass)) {
    endGame(false);
  } else if (isDraw()) {
    endGame(true);
  } else {
    swapTurns();
  }
}

function placeMark(cell, currentClass) {
  cell.textContent = currentClass;
}

function swapTurns() {
  currentPlayer = currentPlayer === X_CLASS ? O_CLASS : X_CLASS;
  setMessage(`${currentPlayer === X_CLASS ? player1Name : player2Name}'s turn`);
}

function checkWin(currentClass) {
  return WINNING_COMBINATIONS.some(combination => {
    return combination.every(index => {
      return cells[index].textContent === currentClass;
    });
  });
}

function isDraw() {
  return [...cells].every(cell => {
    return cell.textContent === X_CLASS || cell.textContent === O_CLASS;
  });
}

function endGame(draw) {
  if (draw) {
    setMessage('Draw!');
  } else {
    if (currentPlayer === X_CLASS) {
      player1Wins++;
      player1Score.textContent = player1Wins;
      setMessage(`${player1Name} wins!`);
      const myImage = document.getElementById("myP");
          myImage.style.visibility = (myImage.style.visibility === "visible") ? '' : "visible"; 
          document.getElementById("myP").style.display = "block";
          document.getElementById("myP").style.position = "absolute";
          document.getElementById("myP").style.zIndex = "1";
    } else {
      player2Wins++;
      player2Score.textContent = player2Wins;
      setMessage(`${player2Name} wins!`);
      const myImage = document.getElementById("myP");
          myImage.style.visibility = (myImage.style.visibility === "visible") ? '' : "visible"; 
          document.getElementById("myP").style.position = "relative";
    }
  }
  gameActive = false;
}

function setMessage(msg) {
  message.textContent = msg;
}
function restartGame() {
  player1Wins = 0;
  player2Wins = 0;
  player1Score.textContent = player1Wins;
  player2Score.textContent = player2Wins;
  startGame();

  
}
