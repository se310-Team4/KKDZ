import { generatePuzzle } from "./puzzle";
import { $, NUMBER_OF_GUESSES } from "./util";

/**
 * this function re-renders the whole game.
 * It is called when the user changes the game state.
 */
export function render() {
  // if this is the first render, there won't be answer yet so we generate one
  if (!window.answer) window.answer = generatePuzzle();

  // this was the user's last guess
  const isGameOver = window.guesses.length === NUMBER_OF_GUESSES;

  if (isGameOver) renderResultsUi();
  else renderGameUi();
}

function renderGameUi() {
  $("#guess-rows").innerHTML = new Array(NUMBER_OF_GUESSES)
    .fill(null)
    .map((_, i) => {
      // for each row, either render the guess, or an empty slot
      const guess = window.guesses[i];

      // TODO: these would be calculated dynamically
      const [hintDistance, hintDirection] = ["1,200km", "↗️"];

      return guess
        ? `
            <div class="guess">
              <span>${guess}</span>
              <span>${hintDistance}</span>
              <span>${hintDirection}</span>
            </div>
          `
        : `
            <div class="empty-guess"></div>
          `;
    })
    .join("");
}

function renderResultsUi() {
  $("main").innerHTML = "game over";
}
