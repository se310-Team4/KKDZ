describe("initialise game board", () => {
  beforeEach(() => {
    cy.visit("http://localhost:1234/2048-expert/index.html");
  });

  it("test cells show successfully", () => {
    cy.get(".game-board").children(".cell").should("have.length", 36);
  });

  it("test number generated correctly", () => {
    cy.get(".game-board").children(".cell").contains(/[2|4]/g);
  });
});
