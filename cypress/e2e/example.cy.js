/// <reference types="cypress" />

describe("the homepage", () => {
  beforeEach(() => {
    cy.visit("http://localhost:1234");
  });

  it("displays a link to the Capidle game", () => {
    cy.get("a").should("contain.text", "Click here");
  });
});
