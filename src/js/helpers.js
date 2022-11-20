export const shuffledArray = function (arr) {
  return arr
    .map((el) => ({ el, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ el }) => el);
};

export const removeRandomElement = function (arr) {
  const newArr = arr.slice();
  newArr
    .sort(function () {
      return 0.5 - Math.random();
    })
    .pop();

  return newArr;
};

export const countdown = function () {
  const number = document.querySelector(".container__call-out--timer__circle--number");
  let counter = 15;
  number.innerHTML = counter;
  setInterval(() => {
    if (counter === 0) {
      clearInterval();
    } else {
      counter--;
      number.innerHTML = counter;
    }
  }, 1000);
};
