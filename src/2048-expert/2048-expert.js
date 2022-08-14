document.addEventListener('DOMContentLoaded', () => {
    const gameBoard = document.querySelector('.game-board')
    const WIDTH = 6
    let cells = []
    let totalCell = WIDTH * WIDTH

    // create the game board
    function createBoard() {
        for (let i = 0; i < totalCell; i++) {
            let cell = document.createElement('div')
            cell.classList.add("cell")
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
        const rand =  Math.floor(Math.random() * cells.length)
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
    //Move vertical
    function moveDown() {
        // get cells of each row and update their value
        for (let i = 0; i < 6; i++) {
            let rowOneCell = cells[i].innerHTML
            let rowTwoCell = cells[i + (WIDTH)].innerHTML
            let rowThreeCell = cells[i + (WIDTH * 2)].innerHTML
            let rowFourCell = cells[i + (WIDTH * 3)].innerHTML
            let rowFiveCell = cells[i + (WIDTH * 4)].innerHTML
            let rowSixCell = cells[i + (WIDTH * 5)].innerHTML

            // Rearrange column making no empty cell sits between cells with numbers 
            let column = [parseInt(rowOneCell), parseInt(rowTwoCell), parseInt(rowThreeCell), parseInt(rowFourCell), parseInt(rowFiveCell), parseInt(rowSixCell)]
            column = column.filter(num => num)
            let emptyCellLength = 6 - column.length
            
            let newColumn = Array(emptyCellLength).fill(0).concat(column)
                    

            cells[i].innerHTML = newColumn[0]
            cells[i + (WIDTH)].innerHTML = newColumn[1]
            cells[i + (WIDTH * 2)].innerHTML = newColumn[2]
            cells[i + (WIDTH * 3)].innerHTML = newColumn[3]
            cells[i + (WIDTH * 4)].innerHTML = newColumn[4]
            cells[i + (WIDTH * 5)].innerHTML = newColumn[5]
        }
    }

    function moveUp() {
        // get cells of each row and update their value
        for (let i = 0; i < 6; i++) {
            let rowOneCell = cells[i].innerHTML
            let rowTwoCell = cells[i + (WIDTH)].innerHTML
            let rowThreeCell = cells[i + (WIDTH * 2)].innerHTML
            let rowFourCell = cells[i + (WIDTH * 3)].innerHTML
            let rowFiveCell = cells[i + (WIDTH * 4)].innerHTML
            let rowSixCell = cells[i + (WIDTH * 5)].innerHTML

            // Rearrange column making no empty cell sits between cells with numbers 
            let column = [parseInt(rowOneCell), parseInt(rowTwoCell), parseInt(rowThreeCell), parseInt(rowFourCell), parseInt(rowFiveCell), parseInt(rowSixCell)]
            column = column.filter(num => num)
            let emptyCellLength = 6 - column.length
            
            let newColumn = column.concat(Array(emptyCellLength).fill(0))      

            cells[i].innerHTML = newColumn[0]
            cells[i + (WIDTH)].innerHTML = newColumn[1]
            cells[i + (WIDTH * 2)].innerHTML = newColumn[2]
            cells[i + (WIDTH * 3)].innerHTML = newColumn[3]
            cells[i + (WIDTH * 4)].innerHTML = newColumn[4]
            cells[i + (WIDTH * 5)].innerHTML = newColumn[5]
        }
    }
    function moveRight() {
        // get cells of each column and update their value
        for (let i = 0; i < totalCell; i += WIDTH) {
            let columnOneCell = cells[i].innerHTML
            let columnTwoCell = cells[i + 1].innerHTML
            let columnThreeCell = cells[i + 2].innerHTML
            let columnFourCell = cells[i + 3].innerHTML
            let columnFiveCell = cells[i + 4].innerHTML
            let columnSixCell = cells[i + 5].innerHTML

            // Rearrange row making no empty cell sits between cells with numbers 
            let row = [parseInt(columnOneCell), parseInt(columnTwoCell), parseInt(columnThreeCell), parseInt(columnFourCell), parseInt(columnFiveCell), parseInt(columnSixCell)]
            row = row.filter(num => num)
            let emptyCellLength = 6 - row.length

            let newRow = Array(emptyCellLength).fill(0).concat(row)
            

            cells[i].innerHTML = newRow[0]
            cells[i + 1].innerHTML = newRow[1]
            cells[i + 2].innerHTML = newRow[2]
            cells[i + 3].innerHTML = newRow[3]
            cells[i + 4].innerHTML = newRow[4]
            cells[i + 5].innerHTML = newRow[5]
        }
    }
    function moveLeft() {
        // get cells of each column and update their value
        for (let i = 0; i < totalCell; i += WIDTH) {
            let columnOneCell = cells[i].innerHTML
            let columnTwoCell = cells[i + 1].innerHTML
            let columnThreeCell = cells[i + 2].innerHTML
            let columnFourCell = cells[i + 3].innerHTML
            let columnFiveCell = cells[i + 4].innerHTML
            let columnSixCell = cells[i + 5].innerHTML

            // Rearrange row making no empty cell sits between cells with numbers 
            let row = [parseInt(columnOneCell), parseInt(columnTwoCell), parseInt(columnThreeCell), parseInt(columnFourCell), parseInt(columnFiveCell), parseInt(columnSixCell)]
            row = row.filter(num => num)
            let emptyCellLength = 6 - row.length

            let newRow = row.concat(Array(emptyCellLength).fill(0))
            

            cells[i].innerHTML = newRow[0]
            cells[i + 1].innerHTML = newRow[1]
            cells[i + 2].innerHTML = newRow[2]
            cells[i + 3].innerHTML = newRow[3]
            cells[i + 4].innerHTML = newRow[4]
            cells[i + 5].innerHTML = newRow[5]
        }
    }

    function control(e) {
        if (e.keyCode === 37) {
            keyUpLeft()
        } else if (e.keyCode === 38) {
            keyUpUp()
        } else if (e.keyCode === 39) {
            keyUpRight()
        } else if (e.keyCode === 40) {
            keyUpDown()
        } else if (e.keyCode === 16) {//when enter key is up start a new game
            newGame()
        }
    }
    
    document.addEventListener('keyup',control)

    function keyUpLeft() {
        moveLeft()
        generateNewTile()
        generateNewTile()
        moveLeft()
    }

    function keyUpRight() {
        moveRight()
        generateNewTile()
        generateNewTile()
        moveRight()
    }

    function keyUpUp() {
        moveUp()
        generateNewTile()
        generateNewTile()
        moveUp()
    }

    function keyUpDown() {
        moveDown()
        generateNewTile()
        generateNewTile()
        moveDown()
    }

    //function start new game
    function newGame() { 
        clearBoard()
        generateNewTile()
        generateNewTile()
    }

    //function clear Board
    function clearBoard() {
        cells.forEach(cell => cell.innerHTML = "") 
    }
    
    //clear board and start a new game when onclick new game button
    document.getElementById('new-btn').onclick = newGame

    //intialize board
    createBoard()

})

