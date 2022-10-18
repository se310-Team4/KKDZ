const gameBoard = document.querySelector(".game-board");
const currentScoreDisplay = document.getElementById("current-score");
const bestScoreDisplay = document.getElementById("best-score");
const WIDTH = 6;
let totalCell = WIDTH * WIDTH;
let cells = [];
let currentScore = 0;
let bestScore = getBestScore() === null ? 0 : getBestScore();
let gameEnd = false;

// create and add cells to the board
function createBoard() {
  for (let i = 0; i < totalCell; i++) {
    let cell = document.createElement("div");
    cell.classList.add("cell");
    cell.setAttribute("data-index", i);
    cell.setAttribute("data-digits", 0);
    cells.innerHTML = 0;
    gameBoard.appendChild(cell);
    cells.push(cell);
  }
  document.addEventListener("modal-closed", handleInput);
  document.addEventListener("modal-opened", disableInput);
}

// generate number (2 or 4) at a random available cell
function generateNewTile() {
  if (gameEnd) return;

  const rand = Math.floor(Math.random() * cells.length);
  if (cells[rand].innerHTML == 0) {
    cells[rand].innerHTML = randomNumTwoOrFour();
  } else {
    // if a cell is already has a number, then find a new tile
    checkLost();
    if(!checkisFull()){
      generateNewTile();
    }
  }
}

// returns 2 or 4
function randomNumTwoOrFour() {
  let rand = Math.random();
  return rand > 0.5 ? 4 : 2;
}

// this game always generates 2 tiles at once
function generateTwoNewTile() {
  generateNewTile();
  generateNewTile();
}

function moveDown() {
  // get cells of each row and update their value
  for (let i = 0; i < WIDTH; i++) {
    // rearrange column, making no empty cell sits between cells with numbers
    let column = [];
    for (let j = 0; j < WIDTH; j++) {
      let cell = cells[i + WIDTH * j].innerHTML;
      column.push(parseInt(cell));
    }

    column = column.filter((num) => num);
    let emptyCellLength = WIDTH - column.length;
    let newColumn = Array(emptyCellLength).fill(0).concat(column);

    for (let j = 0; j < WIDTH; j++) {
      cells[i + WIDTH * j].innerHTML = newColumn[j];
    }
  }
}

function moveUp() {
  // get cells of each row and update their value
  for (let i = 0; i < WIDTH; i++) {
    // rearrange column, making no empty cell sits between cells with numbers
    let column = [];
    for (let j = 0; j < WIDTH; j++) {
      let cell = cells[i + WIDTH * j].innerHTML;
      column.push(parseInt(cell));
    }

    column = column.filter((num) => num);
    let emptyCellLength = WIDTH - column.length;

    let newColumn = column.concat(Array(emptyCellLength).fill(0));

    for (let j = 0; j < WIDTH; j++) {
      cells[i + WIDTH * j].innerHTML = newColumn[j];
    }
  }
}

function moveRight() {
  // get cells of each column and update their value
  for (let i = 0; i < totalCell; i += WIDTH) {
    // rearrange column, making no empty cell sits between cells with numbers
    let row = [];
    for (let j = 0; j < WIDTH; j++) {
      let cell = cells[i + j].innerHTML;
      row.push(parseInt(cell));
    }

    row = row.filter((num) => num);
    let emptyCellLength = WIDTH - row.length;
    let newRow = Array(emptyCellLength).fill(0).concat(row);

    for (let j = 0; j < WIDTH; j++) {
      cells[i + j].innerHTML = newRow[j];
    }
  }
}

function moveLeft() {
  // get cells of each column and update their value
  for (let i = 0; i < totalCell; i += WIDTH) {
    // rearrange column, making no empty cell sits between cells with numbers
    let row = [];
    for (let j = 0; j < WIDTH; j++) {
      let cell = cells[i + j].innerHTML;
      row.push(parseInt(cell));
    }

    row = row.filter((num) => num);
    let emptyCellLength = WIDTH - row.length;
    let newRow = row.concat(Array(emptyCellLength).fill(0));

    for (let j = 0; j < WIDTH; j++) {
      cells[i + j].innerHTML = newRow[j];
    }
  }
}

// merge cells and check win state when merge are all set
// merge cells when user acts in right or left direction
function mergeHorizontal() {
  for (let i = 0; i < WIDTH; i++) {
    for (let j = 0; j < WIDTH - 1; j++) {
      let index = WIDTH * i + j;
      if (cells[index].innerHTML === cells[index + 1].innerHTML) {
        let merge = parseInt(cells[index].innerHTML) + parseInt(cells[index + 1].innerHTML);
        cells[index].innerHTML = merge;
        cells[index + 1].innerHTML = 0;
        updateScores(merge);
      }
    }
  }
  checkWin();
}

// merge cells when tiles move in the up or down direction
function mergeVertical() {
  for (let i = 0; i < WIDTH; i++) {
    for (let j = 0; j < WIDTH - 1; j++) {
      let index = j * WIDTH + i;
      if (cells[index].innerHTML === cells[index + WIDTH].innerHTML) {
        let merge = parseInt(cells[index].innerHTML) + parseInt(cells[index + WIDTH].innerHTML);
        cells[index].innerHTML = merge;
        cells[index + WIDTH].innerHTML = 0;
        updateScores(merge);
      }
    }
  }
  checkWin();
}

// update the current and best score
function updateScores(bonus) {
  currentScore += bonus;
  currentScoreDisplay.innerHTML = currentScore;
  if (currentScore > parseInt(bestScore)) {
    setBestScore(currentScore);
    bestScoreDisplay.innerHTML = currentScore;
  }
}

