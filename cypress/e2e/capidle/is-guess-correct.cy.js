/// <reference types="cypress" />

import { isGuessCorrect } from "../../../src/capidle/script/is-guess-correct";

const city1 = {
  // (this is the capital city of Chad)
  names: { en: "N'Djamena", kab: "Nǧamena", ru: "Нджамена", ja: "ンジャメナ" },
};

describe("isGuessCorrect", () => {
  it("determines whether a guess is correct", () => {
    // valid guesses
    expect(isGuessCorrect(city1, "N'Djamena")).to.be.true;
    expect(isGuessCorrect(city1, "N-Djamena")).to.be.true; // hyphen instead of apostrophe
    expect(isGuessCorrect(city1, "N’Djamena")).to.be.true; // curly apostrophe
    expect(isGuessCorrect(city1, "ndjamEnA")).to.be.true;
    expect(isGuessCorrect(city1, " Нджамена ")).to.be.true; // extra whitespace
    expect(isGuessCorrect(city1, "ngamena")).to.be.true; // missing diacritic on the ǧ
    expect(isGuessCorrect(city1, "ngamenā")).to.be.true; // unexpected macron on the ā

    // invalid guesses
    expect(isGuessCorrect(city1, undefined)).to.be.false;
    expect(isGuessCorrect(city1, "")).to.be.false;
    expect(isGuessCorrect(city1, "Nǧam ena")).to.be.false; // unexpected space
    expect(isGuessCorrect(city1, "👻ǧamena")).to.be.false; // one letter is wrong
    expect(isGuessCorrect(city1, "Нджамeна")).to.be.false; // the "е" is a latin "e", not a cyrilic "е"
  });
});
