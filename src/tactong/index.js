///// CONFIG VARIABLES /////
const baseDifficulty = 1;
const patternDelay = 500;
const betweenPatternDelay = 100;

///// DOCUMENT ELEMENTS /////
const bestScoreElm = document.getElementById('best-score');
const currentScoreElm = document.getElementById('current-score');
const clickPlay = document.getElementById('clickToPlay');
const circle = document.getElementById('circle');
const quadrants = {
    red: document.getElementById('red'),
    blue: document.getElementById('blue'),
    yellow: document.getElementById('yellow'),
    green: document.getElementById('green'),
};
const hoverQuadrants = {
    red: document.getElementById('redUnder'),
    blue: document.getElementById('blueUnder'),
    yellow: document.getElementById('yellowUnder'),
    green: document.getElementById('greenUnder'),
};
const soundFrequency = {
    red: 700,
    blue: 800,
    green: 900,
    yellow: 1000,
    gameEnd: 300,
};

///// GLOBAL VARIABLES /////
let listeners = {};
let pattern = [];
let guess = [];
let gameCount = 0;
let bestScore = getBestScore() === null ? 0 : getBestScore();
let isNewGame = true;

function getRandomColor() {
    const colors = Object.keys(quadrants);
    return colors[Math.floor(Math.random() * colors.length)];
}

function generateRandomPattern(numSteps) {
    const pattern = [];
    for (let i = 0; i < numSteps; i++)
        pattern.push(getRandomColor());
    return pattern;
}

function clearBoard() {
    for (const quadrant of Object.values(quadrants))
        quadrant.style.display = 'none';
}

function showBoard() {
    for (const quadrant of Object.values(quadrants))
        quadrant.style.display = 'block';
}

function hideQuadrant(quadrant) {
    quadrant.style.display = 'none';
}

function showQuadrant(quadrant) {
    quadrant.style.display = 'block';
}

function playPattern() {
    // play the pattern in order showing each step fro patternDelay ms, and clearing the board for betweenPatternDelay time
    return new Promise((resolve, reject) => {
        clearBoard();
        let i = 0;
        const interval = setInterval(() => {
            if (i >= pattern.length) {
                clearInterval(interval);
                resolve();
            } else {
                quadrants[pattern[i]].style.display = 'block';
                setTimeout(() => {
                    quadrants[pattern[i]].style.display = 'none';
                    i++;
                }, patternDelay);
                playSound(pattern[i], 200);
            }
        }, patternDelay + betweenPatternDelay);
    });
}

function playSound(frequency, playTime) {
    const context = new AudioContext();
    const oscillator = context.createOscillator();
    oscillator.type = "sine";
    oscillator.frequency.value = soundFrequency[frequency];
    oscillator.connect(context.destination);
    oscillator.start();
    setTimeout(() => {
        oscillator.stop();
    }, playTime);
}

function registerClick(color) {
    playSound(color, 200);
    guess.push(color);
    checkEnd();
}

function checkEnd() {
    if (guess.length === pattern.length) {
        if (guess.join('') === pattern.join('')) {
            startNextGame();
        } else {
            endGame();
        }
    }
}

function endGame() {
    isNewGame = true;
    gameCount = 0;
    pattern = [];
    guess = [];
    showBoard();
    circle.classList.add('disableCircle');
    clickPlay.style.display = 'block';
    stopHoverListeners();
    updateScore();
    playSound('gameEnd', 300);
    setTimeout(() => document.addEventListener('mouseup', docClickListener), 200);
}

function updateScore() {
    if (gameCount > bestScore) {
        setBestScore(gameCount);
        bestScore = gameCount;
    }
    bestScoreElm.innerText = bestScore;
    currentScoreElm.innerText = gameCount;
}

function startNextGame() {
    stopHoverListeners();
    isNewGame ? isNewGame = false : gameCount++;
    updateScore();
    guess = [];
    pattern = generateRandomPattern(gameCount+baseDifficulty);
    circle.classList.remove('disableCircle');
    clickPlay.style.display = 'none';
    playPattern().then(() => {
        startHoverListeners();
    })
}

function restartGame() {
    gameCount = 0;
    updateScore();
    startNextGame();
}

function startAnimation() {
    clearBoard();
    let checker = true;
    const interval = setInterval(() => {
        if (checker) {
            quadrants['red'].style.display = 'block';
            quadrants['yellow'].style.display = 'block';
            quadrants['blue'].style.display = 'none';
            quadrants['green'].style.display = 'none';
        } else {
            quadrants['red'].style.display = 'none';
            quadrants['yellow'].style.display = 'none';
            quadrants['blue'].style.display = 'block';
            quadrants['green'].style.display = 'block';
        }
        checker = !checker;
    }, 1000);
    listeners['animation'] = interval;
}

function stopAnimation() {
    clearInterval(listeners['animation']);
}

function startHoverListeners() {
    // under quadrants sit under the colored quadrants and are used to detect when the mouse is hovering over a quadrant
    for (const color of Object.keys(quadrants)) {
        const quadrant = quadrants[color];
        const underQuadrant = hoverQuadrants[color];

        listeners['mouseenter' + color] = showQuadrant.bind(null, quadrant);
        listeners['mouseleave' + color] = hideQuadrant.bind(null, quadrant);
        listeners['mouseup' + color] = registerClick.bind(null, color);

        underQuadrant.addEventListener('mouseenter', listeners['mouseenter' + color]);
        quadrant.addEventListener('mouseleave', listeners['mouseleave' + color]);
        quadrant.addEventListener('mouseup', listeners['mouseup' + color]);
    }
}

function stopHoverListeners() {
    for (const color of Object.keys(quadrants)) {
        const quadrant = quadrants[color];
        const underQuadrant = hoverQuadrants[color];

        underQuadrant.removeEventListener('mouseenter', listeners['mouseenter' + color]);
        quadrant.removeEventListener('mouseleave', listeners['mouseleave' + color]);
        quadrant.removeEventListener('mouseup', listeners['mouseup' + color]);
    }
}

function setBestScore(score) {
    localStorage.setItem("bestScoreTactong", score);
}

function getBestScore() {
    return localStorage.getItem("bestScoreTactong");
}

function docClickListener() {
    if (gameCount === 0) {
        startNextGame();
        document.removeEventListener('mouseup', docClickListener);
    }
}
document.addEventListener('mouseup', docClickListener);
updateScore();