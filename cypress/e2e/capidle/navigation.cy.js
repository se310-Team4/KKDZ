/// <reference types="cypress" />

describe("capidle navigation", () => {
  beforeEach(() => {
    cy.visit("http://localhost:1234/capidle");
  });

  it("has a working back button", () => {
    cy.get("nav > div:first-child() > a").click();

    cy.url().should("eq", "http://localhost:1234/index.html");
  });

  it("can navigate through a game", () => {
    // currently there are 6 placeholder rows and 0 hint rows
    cy.get(".empty-guess").should("have.length", 6);
    cy.get(".guess").should("have.length", 0);

    // type in a guess
    cy.get("input[type=text]").type("Adelaide");
    cy.get("input[type=submit]").click();

    // input was cleared
    cy.get("input[type=text]").should("have.value", "");
    // now there are 5 placeholder rows and 1 hint row
    cy.get(".empty-guess").should("have.length", 5);
    cy.get(".guess").should("have.length", 1);

    // the only hint row is correctly populated
    cy.get(".guess > span:first-child()").should("have.text", "Adelaide");
    cy.get(".guess > span:nth-child(2)").should("have.text", "1,200km");
    cy.get(".guess > span:last-child()").should("have.text", "↗️");

    // make 4 more guesses, so we only have 1 guess remaining
    for (let i = 0; i < 4; i += 1) {
      cy.get("input[type=text]").type("Whangārei");
      cy.get("input[type=submit]").click();
    }

    // now there is 1 placeholder row and 5 hint rows
    cy.get(".empty-guess").should("have.length", 1);
    cy.get(".guess").should("have.length", 5);

    // make the final guess
    cy.get("input[type=text]").type("Ouagadougou");
    cy.get("input[type=submit]").click();

    // the game UI has been replaced by the results page
    cy.get("#guess-rows").should("not.exist");
    cy.get("main").should("have.text", "game over");
  });
});
