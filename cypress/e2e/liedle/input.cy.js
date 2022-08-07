const word = 'stare'
const NUM_ROWS = 8
const NUM_COLS = 5

describe('characters', () => {
	beforeEach(() => {
		cy.visit("http://localhost:1234/liedle/index.html");
	})

	it('test letter', () => {
		cy.get('body').type('s')

		cy.get(`[data-col-index=0][data-row-index=0].tile`).first()
			.should('have.text', 'S')
			.should('have.attr', 'data-type', 'full')
	})

	it('test five-letter word', () => {
		cy.get('body').type(word)

		for (let i = 0; i < word.length; i++) {
			cy.get(`[data-col-index="${i}"][data-row-index=0].tile`).first()
				.should('have.text', word.charAt(i).toUpperCase())
		}
	})

	it('test capital letters', () => {
		cy.get('body').type('S')

		cy.get(`[data-col-index=0][data-row-index=0].tile`).first()
			.should('have.text', 'S')
	})

	it('test overflowing word', () => {
		cy.get('body').type(word + 's')

		cy.get(`[data-col-index="${NUM_COLS - 1}"][data-row-index=0].tile`).first()
			.should('have.text', 'E')
	})

	it('test non-english characters', () => {
		cy.get('body').type('1@-.?é')

		cy.get(`[data-col-index=0][data-row-index=0].tile`).first()
			.should('have.text', '')
	})
})

describe('backspace', () => {
	beforeEach(() => {
		cy.visit("http://localhost:1234/liedle/index.html");
	})

	it('test backspace after letter', () => {
		cy.get('body').type('s').type('{backspace}')

		cy.get(`[data-col-index=0][data-row-index=0].tile`).first()
			.should('have.text', '')
			.should('have.attr', 'data-type', 'empty')
	})

	it('test backspace after word', () => {
		cy.get('body').type(word).type('{backspace}')

		cy.get(`[data-col-index="${NUM_COLS - 1}"][data-row-index=0].tile`).first()
			.should('have.text', '')
		cy.get(`[data-col-index="${NUM_COLS - 2}"][data-row-index=0].tile`).first()
			.should('have.text', 'R')
	})

	it('test backspace after overflow', () => {
		cy.get('body').type(word + 's').type('{backspace}')

		cy.get(`[data-col-index="${NUM_COLS - 1}"][data-row-index=0].tile`).first()
			.should('have.text', '')
		cy.get(`[data-col-index="${NUM_COLS - 2}"][data-row-index=0].tile`).first()
			.should('have.text', 'R')
	})

	it('test backspace with no letters', () => {
		cy.get('body').type('{backspace}')

		cy.get(`[data-col-index=0][data-row-index=0].tile`).first()
			.should('have.text', '')
	})
})