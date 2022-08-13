const word = "stare"
const NUM_ROWS = 8
const NUM_COLS = 5

describe('end game', () => {
    beforeEach(() => {
        cy.visit('http://localhost:1234/liedle/index.html')
        cy.get('[id=close-btn]').click()
        // override global variables for testing purposes
        cy.window().then((win) => {
            win.secretWord = word
            win.lieRate = 0.0
        })
    })

    describe('win', () => {
        it('test right word then type', () => {
            cy.get('body').type(word).type('{enter}').type('S')

            cy.get(`[data-col-index=0][data-row-index=1].tile`).first()
                .should('have.text', '')
        })

        it('test right word last guess then type', () => {
            for (let i = 0; i < NUM_ROWS - 1; i++) {
                cy.get('body').type('frame').type('{enter}')
            }
            cy.get('body').type(word).type('{enter}').type('S')
            cy.get('body').type('{backspace}').type('S')

            cy.get(`[data-col-index="${NUM_COLS - 1}"][data-row-index="${NUM_ROWS - 1}"].tile`).first()
                .should('have.text', 'E')
        })

        it('test win messages', () => {
            cy.get('body').type(word).type('{enter}').type('S')

            cy.get('[id=end-message]')
                .should('have.text', 'YOU WIN!')
            cy.get('[id=word-reveal]')
                .should('have.text', 'The secret word was ' + word.toUpperCase())
        })
    })

    describe('lose', () => {
        it('test wrong word out of guesses then type', () => {
            for (let i = 0; i < NUM_ROWS; i++) {
                cy.get('body').type('frame').type('{enter}')
            }
            cy.get('body').type('{backspace}').type('S')

            cy.get(`[data-col-index="${NUM_COLS - 1}"][data-row-index="${NUM_ROWS - 1}"].tile`).first()
                .should('have.text', 'E')
        })


        it('test lose messages', () => {
            cy.window().then((win) => {
                win.lieRate = 0.0
            })
            for (let i = 0; i < NUM_ROWS; i++) {
                cy.get('body').type('frame').type('{enter}')
            }

            cy.get('[id=end-message]')
                .should('have.text', 'YOU LOSE')
            cy.get('[id=word-reveal]')
                .should('have.text', 'The secret word was ' + word.toUpperCase())
        })
    })
})


