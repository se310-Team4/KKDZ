describe('initialise grid', () => {
  beforeEach(() => {
    cy.visit("http://localhost:1234/liedle/index.html");
    cy.get('[id=close-btn]').click()
  })

  it('test grid full', () => {
    cy.get('.tile').not(`[data-size=small]`)
      .should('have.length', 40)
  })

  it('test initial tile type', () => {
    cy.get('.tile').not(`[data-size=small]`).first()
      .should('have.attr', 'data-type', 'empty')
  })
})

describe('end game components', () => {
  beforeEach(() => {
    cy.visit("http://localhost:1234/liedle/index.html");
    cy.get('[id=close-btn]').click()
  })

  it('end game messages hidden', () => {
    cy.get('[id=end]').not(`[data-size=small]`)
      .should('have.css', 'visibility', 'hidden')
  })
})

describe('help window', () => {
  beforeEach(() => {
    cy.visit("http://localhost:1234/liedle/index.html");
  })

  it('test help window shows', () => {
    cy.get('[id=modal]')
      .should('have.css', 'display', 'block')
  })

  it('test help window closes', () => {
    cy.get('[id=close-btn]').click()
    cy.get('[id=modal]')
      .should('have.css', 'display', 'none')
  })

  it('test help window opens', () => {
    cy.get('[id=close-btn]').click()
    cy.get('[id=help-btn]').click()
    cy.get('[id=modal]')
      .should('have.css', 'display', 'block')
  })
})