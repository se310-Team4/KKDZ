describe('test score intially display correctly', () => {
    beforeEach(() => {
        cy.visit("http://localhost:1234/2048-expert/index.html");
    })

    it('test lost', () => {
        cy.get('body').trigger('keyup', { keyCode: 40 })
        cy.get('body').trigger('keyup', { keyCode: 40 })
        cy.get('body').trigger('keyup', { keyCode: 40 })
        cy.get('body').trigger('keyup', { keyCode: 40 })
        cy.get('body').trigger('keyup', { keyCode: 40 })
        cy.get('body').trigger('keyup', { keyCode: 40 })
        cy.get('body').trigger('keyup', { keyCode: 40 })
        cy.get('body').trigger('keyup', { keyCode: 40 })
        cy.get('body').trigger('keyup', { keyCode: 40 })
        cy.get('body').trigger('keyup', { keyCode: 40 })
        cy.get('body').trigger('keyup', { keyCode: 40 })
        cy.get('body').trigger('keyup', { keyCode: 40 })
        cy.get('body').trigger('keyup', { keyCode: 40 })
        cy.get('body').trigger('keyup', { keyCode: 40 })
        cy.get('body').trigger('keyup', { keyCode: 40 })
        cy.get('body').trigger('keyup', { keyCode: 40 })
        cy.get('body').trigger('keyup', { keyCode: 40 })
        cy.get('body').trigger('keyup', { keyCode: 40 })
        cy.get('body').trigger('keyup', { keyCode: 40 })
        cy.get('body').trigger('keyup', { keyCode: 40 })
        cy.get('body').trigger('keyup', { keyCode: 40 })
        cy.get('body').trigger('keyup', { keyCode: 40 })
        cy.get('body').trigger('keyup', { keyCode: 40 })
        cy.get('body').trigger('keyup', { keyCode: 40 })
        cy.get('body').trigger('keyup', { keyCode: 40 })
        cy.get('body').trigger('keyup', { keyCode: 40 })
        cy.get('body').trigger('keyup', { keyCode: 40 })
        cy.get('body').trigger('keyup', { keyCode: 40 })
        cy.get('body').trigger('keyup', { keyCode: 40 })
        cy.get('body').trigger('keyup', { keyCode: 40 })
        cy.get('body').trigger('keyup', { keyCode: 40 })
        cy.get('body').trigger('keyup', { keyCode: 40 })
        cy.get('body').trigger('keyup', { keyCode: 40 })
        cy.get('body').trigger('keyup', { keyCode: 40 })

        cy.on('window:alert', (t) => {
            //assertions
            expect(t).to.contains('\t\t You Lost\n Your score is ');
        })
    })


    it('test Win', () => {
        cy.get('.cell').eq(0).invoke('text',1024)
        cy.get('.cell').eq(1).invoke('text',1024)

        cy.get('body').trigger('keyup', { keyCode: 37 })

        cy.on('window:alert', (t) => {
            //assertions
            expect(t).to.contains('\t\t You win! \n Your score is ');
        })

    })

})