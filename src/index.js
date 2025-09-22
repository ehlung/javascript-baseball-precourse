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
    View.hideRestartButton();
  }

  function submitButton(e) {
    e.preventDefault();
    try {
      const userInput = View.getInput();
      const text = game.play(computerInput.get(), userInput);

      View.showResult(text);

      if (text.includes(`${DIGIT_LENGTH}스트라이크`)) {
        View.showRestartButton();
      }
    } catch (err) {
      View.showAlert(err.message || "올바르지 않은 입력입니다.");
    }
  }

  document.getElementById("submit").addEventListener("click", submitButton);
  document
    .getElementById("game-restart-button")
    .addEventListener("click", restartGame);
  View.hideRestartButton();
});
