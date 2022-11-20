import View from "./view";

class ViewHalf extends View {
  _parentElement = document.querySelector(".container__call-out--half");

  addHandlerHalf(handler) {
    this._parentElement.addEventListener("click", function (e) {
      const checked = e.target.closest(".btn");
      if (!checked) return;

      handler(handler);
    });
  }

  _generateMarkup() {
    if (this._data >= 1) {
      return `<button class="btn btn__off btn--half">50/50</button>`;
    } else {
      return `<button class="btn btn-half">50/50</button>`;
    }
  }
}

export default new ViewHalf();
