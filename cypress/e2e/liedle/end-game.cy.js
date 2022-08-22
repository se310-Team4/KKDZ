/// <reference types="cypress" />
const WORD = "stare";
const NUM_ROWS = 8;
const NUM_COLS = 5;

describe("end game", () => {
  beforeEach(() => {
    cy.visit("http://localhost:1234/liedle/index.html");
    cy.get("[id=close-btn]").click();
    // override global variables for testing purposes
    cy.window().then((win) => {
      win.secretWord = WORD;
      win.lieRate = 0.0;
    });
  });

  describe("win", () => {
    it("test right word then type", () => {
      cy.get("body").type(WORD).type("{enter}").type("S");

      cy.get(`[data-col-index=0][data-row-index=1].tile`).first().should("have.text", "");
    });

    it("test right word last guess then type", () => {
      for (let i = 0; i < NUM_ROWS - 1; i++) {
        cy.get("body").type("frame").type("{enter}");
      }
      cy.get("body").type(WORD).type("{enter}").type("S");
      cy.get("body").type("{backspace}").type("S");

      cy.get(`[data-col-index="${NUM_COLS - 1}"][data-row-index="${NUM_ROWS - 1}"].tile`)
        .first()
        .should("have.text", "E");
    });

    it("test win messages", () => {
      cy.get("body").type(WORD).type("{enter}").type("S");

      cy.get("[id=end-message]").should("have.text", "YOU WIN!");
      cy.get("[id=word-reveal]").should("have.text", "The secret word was " + WORD.toUpperCase());
    });
  });

  describe("lose", () => {
    it("test wrong word out of guesses then type", () => {
      for (let i = 0; i < NUM_ROWS; i++) {
        cy.get("body").type("frame").type("{enter}");
      }
      cy.get("body").type("{backspace}").type("S");

      cy.get(`[data-col-index="${NUM_COLS - 1}"][data-row-index="${NUM_ROWS - 1}"].tile`)
        .first()
        .should("have.text", "E");
    });

    it("test lose messages", () => {
      for (let i = 0; i < NUM_ROWS; i++) {
        cy.get("body").type("frame").type("{enter}");
      }

      cy.get("[id=end-message]").should("have.text", "YOU LOSE");
      cy.get("[id=word-reveal]").should("have.text", "The secret word was " + WORD.toUpperCase());
    });
  });

  describe("replay", () => {
    it("test resets game", () => {
      cy.get("body").type(WORD).type("{enter}").type("S");
      cy.get("[id=replay]").click();

      cy.get("[data-type=empty].tile").not(`[data-size=small]`).should("have.length", 40);
      cy.get("[data-type=empty].tile").not(`[data-size=small]`).first().should("have.text", "").should("have.attr", "data-type", "empty");
      cy.get("[data-type=empty].tile").not(`[data-size=small]`).last().should("have.text", "").should("have.attr", "data-type", "empty");
      cy.get("[id=end]").should("have.css", "visibility", "hidden");
      cy.get("[id=modal]").should("have.css", "display", "none");
    });

    it("test play game after reset", () => {
      cy.get("body").type(WORD).type("{enter}");
      cy.get("[id=replay]").click();
      cy.get("body").type("frame").type("{enter}");
      cy.get("body").type("X");

      cy.get(`[data-col-index=0][data-row-index=0].tile`).first().should("have.text", "F");
      cy.get(`[data-col-index=0][data-row-index=1].tile`).first().should("have.text", "X");
    });
  });
});
