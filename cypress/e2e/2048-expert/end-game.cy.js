describe("test score intially display correctly", () => {
  beforeEach(() => {
    cy.visit("http://localhost:1234/2048-expert/index.html");
  });

  it("test lost", () => {
    const TOTAL_CELL = 36;
    for (let i = 0; i < TOTAL_CELL; i++) {
      if (i % 2) {
        cy.get(".cell").eq(i).invoke("text", 2);
      } else cy.get(".cell").eq(i).invoke("text", 4);
    }

    cy.get("body").trigger("keyup", { keyCode: 37 });

    cy.on("window:alert", (t) => {
      expect(t).to.contains("\t\t You Lost\n Your score is ");
    });
  });

  it("test win", () => {
    cy.get(".cell").eq(0).invoke("text", 1024);
    cy.get(".cell").eq(1).invoke("text", 1024);

    cy.get("body").trigger("keyup", { keyCode: 37 });

    cy.on("window:alert", (t) => {
      expect(t).to.contains("\t\t You win! \n Your score is ");
    });
  });
});
