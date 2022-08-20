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

  it("2048 Expert link redirects to its web page", () => {
    cy.get('a[id="a2048expert-btn"]').should("contain.text", "2048 Expert");
    cy.get('a[id="a2048expert-btn"]').click()
    cy.url().should('eq', 'http://localhost:1234/2048-expert/index.html')
  });

  it("should display an image in all buttons", () => {
    cy.get('a[id="capidle-btn"]').find("img").should('be.visible');
    cy.get('a[id="liedle-btn"]').find("img").should('be.visible');
    cy.get('a[id="a2048expert-btn"]').find("img").should('be.visible');
  });

  it("should display the title image", () => {
    cy.get('div[id="center-info"]').find('img[id="title-img"]').should('be.visible');
  });

  it("should display details when button is hovered", () => {
    cy.get('a[id="capidle-btn"]').realHover('mouse');
    cy.get('div[id="center-info"]').find('div[id="capidle-details"]').should('be.visible');
    cy.wait(1000)
    cy.get('a[id="liedle-btn"]').realHover('mouse');
    cy.get('div[id="center-info"]').find('div[id="liedle-details"]').should('be.visible');
    cy.wait(1000)
    cy.get('a[id="a2048expert-btn"]').realHover('mouse');
    cy.get('div[id="center-info"]').find('div[id="a2048expert-details"]').should('be.visible');
    cy.wait(1000)
  });

  it("should redisplay logo when button is not hovered", () => {
    cy.get('img[id="title-img"]').realHover('mouse');
    cy.wait(1000)
    cy.get('div[id="center-info"]').find('img[id="title-img"]').should('be.visible');
  });
});
