let board = Array(9).fill("");
let currentPlayer = "X";
let isGameActive = true;
let player1Name = "";
let player2Name = "";

const statusDisplay = document.getElementById("status");
const turnDisplay = document.getElementById("turn");
const winConditions = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6]
];

function startGame() {
  player1Name = document.getElementById("player1").value || "Player 1";
  player2Name = document.getElementById("player2").value || "Player 2";

  document.getElementById("player-inputs").style.display = "none";
  document.getElementById("game").style.display = "block";
  turnDisplay.textContent = `Turn: ${player1Name} (X)`;

  document.querySelectorAll(".cell").forEach(cell => {
    cell.textContent = "";
    cell.addEventListener("click", handleCellClick);
  });
}

function handleCellClick(e) {
  const index = e.target.dataset.index;
  if (board[index] !== "" || !isGameActive) return;

  board[index] = currentPlayer;
  e.target.textContent = currentPlayer;

  if (checkWinner()) {
    const winnerName = currentPlayer === "X" ? player1Name : player2Name;
    statusDisplay.textContent = `🎉 ${winnerName} (${currentPlayer}) wins!`;
    isGameActive = false;
    return;
  }

  if (!board.includes("")) {
    statusDisplay.textContent = "It's a draw!";
    isGameActive = false;
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";
  turnDisplay.textContent = `Turn: ${currentPlayer === "X" ? player1Name : player2Name} (${currentPlayer})`;
}

function checkWinner() {
  return winConditions.some(condition => {
    const [a, b, c] = condition;
    return board[a] && board[a] === board[b] && board[a] === board[c];
  });
}

function restartGame() {
  board = Array(9).fill("");
  currentPlayer = "X";
  isGameActive = true;
  statusDisplay.textContent = "";
  turnDisplay.textContent = `Turn: ${player1Name} (X)`;

  document.querySelectorAll(".cell").forEach(cell => {
    cell.textContent = "";
  });
}
