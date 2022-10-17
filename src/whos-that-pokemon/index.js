// GLOBAL VARIABLES
const POKEMON_SPECIES_URL = `https://pokeapi.co/api/v2/pokemon-species?limit=100000&offset=0`;

const BETWEEN_ROUND_DELAY_MS = 700;
const MAX_TIME_PER_ROUND_S = 10;
const MIN_TIME_PER_ROUND_S = 4;
const NUM_TILES = 4;

let pokemonData = null;
let numTilesFilled = 0;
let roundCount= 0;
let currentTileElmArr = [];

// UI Elements
const currentScoreElm = document.getElementById('current-score');
const bestScoreElm = document.getElementById('best-score');
const targetGridElm = document.getElementById('poke-tile-table');
const tileContainerElm = document.getElementById('poke-img-set');
const timeTrackerElm = document.getElementById('time-tracker');
const gameElm = document.getElementById('game');

// fetches data from pokeapi
const fetchPokemonSpeciesDataAsync = async () => {
    const res = await fetch(POKEMON_SPECIES_URL);
    const data = await res.json();
    return data;
}

// initializes in-game pokemon data
const initPokemonData = async () => {
    const data = await fetchPokemonSpeciesDataAsync();
    pokemonData = data.results.map((pokemon,index) => {
        return {
            name: pokemon.name,
            id: index+1
        };
    });
}

// creates an array containing values from 1 to length
const generateIndexArr = (length) => {
    const indexArr = [];
    for (let i=1; i<=length; i++) {
        indexArr.push(i);
    }
    return indexArr;
}

// shuffles the positions of elements in the given array
const shuffleArr = (arr) => {
    let currentIndex = arr.length,  randomIndex;
  
    // While there remain elements to shuffle.
    while (currentIndex != 0) {
  
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [arr[currentIndex], arr[randomIndex]] = [
        arr[randomIndex], arr[currentIndex]];
    }
    return arr;
  }

// event handler for when dragging tiles
const handleOnDragStart = (ev) => {
    ev.dataTransfer.setData("text/plain", ev.target.id);
};

// event handler for when a tile is placed over a target
const handleOnDragOver = (ev) => {
    ev.preventDefault();
};

// event handler for when a tile is released on top of a target
const handleOnDrop = (ev) => {
    if (ev.dataTransfer !== null) {
        const targetElm = ev.target;

        const tileElmId = ev.dataTransfer.getData("text/plain");
        const tileElm = document.getElementById(tileElmId);

        if (!targetAndTileMatch(targetElm,tileElm)) {
            handleIncorrectMatch(tileElm);
            return;
        }
        else {
            handleCorrectMatch(targetElm,tileElm);
        }

        if (roundComplete()) {
            updateScore();
            removeTileOutlines();
            // resets for new game
            setTimeout(startNextRound,BETWEEN_ROUND_DELAY_MS);
        }
    }    
}

// updates the current score and best score
const updateScore = () => {
    const currentScore = roundCount;
    let bestScore = getPersistentBestScore();

    if (currentScore > bestScore) {
        bestScore = currentScore;
        persistBestScore(bestScore);
    }
    currentScoreElm.innerText = currentScore;
    bestScoreElm.innerText = bestScore;
}

// persists the best score to local storage
const persistBestScore = (score) => {
    localStorage.setItem('bestScorePokezzle', score);
}

// retrieves the best score from local storage
const getPersistentBestScore = () => {
    return localStorage.getItem('bestScorePokezzle');
}

// displays the actual pokemon on the tile
const removeSilhouette = (tileElm) => {
    tileElm.classList.remove('hidden');
    tileElm.classList.add('shown');
}

// displays the sillhoutte of the pokemon on the tile
const addSilhouette = (tileElm) => {
    tileElm.classList.remove('shown');
    tileElm.classList.add('hidden');
}

