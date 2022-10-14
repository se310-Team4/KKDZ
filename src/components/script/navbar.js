/** usage: <core-navbar>My Game Name</core-navbar> */
class Navbar extends HTMLElement {
  constructor() {
    super();

    // if you use `<core-navbar custom>`, this component does nothing
    if (this.getAttribute("custom") !== null) {
      this.innerHTML = `
        <div><a></a></div>
        <div>${this.innerHTML}</div>
        <div id="help-btn">
          <b href="#">
          <div class="best-scores">Best</div>
          </b>
        </div>
      `;
      return;
    }

    this.innerHTML = `
      <div><a href="../index.html">⬅️</a></div>
      <div>${this.innerHTML}</div>
      <div id="help-btn"><a href="#">❔</a></div>
    `;
  }
}

window.customElements.define("core-navbar", Navbar);
