describe('initialise grid', () => {
  beforeEach(() => {
    cy.visit("http://localhost:1234/liedle/index.html");
  })

  it('test grid full', () => {
    cy.get('.tile')
      .should('have.length', 40)
  })

  it('test initial tile type', () => {
    cy.get('.tile').first()
      .should('have.attr', 'data-type', 'empty')
  })
})