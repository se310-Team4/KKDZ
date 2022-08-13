import { guesses, render } from "./render";
import { $ } from "./util";

/* register event listeners */

// when the submit button is clicked
$("input[type=submit]").addEventListener("click", () => {
  const guess = $("input[type=text]").value.trim();
  if (!guess) return; // input field is blank, abort

  guesses.push(guess);
  $("input[type=text]").value = "";
  render();
});

/* run the initial render */
render();
