/** usage: <core-modal>Window contents</core-modal> */
class Modal extends HTMLElement {
  constructor() {
    super();

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
    }

    function openModal() {
      modal.style.display = "block";
      document.addEventListener("keydown", onKeyDownInModal);
    }

    closeBtn.onclick = closeModal;
    helpBtn.onclick = openModal;

    // close window if they user clicks outside of the window
    window.onclick = function (event) {
      if (event.target == modal) closeModal();
    };

    // hide the help modal by defalut
    modal.style.display = "none";

    // if user havent seen the modal, show the modal once the window is open
    if (!localStorage["seen-modal-" + location]) openModal();
  }
}

window.customElements.define("core-modal", Modal);
