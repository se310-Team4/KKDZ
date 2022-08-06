/// <reference types="cypress" />

describe("the homepage", () => {
  beforeEach(() => {
    cy.visit("http://localhost:1234");
  });

  it("Capidle link redirects to its web page", () => {
    cy.get('a[id="capidle-btn"]').should("contain.text", "Capidle");
    cy.get('a[id="capidle-btn"]').click()
    cy.url().should('eq', 'http://localhost:1234/capidle/index.html')
  });

  it("Liedle link redirects to its web page", () => {
    cy.get('a[id="liedle-btn"]').should("contain.text", "Liedle");
    cy.get('a[id="liedle-btn"]').click()
    cy.url().should('eq', 'http://localhost:1234/liedle/index.html')
  });
});
