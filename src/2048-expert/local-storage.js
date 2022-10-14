function setBestScore(score) {
  localStorage.setItem("bestScore2048", score);
}

function getBestScore() {
  return localStorage.getItem("bestScore2048");
}
