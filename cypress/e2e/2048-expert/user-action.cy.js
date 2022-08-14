const WIDTH = 6
const totalCell = WIDTH * WIDTH

describe('test user actions', () => {
    beforeEach(() => {
        cy.visit("http://localhost:1234/2048-expert/index.html");
    })



    it('test key down', () => {
        cy.get('.cell')
            .contains(/[2|4]/g)
            .invoke('data', 'index')
            .then(($before) => {
                console.log($before)
                cy.get('body').trigger('keyup', { keyCode: 40 })

                cy.get('.cell')
                    .contains(/[2|4]/g)
                    .invoke('data', 'index')
                    .should('be.gt', parseInt($before) - 1)
            })
    })

    it('test key up', () => {
        cy.get('.cell')
            .contains(/[2|4]/g)
            .invoke('data', 'index')
            .then(($before) => {
                console.log($before)
                cy.get('body').trigger('keyup', { keyCode: 38 })

                cy.get('.cell')
                    .contains(/[2|4]/g)
                    .invoke('data', 'index')
                    .should('be.lt', parseInt($before) + 1)
            })
    })

    it('test key left', () => {
        cy.get('.cell')
            .contains(/[2|4]/g)
            .invoke('data', 'index')
            .then(($before) => {
                console.log($before)
                cy.get('body').trigger('keyup', { keyCode: 37 })

                cy.get('.cell')
                    .contains(/[2|4]/g)
                    .invoke('data', 'index')
                    .should('be.lt', parseInt($before) + 1)
            })
    })

    it('test key right', () => {
        cy.get('.cell')
            .contains(/[2|4]/g)
            .invoke('data', 'index')
            .then(($before) => {
                console.log($before)
                cy.get('body').trigger('keyup', { keyCode: 39 })

                cy.get('.cell')
                    .contains(/[2|4]/g)
                    .invoke('data', 'index')
                    .should('be.gt', parseInt($before) - 1)
            })
    })

    it('test key enter', () => {
        cy.get('body').trigger('keyup', { keyCode: 39 })
        cy.get('body').trigger('keyup', { keyCode: 16 })

        cy.get('.game-board')
            .children('.cell')
            .contains(/[2|4]/g)

    })

})