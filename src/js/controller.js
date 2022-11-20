import * as model from "./model.js";
import { countdown } from "./helpers.js";
import viewCategory from "./views/viewCategory.js";
import viewAnswers from "./views/viewAnswers.js";
import viewTimer from "./views/viewTimer.js";
import viewPayout from "./views/viewPayout.js";
import viewNext from "./views/viewNext";
import viewHalf from "./views/viewHalf.js";
import viewGameOver from "./views/viewGameOver.js";

const isTheWinner = function () {
  if (model.state.payout === 1000000) return true;
};

const determineLevel = function () {
  const qNum = model.state.questionNumber;
  if (qNum >= 10) model.state.level = "hard";
  if (qNum >= 5) model.state.level = "medium";
};

const controlCategory = async function () {
  if (isTheWinner()) {
    controlGameOver();
    return;
  }

  determineLevel();

  try {
    // Loading questions -> categories
    await model.loadQuestions(model.state.level);

    // Render
    viewCategory.render(model.state.questions[model.state.level]);
    viewPayout.render(model.state);
    viewNext.render(model.state.next);
    viewHalf.render(model.state.half);
  } catch (err) {
    console.error(err);
  }
};

const controlChooseCategory = function (checked) {
  // Get question data
  model.getQuestionData(checked);
  model.allowHalf();

  // Render Answers and Timer
  viewAnswers.render(model.state);
  viewTimer.render();
  countdown();

  // Set timer for getting answer
  model.state.playing = false;
  model.gameTimer();
  model.timeToCheckAns();
};

const controlAnswer = function (checked) {
  model.state.allClickedAnswers.push(checked);
  // Check is the answer given (correct vs incorrect)
  setInterval(() => {
    if (model.state.timer) {
      // Correct answer
      if (model.state.allClickedAnswers.slice(-1)[0] === model.state.correctAnswer) {
        model.correctAnswer();
        viewPayout.render(model.state);
        model.timeToCheckAnsOff();

        // Reprompt categories
        controlCategory();

        // Incorrect answer
      } else {
        model.incorrectAnswer();
        model.paymentIncorrectAnswer();
        model.timeToCheckAnsOff();

        controlGameOver();

        // Start a new game
        setTimeout(() => {
          model.paymentReset();
          controlCategory();
        }, 10000);
      }
    }
  }, 50);
};

const controlNext = function () {
  if (model.state.next) {
    model.next();
    viewNext.render(model.state.next);

    // Stop all timers
    clearTimeout(model.timerGameTimer);
    clearTimeout(model.timerToCheckAns);
    model.timeToCheckAnsOff();

    // Reprompt categories
    controlCategory();
  }
};

const controlHalf = function () {
  if (model.state.halfOption && !model.state.halfUsed) {
    model.half();
    // Render 50/50
    viewHalf.render(model.state.half);
    viewAnswers.render(model.state);

    model.half();
  }
};

const controlGameOver = function () {
  viewGameOver.render(model.state.payout);
  setTimeout(() => {
    model.paymentReset();
    model.incorrectAnswer();
    controlCategory();
  }, 10000);
};

// Subscriber - Publisher
const init = function () {
  viewCategory.addHandlerRender(controlCategory);
  viewCategory.addHandlerChooseCategory(controlChooseCategory);
  viewAnswers.addHandlerChooseAnswer(controlAnswer);
  viewNext.addHandlerNext(controlNext);
  viewHalf.addHandlerHalf(controlHalf);
  viewGameOver.addHandlerTakeMoney(controlGameOver);
};
init();
