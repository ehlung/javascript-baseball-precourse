import BaseballGame, { DIGIT_LENGTH, makeComputerInput } from "./model.js";
import View from "./view.js";

document.addEventListener("DOMContentLoaded", () => {
  const game = new BaseballGame();

  const computerInput = (() => {
    let value = makeComputerInput();
    return {
      get: () => value,
      resetAnswer: () => {
        value = makeComputerInput();
      },
    };
  })();

  function restartGame() {
    computerInput.resetAnswer();
    View.clear();
    View.hideRestartButton;
  }

  function submitButton(e) {
    e.preventDefault();
    const userInput = View.getInput();
    const text = game.play(computerInput.get(), userInput);

    if (text === "") {
      View.showAlert("올바르지 않은 입력입니다.");
      return;
    }

    View.showResult(text);

    if (text.includes(`${DIGIT_LENGTH}스트라이크`)) {
      View.showRestartButton;
    }
  }

  document.getElementById("submit").addEventListener("click", submitButton);
  document
    .getElementById("game-restart-button")
    .addEventListener("click", restartGame);
  View.hideRestartButton;
});
