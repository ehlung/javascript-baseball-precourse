export default {
  getInput() {
    return document.getElementById("user-input").value;
  },
  showResult(text) {
    document.getElementById("result").textContent = text;
  },
  clear() {
    document.getElementById("user-input").value = "";
    document.getElementById("result").textContent = "";
  },
  restartButton(show) {
    document.getElementById("game-restart-button").hidden = !show;
  },
  showAlert(message) {
    alert(message);
  },
};
