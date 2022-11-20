import View from "./view";

class ViewPayout extends View {
  _parentElement = document.querySelector(".payout");

  _generateMarkup() {
    const payoutLine = this._data.payoutLine;
    const questionNumber = this._data.questionNumber;

    return `
      <div class="payout__amount payout__amount--null safe fill">0</div>
      ${payoutLine

        .map((payment, i) => {
          return `
          <div class="payout__amount payout__amount--${i}  ${[4, 9, 14].includes(i) ? "safe" : ""} ${
            i < questionNumber ? "fill" : ""
          }">${new Intl.NumberFormat("de-DE").format(payment)} </div>
        `;
        })
        .join("")}
      <did class="payout__heading">PAYOUT:</did>
    `;
  }
}

export default new ViewPayout();
