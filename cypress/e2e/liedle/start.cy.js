/// <reference types="cypress" />
describe("initialise grid", () => {
  beforeEach(() => {
    cy.visit("http://localhost:1234/liedle/index.html");
    cy.get("[id=close-btn]").click();
  });

  it("test grid full", () => {
    cy.get(".tile").not(`[data-size=small]`).should("have.length", 40);
  });

  it("test initial tile type", () => {
    cy.get(".tile").not(`[data-size=small]`).first().should("have.attr", "data-type", "empty");
  });
});

describe("end game components", () => {
  beforeEach(() => {
    cy.visit("http://localhost:1234/liedle/index.html");
    cy.get("[id=close-btn]").click();
  });

  it("end game messages hidden", () => {
    cy.get("[id=end]").not(`[data-size=small]`).should("have.css", "visibility", "hidden");
  });
});

describe("end game components", () => {
  beforeEach(() => {
    cy.visit("http://localhost:1234/liedle/index.html");
    cy.get("[id=close-btn]").click();
  });

  it("end game messages hidden", () => {
    cy.get("[id=end]").should("have.css", "visibility", "hidden");
  });
});
