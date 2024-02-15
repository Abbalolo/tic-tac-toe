

const text = document.querySelector(".winner");
const restartBtn = document.querySelector(".restart");
const cells = Array.from(document.querySelectorAll(".cells"));

let winningIndicator = getComputedStyle(document.body).getPropertyValue("--winning-indicator");

const textX = "X";
const textO = "O";
let currentPlayer = textX;
let spaces = Array(9).fill(null);

const startGame = () => {
  cells.forEach(cell => {
    cell.addEventListener("click", boxClicked);
  });
};

function boxClicked(e) {
  const id = e.target.id;

  if (!spaces[id]) {
    spaces[id] = currentPlayer;
    e.target.innerText = currentPlayer;

    if (winner() !== false) {
      text.innerText = `Player ${currentPlayer} has won!`;
      let winningBlock = winner();
      winningBlock.map(cell => {
        cells[cell].style.backgroundColor = winningIndicator;
        cells[cell].classList.add("animate");
      });
      cells.forEach(cell => {
        cell.removeEventListener("click", boxClicked);
      });
      return;
    }

    currentPlayer = currentPlayer === textX ? textO : textX;
    makeAIMove();
  }
}

restartBtn.addEventListener("click", restart);

function restart() {
  spaces.fill(null);

  cells.forEach(cell => {
    cell.innerText = "";
    cell.style.backgroundColor = "";
    cell.classList.remove("animate");
  });

  currentPlayer = textX;
  text.innerText = "";

  startGame();
}

startGame();

const winningCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

function winner() {
  for (const combo of winningCombos) {
    let [a, b, c] = combo;
    if (spaces[a] && spaces[a] === spaces[b] && spaces[a] === spaces[c]) {
      return [a, b, c];
    }
    
  }
  return false;
}

function makeAIMove() {
  const emptyCells = spaces.reduce((acc, cell, index) => {
    if (!cell) {
      acc.push(index);
    }
    return acc;
  }, []);

  const randomIndex = Math.floor(Math.random() * emptyCells.length);
  const moveIndex = emptyCells[randomIndex];

  spaces[moveIndex] = currentPlayer;
  cells[moveIndex].innerText = currentPlayer;

  if (winner() !== false) {
    text.innerText = `Player ${currentPlayer} has won!`;
    let winningBlock = winner();
    winningBlock.map(cell => {
      cells[cell].style.backgroundColor = winningIndicator;
      cells[cell].classList.add("animate");
    });
    cells.forEach(cell => {
      cell.removeEventListener("click", boxClicked);
    });
    return;
  }

  currentPlayer = currentPlayer === textX ? textO : textX;
}
