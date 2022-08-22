/// <reference types="cypress" />
let miniGames = ["capidle", "liedle", "a2048expert"];
let miniGameFolders = ["capidle", "liedle", "2048-expert"];
let miniGameTitles = ["Capidle", "Liedle", "2048 Expert"];

describe("the homepage", () => {
  beforeEach(() => {
    cy.visit("http://localhost:1234");
  });

  it("links redirect to its web page", () => {
    for (let i = 0; i < miniGames.length; i++) {
      cy.visit("http://localhost:1234");
      cy.get(`a[id="${miniGames[i]}-btn"]`).should("contain.text", miniGameTitles[i]);
      cy.get(`a[id="${miniGames[i]}-btn"]`).click();
      cy.url().should("eq", `http://localhost:1234/${miniGameFolders[i]}/index.html`);
    }
  });

  it("should display an image in all buttons", () => {
    for (const game of miniGames) {
      cy.get(`a[id="${game}-btn"]`).find("img").should("be.visible");
    }
  });

  it("should display details when button is hovered", () => {
    for (const game of miniGames) {
      cy.get(`a[id="${game}-btn"]`).realHover("mouse");
      cy.get('div[id="center-info"]').find(`div[id="${game}-details"]`).should("be.visible");
    }
  });

  it("should redisplay logo when button is not hovered", () => {
    cy.get('img[id="title-img"]').realHover("mouse");
    cy.get('div[id="center-info"]').find('img[id="title-img"]').should("be.visible");
  });
});
