/** usage: <core-navbar>My Game Name</core-navbar> */
class Navbar extends HTMLElement {
  constructor() {
    super();

    // if you use `<core-navbar custom>`, this component does nothing
    if (this.getAttribute("custom") !== null) return;

    this.innerHTML = `
      <div><a href="../index.html">⬅️</a></div>
      <div>${this.innerHTML}</div>
      <div><a href="#">❔</a></div>
    `;
  }
}

window.customElements.define("core-navbar", Navbar);
