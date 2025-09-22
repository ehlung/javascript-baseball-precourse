export default function BaseballGame() {
  this.play = function (computerInputNumbers, userInputNumbers) {
    const computerInput = String(computerInputNumbers).trim();
    const userInput = String(userInputNumbers).trim();

    if (!isValidInput(userInput)) return "";
    const { ball, strike } = scoreStrikeBall(computerInput, userInput);
    return judgeResult(ball, strike);
  };
}

export const DIGIT_LENGTH = 3;

export function isValidInput(userInput, digitLen = DIGIT_LENGTH) {
  const userInputString = String(userInput).trim();

  if (userInputString.length !== digitLen) return false;
  if ([...userInputString].some((ch) => ch < "1" || ch > "9")) return false;
  if (new Set(userInputString).size !== userInputString.length) return false;
  return true;
}

export function scoreStrikeBall(computerInput, userInput) {
  let ball = 0;
  let strike = 0;

  for (let i = 0; i < DIGIT_LENGTH; i++) {
    if (userInput[i] === computerInput[i]) strike += 1;
    else if (computerInput.includes(userInput[i])) ball += 1;
  }
  return { ball, strike };
}

export function judgeResult(ball, strike) {
  if (ball === 0 && strike === 0) return "낫싱";
  if (ball > 0 && strike > 0) return `${ball}볼 ${strike}스트라이크`;
  if (ball > 0) return `${ball}볼`;
  return `${strike}스트라이크`;
}

export function makeComputerInput() {
  const correctAnswer = new Set();

  while (correctAnswer.length < DIGIT_LENGTH) {
    const digit = window.MissionUtils.Random.pickNumberInRange(1, 9);
    if (!correctAnswer.has(digit)) {
      correctAnswer.add(digit);
    }
  }
  return [...correctAnswer].join("");
}
