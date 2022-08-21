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

describe("updated score", () => {
  beforeEach(() => {
    cy.visit("http://localhost:1234/2048-expert/index.html");
    cy.get("[id=close-btn]").click();
    cy.get("body").trigger("keyup", { keyCode: 40 });
    cy.get("body").trigger("keyup", { keyCode: 39 });
    cy.get("body").trigger("keyup", { keyCode: 38 });
    cy.get("body").trigger("keyup", { keyCode: 37 });
    cy.get("body").trigger("keyup", { keyCode: 40 });
    cy.get("body").trigger("keyup", { keyCode: 39 });
    cy.get("body").trigger("keyup", { keyCode: 38 });
    cy.get("body").trigger("keyup", { keyCode: 37 });
    cy.get("body").trigger("keyup", { keyCode: 40 });
    cy.get("body").trigger("keyup", { keyCode: 39 });
    cy.get("body").trigger("keyup", { keyCode: 38 });
    cy.get("body").trigger("keyup", { keyCode: 37 });
    cy.get("body").trigger("keyup", { keyCode: 37 });
    cy.get("body").trigger("keyup", { keyCode: 37 });
    cy.get("body").trigger("keyup", { keyCode: 37 });
    cy.get("body").trigger("keyup", { keyCode: 37 });
  });

  it("test current score displays successfully", () => {
    cy.get("#current-score").should(($score) => {
      let text = $score.text();
      expect(text).not.equal("0");
    });
  });

  it("test best score displays successfully", () => {
    cy.get("#best-score").should(($score) => {
      let text = $score.text();
      expect(text).not.equal("0");
    });
  });
});
