document.addEventListener('DOMContentLoaded', ()=> {
    const gameBoard = document.querySelector('.game-board')
    const WIDTH = 6
    let cells = []

    // create the game board
    function createBoard() {
        let totalCell = WIDTH * WIDTH
        for (let i = 0; i < totalCell; i++) {
            let cell = document.createElement('div')
            cells.innerHTML = 0
            gameBoard.appendChild(cell)
            cells.push(cell)
        }
        // intial 2 tiles at random place
        generateNewTile()
        generateNewTile()
    }

    // generate number 2 or 4 at a random cell
    function generateNewTile() {
        let rand = Math.floor(Math.random() * cells.length)
        if (cells[rand].innerHTML == 0) {
            cells[rand].innerHTML = randomNumTwoOrFour()
        } else {// if a cell is already have a number then find a new tile
            generateNewTile()
        }
    }

    // generate number 2 or 4 randomlly
    function randomNumTwoOrFour() {
        let rand = Math.random()
        return (rand > 0.5) ? 4 : 2
    }

    //User actions
    //Move up




    createBoard()

})

