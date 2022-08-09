const word = "stare"

describe('colour each letter based on if it matches the secret word', () => {
    beforeEach(() => {
        cy.visit("http://localhost:1234/liedle/index.html")
        // override secret word for testing purposes
        cy.window().then((win) => {
            win.secretWord = word
        })
        cy.get('body').type('frame').type('{enter}')
    })

    it('test right letter right place', () => {
        cy.get(`[data-col-index=2][data-row-index=0].tile`).first()
            .should('have.attr', 'data-type', 'right')
    })

    it('test right letter wrong place', () => {
        cy.get(`[data-col-index=1][data-row-index=0].tile`).first()
            .should('have.attr', 'data-type', 'right-letter')
    })

    it('test wrong letter wrong place', () => {
        cy.get(`[data-col-index=0][data-row-index=0].tile`).first()
            .should('have.attr', 'data-type', 'wrong')
    })
})