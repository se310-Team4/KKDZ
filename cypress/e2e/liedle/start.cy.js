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

describe("can't type while help modal present", () => {
  beforeEach(() => {
    cy.visit("http://localhost:1234/liedle/index.html");
  });

  it("test can't type while help modal present", () => {
    cy.get("body").type("s");
    cy.get(`[data-col-index=0][data-row-index=0].tile`).first().should("have.text", "");
  });

  it("test can type after help modal closed", () => {
    cy.get("[id=close-btn]").click();
    cy.get("body").type("s");
    cy.get(`[data-col-index=0][data-row-index=0].tile`).first().should("have.text", "S");
  });

  it("test can't type after modal reopened", () => {
    cy.get("[id=close-btn]").click();
    cy.get("[id=help-btn]").click();
    cy.get("body").type("s");
    cy.get(`[data-col-index=0][data-row-index=0].tile`).first().should("have.text", "");
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
