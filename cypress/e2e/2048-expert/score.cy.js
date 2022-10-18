/// <reference types="cypress" />
describe("initial scores", () => {
  beforeEach(() => {
    cy.visit("http://localhost:1234/2048-expert/index.html");
    cy.get("[id=close-btn]").click();
  });

  it("test current score initially displays correctly", () => {
    cy.get("#current-score").should(($score) => {
      let text = $score.text();
      expect(text).equal("0");
    });
  });

  it("test best score initially displays correctly", () => {
    cy.get("#best-score").should(($score) => {
      let text = $score.text();
      expect(text).equal("0");
    });
  });
});