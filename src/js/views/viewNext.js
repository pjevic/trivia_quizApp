import View from "./view";

class ViewNext extends View {
  _parentElement = document.querySelector(".container__call-out--next");

  addHandlerNext(handler) {
    this._parentElement.addEventListener("click", function (e) {
      const checked = e.target.closest(".btn");
      if (!checked) return;

      handler(handler);
    });
  }

  _generateMarkup() {
    if (this._data) {
      return `<button class="btn btn-next">next</button>`;
    } else {
      return `<button class="btn btn__off btn--next">next</button>`;
    }
  }
}

export default new ViewNext();
