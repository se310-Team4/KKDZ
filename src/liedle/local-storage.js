function setBestScore(score) {
  localStorage.setItem("bestScoreLiedle", score);
}

function getBestScore() {
  return localStorage.getItem("bestScoreLiedle");
}
