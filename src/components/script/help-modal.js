/** usage: <core-modal>Window contents</core-modal> */
class Modal extends HTMLElement {
  constructor() {
    super();

    if (this.getAttribute("custom") !== null) {
      document.getElementById("best-game-score-capidle").innerHTML = localStorage.getItem("bestScoreCapidle");
      document.getElementById("best-game-score-liedle").innerHTML = localStorage.getItem("bestScoreLiedle");
      document.getElementById("best-game-score-2048").innerHTML = localStorage.getItem("bestScore2048");
    }

    this.innerHTML = `
			<div>
				<div id="modal">
					<div class="modal-window">
						<span id="close-btn">&times;</span>
						<div>${this.innerHTML}</div>
					</div>
				</div>
			</div>
			`;

    this.registerEventListeners();
  }

  registerEventListeners() {
    const modal = document.getElementById("modal");
    const helpBtn = document.getElementById("help-btn");
    const closeBtn = document.getElementById("close-btn");

    function onKeyDownInModal(e) {
      if (e.key === "Escape") closeModal();
    }

    function closeModal() {
      modal.style.display = "none";
      document.removeEventListener("keydown", onKeyDownInModal);
      localStorage["seen-modal-" + location] = true;
      document.dispatchEvent(new Event("modal-closed"));
    }

    function openModal() {
      modal.style.display = "block";
      document.addEventListener("keydown", onKeyDownInModal);
      document.dispatchEvent(new Event("modal-opened"));
    }

    closeBtn.onclick = closeModal;
    helpBtn.onclick = openModal;

    // close window if they user clicks outside of the window
    window.onclick = function (event) {
      if (event.target == modal) closeModal();
    };

    // hide the help modal by default
    modal.style.display = "none";

    // if user havent seen the modal, show the modal once the window is open
    // homepage uses custom modal, and it does not require modal to appear for first time user
    if (this.getAttribute("custom") === null) {
      if ((!localStorage["seen-modal-" + location])) {openModal();}
      else{closeModal();}
    }
  }
}

window.customElements.define("core-modal", Modal);
