/// <reference types="cypress" />
const TOTAL_CELL = 36;

describe("end game triggers", () => {
  beforeEach(() => {
    cy.visit("http://localhost:1234/2048-expert/index.html");
    cy.get("[id=close-btn]").click();
  });

  it("test lost", () => {
    // fill up the board with tiles and they are not mergeable
    for (let i = 0; i < TOTAL_CELL; i++) {
      if (i % 2) {
        cy.get(".cell").eq(i).invoke("text", i);
      }
    }

    cy.get("body").trigger("keyup", { keyCode: 37 });

    cy.on("window:alert", (t) => {
      expect(t).to.contains("\t\t You Lost\n Your score is ");
    });
  });

  it("board filled but mergeable", () =>{
    // fill up the board with tiles but tiles are mergeable
    let spy = cy.spy(window, 'alert');
    for (let i = 0; i < TOTAL_CELL; i++) {
      if (i % 2) {
        cy.get(".cell").eq(i).invoke("text", 2);
      } else {
        cy.get(".cell").eq(i).invoke("text", 4);
      }
    }

    expect(spy).to.haveOwnProperty('callCount');
    expect(spy).to.not.be.called;
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
