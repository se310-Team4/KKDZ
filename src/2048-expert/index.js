const gameBoard = document.querySelector('.game-board')
const currentScoreDisplay = document.getElementById('current-score')
const bestScoreDisplay = document.getElementById('best-score')
const WIDTH = 6
let cells = []
let totalCell = WIDTH * WIDTH
let currentScore = 0
let bestScore = (getBestScore() === null) ? 0 : getBestScore()

// create the game board
function createBoard() {
    for (let i = 0; i < totalCell; i++) {
        let cell = document.createElement('div')
        cell.classList.add("cell")
        cell.setAttribute('data-index', i)
        cells.innerHTML = 0
        gameBoard.appendChild(cell)
        cells.push(cell)
    }
    // intial 2 tiles at random place
    generateNewTile()
    generateNewTile()
    bestScoreDisplay.innerHTML = bestScore
}


// generate number 2 or 4 at a random cell
function generateNewTile() {
    const rand = Math.floor(Math.random() * cells.length)
    if (cells[rand].innerHTML == 0) {
        cells[rand].innerHTML = randomNumTwoOrFour()
    } else {// if a cell is already have a number then find a new tile
        //check lost if all cells are not empty
        checkLost()
        generateNewTile()
    }
}

// generate number 2 or 4 randomlly
function randomNumTwoOrFour() {
    let rand = Math.random()
    return (rand > 0.5) ? 4 : 2
}



// User actions
// Move vertical
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

// Merge Cells and check Win state when merge are all set
// merge cells when user acts in right or left direction 
function mergeHorizontal() {
    for (let i = 0; i < WIDTH; i++) {
        for (let j = 0; j < (WIDTH - 1); j++) {
            let index = (WIDTH * i) + j
            if (cells[index].innerHTML === cells[index + 1].innerHTML) {
                let merge = parseInt(cells[index].innerHTML) + parseInt(cells[index + 1].innerHTML)
                cells[index].innerHTML = merge
                cells[index + 1].innerHTML = 0
                updateScore(merge)
            }
        }
    }
    checkWin()
}

// merge cells when user acts in up and down direction
function mergeVertical() {
    for (let i = 0; i < WIDTH; i++) {
        for (let j = 0; j < WIDTH - 1; j++) {
            let index = (j * WIDTH) + i
            if (cells[index].innerHTML === cells[index + WIDTH].innerHTML) {
                let merge = parseInt(cells[index].innerHTML) + parseInt(cells[index + WIDTH].innerHTML)
                cells[index].innerHTML = merge
                cells[index + WIDTH].innerHTML = 0
                updateScore(merge)
            }
        }
    }
    checkWin()
}


// update the current score
function updateScore(bonus) {
    currentScore += bonus
    currentScoreDisplay.innerHTML = currentScore
    if (currentScore > parseInt(bestScore)) {// if current score is greater then update best score
        setBestScore(currentScore)
        bestScoreDisplay.innerHTML = currentScore
    }
}

// bind user action with key
function control(e) {
    if (e.keyCode === 37) {
        keyUpLeft()
    } else if (e.keyCode === 38) {
        keyUpUp()
    } else if (e.keyCode === 39) {
        keyUpRight()
    } else if (e.keyCode === 40) {
        keyUpDown()
    } else if (e.keyCode === 16) {// when enter key is up start a new game
        newGame()
    }
}

document.addEventListener('keyup', control)

function keyUpLeft() {
    moveLeft()
    mergeHorizontal()
    moveLeft()
    generateNewTile()
    generateNewTile()

}

function keyUpRight() {
    moveRight()
    mergeHorizontal()
    moveRight()
    generateNewTile()
    generateNewTile()
}

function keyUpUp() {
    moveUp()
    mergeVertical()
    moveUp()
    generateNewTile()
    generateNewTile()
}

function keyUpDown() {
    moveDown()
    mergeVertical()
    moveDown()
    generateNewTile()
    generateNewTile()
}

// Check game status
// check Win condition when 2048 is generated
function checkWin() {
    for (let i = 0; i < totalCell; i++) {
        if (cells[i].innerHTML == 2048) {
            alert("\t\t You win! \n Your score is " + currentScore)
            newGame()
        }
    }
} 

// Check Lost
function checkLost() {
    let numEmptyCells = 0 
    for (let i = 0; i < totalCell; i++) {
        if (cells[i].innerHTML == 0) {
            numEmptyCells++
        }
    }
    if (numEmptyCells == 0) {
        alert("\t\t You Lost\n Your score is " + currentScore)
        newGame()
    }
} 

// function start new game
function newGame() {
    clearBoard()
    generateNewTile()
    generateNewTile()
}

// clear Board
function clearBoard() {
    cells.forEach(cell => cell.innerHTML = "")
    currentScore = 0
    currentScoreDisplay.innerHTML = 0
}

// intialize board
createBoard()


// clear board and start a new game when onclick new game button
const newBtn = document.getElementById('new-btn')
newBtn.onclick = function () {
    newGame()
}