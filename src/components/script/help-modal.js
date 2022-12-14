/** usage: <core-modal>Window contents</core-modal> */
class Modal extends HTMLElement {
  constructor() {
    super();

    if (this.getAttribute("custom") !== null) {

      /**Inisialize scores */
      document.getElementById("best-game-score-capidle").innerHTML = "0";
      document.getElementById("best-game-score-liedle").innerHTML = "0";
      document.getElementById("best-game-score-2048").innerHTML = "0";
      document.getElementById("best-game-score-tactong").innerHTML = "0";
      document.getElementById("best-game-score-poketiles").innerHTML = "0";

      if(localStorage.getItem("bestScoreCapidle") != null){
        document.getElementById("best-game-score-capidle").innerHTML = localStorage.getItem("bestScoreCapidle");
      }

      if(localStorage.getItem("bestScoreLiedle") != null){
        document.getElementById("best-game-score-liedle").innerHTML = localStorage.getItem("bestScoreLiedle");
      }

      if(localStorage.getItem("bestScore2048") != null){
        document.getElementById("best-game-score-2048").innerHTML = localStorage.getItem("bestScore2048");
      }

      if(localStorage.getItem("bestScoreTactong") != null){
        document.getElementById("best-game-score-tactong").innerHTML = localStorage.getItem("bestScoreTactong");
      }

      if(localStorage.getItem("bestScorePokezzle") != null){
        document.getElementById("best-game-score-poketiles").innerHTML = localStorage.getItem("bestScorePokezzle");
      }
    }

    this.innerHTML = `
			<div>
				<div id="modal">
					<div class="modal-window">
          <span class="close-btn" id="close-btn">&times;</span>
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
    const shareBtn = document.getElementById("share-btn");
    const shareModal = document.getElementById("share-modal");
    const closeBtn = document.getElementById("close-btn");

    function onKeyDownInModal(e) {
      if (e.key === "Escape") closeModal();
    }

    function closeModal() {
      modal.style.display = "none";
      document.removeEventListener("keydown", onKeyDownInModal);
      localStorage["seen-modal-" + location] = true;
      document.dispatchEvent(new Event("modal-closed"));
      closeShareModal();
    }

    function closeShareModal(){
      if(shareModal !=null){
        shareModal.style.display = "none";
      }
      document.removeEventListener("keydown", onKeyDownInModal);
      localStorage["seen-modal-" + location] = true;
      document.dispatchEvent(new Event("modal-closed"));
    }


    function openModal() {
      modal.style.display = "block";
      document.addEventListener("keydown", onKeyDownInModal);
      document.dispatchEvent(new Event("modal-opened"));
    }

    function openSharePop(){
      if(shareModal != null){
        shareModal.style.display = "block";
      }
      document.addEventListener("keydown", onKeyDownInModal);
      document.dispatchEvent(new Event("modal-opened"));
    }
    

    closeBtn.onclick = closeModal;
    helpBtn.onclick = openModal;
    if (shareBtn != null){
      shareBtn.onclick = openSharePop;
    }

    // close window if they user clicks outside of the window
    window.onclick = function (event) {
      if (event.target == modal) closeModal();
    };

    // hide the modals by default
    modal.style.display = "none";
    if(shareModal != null){
      shareModal.style.display = "none";
    }


    // if user havent seen the modal, show the modal once the window is open
    // homepage uses custom modal, and it does not require modal to appear for first time user
    if (this.getAttribute("custom") === null) {
      if ((!localStorage["seen-modal-" + location])) {openModal();}
      else{closeModal();}
    }
  }
}

window.customElements.define("core-modal", Modal);
