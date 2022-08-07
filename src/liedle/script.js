const NUM_ROWS = 8
const NUM_COLS = 5
let rowIndex = 0
let colIndex = 0

function start() {
	createGrid()
	handleInput()
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

// updates a tile on the grid with a letter and styling
function updateTile(letter, i, j, type) {
	// speech marks are required when using querySelector as i & j are both numbers
	const tile = document.querySelector(`[data-col-index="${i}"][data-row-index="${j}"].tile`)
	tile.innerHTML = letter
	tile.dataset.type = type
}

// handles key presses from the user
function handleInput() {
	document.addEventListener("keydown", function onEvent(e) {
		const key = e.key
		// regex matches any lowercase or uppercase english letter
		if (key.length === 1 && e.key.match(/^[a-z]/i)) {
			handleLetter(key)
		} else if (e.key === "Enter") {
			// TODO: handleEnter()
		} else if (e.key === "Backspace") {
			handleBackspace()
		}
	})
}

// add the letter to the grid if possible
function handleLetter(letter) {
	if (colIndex > NUM_COLS - 1 || rowIndex > NUM_ROWS - 1) {
		return
	}

	updateTile(letter.toUpperCase(), colIndex, rowIndex, "full")
	colIndex++
}

// delete and reset the last tile
function handleBackspace() {
	if (colIndex === 0) {
		return
	}

	colIndex--
	updateTile("", colIndex, rowIndex, "empty")
}

start()