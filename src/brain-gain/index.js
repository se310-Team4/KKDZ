function capidleDetails() {
  document.getElementById("title-img").style.opacity = "0%";
  document.getElementById("capidle-details").style.opacity = "100%";
}

function liedleDetails() {
  document.getElementById("title-img").style.opacity = "0%";
  document.getElementById("liedle-details").style.opacity = "100%";
}

function a2048ExpertDetails() {
  document.getElementById("title-img").style.opacity = "0%";
  document.getElementById("a2048expert-details").style.opacity = "100%";
}

function tactongDetails() {
  document.getElementById("title-img").style.opacity = "0%";
  document.getElementById("tactong-details").style.opacity = "100%";
}

function titleShow() {
  document.getElementById("title-img").style.opacity = "100%";
  document.getElementById("capidle-details").style.opacity = "0%";
  document.getElementById("liedle-details").style.opacity = "0%";
  document.getElementById("a2048expert-details").style.opacity = "0%";
  document.getElementById("tactong-details").style.opacity = "0%";
}

window.transitionToPage = function (href) {
  document.querySelector('body').style.opacity = 0
  setTimeout(function () {
    window.location.href = href
  }, 500)
}

document.addEventListener('DOMContentLoaded', function(event) {
  document.querySelector('body').style.opacity = 1
})