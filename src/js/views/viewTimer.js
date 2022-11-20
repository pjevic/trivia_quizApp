import View from "./view";

class viewScore extends View {
  _parentElement = document.querySelector(".container__call-out--timer");

  _generateMarkup() {
    return `
    <div class="container__call-out--timer">
        <div class="container__call-out--timer__circle">
          <div class="container__call-out--timer__circle--outer">
            <div class="container__call-out--timer__circle--inner">
              <div class="container__call-out--timer__circle--number"></div>
            </div>
          </div>

          <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="120px" height="120px">
            <defs>
              <linearGradient id="GradientColor">
                <stop offset="0%" stop-color="#fed464" />
                <stop offset="100%" stop-color="#fdec90" />
              </linearGradient>
            </defs>
            <circle cx="60" cy="60" r="50" stroke-linecap="round" />
          </svg>
        </div>
      </div>
    `;
  }
}

export default new viewScore();
