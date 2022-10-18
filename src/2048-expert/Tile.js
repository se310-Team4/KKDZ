export default class Tile {
  #tileElement
  #x
  #y
  #value

  constructor(tileContainer, value = Math.random() > 0.5 ? 2 : 4) {
    this.#tileElement = document.createElement("div")
    this.#tileElement.classList.add("tile")
    tileContainer.append(this.#tileElement)
    this.value = value
  }

  get value() {
    return this.#value
  }

  set value(v) {
    this.#value = v
    this.#tileElement.textContent = v
    switch (this.#tileElement.textContent) {
      case "":
      case "0":
        this.#tileElement.style.backgroundColor = "#afa184";
        this.#tileElement.style.style.colour = "rgb(175, 161, 132)";
        break;
      case "2":
        this.#tileElement.style.backgroundColor = "#eee4ea";
        break;
      case "4":
        this.#tileElement.style.backgroundColor = "#ede2c8";
        break;
      case "8":
        this.#tileElement.style.backgroundColor = "#f2b179";
        break;
      case "16":
        this.#tileElement.style.backgroundColor = "#ffceaa";
        break;
      case "32":
        this.#tileElement.style.backgroundColor = "#e8c083";
        break;
      case "64":
        this.#tileElement.style.backgroundColor = "#ffab6e";
        break;
      case "128":
        this.#tileElement.style.backgroundColor = "#fd9787";
        break;
      case "256":
        this.#tileElement.style.backgroundColor = "#eah89c";
        break;
      case "512":
        this.#tileElement.style.backgroundColor = "#76daff";
        break;
      case "1024":
        this.#tileElement.style.backgroundColor = "#beeaab";
        break;
      case "2048":
        this.#tileElement.style.backgroundColor = "#d7d0f0";
        break;
    }
  }

  set x(value) {
    this.#x = value
    this.#tileElement.style.setProperty("--x", value)
  }

  set y(value) {
    this.#y = value
    this.#tileElement.style.setProperty("--y", value)
  }

  remove() {
    this.#tileElement.remove()
  }

  waitForTransition(animation = false) {
    return new Promise(resolve => {
      this.#tileElement.addEventListener(
        animation ? "animationend" : "transitionend",
        resolve,
        {
          once: true,
        }
      )
    })
  }
}



