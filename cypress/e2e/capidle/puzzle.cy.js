/// <reference types="cypress" />

import { generatePuzzle } from "../../../src/capidle/script/puzzle";

describe("generatePuzzle", () => {
  beforeEach(() => {
    // mock Math.random() so that it always returns the same value.
    cy.stub(Math, "random").returns(0.225);
  });

  it("generates a random puzzle when you call the function (for capitals)", () => {
    expect(generatePuzzle("capitalCities")).to.eql({
      names: {
        de: "Kapstadt",
        en: "Cape Town",
        mi: "Kēpa Tāone",
        zh: "开普敦",
      },
      lat: -33.925,
      lng: 18.425,
      capitalOf: "Q258",
    });
  });

  it("generates a random puzzle when you call the function (for NZ cities)", () => {
    expect(generatePuzzle("nzCities")).to.eql({
      names: {
        de: "Havelock North",
        en: "Havelock North",
        mi: "Te Hemo-a-Te Atonga",
      },
      lat: -39.666666666,
      lng: 176.883333333,
    });
  });
});