// bind user action with key
function control(e) {
  if (gameEnd) return;

  if (e.keyCode === 37) {
    keyUpLeft();
  } else if (e.keyCode === 38) {
    keyUpUp();
  } else if (e.keyCode === 39) {
    keyUpRight();
  } else if (e.keyCode === 40) {
    keyUpDown();
  }
}

function keyUpLeft() {
  moveLeft();
  mergeHorizontal();
  moveLeft();
  generateTwoNewTile();
  addColours();
  checkLost();
}

function keyUpRight() {
  moveRight();
  mergeHorizontal();
  moveRight();
  generateTwoNewTile();
  addColours();
  checkLost();
}

function keyUpUp() {
  moveUp();
  mergeVertical();
  moveUp();
  generateTwoNewTile();
  addColours();
  checkLost();
}

function keyUpDown() {
  moveDown();
  mergeVertical();
  moveDown();
  generateTwoNewTile();
  addColours();
  checkLost();
}

// a win happens when 2048 is generated
function checkWin() {
  for (let i = 0; i < totalCell; i++) {
    if (cells[i].innerHTML == 2048) {
      gameEnd = true;
      // HACK: Some browsers update the DOM asynchronously but only after the current call stack has cleared.
      // by creating a 1ms delay, we allow the browser to asynchronously update the DOM and then display the
      // alert effectively instantly.
      // See: https://stackoverflow.com/questions/38960101/why-is-element-not-being-shown-before-alert
      // Note: issue does not appear on firefox, only on chromium-based browsers
      setTimeout(() => alert("\t\t You win! \n Your score is " + currentScore), 1);
    }
  }
}

// a loss happens when all cells are full and they are not mergeable 
function checkLost() {
  if (checkisFull()) {
    // check if any tiles are mergeable
    for (let i = 0; i < totalCell-6; i++) {
      // check vertical
      if((cells[i].innerHTML == cells[i+6].innerHTML)){
        // the user did not lose the game
        return;
      }
    }
    for (let i = 0; i < totalCell-1; i++) {
      if((cells[i].innerHTML == cells[i+1].innerHTML) && i%6 != 0){
         // the user did not lose the game
        return;
      }
    }
    if (numEmptyCells == 0) {
      gameEnd = true;
        // HACK: Some browsers update the DOM asynchronously but only after the current call stack has cleared.
        // by creating a 1ms delay, we allow the browser to asynchronously update the DOM and then display the
        // alert effectively instantly.
        // See: https://stackoverflow.com/questions/38960101/why-is-element-not-being-shown-before-alert
        // Note: issue does not appear on firefox, only on chromium-based browsers
      setTimeout(() => alert("\t\t You Lost\n Your score is " + currentScore), 1);
    }
  }
}

// check if the board is full
function checkisFull(){
  let numEmptyCells = 0;
  for (let i = 0; i < totalCell; i++) {
    if (cells[i].innerHTML == 0) {
      numEmptyCells++;
    }
  }

  return numEmptyCells == 0;
}

// function start new game
function newGame() {
  resetGame();
  generateTwoNewTile();
  addColours();
}

// reset the cells and scores
function resetGame() {
  cells.forEach((cell) => {
    cell.innerHTML = "";
    cell.setAttribute("data-digits", 0);
  });
  currentScore = 0;
  currentScoreDisplay.innerHTML = 0;
}

// apply a colour and font-size based on the tile number
function addColours() {
  for (let i = 0; i < totalCell; i++) {
    let number = cells[i].innerHTML;
    switch (number) {
      case "":
      case "0":
        cells[i].style.backgroundColor = "#afa184";
        cells[i].style.colour = "rgb(175, 161, 132)";
        cells[i].setAttribute("data-digits", 0);
        break;
      case "2":
        cells[i].style.backgroundColor = "#eee4ea";
        cells[i].setAttribute("data-digits", 1);
        break;
      case "4":
        cells[i].style.backgroundColor = "#ede2c8";
        cells[i].setAttribute("data-digits", 1);
        break;
      case "8":
        cells[i].style.backgroundColor = "#f2b179";
        cells[i].setAttribute("data-digits", 1);
        break;
      case "16":
        cells[i].style.backgroundColor = "#ffceaa";
        cells[i].setAttribute("data-digits", 2);
        break;
      case "32":
        cells[i].style.backgroundColor = "#e8c083";
        cells[i].setAttribute("data-digits", 2);
        break;
      case "64":
        cells[i].style.backgroundColor = "#ffab6e";
        cells[i].setAttribute("data-digits", 2);
        break;
      case "128":
        cells[i].style.backgroundColor = "#fd9787";
        cells[i].setAttribute("data-digits", 3);
        break;
      case "256":
        cells[i].style.backgroundColor = "#eah89c";
        cells[i].setAttribute("data-digits", 3);
        break;
      case "512":
        cells[i].style.backgroundColor = "#76daff";
        cells[i].setAttribute("data-digits", 3);
        break;
      case "1024":
        cells[i].style.backgroundColor = "#beeaab";
        cells[i].setAttribute("data-digits", 4);
        break;
      case "2048":
        cells[i].style.backgroundColor = "#d7d0f0";
        cells[i].setAttribute("data-digits", 4);
        break;
    }
  }
}

// set up the screen with a new game
createBoard();
generateTwoNewTile();
addColours();
bestScoreDisplay.innerHTML = bestScore;

// accept keyboard input from the user
// enable the handling of key presses
function handleInput() {
  document.addEventListener("keyup", control);
}

// disable the handling of key presses
function disableInput() {
  document.removeEventListener("keyup", control);
}

// allow restarting the game
const newBtn = document.getElementById("new-btn");
newBtn.onclick = function () {
  gameEnd = false;
  newGame();
};
