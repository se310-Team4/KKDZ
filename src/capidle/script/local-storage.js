function setBestScore(score) {
  localStorage.setItem("bestScoreCapidle", score);
}

function getBestScore() {
  return localStorage.getItem("bestScoreCapidle");
}