// determines whether the provided target and tile are for the same pokemon
const targetAndTileMatch = (targetElm,tileElm) => {
    const targetId = targetElm.id;
    const tileId = tileElm.id;

    const targetPokemonId = targetId.split("-")[2];
    const tilePokemonId = tileId.split("-")[2];

    return targetPokemonId === tilePokemonId;
}

// performs all necessary work for an incorrect tile match
const handleIncorrectMatch = (tileElm) => {
    const pokemonId = tileElm.id.split("-")[2];
    playPokemonCryAudio(pokemonId, false);

    tileElm.classList.add('shake');
    tileElm.draggable = false;
    setTimeout(() => {
        tileElm.classList.remove('shake');
        tileElm.draggable = true;
    },500);
}

// performs all necessary work for a correct tile match
const handleCorrectMatch = (targetElm,tileElm) => {
    removeSilhouette(tileElm);
    targetElm.innerHTML = "";
    tileElm.draggable = false;

    targetElm.appendChild(tileElm);
    playPokemonNotificationAudio(false);
    numTilesFilled++;
}

// determines whether the current round is complete
const roundComplete = () => {
    return numTilesFilled === NUM_TILES;
}

// removes the outlines from all the tile elements
const removeTileOutlines = () => {
    targetGridElm.style.backgroundColor = 'rgb(120, 200, 120)';
    currentTileElmArr.forEach(div => {
        div.style.outline = 'none';
    });
}

// starts the next round of the game
const startNextRound = () => {
    // clears the target grid and tile container of current round
    clearTargetGridAndTileContainer();

    numTilesFilled = 0;
    roundCount++;

    // setup targets and tiles for current pokemon
    const pokemonIdArr = generatePokemonIdArr(pokemonData.length);
    setupTargetGrid(pokemonIdArr);
    cachePokemonAudio(pokemonIdArr);
    shuffleArr(pokemonIdArr);
    setupTileContainer(pokemonIdArr);

    // start countdown for time tracker
    startTimer();
}

// creates an array of ids for the pokemon of the current round
const generatePokemonIdArr = (numTotalPokemon) => {
    const indexArr = generateIndexArr(numTotalPokemon);
    const pokemonIdArr = shuffleArr(indexArr).slice(0,NUM_TILES);
    return pokemonIdArr;
}

// populates the target grid with new target pokemon names
const setupTargetGrid = (pokemonIdArr) => {
    for (let row=0; row<2; row++) {
        const targetRowElm = document.createElement('tr');
        for (let col=0; col<2; col++) {
            const targetCellElm = document.createElement('td');
        
            const randomId = pokemonIdArr[row*2 + col];

            targetCellElm.id = `poke-title-${randomId}`;
            targetCellElm.innerText = pokemonData[randomId-1].name.toUpperCase();
            targetCellElm.ondragover = handleOnDragOver;
            targetCellElm.ondrop = handleOnDrop;

            targetRowElm.appendChild(targetCellElm);
        }
        targetGridElm.appendChild(targetRowElm);
    }
}

