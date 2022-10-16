// GLOBAL VARIABLES
const POKEMON_SPECIES_URL = `https://pokeapi.co/api/v2/pokemon-species?limit=100000&offset=0`;
let pokemonData = null;

const BETWEEN_ROUND_DELAY_MS = 700;
const MAX_TIME_PER_ROUND_S = 10;
const MIN_TIME_PER_ROUND_S = 4;

const NUM_TILES = 4;
let numTilesFilled = 0;

let roundCount= 0;
let currentPokeImgDivArr = [];

// UI Elements
const currentScoreElm = document.getElementById('current-score');
const bestScoreElm = document.getElementById('best-score');


// fetches pokemon data from pokeapi
const fetchPokemonSpeciesDataAsync = () => {
    const fetchPromise = fetch(POKEMON_SPECIES_URL);
    return fetchPromise.then(res => res.json());
}

const generateIndexArr = (length) => {
    const indexArr = [];
    for (let i=1; i<=length; i++) {
        indexArr.push(i);
    }
    return indexArr;
}

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

// event handler
const handleOnDragStart = (ev) => {
    ev.dataTransfer.setData("text/plain", ev.target.id);
};

// event handler
const handleOnDragOver = (ev) => {
    ev.preventDefault();
};

// event handler
const handleOnDrop = (ev) => {
    if (ev.dataTransfer !== null) {
        const pokeTitleDivElm = ev.target;

        const pokeImgDivElmId = ev.dataTransfer.getData("text/plain");
        const pokeImgDivElm = document.getElementById(pokeImgDivElmId);

        if (!tileMatch(pokeTitleDivElm,pokeImgDivElm)) {
            handleWrongTileMatch(pokeImgDivElm);
            return;
        }

        showPokeImg(pokeImgDivElm);
        pokeTitleDivElm.innerHTML = "";
        pokeImgDivElm.draggable = false;

        pokeTitleDivElm.appendChild(pokeImgDivElm);
        numTilesFilled++;

        if (roundComplete()) {
            updateScore();
            removeTileOutlines();
            // resets for new game
            setTimeout(startNextRound,BETWEEN_ROUND_DELAY_MS);
        }
    }    
}

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

const persistBestScore = (score) => {
    localStorage.setItem('bestScorePokezzle', score);
}

const getPersistentBestScore = () => {
    return localStorage.getItem('bestScorePokezzle');
}

const showPokeImg = (pokeImgDivElm) => {
    pokeImgDivElm.classList.remove('hidden');
    pokeImgDivElm.classList.add('shown');
}

const hidePokeImg = (pokeImgDivElm) => {
    pokeImgDivElm.classList.remove('shown');
    pokeImgDivElm.classList.add('hidden');
}

const tileMatch = (titleDivElm,imgDivElm) => {
    const targetId = titleDivElm.id;
    const sourceId = imgDivElm.id;

    const targetPokeId = targetId.split("-")[2];
    const sourcePokeId = sourceId.split("-")[2];

    return targetPokeId === sourcePokeId;
}

const handleWrongTileMatch = (imgDivElm) => {
    imgDivElm.classList.add('shake');
    imgDivElm.draggable = false;
    setTimeout(() => {
        imgDivElm.classList.remove('shake');
        imgDivElm.draggable = true;
    },500);
}

const roundComplete = () => {
    return numTilesFilled === NUM_TILES;
}

const removeTileOutlines = () => {
    const tileTableElm = document.getElementById('poke-tile-table');
    tileTableElm.style.backgroundColor = 'rgb(120, 200, 120)';
    currentPokeImgDivArr.forEach(div => {
        div.style.outline = 'none';
    });
}

