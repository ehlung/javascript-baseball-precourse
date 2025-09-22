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
  showRestartButton() {
    document.getElementById("game-restart-button").hidden = false;
  },
  hideRestartButton() {
    document.getElementById("game-restart-button").hidden = true;
  },
  showAlert(message) {
    alert(message);
  },
};
