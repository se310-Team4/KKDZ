/// <reference types="cypress" />
describe("help modal", () => {
  beforeEach(() => {
    // we could use any mini game for this test, this is an arbitrary choice
    cy.visit("http://localhost:1234/liedle/index.html");
  });

  it("has a help window that shows by default", () => {
    cy.get("[id=modal]").should("have.css", "display", "block");
  });

  it("can close the help window using the close button", () => {
    cy.get("[id=close-btn]").click();
    cy.get("[id=modal]").should("have.css", "display", "none");
  });

  it("can close the help modal by pressing escape", () => {
    cy.get("[id=modal]").should("have.css", "display", "block");

    // click the Escape key on the keyboard
    cy.get("body").type("{esc}");

    cy.get("[id=modal]").should("have.css", "display", "none");
  });

  it("can reopen the help window", () => {
    cy.get("[id=close-btn]").click();
    cy.get("[id=help-btn]").click();
    cy.get("[id=modal]").should("have.css", "display", "block");
  });
});
