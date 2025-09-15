/* 기능 구현 1. 사용자 입력 처리 & 잘못된 값 입력 판별 기능
  - 규칙 : 길이 3, 각 자리 1~9 숫자, 중복 안됨
  - 잘못된 입력이면 alert 띄우기
*/

export default function BaseballGame() {
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

/* 기능 구현 2. 볼/스트라이크 판정 기능 추가
  - 규칙 : 같은 수가 같은 자리 > 스트라이크 / 다른 자리 > 볼 / 전혀 없으면 > 낫싱
*/

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

/* 기능 구현 3. 판정 결과 문자열 출력 기능
  - 낫싱/볼/스트라이크/볼+스트라이크
  - 볼과 스트라이크 동시에 나오면 볼이 먼저
*/

function judgeResult(ball, strike) {
  if (ball === 0 && stirke === 0) return "낫싱";
  if (ball > 0 && strike > 0) return `${ball}볼 ${strike}스트라이크`;
  if (ball > 0) return `${ball}볼`;
  return `${strike}스트라이크`;
}

/* 기능 구현 4. 랜덤 숫자 생성 기능
  - MissionUtils 라이브러리의 Random.pickNumberInRange 사용
  - Random.pickNumberInRange를 세 번 호출하여 한 자리 수식 확정
*/

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

/* 5. 게임 종료 및 재시작 기능
  -컴퓨터 랜덤 생성 값과 사용자 입력 값이 같다면 -> 정답, 재시작 버튼 활성화
  - 버튼 클릭 시 재시작
*/

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

    // textContent와 value 차이점
    // <p>, <div>, <span> 등 일반 요소: .textContent = '문자' (or .innerText)
    // <input>, <textarea>, <select> 같은 폼 컨트롤: .value = '문자'
    // textContent: CSS/레이아웃 무시, 공백/개행을 있는 그대로 넣음
    // innerText: CSS 영향받음 (숨김 텍스트 제외, 줄바꿈/공백을 화면처럼 정규화)
    // 솔직히 뭐가 다른건지 잘 모르겠음 CSS 공부 더 할 것.
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
