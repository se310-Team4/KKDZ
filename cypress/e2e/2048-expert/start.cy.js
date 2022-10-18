/// <reference types="cypress" />
describe("game board initialisation", () => {
  beforeEach(() => {
    cy.visit("http://localhost:1234/2048-expert/index.html");
    cy.get("[id=close-btn]").click();
  });

  it("test number generated correctly", () => {
    cy.get("#game-board").children(".tile").contains(/[2|4]/g);
  });
});
