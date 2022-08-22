/// <reference types="cypress" />
const WIDTH = 6;
const numCells = WIDTH * WIDTH;

describe("keyboard arrow keys", () => {
  beforeEach(() => {
    cy.visit("http://localhost:1234/2048-expert/index.html");
    cy.get("[id=close-btn]").click();
  });

  it("test key down", () => {
    cy.get(".cell")
      .contains(/[2|4]/g) // 2 or 4
      .invoke("data", "index")
      .then(($before) => {
        console.log($before);
        cy.get("body").trigger("keyup", { keyCode: 40 });

        cy.get(".cell").contains(/[2|4]/g).invoke("data", "index").should("be.gt", -1);
      });
  });

  it("test key up", () => {
    cy.get(".cell")
      .contains(/[2|4]/g)
      .invoke("data", "index")
      .then(($before) => {
        console.log($before);
        cy.get("body").trigger("keyup", { keyCode: 38 });

        cy.get(".cell").contains(/[2|4]/g).invoke("data", "index").should("be.lt", numCells);
      });
  });

  it("test key left", () => {
    cy.get(".cell")
      .contains(/[2|4]/g)
      .invoke("data", "index")
      .then(($before) => {
        console.log($before);
        cy.get("body").trigger("keyup", { keyCode: 37 });

        cy.get(".cell").contains(/[2|4]/g).invoke("data", "index").should("be.lt", numCells);
      });
  });

  it("test key right", () => {
    cy.get(".cell")
      .contains(/[2|4]/g)
      .invoke("data", "index")
      .then(($before) => {
        console.log($before);
        cy.get("body").trigger("keyup", { keyCode: 39 });

        cy.get(".cell").contains(/[2|4]/g).invoke("data", "index").should("be.gt", -1);
      });
  });
});
