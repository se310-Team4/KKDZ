import { render } from "./render";
import { $ } from "./util";

/* game state */
window.guesses = [];
window.answer = [];

/* register event listeners */

// when the submit button is clicked
$("input[type=submit]").addEventListener("click", () => {
  const guess = $("input[type=text]").value.trim();
  if (!guess) return; // input field is blank, abort

  window.guesses.push(guess);
  $("input[type=text]").value = "";
  render();
});

/* run the initial render */
render();