const startNextRound = () => {
    clearCurrentRound();
    fetchPokemonSpeciesDataAsync().then(data => {
        numTilesFilled = 0;
        roundCount++;
        const currentPokeIds = [];

        startTimer();

        const tableElm = document.getElementById('poke-tile-table');
        for (let row=0; row<2; row++) {
            const tableRowElm = document.createElement('tr');
            for (let col=0; col<2; col++) {
                const tableDataElm = document.createElement('td');
            
                const randomId = Math.floor(Math.random() * data.count) + 1;
                currentPokeIds.push(randomId);

                tableDataElm.id = `poke-title-${randomId}`;
                tableDataElm.innerText = data.results[randomId-1].name.toUpperCase();
                tableDataElm.ondragover = handleOnDragOver;
                tableDataElm.ondrop = handleOnDrop;

                tableRowElm.appendChild(tableDataElm);
            }
            tableElm.appendChild(tableRowElm);
        }

        shuffleArr(currentPokeIds);

        let pokeImgDivArr = [];
        const pokeImgDivSetElm = document.getElementById('poke-img-set');
        for (let i=0; i<4; i++) {
            const randomId = currentPokeIds[i];

            const pokeImgElm = document.createElement('img');
            pokeImgElm.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${randomId}.png`;
            pokeImgElm.draggable = false;

            const pokeImgDivElm = document.createElement('div');
            pokeImgDivElm.id = `poke-img-${randomId}`;
            pokeImgDivElm.classList.add('poke-img');
            
            pokeImgDivElm.style.outline = '1px solid black';
            pokeImgDivElm.draggable = true;
            pokeImgDivElm.ondragstart = handleOnDragStart;

            pokeImgDivElm.appendChild(pokeImgElm);
            hidePokeImg(pokeImgDivElm);

            pokeImgDivSetElm.appendChild(pokeImgDivElm);
            
            pokeImgDivArr.push(pokeImgDivElm);
        }
        currentPokeImgDivArr = pokeImgDivArr;
    });
}

const clearCurrentRound = () => {
    const tileTableElm = document.getElementById('poke-tile-table');
    tileTableElm.style.backgroundColor = 'white';

    const tileSet = document.getElementById('poke-tile-table');
    const imgSet = document.getElementById('poke-img-set');
    tileSet.innerHTML = "";
    imgSet.innerHTML = "";
}

const startTimer = () => {
    let currentRoundCount = roundCount;
    setTimeout(() => {
        if(currentRoundCount === roundCount && numTilesFilled < NUM_TILES) {
            setPreGameState();
        }
    }, getTimeForCurrentRound()*1000);
    startTimerAnimation();
}

const startTimerAnimation = () => {
    const timeTrackerElm = document.getElementById('time-tracker');
    const fillElm = document.createElement('div');

    fillElm.classList.add('fill');
    fillElm.style.animation = `decrease-fill ${getTimeForCurrentRound()}s linear`;

    timeTrackerElm.innerHTML = "";
    timeTrackerElm.appendChild(fillElm);
}

const blurGameBoard = () => {
    const game = document.getElementById('game');
    game.style.filter = 'blur(4px)';
    game.style.pointerEvents = 'none';
}

const unblurGameBoard = () => {
    const game = document.getElementById('game');
    game.style.filter = 'blur(0)';
    game.style.pointerEvents = 'all';
}

const docClickListener = () => {
    if (roundCount === 0) {
        document.removeEventListener('mouseup', docClickListener);
        setInGameState();
        startNextRound();
    }
}

const showClickToPlay = () => {
    const preGameModalElm = document.createElement('div');
    preGameModalElm.id = 'pre-game-modal'
    preGameModalElm.classList.add(preGameModalElm.id);

    const contentElm = document.createElement('div');
    contentElm.classList.add('content');
    contentElm.innerText = "Click Anywhere To Start";

    preGameModalElm.appendChild(contentElm);
    document.body.appendChild(preGameModalElm);
}

const removeClickToPlay = () => {
    document.getElementById('pre-game-modal').remove();
}

const setPreGameState = () => {
    roundCount = 0;
    numTilesFilled = 0;
    
    blurGameBoard();
    document.addEventListener('mouseup', docClickListener);
    showClickToPlay();
}

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

setPreGameState();
updateScore();

