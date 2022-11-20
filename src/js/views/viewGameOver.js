import View from "./view";

class ViewGameOver extends View {
  _parentElement = document.querySelector(".playground");
  _btnElement = document.querySelector(".container__call-out--take");

  addHandlerTakeMoney(handler) {
    this._btnElement.addEventListener("click", function (e) {
      const checked = e.target.closest(".btn");
      if (!checked) return;
      console.log(checked.innerText);

      handler(handler);
    });
  }

  _generateMarkup() {
    return `
      <div class="container__heading">
        <h2 class="heading-2">You WON</h2>
      </div>

      <div class="container__heading">
        <h3 class="heading-3">${new Intl.NumberFormat("de-DE").format(this._data)}</h3>
      </div>
    `;
  }
}

export default new ViewGameOver();
