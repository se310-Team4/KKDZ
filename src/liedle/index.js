import { dictionary } from "./dictionary.js";
import { commonWords } from "./common-words.js";

const replayBtn = document.getElementById("replay");
const bestScoreDisplay = document.getElementById("best-score");
const NUM_ROWS = 8;
const NUM_COLS = 5;
let rowIndex;
let colIndex;
let isEndGame;
let bestScore = getBestScore() === null ? 0 : getBestScore();

replayBtn.onclick = function () {
  resetGame();
};

// global variables so they can be changed from the tests
window.secretWord = "";
window.lieRate = 0.08;

function start() {
  isEndGame = false;
  createGrid();
  resetGame();
  document.addEventListener("modal-closed", handleInput);
  document.addEventListener("modal-opened", disableInput);
  bestScoreDisplay.innerHTML = bestScore;
}

function resetGame() {
  isEndGame = false;
  rowIndex = 0;
  colIndex = 0;
  resetGrid();
  hideEndSection();
  pickSecretWord();
}

// hide end section containing win/lose UI components
function hideEndSection() {
  const endSection = document.getElementById("end");
  endSection.style.visibility = "hidden";
}

// fill the grid with empty tiles
function createGrid() {
  const grid = document.getElementById("grid");
  for (let i = 0; i < NUM_ROWS; i++) {
    for (let j = 0; j < NUM_COLS; j++) {
      grid.appendChild(getTile(i, j));
    }
  }
}

// resets the text and colour of each tile
function resetGrid() {
  for (let i = 0; i < NUM_ROWS; i++) {
    for (let j = 0; j < NUM_COLS; j++) {
      const tile = document.querySelector(`[data-row-index="${i}"][data-col-index="${j}"].tile`);
      tile.innerHTML = "";
      tile.dataset.type = "empty";
    }
  }
}

// creates and returns an empty tile
function getTile(i, j) {
  const tile = document.createElement("div");
  tile.classList.add("tile");
  // HTML helpers will automatically convert camel case to dashes
  // hyphens are not allowed in JavScript names
  tile.dataset.rowIndex = i;
  tile.dataset.colIndex = j;
  tile.dataset.type = "empty";
  return tile;
}

// updates a tile on the grid with a letter and styling
function updateTile(letter, i, j, type) {
  // speech marks are required when using querySelector as i & j are both numbers
  const tile = document.querySelector(`[data-col-index="${i}"][data-row-index="${j}"].tile`);
  tile.innerHTML = letter;
  tile.dataset.type = type;
}

// pick a random word from the valid-words
function pickSecretWord() {
  window.secretWord = commonWords[Math.floor(Math.random() * commonWords.length)];
}

// handles key presses from the user
function onKeyDownInGame(e) {
  if (isEndGame) {
    return;
  }

  const key = e.key;
  // regex matches any lowercase or uppercase english letter
  if (key.length === 1 && e.key.match(/^[a-z]/i)) {
    handleLetter(key);
  } else if (e.key === "Enter") {
    handleEnter();
  } else if (e.key === "Backspace") {
    handleBackspace();
  }
}

// enable the handling of key presses
function handleInput() {
  document.addEventListener("keydown", onKeyDownInGame);
}

// disable the handling of key presses
function disableInput() {
  document.removeEventListener("keydown", onKeyDownInGame);
}

// add the letter to the grid if possible
function handleLetter(letter) {
  if (colIndex > NUM_COLS - 1 || rowIndex > NUM_ROWS - 1) {
    return;
  }

  updateTile(letter.toUpperCase(), colIndex, rowIndex, "full");
  colIndex++;
}

// delete and reset the last tile
function handleBackspace() {
  if (colIndex === 0) {
    return;
  }

  colIndex--;
  updateTile("", colIndex, rowIndex, "empty");
}

// submit a valid word
function handleEnter() {
  const word = getWord();
  if (isValidWord(word)) {
    colourWord(word);
  }
}

function getWord() {
  const tiles = document.querySelectorAll(`[data-type="full"][data-row-index="${rowIndex}"].tile`);
  let word = "";
  for (const tile of tiles) {
    word += tile.innerHTML;
  }
  return word.toLowerCase();
}

function isValidWord(word) {
  return word.length == 5 && dictionary.includes(word);
}

function colourWord(word) {
  for (let i = 0; i < NUM_COLS; i++) {
    const tile = document.querySelector(`[data-row-index="${rowIndex}"][data-col-index="${i}"].tile`);
    if (Math.random() <= window.lieRate && word != window.secretWord) {
      colourLetterFalsely(tile);
    } else {
      colourLetter(tile);
    }
  }
  checkEndGame(word);
}

function colourLetter(tile) {
  let testChar = tile.innerHTML.toLowerCase();
  if (secretWord.charAt(tile.dataset.colIndex) === testChar) {
    tile.dataset.type = "right";
  } else if (secretWord.includes(testChar)) {
    tile.dataset.type = "right-letter";
  } else {
    tile.dataset.type = "wrong";
  }
}

function colourLetterFalsely(tile) {
  let testChar = tile.innerHTML.toLowerCase();
  if (secretWord.charAt(tile.dataset.colIndex) === testChar) {
    tile.dataset.type =  Math.random() < 0.5 ? "wrong" : "right-letter";
  } else if (secretWord.includes(testChar)) {
    tile.dataset.type = Math.random() < 0.5 ? "right" : "wrong";;
  } else {
    tile.dataset.type = Math.random() < 0.5 ? "right" : "right-letter";
  }
}


function checkEndGame(word) {
  if (word === window.secretWord) {
    handleEndGame(/*isWin =*/ true);
    updateScores(rowIndex+1);
  } else if (rowIndex >= NUM_ROWS - 1) {
    handleEndGame(/*isWin =*/ false);
  } else {
    // reset cursor
    colIndex = 0;
    rowIndex++;
  }
}

// update the current and best score
function updateScores(score) {
  if(parseInt(bestScore) == 0){
    setBestScore(score);
    bestScoreDisplay.innerHTML = score;
  }
  else if (score < parseInt(bestScore)) {
    setBestScore(score);
    bestScoreDisplay.innerHTML = score;
  }
}

function handleEndGame(isWin) {
  const endSection = document.getElementById("end");
  const endMsg = document.getElementById("end-message");
  const wordReveal = document.getElementById("word-reveal");
  if (isWin) {
    endMsg.innerHTML = "YOU WIN!";
    endMsg.dataset.result = "win";
  } else {
    endMsg.innerHTML = "YOU LOSE";
    endMsg.dataset.result = "lose";
  }
  wordReveal.innerHTML = `The secret word was ${window.secretWord.toUpperCase()}`;
  endSection.style.visibility = "visible";
  isEndGame = true;
}

start();
