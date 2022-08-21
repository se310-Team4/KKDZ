/**
 * This function removes whitespace, normalizes upper/lower case,
 * and removes special characters like macrons.
 * @param {string} guess
 */
export const normalizeString = (guess) =>
  guess
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .replace(/ {2,}/g, " ") // remove multiple spaces
    .replace(/[^\w ]/g, ""); // remove anything that's not a letter, number or space

/**
 * @param {import("./puzzle").Answer} answer
 * @param {string} guess
 */
export function isGuessCorrect(answer, guess) {
  // if they guessed nothing, it's obviously wrong
  if (!guess) return false;

  // loop through the names of the city in every language that we know
  for (const language in answer.names) {
    const nameInThisLanguage = answer.names[language];

    // check if the names are equal after removing extra whitespace
    // and normalizing the input.
    if (normalizeString(nameInThisLanguage) == normalizeString(guess)) {
      return true;
    }
  }

  // after searching through every language, not a single one matched
  // so the answer is wrong
  return false;
}