// populates the tile container with new pokemon tiles
const setupTileContainer = (pokemonIdArr) => {
    let tileElmArr = [];
    for (let i=0; i<4; i++) {
        const randomId = pokemonIdArr[i];

        const tileImgElm = document.createElement('img');
        tileImgElm.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${randomId}.png`;
        tileImgElm.draggable = false;

        const tileElm = document.createElement('div');
        tileElm.id = `poke-img-${randomId}`;
        tileElm.classList.add('poke-img');
        
        tileElm.style.outline = '1px solid black';
        tileElm.draggable = true;
        tileElm.ondragstart = handleOnDragStart;

        tileElm.appendChild(tileImgElm);
        addSilhouette(tileElm);

        tileContainerElm.appendChild(tileElm);
        
        tileElmArr.push(tileElm);
    }
    currentTileElmArr = tileElmArr;
}

// clears the contents of the target grid and tile container
const clearTargetGridAndTileContainer = () => {
    targetGridElm.style.backgroundColor = 'white';
    targetGridElm.innerHTML = "";
    tileContainerElm.innerHTML = "";
}

// starts the timer and its corresponding animation
const startTimer = () => {
    let currentRoundCount = roundCount;
    setTimeout(() => {
        if(currentRoundCount === roundCount && numTilesFilled < NUM_TILES) {
            setPreGameState();
        }
    }, getTimeForCurrentRound()*1000);
    startTimerAnimation();
}

// creates and starts the timer animation
const startTimerAnimation = () => {
    const fillElm = document.createElement('div');

    fillElm.classList.add('fill');
    fillElm.style.animation = `decrease-fill ${getTimeForCurrentRound()}s linear`;

    timeTrackerElm.innerHTML = "";
    timeTrackerElm.appendChild(fillElm);
}

// adds blur to the game board
const blurGameBoard = () => {
    gameElm.style.filter = 'blur(4px)';
    gameElm.style.pointerEvents = 'none';
}

// removes blur from the game board
const unblurGameBoard = () => {
    gameElm.style.filter = 'blur(0)';
    gameElm.style.pointerEvents = 'all';
}

// adds a click event listener to the page
const docClickListener = () => {
    if (roundCount === 0 && pokemonData !== null) {
        document.removeEventListener('mouseup', docClickListener);
        setInGameState();
        startNextRound();
    }
}

// displays the "click to play" modal
const showClickToPlay = () => {
    const preGameModalElm = document.createElement('div');
    preGameModalElm.id = 'pre-game-modal'
    preGameModalElm.classList.add(preGameModalElm.id);

    const modalContentElm = document.createElement('div');
    modalContentElm.classList.add('content');
    modalContentElm.innerText = "Click Anywhere To Start";

    preGameModalElm.appendChild(modalContentElm);
    document.body.appendChild(preGameModalElm);
}

// removes the "click to play" modal
const removeClickToPlay = () => {
    const preGameModalElm = document.getElementById('pre-game-modal');
    preGameModalElm.remove();
}

// sets the page up to be ready to start a new game
const setPreGameState = () => {
    roundCount = 0;
    numTilesFilled = 0;
    
    blurGameBoard();
    document.addEventListener('mouseup', docClickListener);
    showClickToPlay();
}

// sets the page up to be in the start of a new game
const setInGameState = () => {
    updateScore()
    unblurGameBoard();
    removeClickToPlay();
}

// calculates and returns the provided time for the current round
const getTimeForCurrentRound = () => {
    const expectedTime = MAX_TIME_PER_ROUND_S - 1.5*(roundCount-1);
    const actualTime = expectedTime < MIN_TIME_PER_ROUND_S ? MIN_TIME_PER_ROUND_S : expectedTime;
    return actualTime;
}

// plays the cry audio of the pokemon of the specified id
const playPokemonCryAudio = (pokemonId,isMuted) => {
    const pokemonName = pokemonData[pokemonId-1].name;
    const audio = new Audio(`https://play.pokemonshowdown.com/audio/cries/${pokemonName}.mp3`);
    audio.muted = isMuted;
    audio.play();
}

// caches all the pokemon audio used for the current round
const cachePokemonAudio = (pokemonIdArr) => {
    pokemonIdArr.forEach(pokemonId => {
        playPokemonCryAudio(pokemonId,true);
    });
    playPokemonNotificationAudio(true);
}

// plays the pokemon notification audio
const playPokemonNotificationAudio = (isMuted) => {
    const audio = new Audio(`https://play.pokemonshowdown.com/audio/notification.wav`);
    audio.muted = isMuted;
    audio.play();
}

// caches all pokemon images with ids 1 to {numTotalPokemon}
const cachePokemonSprites = (numTotalPokemon) => {
    for (let i=1; i<=numTotalPokemon; i++) {
        const imgElm = document.createElement('img');
        imgElm.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${i}.png`;
    }
}

cachePokemonSprites(1000);
initPokemonData();

setPreGameState();
updateScore();
