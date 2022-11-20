import View from "./view";

class ViewAnswers extends View {
  _parentElement = document.querySelector(".playground");

  addHandlerChooseAnswer(handler) {
    this._parentElement.addEventListener("click", function (e) {
      const checked = e.target.closest(".answer__radio-label");
      if (!checked) return;

      // Prevent click on 50/50
      if (!checked.classList.contains("answer__radio-label--off")) {
        handler(checked.innerText);
      }
    });
  }

  _generateMarkup() {
    const state = this._data;
    const halfList = this._data.halfList;
    const half = state.half;

    const isInHalf = function (answer, arr) {
      return arr.includes(answer);
    };

    if (half !== 1) {
      return `
      <div class="container__heading">
        <h2 class="heading-2">Choose The Answer:</h2>
      </div>

      <div class="container__heading">
        <h3 class="heading-3">${state.question}</h3>
      </div>

      <ul class="container__answers">
        ${state.allAnswers
          .map((ans, i) => {
            return `
              <li>
                <input id="answer${i + 1}" type="radio" name="answer" class="answer answer__radio-input" />
                <label for="answer${i + 1}" class="answer answer__radio-label answer__radio-label--${i + 1}">${ans}</label>
              </li>
            `;
          })
          .join("")}
      </ul>
    `;
    } else {
      return `
      <div class="container__heading">
        <h2 class="heading-2">Choose The Answer:</h2>
      </div>

      <div class="container__heading">
        <h3 class="heading-3">${state.question}</h3>
      </div>

      <ul class="container__answers">
        ${state.allAnswers
          .map((ans, i) => {
            return `
              <li>
                <input id="answer${i + 1}" type="radio" name="answer" class="answer answer__radio-input" />
                <label for="answer${i + 1}" class="answer answer__radio-label ${
              isInHalf(ans, halfList) ? "answer__radio-label--off" : ""
            } answer__radio-label--${i + 1}">${ans}</label>
              </li>
            `;
          })
          .join("")}
      </ul>
    `;
    }
  }
}

export default new ViewAnswers();
