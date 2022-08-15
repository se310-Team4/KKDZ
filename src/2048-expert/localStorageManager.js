function setBestScore(Score) {
    localStorage.setItem("BestScore", Score)
}

function getBestScore(){
    return localStorage.getItem("BestScore")
}