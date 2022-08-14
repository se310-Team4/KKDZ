const modal = document.getElementById("modal")
const helpBtn = document.getElementById("help-btn")
const closeBtn = document.getElementById("close-btn")

function closeModal() {
    modal.style.display = "none"
}

function openModal() {
    modal.style.display = "block"
}

closeBtn.onclick = function () {
    closeModal()
}

helpBtn.onclick = function () {
    openModal()
}

// close window if they user clicks outside of the window
window.onclick = function (event) {
    if (event.target == modal) {
        closeModal()
    }
}