class t extends HTMLElement{constructor(){super(),null===this.getAttribute("custom")&&(this.innerHTML=`\n      <div><a href="../index.html">⬅️</a></div>\n      <div>${this.innerHTML}</div>\n      <div id="help-btn"><a href="#">❔</a></div>\n    `)}}window.customElements.define("core-navbar",t);class n extends HTMLElement{constructor(){super(),this.innerHTML=`\n\t\t\t<div>\n\t\t\t\t<div id="modal">\n\t\t\t\t\t<div class="modal-window">\n\t\t\t\t\t\t<span id="close-btn">&times;</span>\n\t\t\t\t\t\t<div>${this.innerHTML}</div>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t`,this.registerEventListeners()}registerEventListeners(){const t=document.getElementById("modal"),n=document.getElementById("help-btn");function e(t){"Escape"===t.key&&i()}function i(){t.style.display="none",document.removeEventListener("keydown",e)}function d(){t.style.display="block",document.addEventListener("keydown",e)}document.getElementById("close-btn").onclick=i,n.onclick=d,window.onclick=function(n){n.target==t&&i()},d()}}window.customElements.define("core-modal",n);
//# sourceMappingURL=index.d4f6799e.js.map