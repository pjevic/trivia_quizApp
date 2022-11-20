import View from "./view";

class ViewCategory extends View {
  _parentElement = document.querySelector(".playground");

  addHandlerChooseCategory(handler) {
    this._parentElement.addEventListener("click", function (e) {
      const checked = e.target.closest(".category__radio-input");
      if (!checked) return;

      handler(checked);
    });
  }

  _generateMarkup() {
    const categories = this._data.map((question) => question.category);

    return `
      <div class="container__heading">
        <h2 class="heading-2">Choose Category:</h2>
      </div>

      <div class="container__category">

        <ul class="container__category--left">
          <li>
            <input id="category1" type="radio" name="category" class="category category__radio-input" />
            <label for="category1" class="category category__radio-label category__radio-label--1">${categories[0]}</label>
          </li>
          <li>
            <input id="category2" type="radio" name="category" class="category category__radio-input" />
            <label for="category2" class="category category__radio-label category__radio-label--2">${categories[1]}</label>
          </li>
        </ul>

        <ul class="container__category--right">
          <li>
            <input id="category3" type="radio" name="category" class="category category__radio-input" />
            <label for="category3" class="category category__radio-label category__radio-label--3">${categories[2]}</label>
          </li>
          <li>
            <input id="category4" type="radio" name="category" class="category category__radio-input" />
            <label for="category4" class="category category__radio-label category__radio-label--4">${categories[3]}</label>
          </li>
          
        </ul>
      </div>
    `;
  }
}

export default new ViewCategory();
