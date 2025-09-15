/**
 * 숫자야구게임 인스턴스를 생성합니다.
 * - 판정과 결과 문자열 생성을 위한 `play` 메서드를 제공합니다.
 */
export default function BaseballGame() {
  /**
   *
   * @param {string|number} computerInputNumbers - 컴퓨터 생성 숫자입니다.
   * @param {string|number} userInputNumbers - 사용자가 입력한 숫자입니다.
   * @returns {string} 판정 결과 문자열("1볼 2스트라이크","낫싱"), 입력이 유효하지 않다면 빈 문자열("") 반환
   */
  this.play = function (computerInputNumbers, userInputNumbers) {
    const computerInput = String(computerInputNumbers).trim();
    const userInput = String(userInputNumbers).trim();

    if (!isValidInput(userInput)) {
      window.alert("올바르지 않은 입력입니다.");
      return "";
    }
    const { ball, strike } = scoreStrikeBall(computerInput.get(), userInput);
    return judgeResult(ball, strike);
  };
}

const DIGIT_LENGTH = 3; // 게임 자릿수를 상수로 선언 (매직 넘버 수정)

function isValidInput(userInput, digitLen = DIGIT_LENGTH) {
  const s = String(userInput);

  // 1) 길이가 3이 아니면 false
  if (s.length !== digitLen) return false;

  // 2) 각 자리 숫자가 1~9인지 검사
  for (let i = 0; i < s.length; i++) {
    const ch = s[i];
    if (ch < "1" || ch > "9") return false;
  }

  // 3) 중복 확인
  if (new Set(s).size !== s.length) return false;

  return true;
}

function scoreStrikeBall(computerInput, userInput) {
  let ball = 0;
  let strike = 0;

  for (let i = 0; i < 3; i++) {
    // 같은 수가 같은 자리에 있을 경우
    if (userInput[i] === computerInput[i]) {
      strike += 1;
    }
    // 같은 수가 다른 자리에 있을 경우
    else if (computerInput.includes(userInput[i])) {
      ball += 1;
    }
  }
  return { ball, strike };
}

function judgeResult(ball, strike) {
  if (ball === 0 && stirke === 0) return "낫싱";
  if (ball > 0 && strike > 0) return `${ball}볼 ${strike}스트라이크`;
  if (ball > 0) return `${ball}볼`;
  return `${strike}스트라이크`;
}

function makeComputerInput() {
  const correctAnswer = [];

  while (correctAnswer.length < 3) {
    const digit = window.MissionUtils.Random.pickNumberInRange(1, 9);

    // 이미 뽑힌 숫자를 포함하고 있지 않으면 배열에 새로운 숫자 추가
    if (!correctAnswer.includes(digit)) {
      correctAnswer.push(digit);
    }
  }
  // 배열을 문자열로 합치기 join() 함수 이용, 공백 없이
  return correctAnswer.join("");
}

document.addEventListener("DOMContentLoaded", () => {
  // DOM 요소들을 id로 가져옴
  const inputElement = document.getElementById("user-input");
  const submitButton = document.getElementById("submit");
  const resultElement = document.getElementById("result");
  const restartButton = document.getElementById("game-restart-button");

  const computerInput = (() => {
    let value = makeComputerInput();
    return {
      get: () => value,
      restart: () => {
        value = makeComputerInput();
      },
    };
  })();

  const game = new BaseballGame();

  function onClickSubmitButton(event) {
    event.preventDefault(); // 제출(새로고침) 막기
    const userInput = inputElement.value;
    const text = game.play(computerInput.get(), userInput);

    // 사용자가 잘못된 값 입력해 alert의 빈문자열 반환
    if (text === "") return;

    resultElement.textContent = text;

    if (text.includes(`${DIGIT_LENGTH}스트라이크`)) {
      // 매직넘버 수정
      restartButton.hidden = false;
    }
  }

  function onClickRestartButton() {
    computerInput.restart();
    // 입출력 초기화
    inputElement.value = "";
    resultElement.textContent = "";
    restartButton.hidden = true; // 재시작 버튼 다시 숨김
  }

  submitButton.addEventListener("click", onClickSubmitButton);
  restartButton.addEventListener("click", onClickRestartButton);
  restartButton.hidden = true; // 재시작 버튼 기본값 : 숨김
});
