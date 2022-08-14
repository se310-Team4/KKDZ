const { expect } = require("chai")

const WIDTH = 6
let totalCell = WIDTH * WIDTH

describe('user action associate with keyboard succesfully', () => {
    beforeEach(() => {
        cy.visit("http://localhost:1234/2048-expert/index.html")
    })



    it('test up', () => {
        cy.get('body').trigger('keyup', { keyCode: 40 })
            cy.get('.game-board')
            .children('.cell')
            .contains(/[2|4]/g)
            .invoke(index)
            .contains(/^[1-5]/g)
    })


})