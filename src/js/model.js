import { API } from "./config";
import { shuffledArray, removeRandomElement } from "./helpers";

export const state = {
  question: "",
  questions: [],
  questionNumber: 0,
  level: "easy",
  correctAnswer: "",
  incorrectAnswers: [],
  allAnswers: [],
  allClickedAnswers: [],
  payout: 0,
  payoutLine: [100, 200, 300, 500, 1000, 2000, 4000, 8000, 16000, 32000, 64000, 125000, 250000, 500000, 1000000],
  next: true,
  half: 0,
  halfList: [],
  halfUsed: false,
  halfOption: false,
  timer: false,
  playing: true,
};

const createQuestions = function (level, data) {
  state.questions[level] = data;
};

const restartQuestions = function () {
  state.questions[state.level] = [];
  state.question = "";
  state.correctAnswer = "";
  state.allAnswers = [];
  state.allClickedAnswers = [];
};

export const loadQuestions = async function (level, url = API) {
  url += level;

  try {
    const res = await fetch(url);
    const data = await res.json();

    createQuestions(level, data);
  } catch (err) {
    console.error(err);
  }
};

export const getQuestionData = function (choosedCategory) {
  const questionNum = choosedCategory.id.slice(-1) - 1;
  // STATE - update QUESTION
  state.question = state.questions[state.level][questionNum].question;
  // STATE - update CORRECT ANS
  state.correctAnswer = state.questions[state.level][questionNum].correctAnswer;
  // STATE - uddate ALL ANS
  let allAnswers = state.questions[state.level][questionNum].incorrectAnswers;
  allAnswers.push(state.correctAnswer);
  allAnswers = shuffledArray(allAnswers);
  state.allAnswers = allAnswers;
  // STATE - update INCORRECT ANS
  state.incorrectAnswers = state.questions[state.level][questionNum].incorrectAnswers.filter((item) => item !== state.correctAnswer);
  // STATE - update 50/50 List
  state.halfList = removeRandomElement(state.incorrectAnswers);
  console.log(state.correctAnswer);
};

export const correctAnswer = function () {
  restartQuestions();
  state.payout = state.payoutLine[state.questionNumber];
  state.questionNumber++;
};

export const incorrectAnswer = function () {
  restartQuestions();
  state.questionNumber = 0;
  state.next = true;
  state.half = 0;
};

export const next = function () {
  state.next = false;
};

export const half = function () {
  state.half++;
  state.halfUsed = true;
};

export const allowHalf = function () {
  state.halfOption = true;
};

export let timerGameTimer;
export const gameTimer = function () {
  timerGameTimer = setTimeout(() => {
    if (state.playing === false) {
      controlGameOver();
    }
  }, 15200);
};

export let timerToCheckAns;
export const timeToCheckAns = function () {
  timerToCheckAns = setTimeout(() => {
    state.timer = true;
    state.playing = true;
  }, 15000);
};

export const timeToCheckAnsOff = function () {
  state.timer = false;
  clearTimeout();
};

export const paymentIncorrectAnswer = function () {
  let payout = state.payout;
  if (payout > 32000 && payout < 1000000) {
    payout = 32000;
  } else if (payout > 1000 && payout < 32000) {
    payout = 1000;
  } else if (payout < 1000) {
    payout = 0;
  }
  state.payout = payout;
};

export const paymentReset = function () {
  state.payout = 0;
};
