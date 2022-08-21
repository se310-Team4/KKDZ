function setBestScore(score) {
  localStorage.setItem("bestScore", score);
}

function getBestScore() {
  return localStorage.getItem("bestScore");
}
