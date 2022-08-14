describe("capidle help modal", () => {
  beforeEach(() => {
    cy.visit("http://localhost:1234/capidle?test");
  });

  it("can close the help modal by pressing escape", () => {
    cy.get("[id=modal]").should("have.css", "display", "block");

    // click the Escape key on the keyboard
    cy.get("body").type("{esc}");

    cy.get("[id=modal]").should("have.css", "display", "none");
  });
});
