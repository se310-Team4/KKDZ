const NUM_ROWS = 8
const NUM_COLS = 5

function start() {
    createGrid()
}

// fill the grid with empty tiles
function createGrid() {
    const grid = document.getElementById('grid')
    for (let i = 0; i < NUM_ROWS; i++) {
        for (let j = 0; j < NUM_COLS; j++) {
            grid.appendChild(getTile(i, j))
        }
    }
}

// creates and returns an empty tile
function getTile(i, j) {
    const tile = document.createElement('div')
    tile.classList.add('tile')
    // HTML helpers will automatically convert camel case to dashes
    // hyphens are not allowed in JavScript names
    tile.dataset.rowIndex = i
    tile.dataset.colIndex = j
    tile.dataset.type = "empty"
    return tile
}

start()