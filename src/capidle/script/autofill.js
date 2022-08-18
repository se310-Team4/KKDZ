import { normalizeString } from "./is-guess-correct";
import { gameModes } from "./puzzle";
import { $, GAME_MODE } from "./util";

const autofillFinishEvent = new Event("input");

let focussed = -1; // the index of the currently focussed list item, if any

const input = $("input[type=text]");

function closeAutofill() {
  // reset the focus and delete all list items
  focussed = -1;

  document
    .querySelectorAll(".autofill-popup")
    .forEach((el) => el.parentNode.removeChild(el));
}

input.addEventListener("input", (e) => {
  if (e === autofillFinishEvent) return; // abort because this would create an infinite cycle

  closeAutofill();
  const userInput = normalizeString(e.target.value.trim());
  if (!userInput) return;

  // destroy and recreate the popup when ever the user types
  const popup = document.createElement("div");
  popup.setAttribute("class", "autofill-popup");

  const filteredOptions = gameModes[GAME_MODE].db
    .filter((city) =>
      // check if the user input matches the city's name in any language
      Object.values(city.names).some((name) =>
        normalizeString(name).includes(userInput)
      )
    )
    .slice(0, 50); // maxmium 50 items will be rendered for performance

  // for every city that matches, add a row to the popup
  for (const city of filteredOptions) {
    const item = document.createElement("div");
    item.dataset.val = city.names.en;
    item.innerHTML = city.names.en;
    item.addEventListener("click", () => {
      input.value = item.dataset.val;
      input.dispatchEvent(autofillFinishEvent);
      closeAutofill();
    });
    popup.appendChild(item);
  }

  input.parentNode.appendChild(popup);
});

input.addEventListener("keydown", (e) => {
  const allItems = input.parentElement.querySelectorAll(
    ".autofill-popup > div"
  );

  if (e.key == "ArrowDown" || e.key == "ArrowUp") {
    const offset = e.key == "ArrowDown" ? +1 : -1;

    // increase the focussed index by +1 or -1.
    // Math.min/max prevents the index from exceding the limits
    focussed = Math.max(Math.min(focussed + offset, allItems.length - 1), 0);

    // remove the active class from all items, and then add it back to the new focussed item
    for (const element of allItems) element.classList.remove("active");
    allItems[focussed].classList.add("active");

    return;
  }

  if (e.key == "Enter") {
    // if the popup is open, then enter should close the popup
    // otherwise, enter should submit the form
    if ($(".autofill-popup")) {
      e.preventDefault(); // so that enter doesn't trigger the form's submit button
      allItems[focussed]?.click();
    }
  }
});

// destroy the popup if the user clicks anywhere else
document.addEventListener("click", closeAutofill);
