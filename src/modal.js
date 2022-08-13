/** usage: <core-modal>Window contents</core-modal> */
class Modal extends HTMLElement {
	constructor() {
		super();

		// if you use `<core-modal custom>`, this component does nothing
		if (this.getAttribute("custom") !== null) return;

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
	}
}

window.customElements.define("core-modal", Modal);
