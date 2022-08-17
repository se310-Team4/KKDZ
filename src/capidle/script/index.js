import { guesses, render } from "./render";
import { $, GAME_MODE } from "./util";
import { isGuessCorrect } from "./is-guess-correct";
import { gameModes } from "./puzzle";
import "./autofill";

function findMatch(input) {
  // find the first city that matches the user input
  return gameModes[GAME_MODE].db.find((city) => isGuessCorrect(city, input));
}

/* register event listeners */

// when the user types
$("input[type=text]").addEventListener("input", (e) => {
  // disable the submit button if the current input matches no cities
  $("input[type=submit]").disabled = !findMatch(e.target.value);
});

// when the submit button is clicked
$("form").addEventListener("submit", (e) => {
  e.preventDefault();

  const guess = findMatch($("input[type=text]").value);
  if (!guess) return; // input field is blank, abort

  guesses.push(guess);
  $("input[type=text]").value = "";
  render();
});

/* run the initial render */
render();
